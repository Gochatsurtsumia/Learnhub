import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 3) errs.password = "Too short";
    if (mode === "register" && !form.name) errs.name = "Name is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    setErrors({});
    setServerError("");
    setLoading(true);
    try {
      const endpoint =
        mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const payload =
        mode === "login"
          ? { email: form.email, password: form.password }
          : form;
      const { data } = await api.post(endpoint, payload);
      const user = { email: form.email, role: data.role, id: data.userId };
      login(data.token, user);
      navigate("/courses");
    } catch (err) {
      setServerError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl font-bold tracking-tight">
            Learn<span className="text-violet-500">Hub</span>
          </h1>
          <p className="text-zinc-500 mt-2 text-sm">
            {mode === "login"
              ? "Welcome back — sign in to continue"
              : "Start learning today"}
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl shadow-black/50">
          <div className="flex bg-zinc-800 rounded-lg p-1 mb-6">
            {["login", "register"].map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setErrors({});
                  setServerError("");
                }}
                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors capitalize ${
                  mode === m
                    ? "bg-white text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === "register" && (
              <Input
                label="Name"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                error={errors.name}
              />
            )}
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={errors.password}
            />

            {serverError && (
              <p className="text-red-400 text-sm text-center">{serverError}</p>
            )}

            <Button type="submit" disabled={loading} className="w-full mt-2">
              {loading
                ? "Please wait..."
                : mode === "login"
                  ? "Sign in"
                  : "Create account"}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-zinc-800" />
              <span className="text-zinc-600 text-xs">or continue with</span>
              <div className="flex-1 h-px bg-zinc-800" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Google", "GitHub"].map((provider) => (
                <button
                  key={provider}
                  disabled
                  className="flex items-center justify-center gap-2 bg-zinc-800 border border-zinc-700 rounded-lg py-2 text-sm text-zinc-400 cursor-not-allowed opacity-50"
                >
                  {provider}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
