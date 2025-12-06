import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Strong password: 6–16, upper, lower, digit, special (@#$%?)
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%?])[A-Za-z\d@#$%?]{6,16}$/;
const API_BASE_URL = "https://netflix-backend-7e4r.onrender.com";

const LoginPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setServerError("");
  };

  const validate = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Please enter your email.";
    }

    if (!form.password.trim()) {
      newErrors.password = "Please enter your password.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    } else if (form.password.length > 16) {
      newErrors.password = "Password cannot exceed 16 characters.";
    } else if (!strongPasswordRegex.test(form.password)) {
      newErrors.password =
        "Password must include uppercase, lowercase, number & @#$%?";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setServerError("");

       const res = await axios.post(`${API_BASE_URL}/api/login`, form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", res.data.user.email);

      navigate("/dashboard");
    } catch (err) {
      if (err.response?.data?.message) {
        setServerError(err.response.data.message);
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-zinc-950 to-black text-white">
      {/* Background glows */}
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-red-700/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-purple-600/25 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,113,113,0.15),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(56,189,248,0.12),_transparent_55%)]" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-4 md:px-16">
        <div
          className="text-3xl font-extrabold tracking-[0.2em] text-red-600 drop-shadow-lg cursor-pointer"
          onClick={() => navigate("/")}
        >
          NETFLIX
        </div>
        <button className="hidden text-xs md:inline-flex rounded-full border border-zinc-700/70 bg-zinc-900/60 px-4 py-1.5 font-medium text-zinc-200 hover:border-red-500 hover:text-red-400 transition">
          Learn More
        </button>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-10 md:px-6">
        <div className="grid w-full max-w-5xl grid-cols-1 gap-10 md:grid-cols-[1.2fr_1fr] items-center">
          {/* Left hero text */}
          <section className="space-y-5 md:space-y-7 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Unlimited movies, series,{" "}
              <span className="text-red-500">and imagination.</span>
            </h1>
            <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto md:mx-0">
              This is a high-fidelity{" "}
              <span className="font-semibold text-zinc-200">
                Netflix-style login
              </span>{" "}
              built with React, Tailwind CSS, and Node.js. Login with{" "}
              <span className="text-zinc-200">any valid email</span> and a strong
              password to explore the dummy dashboard.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-zinc-400">
              <div className="rounded-full border border-zinc-700/70 bg-black/40 px-4 py-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                Live mock backend
              </div>
              <div className="rounded-full border border-zinc-700/70 bg-black/40 px-4 py-1">
                React · Tailwind · Express
              </div>
            </div>
          </section>

          {/* Right login card */}
          <section className="flex justify-center">
            <div className="w-full max-w-md rounded-2xl border border-zinc-800/70 bg-black/70 backdrop-blur-xl px-8 py-9 shadow-2xl shadow-black/60">
              <h2 className="mb-6 text-2xl font-semibold md:text-3xl">
                Sign In
              </h2>

              {serverError && (
                <div className="mb-4 rounded-md bg-red-600/80 text-xs md:text-sm px-3 py-2">
                  {serverError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div className="space-y-1">
                  <label className="text-xs text-zinc-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-md bg-zinc-900/80 border border-zinc-700 px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder-zinc-500"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <label className="text-xs text-zinc-300">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Your strong password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full rounded-md bg-zinc-900/80 border border-zinc-700 px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder-zinc-500"
                  />
                  <p className="text-[11px] text-zinc-500">
                    6–16 chars, must include A–Z, a–z, 0–9 and @#$%?
                  </p>
                  {errors.password && (
                    <p className="text-xs text-red-400">{errors.password}</p>
                  )}
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full rounded-md bg-red-600 py-3 text-sm font-semibold tracking-wide shadow-lg shadow-red-900/50 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Signing you in..." : "Sign In"}
                </button>

                {/* Options */}
                <div className="mt-2 flex items-center justify-between text-xs text-zinc-400">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      className="h-3 w-3 rounded-sm border border-zinc-600 bg-zinc-900"
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    className="hover:text-zinc-200 hover:underline"
                  >
                    Need help?
                  </button>
                </div>
              </form>

              {/* Bottom text */}
              <div className="mt-7 text-sm text-zinc-400">
  New to Netflix?{" "}
  <span className="text-zinc-300">
   
  </span>
  <p className="mt-2 text-xs text-zinc-500 leading-snug">
    Use any valid email and strong password to log in to the demo dashboard.
  </p>
</div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
