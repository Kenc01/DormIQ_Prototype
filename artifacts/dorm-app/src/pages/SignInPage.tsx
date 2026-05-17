import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";

interface SignInPageProps {
  onSignIn: () => void;
  onGoSignUp: () => void;
}

export default function SignInPage({ onSignIn, onGoSignUp }: SignInPageProps) {
  const [email, setEmail] = useState("student@jrmsu.edu.ph");
  const [password, setPassword] = useState("DormIQ2024");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);

  const handleSignIn = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onSignIn(); }, 1200);
  };

  return (
    <div className="min-h-full flex flex-col" style={{ background: "#f0f4f8" }}>

      {/* ── Hero ── */}
      <div
        className="relative flex flex-col items-center text-center px-6"
        style={{
          background: "linear-gradient(150deg, #016b78 0%, #028090 45%, #02b490 100%)",
          paddingTop: 32,
          paddingBottom: 60,
          overflow: "hidden",
        }}
      >
        {/* Decorative rings */}
        <div style={{
          position: "absolute", top: -60, right: -60,
          width: 200, height: 200, borderRadius: "50%",
          border: "40px solid rgba(255,255,255,0.05)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: 30, left: -50,
          width: 140, height: 140, borderRadius: "50%",
          border: "28px solid rgba(255,255,255,0.05)",
          pointerEvents: "none",
        }} />

        {/* Logo pill */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          background: "rgba(255,255,255,0.15)",
          borderRadius: 100,
          padding: "8px 20px 8px 8px",
          border: "1px solid rgba(255,255,255,0.22)",
          backdropFilter: "blur(6px)",
          marginBottom: 22,
        }}>
          {/* Pin icon */}
          <div style={{
            width: 38, height: 38, borderRadius: "50%",
            background: "white",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            flexShrink: 0,
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style={{ width: 24, height: 24 }}>
              <path d="M50 4C29 4 12 21 12 42C12 60.5 50 96 50 96C50 96 88 60.5 88 42C88 21 71 4 50 4Z" fill="#028090" />
              <text x="50" y="53" fontFamily="Arial,Helvetica,sans-serif" fontSize="30" fontWeight="900"
                fill="white" textAnchor="middle" letterSpacing="-1">IQ</text>
            </svg>
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, color: "white", letterSpacing: "-0.3px" }}>DormIQ</span>
        </div>

        <h1 style={{
          fontSize: 24, fontWeight: 800, color: "white",
          letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 0,
        }}>
          Your Smart Dorm Finder
        </h1>

        {/* Wave */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 48, overflow: "hidden",
        }}>
          <svg viewBox="0 0 390 48" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
            <path d="M0,48 C80,10 180,0 260,20 C310,32 350,10 390,0 L390,48 Z" fill="#f0f4f8" />
          </svg>
        </div>
      </div>

      {/* ── Card ── */}
      <div style={{ flex: 1, padding: "0 18px 24px", marginTop: -8 }}>
        <div style={{
          background: "white",
          borderRadius: 28,
          padding: "28px 22px 26px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.04), 0 12px 40px rgba(2,128,144,0.09)",
        }}>

          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: 26 }}>
            <h2 style={{
              fontSize: 24, fontWeight: 800, color: "#0f172a",
              letterSpacing: "-0.5px", marginBottom: 6,
            }}>
              Welcome back 👋
            </h2>
            <p style={{ fontSize: 13.5, color: "#94a3b8", fontWeight: 500 }}>
              Sign in to your student account
            </p>
          </div>

          {/* Email Field */}
          <div style={{ marginBottom: 14 }}>
            <label style={{
              display: "block", fontSize: 11, fontWeight: 700,
              color: emailFocused ? "#028090" : "#94a3b8",
              textTransform: "uppercase", letterSpacing: "0.08em",
              marginBottom: 7, transition: "color 0.2s",
            }}>
              School Email
            </label>
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              background: emailFocused ? "#f0fdf9" : "#f8fafc",
              borderRadius: 14,
              border: emailFocused ? "2px solid #028090" : "2px solid #e8f0f2",
              padding: "13px 16px",
              transition: "all 0.2s ease",
              boxShadow: emailFocused ? "0 0 0 4px rgba(2,128,144,0.08)" : "none",
            }}>
              <Mail style={{
                width: 17, height: 17, flexShrink: 0,
                color: emailFocused ? "#028090" : "#cbd5e1",
                transition: "color 0.2s",
              }} />
              <input
                type="email" value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                placeholder="you@jrmsu.edu.ph"
                style={{
                  flex: 1, background: "none", border: "none", outline: "none",
                  fontSize: 14, color: "#0f172a", fontWeight: 500,
                }}
              />
            </div>
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: 10 }}>
            <label style={{
              display: "block", fontSize: 11, fontWeight: 700,
              color: passFocused ? "#028090" : "#94a3b8",
              textTransform: "uppercase", letterSpacing: "0.08em",
              marginBottom: 7, transition: "color 0.2s",
            }}>
              Password
            </label>
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              background: passFocused ? "#f0fdf9" : "#f8fafc",
              borderRadius: 14,
              border: passFocused ? "2px solid #028090" : "2px solid #e8f0f2",
              padding: "13px 16px",
              transition: "all 0.2s ease",
              boxShadow: passFocused ? "0 0 0 4px rgba(2,128,144,0.08)" : "none",
            }}>
              <Lock style={{
                width: 17, height: 17, flexShrink: 0,
                color: passFocused ? "#028090" : "#cbd5e1",
                transition: "color 0.2s",
              }} />
              <input
                type={showPass ? "text" : "password"} value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setPassFocused(true)}
                onBlur={() => setPassFocused(false)}
                placeholder="Your password"
                style={{
                  flex: 1, background: "none", border: "none", outline: "none",
                  fontSize: 14, color: "#0f172a", fontWeight: 500,
                }}
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 4, lineHeight: 0 }}>
                {showPass
                  ? <EyeOff style={{ width: 16, height: 16, color: "#94a3b8" }} />
                  : <Eye style={{ width: 16, height: 16, color: "#94a3b8" }} />}
              </button>
            </div>
          </div>

          {/* Forgot */}
          <div style={{ textAlign: "right", marginBottom: 22 }}>
            <button style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 12.5, color: "#028090", fontWeight: 700,
            }}>
              Forgot password?
            </button>
          </div>

          {/* Demo chip */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "linear-gradient(135deg, rgba(2,128,144,0.08), rgba(2,180,144,0.08))",
            border: "1px solid rgba(2,128,144,0.18)",
            borderRadius: 100, padding: "6px 14px",
            marginBottom: 16, width: "100%", justifyContent: "center",
          }}>
            <span style={{ fontSize: 10, color: "#028090", fontWeight: 700, letterSpacing: "0.04em" }}>
              ✦ DEMO MODE
            </span>
            <span style={{ fontSize: 10, color: "#64748b", fontWeight: 500 }}>
              Credentials are pre-filled
            </span>
          </div>

          {/* Sign In button */}
          <button
            onClick={handleSignIn}
            disabled={loading}
            style={{
              width: "100%", border: "none", cursor: loading ? "default" : "pointer",
              background: loading
                ? "linear-gradient(135deg, #5ba8b0, #5dcfb0)"
                : "linear-gradient(135deg, #028090 0%, #02b490 100%)",
              color: "white", fontSize: 15, fontWeight: 800,
              padding: "16px 0", borderRadius: 16, letterSpacing: "0.01em",
              boxShadow: loading ? "none" : "0 4px 6px rgba(2,128,144,0.2), 0 10px 28px rgba(2,128,144,0.28)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "all 0.2s ease", marginBottom: 14,
            }}
            onMouseDown={e => { e.currentTarget.style.transform = "scale(0.985)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(2,128,144,0.3)"; }}
            onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 6px rgba(2,128,144,0.2), 0 10px 28px rgba(2,128,144,0.28)"; }}
          >
            {loading ? (
              <>
                <svg className="animate-spin" style={{ width: 18, height: 18 }} viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.35)" strokeWidth="3" />
                  <path d="M4 12a8 8 0 018-8v8z" fill="white" />
                </svg>
                Signing in…
              </>
            ) : (
              <>
                Sign In
                <ArrowRight style={{ width: 18, height: 18 }} />
              </>
            )}
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div style={{ flex: 1, height: 1, background: "#f1f5f9" }} />
            <span style={{ fontSize: 11.5, color: "#cbd5e1", fontWeight: 600 }}>or</span>
            <div style={{ flex: 1, height: 1, background: "#f1f5f9" }} />
          </div>

          {/* Create account */}
          <button
            onClick={onGoSignUp}
            style={{
              width: "100%", cursor: "pointer",
              background: "transparent",
              border: "2px solid #e2ecee",
              color: "#028090", fontSize: 15, fontWeight: 700,
              padding: "15px 0", borderRadius: 16,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "#028090";
              e.currentTarget.style.background = "rgba(2,128,144,0.04)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "#e2ecee";
              e.currentTarget.style.background = "transparent";
            }}
            onMouseDown={e => (e.currentTarget.style.transform = "scale(0.985)")}
            onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            Create a Free Account
          </button>
        </div>

        <p style={{
          textAlign: "center", fontSize: 11.5, color: "#b0bec5",
          marginTop: 16, fontWeight: 500,
        }}>
          Free for all students · No subscription needed
        </p>
      </div>
    </div>
  );
}
