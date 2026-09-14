import React, { useState, useRef, useCallback } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  Volume2, 
  Copy, 
  Check, 
  RefreshCw, 
  Key, 
  Zap, 
  HandMetal, 
  Lightbulb,
  ArrowRight,
  AlertCircle,
  Upload,
  FileText,
  X,
  FileUp,
  Mic
} from 'lucide-react';
import { GradeLevel, GeneratedLessonCommand, LessonGeneratorForm } from '../types';
import { generateLessonCommandsWithGemini, getStoredAiConfig } from '../utils/geminiClient';
import { speakText, stopSpeaking } from '../utils/speech';

interface LessonAiGeneratorTabProps {
  onOpenApiKeyModal: () => void;
  onNavigateToVoiceLab?: (cmdId?: string) => void;
}

const SAMPLE_LESSONS: LessonGeneratorForm[] = [
  {
    grade: 'Lớp 1',
    subject: 'Toán học',
    lessonName: 'Phép cộng trong phạm vi 10',
    notes: 'Khởi động vui vẻ bằng vỗ tay và đếm ngón tay'
  },
  {
    grade: 'Lớp 2',
    subject: 'Toán học',
    lessonName: 'Hình tam giác - Hình tứ giác',
    notes: 'Lớp cần nhận diện hình và vẽ hình trong không trung'
  },
  {
    grade: 'Lớp 3',
    subject: 'Tự nhiên & Xã hội',
    lessonName: 'Các cơ quan trong cơ thể người',
    notes: 'Học sinh sờ tay vào tim, phổi và làm động tác thể dục'
  },
  {
    grade: 'Lớp 4',
    subject: 'Khoa học',
    lessonName: 'Nước có những tính chất gì?',
    notes: 'Thí nghiệm rót nước vào cốc và quan sát'
  }
];

// --- Client-side file text extraction utilities ---

/** Extract text from a DOCX file (ZIP containing XML) */
async function extractTextFromDocx(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const uint8 = new Uint8Array(arrayBuffer);

  // DOCX = ZIP file. Find document.xml inside the ZIP.
  // Simple ZIP parser: search for "word/document.xml" PK entries
  const decoder = new TextDecoder('utf-8');
  const fullText = decoder.decode(uint8);
  
  // Find all <w:t> text nodes from the raw XML inside the DOCX zip
  // Strategy: locate the document.xml content between local file header boundaries
  const docXmlStart = findDocumentXmlOffset(uint8);
  if (docXmlStart < 0) {
    // Fallback: try to parse the raw bytes as text and extract readable content
    return extractReadableText(fullText);
  }

  const xmlContent = extractDeflatedOrStored(uint8, docXmlStart);
  if (!xmlContent) {
    return extractReadableText(fullText);
  }

  // Parse XML text nodes: <w:t ...>content</w:t>
  const textParts: string[] = [];
  const regex = /<w:t[^>]*>([^<]*)<\/w:t>/g;
  let match;
  while ((match = regex.exec(xmlContent)) !== null) {
    textParts.push(match[1]);
  }

  // Also check for paragraph breaks
  const withBreaks = xmlContent.replace(/<\/w:p>/g, '\n');
  const altRegex = /<w:t[^>]*>([^<]*)<\/w:t>/g;
  const altParts: string[] = [];
  let altMatch;
  while ((altMatch = altRegex.exec(withBreaks)) !== null) {
    altParts.push(altMatch[1]);
  }

  const result = (altParts.length > textParts.length ? altParts : textParts).join(' ');
  return result.trim() || extractReadableText(fullText);
}

/** Find the offset of "word/document.xml" local file header in ZIP */
function findDocumentXmlOffset(data: Uint8Array): number {
  const target = 'word/document.xml';
  const targetBytes = new TextEncoder().encode(target);
  
  for (let i = 0; i < data.length - targetBytes.length; i++) {
    let found = true;
    for (let j = 0; j < targetBytes.length; j++) {
      if (data[i + j] !== targetBytes[j]) {
        found = false;
        break;
      }
    }
    if (found) return i;
  }
  return -1;
}

