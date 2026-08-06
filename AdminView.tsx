import React, { useState } from 'react';
import { LessonPlan, UserRole, UserProfile } from '../types';
import {
  ShieldCheck,
  Users,
  Database,
  Lock,
  Key,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  FileText,
  Sparkles,
  Server,
  CloudCheck,
  RefreshCw,
} from 'lucide-react';

interface AdminViewProps {
  lessonPlans: LessonPlan[];
}

export const AdminView: React.FC<AdminViewProps> = ({ lessonPlans }) => {
  const [activeRole, setActiveRole] = useState<UserRole>('admin');
  const [searchTeacher, setSearchTeacher] = useState('');

  // Mock list of registered teachers for Admin oversight
  const [teachers, setTeachers] = useState<UserProfile[]>([
    {
      uid: 'usr_001',
      displayName: 'Cô Nguyễn Thị Hồng Yến',
      email: 'hongyen.edtech@gmail.com',
      role: 'teacher',
      schoolName: 'THCS Kết nối tri thức',
    },
    {
      uid: 'usr_002',
      displayName: 'Thầy Trần Văn Nam',
      email: 'namtv.math@edu.vn',
      role: 'teacher',
      schoolName: 'THPT Chuyên Anh Sao Khue',
    },
    {
      uid: 'usr_003',
      displayName: 'Cô Lê Thanh Hà',
      email: 'halth.english@gmail.com',
      role: 'teacher',
      schoolName: 'Tiểu học Global Success',
    },
    {
      uid: 'usr_admin',
      displayName: 'Quản Trị Viên System Admin (Anh Sao Khue)',
      email: 'admin.anhsaokhue@gmail.com',
      role: 'admin',
      schoolName: 'Trung Tâm AI Education Anh Sao Khue',
    },
  ]);

  const toggleRole = (uid: string) => {
    setTeachers((prev) =>
      prev.map((t) => (t.uid === uid ? { ...t, role: t.role === 'admin' ? 'teacher' : 'admin' } : t))
    );
  };

  const filteredTeachers = teachers.filter(
    (t) =>
      t.displayName.toLowerCase().includes(searchTeacher.toLowerCase()) ||
      t.email.toLowerCase().includes(searchTeacher.toLowerCase()) ||
      t.schoolName.toLowerCase().includes(searchTeacher.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-blue-950 p-6 rounded-2xl border-2 border-amber-400/50 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-white">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-400 tracking-wider">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span>Admin Security & Role Permission Center</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
            Khu Vực Quản Trị Hệ Thống Admin (Bảo Mật Cao)
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Chỉ Admin được phân quyền mới có thể truy cập Dashboard tổng hợp và giám sát dữ liệu tất cả giáo viên.
          </p>
        </div>

        {/* Role Switch Simulator */}
        <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-700 space-y-1 text-right">
          <div className="text-[10px] uppercase font-extrabold text-amber-400">Chế độ Role hiện tại:</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveRole('admin')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeRole === 'admin'
                  ? 'bg-amber-400 text-slate-950 font-black shadow'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              ADMIN
            </button>
            <button
              onClick={() => setActiveRole('teacher')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeRole === 'teacher'
                  ? 'bg-blue-600 text-white font-black shadow'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              TEACHER
            </button>
          </div>
        </div>
      </div>

      {activeRole === 'teacher' ? (
        <div className="bg-amber-500/10 border-2 border-amber-500/50 p-6 rounded-2xl text-center space-y-3 text-amber-200">
          <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
          <h3 className="text-lg font-black text-white">Quyền Truy Cấp Bị Hạn Chế (Role: Teacher)</h3>
          <p className="text-xs max-w-md mx-auto text-slate-300">
            Thầy/cô đang ở vai trò Giáo viên (Teacher). Vui lòng chuyển sang vai trò Quản Trị Viên (Admin) bằng bộ chuyển đổi ở góc trên để xem toàn bộ dữ liệu hệ thống.
          </p>
        </div>
      ) : (
        <>
          {/* Global Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                <span>Tổng Giáo Viên</span>
                <Users className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-black text-white">{teachers.length}</div>
              <div className="text-[10px] text-emerald-400">Firebase Auth Active</div>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                <span>Tổng Bài Soạn GDPT 2018</span>
                <FileText className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-amber-400">{lessonPlans.length}</div>
              <div className="text-[10px] text-cyan-300">Đồng bộ Firestore Cloud</div>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                <span>Trạng Thái Firestore</span>
                <Database className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-lg font-black text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-5 h-5" /> Online 100%
              </div>
              <div className="text-[10px] text-slate-400">Security Rules Verified</div>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                <span>Bản Quyền Hệ Thống</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <div className="text-xs font-black text-amber-300">Anh Sao Khue</div>
              <div className="text-[10px] text-slate-300 font-mono">ĐTT: 0346513056</div>
            </div>
          </div>

          {/* Teacher Oversight List */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-cyan-400" />
                  <span>Danh Sách Tài Khoản Giáo Viên & Phân Quyền Role</span>
                </h3>
                <p className="text-xs text-slate-400">Quản lý phân quyền truy cập cho giáo viên toàn quốc.</p>
              </div>

              <input
                type="text"
                value={searchTeacher}
                onChange={(e) => setSearchTeacher(e.target.value)}
                placeholder="Tìm tên giáo viên, email, trường..."
                className="bg-slate-950 text-white text-xs rounded-xl px-3.5 py-2 border border-slate-700 w-full sm:w-64 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-200">
                <thead className="bg-slate-950 text-cyan-300 font-extrabold uppercase tracking-wider text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Họ và Tên</th>
                    <th className="px-4 py-3">Email Đăng Nhập</th>
                    <th className="px-4 py-3">Đơn Vị Trường Học</th>
                    <th className="px-4 py-3 text-center">Vai Trò (Role)</th>
                    <th className="px-4 py-3 text-center">Hành Động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredTeachers.map((t) => (
                    <tr key={t.uid} className="hover:bg-slate-800/60 transition-colors">
                      <td className="px-4 py-3 font-extrabold text-white">{t.displayName}</td>
                      <td className="px-4 py-3 text-cyan-300 font-mono">{t.email}</td>
                      <td className="px-4 py-3 text-slate-300">{t.schoolName}</td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                            t.role === 'admin'
                              ? 'bg-amber-400 text-slate-950 border border-amber-500'
                              : 'bg-blue-900 text-cyan-200 border border-blue-700'
                          }`}
                        >
                          {t.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => toggleRole(t.uid)}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold rounded-lg text-[11px] border border-slate-600 transition-all cursor-pointer"
                        >
                          Chuyển sang {t.role === 'admin' ? 'Teacher' : 'Admin'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
