import React, { useState } from 'react';
import { User, School, Award, Flame, CheckCircle2, X } from 'lucide-react';
import { UserProgress } from '../types';

interface TeacherProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onSaveProfile: (name: string, school: string) => void;
}

export const TeacherProfileModal: React.FC<TeacherProfileModalProps> = ({
  isOpen,
  onClose,
  progress,
  onSaveProfile
}) => {
  const [name, setName] = useState(progress.profile.name || 'Cô Lê Thị Thu Hương');
  const [school, setSchool] = useState(progress.profile.school || 'Trường Tiểu học Lê Kim Lăng');

  React.useEffect(() => {
    if (isOpen) {
      setName(progress.profile.name || 'Cô Lê Thị Thu Hương');
      setSchool(progress.profile.school || 'Trường Tiểu học Lê Kim Lăng');
    }
  }, [isOpen, progress.profile]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(name, school);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-5 animate-scaleUp">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Hồ Sơ Giáo Viên Thành Viên
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/80 text-center">
          <div className="p-2 bg-white rounded-xl shadow-2xs">
            <div className="text-amber-500 font-black text-lg flex items-center justify-center gap-1">
              <Flame className="w-4 h-4 fill-amber-500" />
              <span>{progress.streak} ngày</span>
            </div>
            <div className="text-[11px] text-slate-500">Chuỗi học tập</div>
          </div>

          <div className="p-2 bg-white rounded-xl shadow-2xs">
            <div className="text-emerald-600 font-black text-lg flex items-center justify-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>{progress.masteredIds.length} câu</span>
            </div>
            <div className="text-[11px] text-slate-500">Đã thuần thục</div>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Họ và tên Giáo viên:
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ví dụ: Cô Lê Thị Thu Hương"
                className="w-full pl-9 pr-3 py-2.5 text-xs font-medium rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Trường Tiểu học công tác:
            </label>
            <div className="relative">
              <School className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="Ví dụ: Trường Tiểu học Chu Văn An, Hà Nội"
                className="w-full pl-9 pr-3 py-2.5 text-xs font-medium rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Thông tin này sẽ tự động xuất hiện trên Chứng chỉ số nghiệp vụ của Thầy/Cô.
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