/** Try to extract stored (uncompressed) XML from the ZIP entry */
function extractDeflatedOrStored(data: Uint8Array, nameOffset: number): string | null {
  // Walk backwards to find the local file header (PK\x03\x04)
  let headerOffset = nameOffset;
  for (let i = nameOffset; i >= Math.max(0, nameOffset - 200); i--) {
    if (data[i] === 0x50 && data[i + 1] === 0x4B && data[i + 2] === 0x03 && data[i + 3] === 0x04) {
      headerOffset = i;
      break;
    }
  }
  
  // Parse local file header
  const compressionMethod = data[headerOffset + 8] | (data[headerOffset + 9] << 8);
  const compressedSize = data[headerOffset + 18] | (data[headerOffset + 19] << 8) | (data[headerOffset + 20] << 16) | (data[headerOffset + 21] << 24);
  const fileNameLen = data[headerOffset + 26] | (data[headerOffset + 27] << 8);
  const extraFieldLen = data[headerOffset + 28] | (data[headerOffset + 29] << 8);
  
  const dataStart = headerOffset + 30 + fileNameLen + extraFieldLen;
  
  if (compressionMethod === 0) {
    // Stored (no compression)
    const xmlBytes = data.slice(dataStart, dataStart + compressedSize);
    return new TextDecoder('utf-8').decode(xmlBytes);
  }
  
  if (compressionMethod === 8) {
    // Deflated - use DecompressionStream if available
    try {
      const compressedData = data.slice(dataStart, dataStart + compressedSize);
      // Try with DecompressionStream (modern browsers)
      if (typeof DecompressionStream !== 'undefined') {
        return null; // Will fall back to readable text extraction
      }
    } catch {
      // ignore
    }
  }
  
  return null;
}

/** Fallback: extract any human-readable text segments from binary data */
function extractReadableText(rawText: string): string {
  // Remove XML tags, control chars, and extract readable content
  const cleaned = rawText
    .replace(/<[^>]+>/g, ' ')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Keep only meaningful text segments (Vietnamese + English + digits)
  const words = cleaned.split(/\s+/).filter(w => 
    w.length > 1 && /[a-zA-ZÀ-ỹ0-9]/.test(w)
  );
  
  return words.slice(0, 2000).join(' '); // Cap at ~2000 words
}

/** Extract text from PDF using simple text stream parsing */
async function extractTextFromPdf(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const uint8 = new Uint8Array(arrayBuffer);
  const text = new TextDecoder('latin1').decode(uint8);
  
  const textSegments: string[] = [];
  
  // Strategy 1: Extract text between BT...ET (text objects)
  const btEtRegex = /BT\s([\s\S]*?)ET/g;
  let btMatch;
  while ((btMatch = btEtRegex.exec(text)) !== null) {
    const block = btMatch[1];
    // Extract parenthesized strings: (text content)
    const tjRegex = /\(([^)]*)\)/g;
    let tjMatch;
    while ((tjMatch = tjRegex.exec(block)) !== null) {
      const decoded = tjMatch[1]
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '')
        .replace(/\\t/g, ' ')
        .replace(/\\\(/g, '(')
        .replace(/\\\)/g, ')')
        .replace(/\\\\/g, '\\');
      if (decoded.trim()) {
        textSegments.push(decoded.trim());
      }
    }
  }
  
  // Strategy 2: If BT/ET extraction yields little, try to find readable text
  if (textSegments.join(' ').length < 50) {
    // Look for streams and try to extract text
    const streamRegex = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
    let streamMatch;
    while ((streamMatch = streamRegex.exec(text)) !== null) {
      const content = streamMatch[1];
      const readable = content.replace(/[^\x20-\x7E\xC0-\xFF\n]/g, '').trim();
      if (readable.length > 10) {
        textSegments.push(readable);
      }
    }
  }
  
  const result = textSegments.join(' ').replace(/\s+/g, ' ').trim();
  return result.slice(0, 8000); // Cap at 8000 chars for API prompt
}

/** Main file text extraction dispatcher */
async function extractTextFromFile(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  
  if (name.endsWith('.docx')) {
    return extractTextFromDocx(file);
  }
  
  if (name.endsWith('.pdf')) {
    return extractTextFromPdf(file);
  }
  
  if (name.endsWith('.doc')) {
    // Old .doc format - extract readable text from binary
    const buffer = await file.arrayBuffer();
    const text = new TextDecoder('utf-8', { fatal: false }).decode(buffer);
    return extractReadableText(text);
  }
  
  if (name.endsWith('.txt') || name.endsWith('.md')) {
    return file.text();
  }
  
  throw new Error('Chỉ hỗ trợ file .docx, .pdf, .doc hoặc .txt');
}

