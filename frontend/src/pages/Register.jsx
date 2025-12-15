import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContextBase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Register() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    telephone: "",
    password: "",
    confirm_password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});

  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const setError = (name, message) => {
    setFieldErrors((prev) => ({ ...prev, [name]: message }));
  };
  const clearError = (name) => {
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  };
  const validateAll = () => {
    const errs = {};
    if (!formData.firstname.trim()) errs.firstname = "First name is required.";
    else if (formData.firstname.trim().length < 2)
      errs.firstname = "First name must be at least 2 characters.";
    if (!formData.lastname.trim()) errs.lastname = "Last name is required.";
    else if (formData.lastname.trim().length < 2)
      errs.lastname = "Last name must be at least 2 characters.";
    if (!formData.email.trim()) errs.email = "Email is required.";
    else if (!EMAIL_RE.test(formData.email.trim()))
      errs.email = "Please enter a valid email.";

    const phone = formData.telephone.trim().replace(/\s+/g, "");
    if (!phone) errs.telephone = "Telephone is required.";
    else if (!/^\+?\d{6,15}$/.test(phone))
      errs.telephone = "Telephone should be 6-15 digits (optional +).";
    if (!formData.password) errs.password = "Password is required.";
    else if (formData.password.length < 6)
      errs.password = "Password must be at least 6 characters.";
    if (!formData.confirm_password)
      errs.confirm_password = "Please confirm your password.";
    else if (formData.password !== formData.confirm_password)
      errs.confirm_password = "Passwords do not match.";

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateField = (name, value) => {
    const v = String(value ?? "").trim();
    switch (name) {
      case "firstname":
        if (!v) return "First name is required.";
        if (v.length < 2) return "First name must be at least 2 characters.";
        return "";
      case "lastname":
        if (!v) return "Last name is required.";
        if (v.length < 2) return "Last name must be at least 2 characters.";
        return "";
      case "email":
        if (!v) return "Email is required.";
        if (!EMAIL_RE.test(v)) return "Please enter a valid email.";
        return "";
      case "telephone": {
        const phone = v.replace(/\s+/g, "");
        if (!phone) return "Telephone is required.";
        if (!/^\+?\d{6,15}$/.test(phone))
          return "Telephone should be 6-15 digits (optional +).";
        return "";
      }
      case "password":
        if (!value) return "Password is required.";
        if (String(value).length < 6)
          return "Password must be at least 6 characters.";
        if (formData.confirm_password && value !== formData.confirm_password) {
          setError("confirm_password", "Passwords do not match.");
        } else {
          clearError("confirm_password");
        }
        return "";
      case "confirm_password":
        if (!value) return "Please confirm your password.";
        if (value !== formData.password) return "Passwords do not match.";
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

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const msg = validateField(name, value);
    if (msg) setError(name, msg);
    else clearError(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = validateAll();
    if (!ok) return;
    const payload = {
      name: `${formData.firstname} ${formData.lastname}`.trim(),
      telephone: formData.telephone.trim(),
      email: formData.email.trim(),
      password: formData.password,
    };
    const success = await register(payload);
    if (success) navigate("/login");
  };

  const inputClass = (name) =>
    `input input-bordered w-full ${
      fieldErrors[name] ? "input-error" : ""
    }`;

  return (
    <div className="flex justify-center items-center py-10">
      <div className="card w-full max-w-md shrink-0 shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit} noValidate>
          <h2 className="card-title justify-center text-2xl font-bold mb-4">
            Create Account
          </h2>
          {error && (
            <div role="alert" className="alert alert-error text-sm p-3">
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                name="firstname"
                className={inputClass("firstname")}
                value={formData.firstname} //! in case badi a3mel edit lal profile 
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="given-name"
              />
              {fieldErrors.firstname && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {fieldErrors.firstname}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                name="lastname"
                className={inputClass("lastname")}
                value={formData.lastname}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="family-name"
              />
              {fieldErrors.lastname && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {fieldErrors.lastname}
                  </span>
                </label>
              )}
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              className={inputClass("email")}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="email"
            />
            {fieldErrors.email && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {fieldErrors.email}
                </span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Telephone</span>
            </label>
            <input
              type="tel"
              name="telephone"
              className={inputClass("telephone")}
              value={formData.telephone}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="tel"
              placeholder="+961..."
            />
            {fieldErrors.telephone && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {fieldErrors.telephone}
                </span>
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
              className={inputClass("password")}
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="new-password"
            />
            {fieldErrors.password && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {fieldErrors.password}
                </span>
              </label>
            )}
          </div>

          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              formData.password && formData.password.length >= 6
                ? "max-h-24 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirm_password"
                className={inputClass("confirm_password")}
                value={formData.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="new-password"
              />
              {fieldErrors.confirm_password && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {fieldErrors.confirm_password}
                  </span>
                </label>
              )}
            </div>
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Register"
              )}
            </button>
          </div>

          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
