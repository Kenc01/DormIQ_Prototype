import { LogOut, User, Bell, Shield, Info, ChevronRight, ArrowLeft } from "lucide-react";

interface SettingsPageProps {
  onBack: () => void;
  onLogout: () => void;
}

export default function SettingsPage({ onBack, onLogout }: SettingsPageProps) {
  return (
    <div className="flex flex-col flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 pt-4 pb-4 border-b border-gray-100 flex items-center gap-3">
        <button onClick={onBack} className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-gray-800">Settings</h1>
      </div>

      {/* Profile card */}
      <div className="mx-4 mt-5 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#028090] to-[#02C39A] flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-xl">S</span>
        </div>
        <div>
          <p className="font-bold text-gray-800 text-sm">Student User</p>
          <p className="text-xs text-gray-500 mt-0.5">student@jrmsu.edu.ph</p>
          <span className="inline-block mt-1.5 text-[10px] font-semibold text-[#028090] bg-[#028090]/10 px-2 py-0.5 rounded-full">
            Verified Student
          </span>
        </div>
      </div>

      {/* Settings groups */}
      <div className="mx-4 mt-4 space-y-3">

        {/* Account */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 pt-3 pb-1">Account</p>
          <SettingsRow icon={<User className="w-4 h-4 text-[#028090]" />} label="Edit Profile" />
          <SettingsRow icon={<Bell className="w-4 h-4 text-[#028090]" />} label="Notifications" />
        </div>

        {/* About */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 pt-3 pb-1">About</p>
          <SettingsRow icon={<Shield className="w-4 h-4 text-[#028090]" />} label="Privacy Policy" />
          <SettingsRow icon={<Info className="w-4 h-4 text-[#028090]" />} label="About DormIQ" sublabel="Version 1.0.0 MVP" />
        </div>

        {/* Sign out */}
        <button
          onClick={onLogout}
          className="w-full bg-white rounded-2xl shadow-sm border border-red-100 p-4 flex items-center gap-3 active:scale-[0.98] transition-transform"
        >
          <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
            <LogOut className="w-4 h-4 text-red-500" />
          </div>
          <span className="font-semibold text-red-500 text-sm">Sign Out</span>
        </button>
      </div>

      <p className="text-center text-[10px] text-gray-300 mt-6 pb-4">
        DormIQ · Find your dorm smarter. Live better. Study harder.
      </p>
    </div>
  );
}

function SettingsRow({
  icon,
  label,
  sublabel,
}: {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
}) {
  return (
    <button className="w-full flex items-center gap-3 px-4 py-3 border-t border-gray-50 first:border-t-0 hover:bg-gray-50 active:bg-gray-100 transition-colors">
      <div className="w-8 h-8 rounded-full bg-[#028090]/10 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 text-left">
        <p className="text-sm font-medium text-gray-800">{label}</p>
        {sublabel && <p className="text-[10px] text-gray-400 mt-0.5">{sublabel}</p>}
      </div>
      <ChevronRight className="w-4 h-4 text-gray-300" />
    </button>
  );
}
