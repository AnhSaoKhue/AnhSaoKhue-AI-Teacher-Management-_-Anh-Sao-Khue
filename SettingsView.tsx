import React, { useState } from 'react';
import {
  Settings,
  Phone,
  Volume2,
  VolumeX,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Database,
  HardDrive,
  User,
  School,
  FileCheck,
  HelpCircle,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [teacherName, setTeacherName] = useState('Cô Nguyễn Thị Hồng Yến');
  const [schoolName, setSchoolName] = useState('THCS Kết Nối Tri Thức');
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [autoSaveCloud, setAutoSaveCloud] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 p-6 rounded-2xl border-2 border-cyan-500/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-white">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-400 tracking-wider">
            <Settings className="w-5 h-5 text-amber-400" />
            <span>AI Education Platform — Settings & Configuration</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-cyan-200 tracking-tight mt-1">
            Cài Đặt Hệ Thống & Bản Quyền
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Tùy chỉnh thông tin giáo viên, âm thanh cảnh báo bài soạn, đồng bộ Cloud Firebase & thông tin liên hệ bản quyền.
          </p>
        </div>

        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 px-4 py-2.5 rounded-xl font-black text-xs text-center shadow-lg border border-amber-300/40">
          <div>BẢN QUYỀN CHÍNH THỨC</div>
          <div className="text-sm tracking-wider">Anh Sao Khue — 0346513056</div>
        </div>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-500/20 border-2 border-emerald-500 p-4 rounded-xl text-emerald-200 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Đã lưu thành công các tùy chỉnh cài đặt hệ thống!</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Profile Card */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-extrabold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4 text-amber-400" />
            <span>1. Thông Tin Giáo Viên & Đơn Vị Công Tác</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Họ và Tên Giáo Viên:
              </label>
              <input
                type="text"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-700 focus:outline-none focus:border-cyan-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Tên Trường / Đơn vị giảng dạy:
              </label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-700 focus:outline-none focus:border-cyan-400"
                required
              />
            </div>
          </div>
        </div>

        {/* Audio & AI Warning Configuration */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-extrabold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-amber-400" />
            <span>2. Tương Tác Âm Thanh & Cảnh Báo AI</span>
          </h3>

          <div className="space-y-3">
            <label className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
              <div className="space-y-0.5">
                <div className="text-xs font-extrabold text-white flex items-center gap-2">
                  <span>Âm thanh cảnh báo bài soạn thiếu mục tiêu / sai cấu trúc 5512</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Hệ thống tự động phát âm thanh chuông báo nếu bài soạn chưa đạt chuẩn hoặc thiếu nội dung trọng tâm.
                </div>
              </div>
              <input
                type="checkbox"
                checked={soundAlerts}
                onChange={(e) => setSoundAlerts(e.target.checked)}
                className="w-5 h-5 accent-amber-400 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
              <div className="space-y-0.5">
                <div className="text-xs font-extrabold text-white flex items-center gap-2">
                  <span>Tự động đồng bộ bài soạn lên Firebase Cloud Database</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Đảm bảo bài soạn không bị mất dữ liệu ngay cả khi chuyển đổi máy tính hoặc trình duyệt.
                </div>
              </div>
              <input
                type="checkbox"
                checked={autoSaveCloud}
                onChange={(e) => setAutoSaveCloud(e.target.checked)}
                className="w-5 h-5 accent-cyan-400 cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* System & Licensing Card */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-extrabold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>3. Thông Tin Bản Quyền & Hỗ Trợ Kỹ Thuật 24/7</span>
          </h3>

          <div className="bg-gradient-to-r from-blue-950 to-indigo-950 p-4 rounded-xl border border-cyan-500/30 space-y-2 text-xs text-slate-200">
            <div className="font-extrabold text-amber-300 text-sm">
              Sản phẩm: AI Lesson Plans - Anh Sao Khue (Phiên bản năm học 2026-2027)
            </div>
            <p>
              Nền tảng hỗ trợ Giáo viên soạn kế hoạch bài dạy chuẩn CV 5512 cho tất cả môn học từ Lớp 1 đến Lớp 12, bộ sách Kết nối tri thức với cuộc sống & Tiếng Anh Global Success.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-cyan-300">
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Số điện thoại / Zalo hỗ trợ: 0346513056</span>
              </div>
              <div>Bản quyền tác giả: Anh Sao Khue</div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer transform active:scale-95"
          >
            Lưu Cài Đặt Hệ Thống
          </button>
        </div>
      </form>
    </div>
  );
};
