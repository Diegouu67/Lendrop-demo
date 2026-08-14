import { useState } from "react";

/**
 * Lendrop — Access screen (Login / Create account)
 * -----------------------------------------------------
 * This component does NOT have backend logic yet.
 * The next step will be connecting handleSubmit to Supabase
 * (supabase.auth.signInWithPassword / supabase.auth.signUp).
 */
export default function App() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect Supabase here in the next step.
    console.log(mode === "login" ? "Log in with:" : "Create account with:", form);
  };

  const switchMode = () => {
    setMode((m) => (m === "login" ? "signup" : "login"));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap');

        .ld-page * { box-sizing: border-box; }

        .ld-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #FAFAFA;
          background-image:
            radial-gradient(rgba(165,140,244,0.16) 1.6px, transparent 1.6px);
          background-size: 22px 22px;
          font-family: 'Manrope', sans-serif;
          padding: 24px;
        }

        .ld-card {
          width: 100%;
          max-width: 400px;
          background: #FFFFFF;
          border-radius: 20px;
          padding: 40px 32px 32px;
          box-shadow: 0 24px 60px rgba(13,13,13,0.09), 0 2px 8px rgba(13,13,13,0.04);
          border: 1px solid rgba(13,13,13,0.05);
        }

        .ld-brand { text-align: center; margin-bottom: 26px; }

        .ld-logo {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 27px;
          color: #433075;
          letter-spacing: -0.02em;
          margin: 0 0 6px;
        }

        .ld-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 500;
          font-size: 10.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #8A7FB0;
        }

        .ld-tabs {
          position: relative;
          display: flex;
          background: #F1EEFB;
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 26px;
        }

        .ld-tab-indicator {
          position: absolute;
          top: 4px;
          bottom: 4px;
          left: 4px;
          width: calc(50% - 4px);
          background: #433075;
          border-radius: 9px;
          box-shadow: 0 4px 14px rgba(67,48,117,0.28);
          transition: transform 0.28s cubic-bezier(0.65, 0, 0.35, 1);
          transform: translateX(0%);
        }

        .ld-tabs[data-mode="signup"] .ld-tab-indicator {
          transform: translateX(100%);
        }

        .ld-tab {
          position: relative;
          z-index: 1;
          flex: 1;
          border: none;
          background: transparent;
          padding: 10px 0;
          font-family: 'Manrope', sans-serif;
          font-weight: 700;
          font-size: 13.5px;
          color: #6E6580;
          cursor: pointer;
          border-radius: 9px;
          transition: color 0.2s ease;
        }

        .ld-tab.is-active { color: #FFFFFF; }

        .ld-form { display: flex; flex-direction: column; gap: 15px; }

        .ld-field { display: flex; flex-direction: column; gap: 6px; }

        .ld-label {
          font-size: 12px;
          font-weight: 600;
          color: #0D0D0D;
        }

        .ld-input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 10px;
          border: 1.5px solid #E5E1F0;
          font-size: 14px;
          font-family: 'Manrope', sans-serif;
          color: #0D0D0D;
          background: #FCFCFD;
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .ld-input::placeholder { color: #B7B0C9; }

        .ld-input:focus {
          border-color: #A58CF4;
          box-shadow: 0 0 0 3.5px rgba(165,140,244,0.22);
        }

        .ld-password-wrap { position: relative; }

        .ld-eye {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          border: none;
          background: transparent;
          color: #433075;
          font-family: 'Manrope', sans-serif;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .ld-eye:focus-visible,
        .ld-tab:focus-visible,
        .ld-submit:focus-visible,
        .ld-link:focus-visible {
          outline: 2.5px solid #A58CF4;
          outline-offset: 2px;
        }

        .ld-forgot-row { display: flex; justify-content: flex-end; margin-top: -6px; }

        .ld-link {
          border: none;
          background: transparent;
          color: #433075;
          font-family: 'Manrope', sans-serif;
          font-weight: 700;
          font-size: 12.5px;
          cursor: pointer;
          padding: 0;
        }

        .ld-submit {
          margin-top: 6px;
          padding: 13px 0;
          border: none;
          border-radius: 10px;
          background: #433075;
          color: #FFFFFF;
          font-family: 'Manrope', sans-serif;
          font-weight: 700;
          font-size: 14.5px;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.1s ease;
        }

        .ld-submit:hover { background: #52408c; }
        .ld-submit:active { transform: scale(0.99); }

        .ld-switch {
          text-align: center;
          margin: 22px 0 0;
          font-size: 13px;
          color: #6E6580;
        }

        @media (prefers-reduced-motion: reduce) {
          .ld-tab-indicator, .ld-submit { transition: none; }
        }

        @media (max-width: 380px) {
          .ld-card { padding: 32px 22px 26px; }
        }
      `}</style>

      <div className="ld-page">
        <div className="ld-card">
          <div className="ld-brand">
            <p className="ld-logo">Lendrop</p>
            <p className="ld-eyebrow">Smart locker network</p>
          </div>

          <div className="ld-tabs" data-mode={mode}>
            <div className="ld-tab-indicator" />
            <button
              type="button"
              className={`ld-tab ${mode === "login" ? "is-active" : ""}`}
              onClick={() => setMode("login")}
            >
              Log in
            </button>
            <button
              type="button"
              className={`ld-tab ${mode === "signup" ? "is-active" : ""}`}
              onClick={() => setMode("signup")}
            >
              Create account
            </button>
          </div>

          <form className="ld-form" onSubmit={handleSubmit}>
            {mode === "signup" && (
              <div className="ld-field">
                <label className="ld-label" htmlFor="nombre">Full name</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  className="ld-input"
                  placeholder="Your name"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="ld-field">
              <label className="ld-label" htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                className="ld-input"
                placeholder="youremail@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="ld-field">
              <label className="ld-label" htmlFor="password">Password</label>
              <div className="ld-password-wrap">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="ld-input"
                  style={{ paddingRight: 48 }}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  className="ld-eye"
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {mode === "signup" && (
              <div className="ld-field">
                <label className="ld-label" htmlFor="confirmar">Confirm password</label>
                <input
                  id="confirmar"
                  name="confirmar"
                  type={showPassword ? "text" : "password"}
                  className="ld-input"
                  placeholder="••••••••"
                  value={form.confirmar}
                  onChange={handleChange}
                  minLength={6}
                  required
                />
              </div>
            )}

            {mode === "login" && (
              <div className="ld-forgot-row">
                <button type="button" className="ld-link">
                  Forgot your password?
                </button>
              </div>
            )}

            <button type="submit" className="ld-submit">
              {mode === "login" ? "Log in" : "Create account"}
            </button>
          </form>

          <p className="ld-switch">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button type="button" className="ld-link" onClick={switchMode}>
              {mode === "login" ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}