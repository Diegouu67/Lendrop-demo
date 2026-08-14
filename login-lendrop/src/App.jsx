import { useState } from "react";
import "./App.css";

/**
 * Lendrop — Access screen (Login / Create account)
 * -----------------------------------------------------
 * Aún hay que agregar la logica,en la parte de abajo se especifica de que manera y dodne
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
//IA para el backend

//acá empieza el codifo de diseño
  return (
    <>
      

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