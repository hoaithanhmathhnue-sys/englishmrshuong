import { GoogleGenAI } from '@google/genai';
import { AiProvider, GeneratedLessonCommand, LessonGeneratorForm, ScenarioItem } from '../types';

export type { AiProvider };

// Regex chuẩn chấp nhận cả key cũ AIzaSy... và key auth mới AQ...
export const GOOGLE_AI_API_KEY_PATTERN = /^(?:AIzaSy|AQ)\S{8,}$/;

export const isValidGoogleAiApiKey = (key: string): boolean => {
  if (!key) return false;
  return GOOGLE_AI_API_KEY_PATTERN.test(key.trim());
};

// Mask API key để hiển thị an toàn trên UI
export const maskApiKey = (key: string): string => {
  if (!key || key.length < 10) return '••••••••';
  const prefix = key.slice(0, 4);
  const suffix = key.slice(-4);
  return `${prefix}••••••••${suffix}`;
};

// Danh sách model Google AI Studio chuẩn
export const GEMINI_FALLBACK_MODELS = [
  'gemini-3.6-flash',
  'gemini-3.5-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-2.5-flash',
  'gemini-2.5-pro'
] as const;

// Danh sách model Agent Platform API
export const AGENT_PLATFORM_FALLBACK_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.5-pro',
  'gemini-3.1-pro-preview'
] as const;

export const STORAGE_KEYS = {
  PROVIDER: 'google_ai_provider',
  GEMINI_KEY: 'gemini_api_key',
  AGENT_PLATFORM_KEY: 'agent_platform_api_key',
  SELECTED_MODEL: 'google_ai_selected_model'
};

