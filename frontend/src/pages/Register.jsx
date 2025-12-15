import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Register() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    telephone: "",
    password: "",
    confirm_password: ""
  });
  
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
        alert("Passwords do not match!");
        return;
    }
    const success = await register(formData);
    if (success) {
      navigate("/login");
    }
  };

  return (
    <div className="flex justify-center items-center py-10">
      <div className="card w-full max-w-md shrink-0 shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit}>
          <h2 className="card-title justify-center text-2xl font-bold mb-4">Create Account</h2>

          {error && (
            <div role="alert" className="alert alert-error text-sm p-3">
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <div className="form-control">
                <label className="label"><span className="label-text">First Name</span></label>
                <input type="text" name="firstname" className="input input-bordered" required onChange={handleChange} />
            </div>
            <div className="form-control">
                <label className="label"><span className="label-text">Last Name</span></label>
                <input type="text" name="lastname" className="input input-bordered" required onChange={handleChange} />
            </div>
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input type="email" name="email" className="input input-bordered" required onChange={handleChange} />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Telephone</span></label>
            <input type="tel" name="telephone" className="input input-bordered" required onChange={handleChange} />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Password</span></label>
            <input type="password" name="password" className="input input-bordered" required onChange={handleChange} />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Confirm Password</span></label>
            <input type="password" name="confirm_password" className="input input-bordered" required onChange={handleChange} />
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : "Register"}
            </button>
          </div>
          <p className="text-center mt-4 text-sm">
            Already have an account? <Link to="/login" className="link link-primary">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
