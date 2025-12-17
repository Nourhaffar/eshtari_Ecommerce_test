import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContextBase";
import { EMAIL_RE } from "./Register";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const msg = validateField(name, value);
    if (msg) setError(name, msg);
    else clearError(name);
  };
  const setError = (name, msg) => {
    setFieldErrors((prev) => ({ ...prev, [name]: msg }));
  };
  const clearError = (name) => {
    setFieldErrors((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  };

  const validateField = (name, value) => {
    const res = String(value ?? "").trim();
    switch (name) {
      case "email":
        if (!res) return "Email is required";
        if (!res.includes("@")) return "Email is invalid";
        return "";
      case "password":
        if (!res) return "Password is required";
        if (res.length < 6) return "Password must be at least 6 characters";
        return "";
      default:
        return "";
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const msg = validateField(name, value);
    if (msg) setError(name, msg);
    else clearError(name);
  };
  const validateAll = () => {
    const errs = {};
    if (!formData.email.trim()) errs.email = "Email is required.";
    else if (!EMAIL_RE.test(formData.email.trim()))
      errs.email = "Please enter a valid email.";
    if (!formData.password) errs.password = "Password is required.";
    else if (formData.password.length < 6)
      errs.password = "Password must be at least 6 characters.";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const ok = validateAll();
    if (ok) {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate("/");
      }
    }
    return;
  };
  const inputClass = (name) => `input input-bordered ${fieldErrors[name] ? "input-error" : ""}`;
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="card w-full max-w-sm shrink-0 shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit} noValidate>
          <h2 className="card-title justify-center text-2xl font-bold mb-4">Login</h2>
          
          {error && (
            <div role="alert" className="alert alert-error text-sm p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error}</span>
            </div>
          )}

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className={inputClass("email")}
              required
              value={formData.email}
              onBlur={handleOnBlur}
              onChange={handleChange}
            />
            {fieldErrors.email && (
              <label className="label">
                <span className="label-text-alt text-error">{fieldErrors.email}</span>
              </label>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className={inputClass("password")}
              required
              value={formData.password}
              onBlur={handleOnBlur}
              onChange={handleChange}
            />
            {fieldErrors.password && (
              <label className="label">
                <span className="label-text-alt text-error">{fieldErrors.password}</span>
              </label>
            )}
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : "Login"}
            </button>
          </div>
          <p className="text-center mt-4 text-sm">
            Don't have an account? <Link to="/register" className="link link-primary">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
