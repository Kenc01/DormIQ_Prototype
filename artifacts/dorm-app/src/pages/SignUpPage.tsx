import { useState } from "react";
import { Eye, EyeOff, ArrowLeft, CheckCircle2 } from "lucide-react";

interface SignUpPageProps {
  onGoSignIn: () => void;
  onSignUp: () => void;
}

export default function SignUpPage({ onGoSignIn, onSignUp }: SignUpPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSignUp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      setTimeout(() => onSignUp(), 1800);
    }, 1400);
  };

  if (done) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center px-8 bg-white">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-9 h-9 text-green-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">Account Created!</h2>
        <p className="text-sm text-gray-500 text-center">
          Welcome to DormIQ. Taking you to the app…
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#028090] to-[#02C39A] px-6 pt-10 pb-8">
        <button onClick={onGoSignIn} className="flex items-center gap-1.5 text-white/80 text-sm mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Sign In
        </button>
        <h1 className="text-2xl font-black text-white">Create Account</h1>
        <p className="text-white/70 text-xs mt-1">
          Join thousands of JRMSU students on DormIQ
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pt-6 pb-8 space-y-4">

        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:border-[#028090] focus:ring-2 focus:ring-[#028090]/20 transition"
            placeholder="Juan dela Cruz"
          />
        </div>

        {/* School Email */}
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

        {/* Student ID */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Student ID Number
          </label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:border-[#028090] focus:ring-2 focus:ring-[#028090]/20 transition"
            placeholder="e.g. 2021-XXXXX"
          />
          <p className="text-[10px] text-gray-400">
            Used only to verify you're an enrolled student. Never stored or shared.
          </p>
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
              placeholder="Create a strong password"
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

        {/* Privacy notice */}
        <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
          <p className="text-[11px] text-gray-500 leading-relaxed">
            By signing up, you agree to DormIQ's Terms of Service. Your personal data is protected under 
            RA 10173 (Data Privacy Act of 2012). Student IDs are used for verification only.
          </p>
        </div>

        {/* Sign Up button */}
        <button
          onClick={handleSignUp}
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#028090] to-[#02C39A] text-white font-bold py-3.5 rounded-xl shadow-md active:scale-[0.98] transition-transform disabled:opacity-70"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Creating account...
            </span>
          ) : "Create Account — It's Free"}
        </button>

        <p className="text-center text-xs text-gray-500">
          Already have an account?{" "}
          <button onClick={onGoSignIn} className="text-[#028090] font-semibold">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
