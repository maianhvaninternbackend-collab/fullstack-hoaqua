import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { createAdminApi } from "../../../util/api";
import "./register.css";

const RegisterAdmin = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formValues.name) newErrors.name = "Name required";
    if (!formValues.email) newErrors.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(formValues.email))
      newErrors.email = "Email invalid!";
    if (!formValues.password) newErrors.password = "Password required";

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
      const res = await createAdminApi(
        formValues.name,
        formValues.email,
        formValues.password
      );

      if (!res || res.EC !== 0) {
        setNotification({
          message: res?.EM || "Register failed!",
          type: "error",
        });
        return;
      }

      setNotification({
        message: "Register success!",
        type: "success",
      });

      setTimeout(() => navigate("/admin/login"), 1200);
    } catch (error) {
      setNotification({
        message: "Server error!",
        type: "error",
      });
    }
  };

  return (
    <div className="admin-register-container">

      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="admin-register-card">

        <div className="admin-icon-box">
          <div className="admin-circle">
            <FaUser size={40} />
          </div>
        </div>

        <form className="admin-register-form" onSubmit={handleSubmit}>

          {/* Name */}
          <div className="admin-input">
            <FaUser className="admin-input-icon" />
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={formValues.name}
              onChange={handleChange}
            />
          </div>
          {errors.name && <p className="admin-error">{errors.name}</p>}

          {/* Email */}
          <div className="admin-input">
            <FaEnvelope className="admin-input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && <p className="admin-error">{errors.email}</p>}

          {/* Password */}
          <div className="admin-input">
            <FaLock className="admin-input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          {errors.password && <p className="admin-error">{errors.password}</p>}

          <button className="admin-register-btn">CREATE ACCOUNT</button>

          <p className="admin-login-link">
            Already have an account? <a href="/admin/login">Login</a>
          </p>

        </form>

      </div>
    </div>
  );
};

export default RegisterAdmin;
