import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import "./App.css";

/**
 * Lendrop — Auth screen (Login / Sign up / Forgot password)
 * -----------------------------------------------------------
 * Connected to Supabase Auth:
 *  - signUp()               -> creates the user (DB trigger copies it into "profiles")
 *  - signInWithPassword()   -> logs the user in
 *  - resetPasswordForEmail()-> sends a password reset link
 *  - getSession() + onAuthStateChange() -> keeps the UI in sync with the real session
 *  - signOut()               -> logs the user out
 */
export default function App() {
  const [mode, setMode] = useState("login"); // "login" | "signup" | "forgot"
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" }); // type: "error" | "success"
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // --- Session state ---------------------------------------------------
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // true while we check if there's already a session

  useEffect(() => {
    // 1. On first load, ask Supabase if there's already a logged-in session
    //    (it's stored in the browser, so a page refresh doesn't log you out).
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });

    // 2. Keep listening: this fires automatically after signUp, signInWithPassword,
    //    signOut, etc., so "session" always reflects the real auth state.
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
      // No need to set a success message here: onAuthStateChange updates
      // "session" and the UI switches to the logged-in view automatically.
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
            // Still checking if there's a session saved in the browser
            <p className="ld-loading">Loading...</p>
          ) : session ? (
            // --- LOGGED IN VIEW -------------------------------------
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
            // --- FORGOT PASSWORD VIEW --------------------------------
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
            // --- LOGIN / SIGN UP VIEW --------------------------------
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