// Lấy cấu hình lưu trữ
export const getStoredAiConfig = (): {
  provider: AiProvider;
  apiKey: string;
  selectedModel: string;
} => {
  const provider = (localStorage.getItem(STORAGE_KEYS.PROVIDER) as AiProvider) || 'gemini';
  const geminiKey = localStorage.getItem(STORAGE_KEYS.GEMINI_KEY) || (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
  const agentPlatformKey = localStorage.getItem(STORAGE_KEYS.AGENT_PLATFORM_KEY) || '';

  const apiKey = provider === 'gemini' ? geminiKey : agentPlatformKey;
  const defaultModel = provider === 'gemini' ? 'gemini-3.6-flash' : 'gemini-2.5-flash';
  const selectedModel = localStorage.getItem(STORAGE_KEYS.SELECTED_MODEL) || defaultModel;

  return {
    provider,
    apiKey,
    selectedModel
  };
};

// Lưu cấu hình
export const saveStoredAiConfig = (
  provider: AiProvider,
  key: string,
  model?: string
): void => {
  localStorage.setItem(STORAGE_KEYS.PROVIDER, provider);
  if (provider === 'gemini') {
    localStorage.setItem(STORAGE_KEYS.GEMINI_KEY, key.trim());
  } else {
    localStorage.setItem(STORAGE_KEYS.AGENT_PLATFORM_KEY, key.trim());
  }
  if (model) {
    localStorage.setItem(STORAGE_KEYS.SELECTED_MODEL, model);
  }
};

// Client Factory chuẩn hóa theo api.md
export const createGoogleAiClient = (apiKey: string, provider: AiProvider): GoogleGenAI => {
  if (provider === 'agent-platform') {
    // vertexai: true là cờ SDK của Google định tuyến tới aiplatform.googleapis.com
    return new GoogleGenAI({ vertexai: true, apiKey });
  }
  return new GoogleGenAI({ apiKey });
};

// Phân loại lỗi API chính xác theo gemini-model SKILL
export type ApiErrorType =
  | 'INVALID_API_KEY'
  | 'PERMISSION_DENIED'
  | 'QUOTA_EXCEEDED'
  | 'MODEL_OVERLOADED'
  | 'NOT_FOUND'
  | 'UNKNOWN';

export const parseApiError = (error: unknown): ApiErrorType => {
  const message = (error as any)?.message || String(error) || '';
  const serialized = JSON.stringify(error) || '';

  if (
    message.includes('API_KEY_INVALID') ||
    message.includes('401') ||
    serialized.includes('401')
  ) {
    return 'INVALID_API_KEY';
  }

  if (
    message.includes('PERMISSION_DENIED') ||
    message.includes('403') ||
    serialized.includes('403')
  ) {
    return 'PERMISSION_DENIED';
  }

  if (
    serialized.includes('429') ||
    message.includes('RESOURCE_EXHAUSTED') ||
    message.toLowerCase().includes('quota') ||
    message.toLowerCase().includes('rate limit')
  ) {
    return 'QUOTA_EXCEEDED';
  }

  if (
    serialized.includes('503') ||
    serialized.includes('500') ||
    serialized.includes('504') ||
    message.includes('UNAVAILABLE') ||
    message.toLowerCase().includes('high demand') ||
    message.toLowerCase().includes('overloaded') ||
    message.toLowerCase().includes('temporarily unavailable')
  ) {
    return 'MODEL_OVERLOADED';
  }

  if (
    serialized.includes('404') ||
    message.includes('NOT_FOUND')
  ) {
    return 'NOT_FOUND';
  }

  return 'UNKNOWN';
};

// Chuỗi model fallback đã sắp xếp
const getOrderedFallbackModels = (provider: AiProvider, userSelectedModel?: string): string[] => {
  const baseList: string[] = provider === 'gemini' 
    ? [...GEMINI_FALLBACK_MODELS] 
    : [...AGENT_PLATFORM_FALLBACK_MODELS];

  if (userSelectedModel && baseList.includes(userSelectedModel)) {
    return [userSelectedModel, ...baseList.filter(m => m !== userSelectedModel)];
  }
  return baseList;
};

export interface GenerateLessonCommandsResponse {
  commands: GeneratedLessonCommand[];
  modelUsed: string;
  fallbackTriggered?: boolean;
}

/**
 * AI Soạn Câu Lệnh Theo Bài Dạy Tiểu Học (Lesson-based AI Generator)
 * Đi qua client factory duy nhất và fallback loop chuẩn mực
 */
export async function generateLessonCommandsWithGemini(
  form: LessonGeneratorForm,
  onProgress?: (status: string) => void
): Promise<GenerateLessonCommandsResponse> {
  const config = getStoredAiConfig();
  if (!config.apiKey || !isValidGoogleAiApiKey(config.apiKey)) {
    throw new Error('Vui lòng cấu hình API Key hợp lệ (bắt đầu bằng AIzaSy... hoặc AQ...) trước khi sử dụng tính năng này.');
  }

  const client = createGoogleAiClient(config.apiKey, config.provider);
  const models = getOrderedFallbackModels(config.provider, config.selectedModel);

  const systemInstruction = `Bạn là Trợ lý Sư phạm Tiếng Anh Tiểu học cao cấp cho giáo viên Việt Nam, thuộc Đề án "Môi trường Tiếng Anh học đường 2025–2035 — Trường Tiểu học Lê Kim Lăng" (Chủ đề Hoa Hướng Dương, dấu ấn Mrs. Huong).
Nhiệm vụ của bạn là soạn 4 câu lệnh/mẫu câu Tiếng Anh lớp học (Classroom English) phù hợp chính xác với tiết dạy tiểu học được cung cấp.

Mỗi câu ứng với 4 giai đoạn sư phạm của một tiết dạy:
1. "Khởi động" (Warm-up / Attention grabber)
2. "Khám phá / Bài mới" (Presentation / Direct instruction)
3. "Luyện tập / Thực hành" (Practice / Group/Pair work)
4. "Vận dụng / Kết thúc" (Production / Wrap-up & Praise)

YÊU CẦU BẮT BUỘC:
- Câu ngắn gọn, dễ nhớ, có vần điệu hoặc hô đáp (Call & Response) tương tác 2 chiều giữa cô và trò.
- Cung cấp phiên âm quốc tế IPA chuẩn cho câu của giáo viên.
- Đính kèm gợi ý cử chỉ hình thể sinh động (TPR - Total Physical Response) để học sinh hào hứng làm theo.
- Lời dịch Tiếng Việt chuẩn mực sư phạm tiểu học.
- ĐẦU RA BẮT BUỘC LÀ JSON MẢNG (Array) với các key chính xác:
[
  {
    "activityStage": "Khởi động",
    "teacherCall": "...",
    "studentResponse": "...",
    "callIpa": "/.../",
    "vietnameseTranslation": "...",
    "tprSuggestion": "..."
  }
]`;

  const userPrompt = `Hãy soạn bộ câu lệnh Tiếng Anh tích hợp vào tiết dạy tiểu học:
- Khối lớp: ${form.grade}
- Môn học: ${form.subject}
- Tên bài dạy / Chủ đề: "${form.lessonName}"
${form.notes ? `- Ghi chú bổ sung của giáo viên: "${form.notes}"` : ''}

Hãy trả về JSON hợp lệ theo đúng cấu trúc yêu cầu.`;

  let lastError: any = null;
  let hasFallenBack = false;

  for (let i = 0; i < models.length; i++) {
    const currentModel = models[i];
    try {
      if (i > 0) {
        hasFallenBack = true;
        onProgress?.(`Model ${models[i - 1]} đang bận, tự động chuyển sang model dự phòng: ${currentModel}...`);
      } else {
        onProgress?.(`Đang soạn câu lệnh sư phạm với ${currentModel}...`);
      }

      // Cấu hình theo api.md: Gemini 3 không gửi temperature/topP deprecation
      const requestConfig: any = {
        systemInstruction,
        responseMimeType: 'application/json',
        maxOutputTokens: 2048
      };

      const response = await client.models.generateContent({
        model: currentModel,
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        config: requestConfig
      });

      const responseText = response.text || '';
      const parsedData = JSON.parse(responseText);

      if (!Array.isArray(parsedData) || parsedData.length === 0) {
        throw new Error('Dữ liệu AI trả về không đúng định dạng mảng câu lệnh.');
      }

      const commands: GeneratedLessonCommand[] = parsedData.map((item: any, idx: number) => ({
        id: `ai-gen-${Date.now()}-${idx + 1}`,
        activityStage: item.activityStage || (idx === 0 ? 'Khởi động' : idx === 1 ? 'Khám phá / Bài mới' : idx === 2 ? 'Luyện tập / Thực hành' : 'Vận dụng / Kết thúc'),
        teacherCall: item.teacherCall || '',
        studentResponse: item.studentResponse || '',
        callIpa: item.callIpa || '',
        vietnameseTranslation: item.vietnameseTranslation || '',
        tprSuggestion: item.tprSuggestion || 'Kết hợp mỉm cười và làm điệu bộ tay.'
      }));

      return {
        commands,
        modelUsed: currentModel,
        fallbackTriggered: hasFallenBack
      };
    } catch (err: any) {
      lastError = err;
      const errorType = parseApiError(err);

      // Nếu lỗi key sai hoặc quyền truy cập, dừng ngay không thử model tiếp theo
      if (errorType === 'INVALID_API_KEY') {
        throw new Error('API Key không hợp lệ hoặc đã hết hạn. Vui lòng kiểm tra lại trong Cài đặt API.');
      }
      if (errorType === 'PERMISSION_DENIED') {
        throw new Error('API Key không có quyền truy cập Google AI Studio hoặc chưa được bật quyền model.');
      }
      if (errorType === 'QUOTA_EXCEEDED') {
        throw new Error('Đã hết hạn mức quota hoặc vượt quá tốc độ gọi API. Vui lòng thử lại sau giây lát.');
      }

      // Nếu model overload hoặc not found, tiếp tục vòng lặp fallback
      console.warn(`Model ${currentModel} gặp lỗi (${errorType}), đang thử model dự phòng kế tiếp...`, err);
    }
  }

  throw lastError || new Error('Không thể kết nối đến các model Google AI. Vui lòng kiểm tra lại kết nối mạng hoặc API Key.');
}

/**
 * AI Sáng Tạo Tình Huống Sư Phạm
 * Giáo viên nhập tình huống lớp học, AI sinh ra 3 lựa chọn khẩu lệnh tiếng Anh
 */
export interface GenerateScenarioResponse {
  scenario: ScenarioItem;
  modelUsed: string;
}

export async function generateScenarioCommandsWithGemini(
  situation: string,
  grade: string,
  onProgress?: (status: string) => void
): Promise<GenerateScenarioResponse> {
  const config = getStoredAiConfig();
  if (!config.apiKey || !isValidGoogleAiApiKey(config.apiKey)) {
    throw new Error('Vui lòng cấu hình API Key hợp lệ trước khi sử dụng tính năng này.');
  }

  const client = createGoogleAiClient(config.apiKey, config.provider);
  const models = getOrderedFallbackModels(config.provider, config.selectedModel);

  const systemInstruction = `Bạn là Chuyên gia Sư phạm Tiếng Anh Tiểu Học thuộc Đề án "Môi trường Tiếng Anh học đường 2025–2035 — Trường Tiểu học Lê Kim Lăng" (Mrs. Huong).

Nhiệm vụ: Dựa trên TÌNH HUỐNG LỚP HỌC THỰC TẾ mà giáo viên mô tả, bạn phải sáng tạo ra 3 lựa chọn phản ứng bằng khẩu lệnh Tiếng Anh:

- **Đáp án A**: Câu khẩu lệnh Tiếng Anh CHUẨN MỰC SƯ PHẠM NHẤT (isBest = true) — dùng kỷ luật tích cực, Call & Response, có TPR, đúng chuẩn mực nhà giáo tiểu học.
- **Đáp án B**: Câu khẩu lệnh Tiếng Anh KHÁC — có thể chấp nhận được nhưng không tối ưu.
- **Đáp án C**: Câu phản ứng Tiếng Anh THIẾU SƯ PHẠM hoặc quá nghiêm khắc — để giáo viên nhận biết cách nên tránh.

YÊU CẦU BẮT BUỘC:
- Mỗi lựa chọn phải có: englishText (câu tiếng Anh), vietnameseText (dịch), rationale (phân tích sư phạm chi tiết)
- Phải có trường pedagogicalTip — lời khuyên sư phạm tổng hợp từ Mrs. Huong
- Phải có title — tiêu đề ngắn gọn mô tả tình huống

ĐẦU RA BẮT BUỘC LÀ JSON OBJECT:
{
  "title": "Tiêu đề tình huống",
  "situation": "Mô tả lại tình huống",
  "options": [
    {
      "id": "opt-a",
      "englishText": "...",
      "vietnameseText": "...",
      "rationale": "...",
      "isBest": true
    },
    {
      "id": "opt-b",
      "englishText": "...",
      "vietnameseText": "...",
      "rationale": "...",
      "isBest": false
    },
    {
      "id": "opt-c",
      "englishText": "...",
      "vietnameseText": "...",
      "rationale": "...",
      "isBest": false
    }
  ],
  "pedagogicalTip": "Lời khuyên sư phạm tổng hợp của Mrs. Huong cho tình huống này."
}`;

  const userPrompt = `Giáo viên mô tả tình huống thực tế trong lớp học tiểu học:

- Khối lớp: ${grade}
- Tình huống: "${situation}"

Hãy sáng tạo 3 lựa chọn khẩu lệnh Tiếng Anh phản ứng với tình huống trên. Trả về JSON theo đúng cấu trúc yêu cầu.`;

  let lastError: any = null;

  for (let i = 0; i < models.length; i++) {
    const currentModel = models[i];
    try {
      if (i > 0) {
        onProgress?.(`Model ${models[i - 1]} đang bận, chuyển sang ${currentModel}...`);
      } else {
        onProgress?.(`Đang sáng tạo khẩu lệnh với ${currentModel}...`);
      }

      const response = await client.models.generateContent({
        model: currentModel,
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          maxOutputTokens: 2048
        }
      });

      const responseText = response.text || '';
      const parsed = JSON.parse(responseText);

      if (!parsed || !Array.isArray(parsed.options) || parsed.options.length === 0) {
        throw new Error('AI trả về dữ liệu không đúng định dạng.');
      }

      const scenario: ScenarioItem = {
        id: `scen-custom-${Date.now()}`,
        title: parsed.title || 'Tình huống tùy chỉnh',
        grade: grade,
        situation: parsed.situation || situation,
        options: parsed.options.map((opt: any, idx: number) => ({
          id: opt.id || `opt-custom-${idx}`,
          englishText: opt.englishText || '',
          vietnameseText: opt.vietnameseText || '',
          rationale: opt.rationale || '',
          isBest: Boolean(opt.isBest)
        })),
        pedagogicalTip: parsed.pedagogicalTip || 'Hãy luôn dùng kỷ luật tích cực và khẩu lệnh Call & Response.'
      };

      return { scenario, modelUsed: currentModel };
    } catch (err: any) {
      lastError = err;
      const errorType = parseApiError(err);

      if (errorType === 'INVALID_API_KEY') {
        throw new Error('API Key không hợp lệ hoặc đã hết hạn.');
      }
      if (errorType === 'PERMISSION_DENIED') {
        throw new Error('API Key không có quyền truy cập.');
      }
      if (errorType === 'QUOTA_EXCEEDED') {
        throw new Error('Đã hết quota. Vui lòng thử lại sau.');
      }

      console.warn(`Model ${currentModel} gặp lỗi (${errorType}), thử model dự phòng...`, err);
    }
  }

  throw lastError || new Error('Không thể kết nối đến Google AI.');
}
