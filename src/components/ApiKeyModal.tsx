import React, { useState, useEffect } from 'react';
import { 
  X, 
  Key, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ExternalLink, 
  ShieldCheck, 
  Cpu, 
  RefreshCw,
  Info
} from 'lucide-react';
import { 
  AiProvider, 
  STORAGE_KEYS, 
  isValidGoogleAiApiKey, 
  maskApiKey,
  GEMINI_FALLBACK_MODELS, 
  AGENT_PLATFORM_FALLBACK_MODELS,
  saveStoredAiConfig,
  getStoredAiConfig,
  createGoogleAiClient
} from '../utils/geminiClient';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  onSaved
}) => {
  const [provider, setProvider] = useState<AiProvider>('gemini');
  const [geminiKey, setGeminiKey] = useState('');
  const [agentKey, setAgentKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini-3.6-flash');
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState('');

  // Load config khi mở modal
  useEffect(() => {
    if (isOpen) {
      const config = getStoredAiConfig();
      setProvider(config.provider);
      const savedGemini = localStorage.getItem(STORAGE_KEYS.GEMINI_KEY) || '';
      const savedAgent = localStorage.getItem(STORAGE_KEYS.AGENT_PLATFORM_KEY) || '';
      setGeminiKey(savedGemini);
      setAgentKey(savedAgent);
      setSelectedModel(config.selectedModel);
      setTestStatus('idle');
      setTestMessage('');
    }
  }, [isOpen]);

  // Điều chỉnh model mặc định khi chuyển provider
  const handleSelectProvider = (newProvider: AiProvider) => {
    setProvider(newProvider);
    setTestStatus('idle');
    setTestMessage('');
    if (newProvider === 'gemini') {
      if (!GEMINI_FALLBACK_MODELS.includes(selectedModel as any)) {
        setSelectedModel('gemini-3.6-flash');
      }
    } else {
      if (!AGENT_PLATFORM_FALLBACK_MODELS.includes(selectedModel as any)) {
        setSelectedModel('gemini-2.5-flash');
      }
    }
  };

  const currentKey = provider === 'gemini' ? geminiKey : agentKey;
  const isKeyValid = isValidGoogleAiApiKey(currentKey);

  // Test API Key
  const handleTestKey = async () => {
    if (!isKeyValid) {
      setTestStatus('error');
      setTestMessage('API Key phải bắt đầu bằng "AIzaSy..." hoặc "AQ..." và có tối thiểu 10 ký tự.');
      return;
    }

    setTestStatus('testing');
    setTestMessage('Đang kết nối thử nghiệm tới Google AI...');

    try {
      const client = createGoogleAiClient(currentKey, provider);
      const res = await client.models.generateContent({
        model: selectedModel,
        contents: [{ role: 'user', parts: [{ text: 'Hello, respond with: OK' }] }],
        config: { maxOutputTokens: 10 }
      });

      if (res.text) {
        setTestStatus('success');
        setTestMessage(`Kết nối thành công! Đã xác thực với model ${selectedModel}.`);
      } else {
        throw new Error('Không nhận được phản hồi từ mô hình.');
      }
    } catch (err: any) {
      setTestStatus('error');
      const msg = err?.message || 'Không thể kết nối. Vui lòng kiểm tra lại API Key hoặc quyền truy cập.';
      setTestMessage(msg);
    }
  };

  // Lưu cấu hình
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentKey.trim() && !isKeyValid) {
      setTestStatus('error');
      setTestMessage('API Key không hợp lệ. Vui lòng kiểm tra lại định dạng.');
      return;
    }

    saveStoredAiConfig(provider, currentKey, selectedModel);
    onSaved?.();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-amber-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-linear-to-r from-amber-500 via-amber-600 to-yellow-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white backdrop-blur-xs">
              <Key className="w-5 h-5 text-amber-100" />
            </div>
            <div>
              <h2 className="text-base font-extrabold tracking-tight">Cấu Hình Google AI API Key</h2>
              <p className="text-xs text-amber-100/90 font-medium">Kích hoạt trợ lý AI Soạn Câu Lệnh Sư Phạm</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-5 text-slate-800">
          {/* Provider Tabs */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Nhà cung cấp dịch vụ AI
            </label>
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => handleSelectProvider('gemini')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  provider === 'gemini'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Google AI Studio (Gemini)</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectProvider('agent-platform')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  provider === 'agent-platform'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Agent Platform API</span>
              </button>
            </div>
          </div>

          {/* API Key Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">
                {provider === 'gemini' ? 'Gemini API Key' : 'Agent Platform API Key'}
              </label>
              <a
                href={
                  provider === 'gemini'
                    ? 'https://aistudio.google.com/apikey'
                    : 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/api-keys'
                }
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1 hover:underline"
              >
                <span>Lấy key miễn phí</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="relative">
              <input
                type="password"
                value={provider === 'gemini' ? geminiKey : agentKey}
                onChange={e => {
                  if (provider === 'gemini') setGeminiKey(e.target.value);
                  else setAgentKey(e.target.value);
                  setTestStatus('idle');
                }}
                placeholder="Dán mã API Key (bắt đầu bằng AIzaSy... hoặc AQ...)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-xs text-slate-900 font-mono placeholder:font-sans placeholder:text-slate-400"
              />
            </div>
            <p className="text-[11px] text-slate-500 flex items-center gap-1 pt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Key được mã hóa an toàn trên trình duyệt cá nhân của bạn, không gửi qua máy chủ trung gian.</span>
            </p>
          </div>

          {/* Model Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              Mô hình chính (Ưu tiên thế hệ mới)
            </label>
            <select
              value={selectedModel}
              onChange={e => setSelectedModel(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-xs font-medium text-slate-800 bg-white"
            >
              {provider === 'gemini' ? (
                <>
                  <option value="gemini-3.6-flash">gemini-3.6-flash (Khuyên dùng — Mới nhất, suy luận mạnh)</option>
                  <option value="gemini-3.5-flash">gemini-3.5-flash (Chất lượng cao, phản hồi mượt)</option>
                  <option value="gemini-3.5-flash-lite">gemini-3.5-flash-lite (Tốc độ siêu nhanh, chi phí thấp)</option>
                  <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Ổn định)</option>
                  <option value="gemini-2.5-flash">gemini-2.5-flash (Dự phòng chuẩn)</option>
                  <option value="gemini-2.5-pro">gemini-2.5-pro (Suy luận chuyên sâu)</option>
                </>
              ) : (
                <>
                  <option value="gemini-2.5-flash">gemini-2.5-flash (Mặc định cho Agent Platform)</option>
                  <option value="gemini-2.5-flash-lite">gemini-2.5-flash-lite (Tốc độ cao)</option>
                  <option value="gemini-2.5-pro">gemini-2.5-pro (Mô hình mở rộng)</option>
                  <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview (Bản xem trước)</option>
                </>
              )}
            </select>
            <p className="text-[11px] text-slate-500">
              * Hệ thống tự động chuyển model dự phòng (fallback) nếu model chính gặp tình trạng quá tải (503).
            </p>
          </div>

          {/* Test Status Box */}
          {testStatus !== 'idle' && (
            <div className={`p-3 rounded-xl text-xs flex items-start gap-2 border ${
              testStatus === 'testing' ? 'bg-blue-50 border-blue-200 text-blue-800' :
              testStatus === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
              'bg-rose-50 border-rose-200 text-rose-800'
            }`}>
              {testStatus === 'testing' && <RefreshCw className="w-4 h-4 animate-spin text-blue-600 shrink-0 mt-0.5" />}
              {testStatus === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
              {testStatus === 'error' && <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />}
              <span className="leading-relaxed">{testMessage}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleTestKey}
              disabled={!currentKey || testStatus === 'testing'}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors disabled:opacity-50 flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testStatus === 'testing' ? 'animate-spin' : ''}`} />
              <span>Kiểm tra kết nối</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-600 text-xs font-semibold hover:bg-slate-100 transition-colors"
              >
                Đóng
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-md shadow-amber-500/20"
              >
                Lưu Cấu Hình
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