// Max file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const LessonAiGeneratorTab: React.FC<LessonAiGeneratorTabProps> = ({
  onOpenApiKeyModal,
  onNavigateToVoiceLab
}) => {
  const [grade, setGrade] = useState<GradeLevel>('Lớp 1');
  const [subject, setSubject] = useState('Toán học');
  const [lessonName, setLessonName] = useState('Phép cộng trong phạm vi 10');
  const [notes, setNotes] = useState('Khởi động vui vẻ và có hô đáp nhịp nhàng');

  // File upload state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractError, setExtractError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [progressStatus, setProgressStatus] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [generatedCommands, setGeneratedCommands] = useState<GeneratedLessonCommand[] | null>(null);
  const [modelUsed, setModelUsed] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const aiConfig = getStoredAiConfig();
  const hasApiKey = Boolean(aiConfig.apiKey);

  // --- File upload handlers ---
  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Reset
    setExtractError(null);
    setExtractedText('');
    
    // Validate size
    if (file.size > MAX_FILE_SIZE) {
      setExtractError(`File quá lớn (${(file.size / 1024 / 1024).toFixed(1)}MB). Giới hạn tối đa 5MB.`);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Validate extension
    const name = file.name.toLowerCase();
    if (!name.endsWith('.docx') && !name.endsWith('.pdf') && !name.endsWith('.doc') && !name.endsWith('.txt')) {
      setExtractError('Chỉ hỗ trợ định dạng .docx, .pdf, .doc hoặc .txt');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setUploadedFile(file);
    setIsExtracting(true);

    try {
      const text = await extractTextFromFile(file);
      if (!text || text.trim().length < 10) {
        setExtractError('Không trích xuất được nội dung văn bản từ file. Vui lòng thử file khác hoặc nhập tay.');
        setUploadedFile(null);
      } else {
        setExtractedText(text.slice(0, 4000)); // Cap at 4000 chars
        // Auto-populate lesson name from filename if empty
        if (!lessonName || lessonName === 'Phép cộng trong phạm vi 10') {
          const baseName = file.name.replace(/\.(docx|pdf|doc|txt)$/i, '').replace(/[_-]/g, ' ');
          setLessonName(baseName);
        }
      }
    } catch (err: any) {
      setExtractError(err?.message || 'Không thể đọc nội dung file.');
      setUploadedFile(null);
    } finally {
      setIsExtracting(false);
    }
  }, [lessonName]);

  const handleRemoveFile = useCallback(() => {
    setUploadedFile(null);
    setExtractedText('');
    setExtractError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && fileInputRef.current) {
      // Create a synthetic change event by setting the file
      const dt = new DataTransfer();
      dt.items.add(file);
      fileInputRef.current.files = dt.files;
      fileInputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // --- Generate handler ---
  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!lessonName.trim() && !extractedText.trim()) return;

    if (!hasApiKey) {
      onOpenApiKeyModal();
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setProgressStatus('Đang kết nối trí tuệ nhân tạo Google AI...');

    try {
      // Build enhanced notes with file content
      const enrichedNotes = [
        notes,
        extractedText 
          ? `\n\n--- NỘI DUNG BÀI HỌC TRÍCH XUẤT TỪ FILE "${uploadedFile?.name || 'bài học'}" ---\n${extractedText}`
          : ''
      ].filter(Boolean).join('\n');

      const response = await generateLessonCommandsWithGemini(
        { grade, subject, lessonName, notes: enrichedNotes },
        (status) => setProgressStatus(status)
      );

      setGeneratedCommands(response.commands);
      setModelUsed(response.modelUsed);
    } catch (err: any) {
      console.error('Error generating lesson commands:', err);
      setErrorMsg(err?.message || 'Có lỗi xảy ra khi tạo câu lệnh. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
      setProgressStatus('');
    }
  };

  const handleApplySample = (sample: LessonGeneratorForm) => {
    setGrade(sample.grade);
    setSubject(sample.subject);
    setLessonName(sample.lessonName);
    setNotes(sample.notes || '');
    handleRemoveFile();
  };

  const handlePlayVoice = (id: string, text: string, rate: number = 1.0) => {
    stopSpeaking();
    setPlayingId(`${id}-${rate}`);
    speakText(text, {
      rate,
      tone: 'energetic',
      onEnd: () => setPlayingId(null)
    });
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="rounded-3xl bg-linear-to-r from-amber-500 via-yellow-500 to-amber-600 p-6 sm:p-8 text-white shadow-xl shadow-amber-500/20 border border-amber-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
              <span>Trí tuệ nhân tạo Google GenAI • Gemini 3.6</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              AI soạn câu lệnh theo bài học
            </h1>
            <p className="text-amber-100 text-xs sm:text-sm leading-relaxed">
              Nhập tên bài dạy hoặc <strong className="text-white">tải lên file DOCX / PDF</strong> giáo án, AI của Mrs. Huong sẽ tự động thiết kế ngay 4 câu lệnh Tiếng Anh tích hợp tương ứng 4 giai đoạn lên lớp kèm phiên âm IPA và cử chỉ TPR sinh động!
            </p>
          </div>

          <div className="shrink-0 flex flex-col items-start md:items-end gap-2">
            <button
              onClick={onOpenApiKeyModal}
              className="px-4 py-2 rounded-xl bg-white text-amber-900 font-extrabold text-xs hover:bg-amber-50 transition-all shadow-md flex items-center gap-1.5"
            >
              <Key className="w-3.5 h-3.5 text-amber-600" />
              <span>{hasApiKey ? 'Cài đặt API Key' : 'Nhập API Key'}</span>
            </button>
            <span className="text-[11px] text-amber-100">
              {hasApiKey ? `Đang dùng: ${aiConfig.provider === 'gemini' ? 'Google AI Studio' : 'Agent Platform'}` : 'Chưa nhập API Key'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Input Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
              <BookOpen className="w-4 h-4" />
            </div>
            <h2 className="text-base font-extrabold text-slate-900">Thông tin tiết dạy của bạn</h2>
          </div>

          {/* Quick template chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-slate-500 font-medium">Gợi ý bài mẫu:</span>
            {SAMPLE_LESSONS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplySample(sample)}
                className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[11px] font-semibold transition-colors"
              >
                {sample.subject} ({sample.grade})
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Grade */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Khối lớp</label>
              <select
                value={grade}
                onChange={e => setGrade(e.target.value as GradeLevel)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-xs font-medium bg-white"
              >
                <option value="Lớp 1">Lớp 1</option>
                <option value="Lớp 2">Lớp 2</option>
                <option value="Lớp 3">Lớp 3</option>
                <option value="Lớp 4">Lớp 4</option>
                <option value="Lớp 5">Lớp 5</option>
              </select>
            </div>

            {/* Subject */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Môn học</label>
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="VD: Toán học, Tự nhiên & Xã hội..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-xs font-medium"
              />
            </div>

            {/* Lesson Name */}
            <div className="space-y-1 sm:col-span-2 lg:col-span-1">
              <label className="text-xs font-bold text-slate-700">Tên bài dạy / chủ đề</label>
              <input
                type="text"
                value={lessonName}
                onChange={e => setLessonName(e.target.value)}
                placeholder="VD: Phép trừ trong phạm vi 10..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-xs font-medium"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Ghi chú hoạt động cụ thể (tùy chọn)</label>
            <input
              type="text"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="VD: Cần hoạt động chia nhóm 4 người, dùng bảng con hoặc động tác tay sôi nổi..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-xs font-medium"
            />
          </div>

          {/* ===== FILE UPLOAD SECTION ===== */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <FileUp className="w-3.5 h-3.5 text-amber-600" />
              Tải Lên File Bài Học (Tùy chọn — hỗ trợ .docx, .pdf, .doc, .txt)
            </label>

            {!uploadedFile ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="relative border-2 border-dashed border-amber-300 hover:border-amber-500 rounded-2xl p-5 text-center bg-amber-50/50 hover:bg-amber-50 transition-all cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".docx,.pdf,.doc,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="text-xs text-slate-700 font-semibold">
                    Bấm để chọn file hoặc <span className="text-amber-700 font-bold">kéo thả vào đây</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Hỗ trợ: .docx (Word), .pdf, .doc, .txt • Tối đa 5MB
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-amber-200 bg-amber-50">
                <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-800 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">{uploadedFile.name}</div>
                  <div className="text-[11px] text-slate-500">
                    {isExtracting ? (
                      <span className="text-amber-700 font-semibold flex items-center gap-1">
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        Đang trích xuất nội dung bài học...
                      </span>
                    ) : extractedText ? (
                      <span className="text-emerald-700 font-semibold">
                        ✓ Đã trích xuất {extractedText.length.toLocaleString()} ký tự • Sẵn sàng tạo câu lệnh
                      </span>
                    ) : (
                      <span>{(uploadedFile.size / 1024).toFixed(0)} KB</span>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
                  title="Xóa file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* File extract error */}
            {extractError && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-[11px] flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span>{extractError}</span>
              </div>
            )}

            {/* Preview extracted text */}
            {extractedText && (
              <details className="group">
                <summary className="text-[11px] text-amber-700 font-semibold cursor-pointer hover:text-amber-900 transition-colors select-none">
                  📄 Xem trước nội dung trích xuất ({extractedText.length.toLocaleString()} ký tự)
                </summary>
                <div className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap font-mono">
                  {extractedText.slice(0, 1500)}{extractedText.length > 1500 ? '\n\n... (đã rút gọn)' : ''}
                </div>
              </details>
            )}
          </div>

          {/* Error display */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold">Chưa tạo được câu lệnh: </span>
                <span>{errorMsg}</span>
                {!hasApiKey && (
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={onOpenApiKeyModal}
                      className="underline font-bold text-rose-900 hover:text-rose-700"
                    >
                      Bấm vào đây để nhập API Key Google AI miễn phí
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Submit CTA */}
          <div className="pt-2 flex items-center justify-between gap-3 flex-wrap">
            <div className="text-[11px] text-slate-500">
              {extractedText 
                ? `📎 File "${uploadedFile?.name}" đã sẵn sàng • Nội dung bài học sẽ được gửi kèm cho AI`
                : '* Tích hợp tự động Fallback model chống quá tải 503'}
            </div>

            <button
              type="submit"
              disabled={isLoading || (!lessonName.trim() && !extractedText.trim())}
              className="px-6 py-3 rounded-2xl bg-linear-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-black text-xs sm:text-sm transition-all shadow-md shadow-amber-500/30 flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{progressStatus || 'Đang soạn câu lệnh...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-yellow-200" />
                  <span>Soạn Bộ 4 Câu Lệnh Bằng AI</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Result Cards Display */}
      {generatedCommands && generatedCommands.length > 0 && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between px-2 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌻</span>
              <h3 className="text-base font-extrabold text-slate-900">
                Bộ Câu Lệnh Sư Phạm Cho Tiết: <span className="text-amber-700">"{lessonName}"</span>
              </h3>
            </div>
            <div className="flex items-center gap-2">
              {modelUsed && (
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  Sinh bởi {modelUsed}
                </span>
              )}
              {uploadedFile && (
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  📎 Từ file: {uploadedFile.name}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {generatedCommands.map((cmd, idx) => {
              const fullSpeechText = `${cmd.teacherCall}. ${cmd.studentResponse}`;
              return (
                <div
                  key={cmd.id || idx}
                  className="bg-white rounded-3xl p-5 border-2 border-amber-200/80 hover:border-amber-400 transition-all shadow-xs hover:shadow-md space-y-3 relative flex flex-col justify-between"
                >
                  {/* Card Header: Stage badge */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-white shadow-2xs">
                      Giai đoạn: {cmd.activityStage}
                    </span>
                    <div className="flex items-center gap-1">
                      {onNavigateToVoiceLab && (
                        <button
                          onClick={() => onNavigateToVoiceLab(cmd.id)}
                          title="Luyện phát âm câu này trong Voice Lab"
                          className="p-1.5 rounded-lg text-purple-400 hover:text-purple-700 hover:bg-purple-50 transition-colors"
                        >
                          <Mic className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleCopy(cmd.id, `${cmd.teacherCall} -> ${cmd.studentResponse} (${cmd.vietnameseTranslation})`)}
                        title="Sao chép câu lệnh"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        {copiedId === cmd.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Teacher Call */}
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                      Cô hô (Teacher Call):
                    </div>
                    <div className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug">
                      "{cmd.teacherCall}"
                    </div>
                    {cmd.callIpa && (
                      <div className="text-xs font-mono text-amber-700 font-medium">
                        {cmd.callIpa}
                      </div>
                    )}
                  </div>

                  {/* Student Response */}
                  <div className="space-y-1 bg-amber-50/60 p-3 rounded-2xl border border-amber-100">
                    <div className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                      Trò đáp (Student Response):
                    </div>
                    <div className="text-sm font-extrabold text-slate-800">
                      "{cmd.studentResponse}"
                    </div>
                    <div className="text-xs text-slate-600 pt-1 border-t border-amber-200/40">
                      Nghĩa: {cmd.vietnameseTranslation}
                    </div>
                  </div>

                  {/* TPR Gesture Suggestion */}
                  <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 flex items-start gap-2">
                    <HandMetal className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800">Cử chỉ TPR: </span>
                      <span>{cmd.tprSuggestion}</span>
                    </div>
                  </div>

                  {/* Voice buttons */}
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => handlePlayVoice(cmd.id, fullSpeechText, 1.0)}
                      className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${playingId === `${cmd.id}-1` ? 'animate-bounce text-amber-600' : ''}`} />
                      <span>Nghe mẫu 1.0x</span>
                    </button>
                    <button
                      onClick={() => handlePlayVoice(cmd.id, fullSpeechText, 0.7)}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1 transition-colors"
                    >
                      <span>0.7x (Chậm)</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

