import { useState } from "react";
import { Eye, EyeOff, ArrowLeft, CheckCircle2, User, Mail, Hash, Lock, Shield, ArrowRight } from "lucide-react";

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

  const [focused, setFocused] = useState<string | null>(null);

  const handleSignUp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      setTimeout(() => onSignUp(), 2000);
    }, 1400);
  };

  const fields = [name, email, studentId, password];
  const filledCount = fields.filter(Boolean).length;

  if (done) {
    return (
      <div style={{
        minHeight: "100%", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: "linear-gradient(150deg, #016b78 0%, #028090 45%, #02b490 100%)",
        padding: 32, textAlign: "center",
      }}>
        <div style={{
          width: 88, height: 88, borderRadius: "50%",
          background: "rgba(255,255,255,0.15)",
          border: "2px solid rgba(255,255,255,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 22,
          boxShadow: "0 0 0 16px rgba(255,255,255,0.06)",
        }}>
          <CheckCircle2 style={{ width: 44, height: 44, color: "white" }} />
        </div>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "white", letterSpacing: "-0.5px", marginBottom: 8 }}>
          You're in! 🎉
        </h2>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", fontWeight: 500, lineHeight: 1.6 }}>
          Welcome to DormIQ.<br />Taking you to the app…
        </p>
      </div>
    );
  }

  const fieldStyle = (key: string): React.CSSProperties => ({
    display: "flex", alignItems: "center", gap: 10,
    background: focused === key ? "#f0fdf9" : "#f8fafc",
    borderRadius: 14,
    border: focused === key ? "2px solid #028090" : "2px solid #e8f0f2",
    padding: "13px 16px",
    transition: "all 0.2s ease",
    boxShadow: focused === key ? "0 0 0 4px rgba(2,128,144,0.08)" : "none",
  });

  const iconStyle = (key: string): React.CSSProperties => ({
    width: 17, height: 17, flexShrink: 0,
    color: focused === key ? "#028090" : "#cbd5e1",
    transition: "color 0.2s",
  });

  const inputStyle: React.CSSProperties = {
    flex: 1, background: "none", border: "none", outline: "none",
    fontSize: 14, color: "#0f172a", fontWeight: 500,
  };

  const labelStyle = (key: string): React.CSSProperties => ({
    display: "block", fontSize: 11, fontWeight: 700,
    color: focused === key ? "#028090" : "#94a3b8",
    textTransform: "uppercase", letterSpacing: "0.08em",
    marginBottom: 7, transition: "color 0.2s",
  });

  return (
    <div className="min-h-full flex flex-col" style={{ background: "#f0f4f8" }}>

      {/* ── Header ── */}
      <div
        className="relative flex flex-col px-5"
        style={{
          background: "linear-gradient(150deg, #016b78 0%, #028090 45%, #02b490 100%)",
          paddingTop: 36, paddingBottom: 32,
          borderBottomLeftRadius: 28, borderBottomRightRadius: 28,
        }}
      >
        {/* Decorative rings */}
        <div style={{
          position: "absolute", top: -50, right: -50,
          width: 170, height: 170, borderRadius: "50%",
          border: "35px solid rgba(255,255,255,0.05)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: -30, left: -40,
          width: 120, height: 120, borderRadius: "50%",
          border: "24px solid rgba(255,255,255,0.05)",
          pointerEvents: "none",
        }} />

        {/* Back */}
        <button
          onClick={onGoSignIn}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 100, padding: "7px 14px 7px 10px",
            color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: 600,
            cursor: "pointer", marginBottom: 18, width: "fit-content",
          }}
        >
          <ArrowLeft style={{ width: 15, height: 15 }} />
          Back
        </button>

        {/* Heading + subtitle — fully visible, no wave overlap */}
        <div style={{ textAlign: "center" }}>
          <h1 style={{
            fontSize: 26, fontWeight: 800, color: "white",
            letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 6,
          }}>
            Create Account
          </h1>
          <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>
            Join thousands of JRMSU students
          </p>
        </div>
      </div>

      {/* ── Form card ── */}
      <div style={{ flex: 1, padding: "16px 18px 24px" }}>
        <div style={{
          background: "white", borderRadius: 28,
          padding: "26px 22px 24px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.04), 0 12px 40px rgba(2,128,144,0.09)",
        }}>

          {/* Progress tracker */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 22 }}>
            {["Name", "Email", "ID", "Pass"].map((step, i) => (
              <div key={step} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{
                  height: 4, width: i < filledCount ? 28 : 20,
                  borderRadius: 100,
                  background: i < filledCount ? "#028090" : "#e2ecee",
                  transition: "all 0.3s ease",
                }} />
                <span style={{
                  fontSize: 9, fontWeight: 700,
                  color: i < filledCount ? "#028090" : "#b0bec5",
                  textTransform: "uppercase", letterSpacing: "0.06em",
                  transition: "color 0.3s",
                }}>{step}</span>
              </div>
            ))}
          </div>

          {/* Full Name */}
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle("name")}>Full Name</label>
            <div style={fieldStyle("name")}>
              <User style={iconStyle("name")} />
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                placeholder="Juan dela Cruz" style={inputStyle} />
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle("email")}>School Email</label>
            <div style={fieldStyle("email")}>
              <Mail style={iconStyle("email")} />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                placeholder="you@jrmsu.edu.ph" style={inputStyle} />
            </div>
          </div>

          {/* Student ID */}
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle("id")}>Student ID Number</label>
            <div style={fieldStyle("id")}>
              <Hash style={iconStyle("id")} />
              <input type="text" value={studentId} onChange={e => setStudentId(e.target.value)}
                onFocus={() => setFocused("id")} onBlur={() => setFocused(null)}
                placeholder="e.g. 2021-XXXXX" style={inputStyle} />
            </div>
            <p style={{ fontSize: 10.5, color: "#b0bec5", marginTop: 6, paddingLeft: 2, fontWeight: 500 }}>
              For enrollment verification only. Never stored or shared.
            </p>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle("pass")}>Password</label>
            <div style={fieldStyle("pass")}>
              <Lock style={iconStyle("pass")} />
              <input type={showPass ? "text" : "password"} value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocused("pass")} onBlur={() => setFocused(null)}
                placeholder="Create a strong password"
                style={inputStyle} />
              <button type="button" onClick={() => setShowPass(!showPass)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 4, lineHeight: 0 }}>
                {showPass
                  ? <EyeOff style={{ width: 16, height: 16, color: "#94a3b8" }} />
                  : <Eye style={{ width: 16, height: 16, color: "#94a3b8" }} />}
              </button>
            </div>
          </div>

          {/* Privacy */}
          <div style={{
            display: "flex", alignItems: "flex-start", gap: 10,
            background: "#f8fafc", border: "1.5px solid #e8f0f2",
            borderRadius: 14, padding: "12px 14px", marginBottom: 20,
          }}>
            <Shield style={{ width: 15, height: 15, color: "#028090", flexShrink: 0, marginTop: 1 }} />
            <p style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.65, fontWeight: 500 }}>
              By signing up you agree to DormIQ's Terms. Data protected under{" "}
              <span style={{ color: "#028090", fontWeight: 700 }}>RA 10173</span> — Data Privacy Act of 2012.
            </p>
          </div>

          {/* Submit */}
          <button
            onClick={handleSignUp}
            disabled={loading}
            style={{
              width: "100%", border: "none",
              cursor: loading ? "default" : "pointer",
              background: loading
                ? "linear-gradient(135deg, #5ba8b0, #5dcfb0)"
                : "linear-gradient(135deg, #028090 0%, #02b490 100%)",
              color: "white", fontSize: 15, fontWeight: 800,
              padding: "16px 0", borderRadius: 16, letterSpacing: "0.01em",
              boxShadow: loading ? "none" : "0 4px 6px rgba(2,128,144,0.2), 0 10px 28px rgba(2,128,144,0.28)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "all 0.2s ease", marginBottom: 16,
            }}
            onMouseDown={e => { e.currentTarget.style.transform = "scale(0.985)"; }}
            onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            {loading ? (
              <>
                <svg className="animate-spin" style={{ width: 18, height: 18 }} viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.35)" strokeWidth="3" />
                  <path d="M4 12a8 8 0 018-8v8z" fill="white" />
                </svg>
                Creating account…
              </>
            ) : (
              <>
                Create Account — It's Free
                <ArrowRight style={{ width: 17, height: 17 }} />
              </>
            )}
          </button>

          <p style={{ textAlign: "center", fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>
            Already have an account?{" "}
            <button onClick={onGoSignIn} style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#028090", fontWeight: 800, fontSize: 13,
            }}>
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
