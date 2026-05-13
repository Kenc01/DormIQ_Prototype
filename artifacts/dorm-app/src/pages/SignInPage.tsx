import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface SignInPageProps {
  onSignIn: () => void;
  onGoSignUp: () => void;
}

export default function SignInPage({ onSignIn, onGoSignUp }: SignInPageProps) {
  const [email, setEmail] = useState("student@jrmsu.edu.ph");
  const [password, setPassword] = useState("DormIQ2024");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSignIn();
    }, 1200);
  };

  return (
    <div className="min-h-full flex flex-col bg-white">
      {/* Top gradient hero */}
      <div className="bg-gradient-to-br from-[#028090] to-[#02C39A] px-6 pt-12 pb-10 flex flex-col items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-12 h-12 flex-shrink-0">
            <defs>
              <linearGradient id="pinGsi" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#ffffff", stopOpacity: 0.9 }} />
                <stop offset="100%" style={{ stopColor: "#e0f7fa", stopOpacity: 0.8 }} />
              </linearGradient>
            </defs>
            <path
              d="M50 4C29.0 4 12 21.0 12 42C12 60.5 50 96 50 96C50 96 88 60.5 88 42C88 21.0 71.0 4 50 4Z"
              fill="url(#pinGsi)"
            />
            <circle cx="50" cy="40" r="26" fill="white" opacity="0.15" />
            <text
              x="50" y="53"
              fontFamily="Arial,Helvetica,sans-serif"
              fontSize="30" fontWeight="900"
              fill="#028090" textAnchor="middle" letterSpacing="-1"
            >
              IQ
            </text>
          </svg>
          <div>
            <h1 className="text-3xl font-black text-white leading-none tracking-tight">DormIQ</h1>
            <p className="text-white/80 text-[11px] font-medium mt-0.5">Find your dorm smarter.</p>
          </div>
        </div>
        <p className="text-white/70 text-xs text-center mt-2">
          The student-verified boarding house platform for JRMSU Dapitan
        </p>
      </div>

      {/* Form card */}
      <div className="flex-1 px-6 pt-8 pb-8 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Welcome back</h2>
        <p className="text-sm text-gray-500 -mt-2">Sign in to your student account</p>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            School Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:border-[#028090] focus:ring-2 focus:ring-[#028090]/20 transition"
            placeholder="you@jrmsu.edu.ph"
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Password
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:border-[#028090] focus:ring-2 focus:ring-[#028090]/20 transition"
              placeholder="Your password"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Forgot password */}
        <div className="flex justify-end">
          <button className="text-xs text-[#028090] font-semibold">Forgot password?</button>
        </div>

        {/* Demo notice */}
        <div className="bg-[#028090]/8 border border-[#028090]/20 rounded-xl px-4 py-3">
          <p className="text-xs text-[#028090] font-medium">
            Demo credentials are pre-filled — just tap <span className="font-bold">Sign In</span> to continue.
          </p>
        </div>

        {/* Sign In button */}
        <button
          onClick={handleSignIn}
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#028090] to-[#02C39A] text-white font-bold py-3.5 rounded-xl shadow-md active:scale-[0.98] transition-transform disabled:opacity-70"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Signing in...
            </span>
          ) : "Sign In"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Sign Up link */}
        <button
          onClick={onGoSignUp}
          className="w-full border-2 border-[#028090] text-[#028090] font-bold py-3.5 rounded-xl active:scale-[0.98] transition-transform"
        >
          Create an Account
        </button>

        <p className="text-center text-[11px] text-gray-400 pt-2">
          Free for all students · No subscription needed
        </p>
      </div>
    </div>
  );
}
