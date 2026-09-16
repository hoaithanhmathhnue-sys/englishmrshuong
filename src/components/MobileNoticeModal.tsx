import React from 'react';
import { Smartphone, ExternalLink, CheckCircle2, AlertTriangle, X, Copy, Check } from 'lucide-react';

interface MobileNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNoticeModal: React.FC<MobileNoticeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeInUp">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border-2 border-amber-300 relative space-y-5 overflow-hidden">
        {/* Background decorative flower */}
        <div className="absolute -right-8 -top-8 text-7xl opacity-15 pointer-events-none select-none">
          🌻
        </div>

        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-amber-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl shrink-0 text-amber-700 shadow-xs">
              📱
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Vận Hành & Kỹ Thuật
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-800 leading-tight mt-1">
                Lưu Ý Quan Trọng Khi Dùng Điện Thoại
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Box */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 sm:p-5 space-y-3">
          <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
            Khi thầy cô nhận đường link Web App qua <span className="text-blue-600 font-black">Zalo / Facebook</span> trên điện thoại, vui lòng thực hiện thao tác:
          </p>

          {/* Steps */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-amber-200 shadow-xs">
              <div className="w-6 h-6 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-700">
                <span className="font-bold text-slate-900">Nhấn giữ</span> vào đường link Web App.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-amber-200 shadow-xs">
              <div className="w-6 h-6 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-700">
                Chọn <span className="font-bold text-blue-600">"Mở bằng trình duyệt"</span> (Open in Browser — Chrome trên Android / Safari trên iPhone).
              </div>
            </div>
          </div>
        </div>

        {/* Reason */}
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-2xl p-3.5">
          <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs text-blue-900 leading-relaxed">
            <strong>Lý do kỹ thuật:</strong> Trình duyệt web chuẩn (Chrome/Safari) sẽ cấp quyền Microphone toàn diện giúp tính năng <span className="font-bold">ghi âm và phân tích phát âm Voice AI</span> hoạt động mượt mà, không bị chặn tính năng âm thanh như trong trình duyệt nhúng của Zalo.
          </div>
        </div>

        {/* Copy Link Button */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
          <button
            onClick={handleCopyLink}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Đã sao chép liên kết!' : 'Sao chép link web app để mở'}</span>
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-bold transition-all"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
};
