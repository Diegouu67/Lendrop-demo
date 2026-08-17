import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import "./App.css";

export default function App() {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
    identidad: "",
  });
  const [form, setForm] = useState({
  name: "",
  email: "",
  telefono: "",
  password: "",
  confirmPassword: "",
  identidad: "",
});

const [session, setSession] = useState(null);
const [authLoading, setAuthLoading] = useState(true);
  // --- Session state ---------------------------------------------------
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });


    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg({ type: "", text: "" });

    if (mode === "signup" && form.password !== form.confirmPassword) {
      setStatusMsg({ type: "error", text: "Passwords don't match." });
      return;
    }

    setLoading(true);

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { name: form.name } },
      });

      if (error) {
        setStatusMsg({ type: "error", text: error.message });
      } else {
        setStatusMsg({ type: "success", text: "Check your email to confirm your account." });
      }
    } else if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (error) {
        setStatusMsg({ type: "error", text: error.message });
      }
      
    } else if (mode === "forgot") {
      const { error } = await supabase.auth.resetPasswordForEmail(form.email, {
        redirectTo: window.location.origin,
      });

      if (error) {
        setStatusMsg({ type: "error", text: error.message });
      } else {
        setStatusMsg({ type: "success", text: "Password reset link sent. Check your email." });
      }
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
  };

  const switchMode = () => {
    setMode((m) => (m === "login" ? "signup" : "login"));
    setStatusMsg({ type: "", text: "" });
  };

  const goToForgotPassword = () => {
    setMode("forgot");
    setStatusMsg({ type: "", text: "" });
  };

  const backToLogin = () => {
    setMode("login");
    setStatusMsg({ type: "", text: "" });
  };

  return (
    <div className="ld-page">
        <div className="ld-card">
          <div className="ld-brand">
            <p className="ld-logo">Lendrop</p>
            <p className="ld-eyebrow">Smart locker network</p>
          </div>

          {authLoading ? (

            <p className="ld-loading">Loading...</p>
          ) : session ? (

            <div>
              <p className="ld-welcome">Logged in as</p>
              <p className="ld-user-email">{session.user.email}</p>
              <button
                type="button"
                className="ld-submit"
                onClick={handleLogout}
                disabled={loading}
              >
                {loading ? "Please wait..." : "Log out"}
              </button>
            </div>
          ) : mode === "forgot" ? (

            <>
              <p className="ld-forgot-heading">Reset your password</p>
              <p className="ld-forgot-copy">Enter your email and we'll send you a reset link.</p>

              <form className="ld-form" onSubmit={handleSubmit}>
                <div className="ld-field">
                  <label className="ld-label" htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="ld-input"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="ld-submit" disabled={loading}>
                  {loading ? "Please wait..." : "Send reset link"}
                </button>
              </form>

              {statusMsg.text && (
                <p className={`ld-status ld-status--${statusMsg.type}`}>{statusMsg.text}</p>
              )}

              <p className="ld-switch">
                <button type="button" className="ld-link" onClick={backToLogin}>
                  Back to log in
                </button>
              </p>
            </>
          ) : (

            <>
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
                  Sign up
                </button>
              </div>

              <form className="ld-form" onSubmit={handleSubmit}>
                {mode === "signup" && (
                  <div className="ld-field">
                    <label className="ld-label" htmlFor="name">Full name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="ld-input"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}

                <div className="ld-field">
                  <label className="ld-label" htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="ld-input"
                    placeholder="you@example.com"
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
                    <label className="ld-label" htmlFor="confirmPassword">Confirm password</label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      className="ld-input"
                      placeholder="••••••••"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      minLength={6}
                      required
                    />
                  </div>
                )}

                {mode === "login" && (
                  <div className="ld-forgot-row">
                    <button type="button" className="ld-link" onClick={goToForgotPassword}>
                      Forgot your password?
                    </button>
                  </div>
                )}

                <button type="submit" className="ld-submit" disabled={loading}>
                  {loading ? "Please wait..." : mode === "login" ? "Log in" : "Sign up"}
                </button>
              </form>

              {statusMsg.text && (
                <p className={`ld-status ld-status--${statusMsg.type}`}>{statusMsg.text}</p>
              )}

              <p className="ld-switch">
                {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                <button type="button" className="ld-link" onClick={switchMode}>
                  {mode === "login" ? "Sign up" : "Log in"}
                </button>
              </p>
            </>
          )}
        </div>
      </div>
  );
}

    // Solo frontend por ahora.
    console.log("Create account with:", form);

  return (
    <div className="ld-page">
      <div className="ld-card">

        {/* Navigation */}
        <nav className="ld-navbar">
          <span className="ld-logo">Lendrop</span>

          <div className="ld-nav-links">
            <span>Help</span>
            <span>Contact</span>
            <span>Language</span>
          </div>
        </nav>

        {/* Main title */}
        <h1 className="ld-title">Start using Lendrop!</h1>

        {/* Registration form */}
        <form className="ld-form" onSubmit={handleSubmit}>

          {/* Personal information */}
          <h2 className="ld-section-title">
            Personal information
          </h2>

          <div className="ld-field">
            <label className="ld-label" htmlFor="nombre">
              Full name
            </label>

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

          <div className="ld-field">
            <label className="ld-label" htmlFor="telefono">
              Phone number
            </label>

            <input
              id="telefono"
              name="telefono"
              type="tel"
              className="ld-input"
              placeholder="Your phone number"
              value={form.telefono}
              onChange={handleChange}
              required
            />
          </div>

          <div className="ld-field">
            <label className="ld-label" htmlFor="email">
              Email address
            </label>

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

          {/* Security */}
          <h2 className="ld-section-title">
            Security
          </h2>

          <div className="ld-field">
            <label className="ld-label" htmlFor="password">
              Password
            </label>

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

          {/* Identity verification */}
          <h2 className="ld-section-title">
            Identity verification
          </h2>

          <div className="ld-field">
            <label className="ld-label" htmlFor="identidad">
              DUI / Passport number
            </label>

            <input
              id="identidad"
              name="identidad"
              type="text"
              className="ld-input"
              placeholder="DUI / Passport number"
              value={form.identidad}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit */}
          <button type="submit" className="ld-submit">
            Create account
          </button>

        </form>
      </div>
    </div>
  );