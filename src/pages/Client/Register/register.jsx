import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { createUserApi } from "../../../util/api";
import "./register.css";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formValues.name) newErrors.name = "Please input your name!";
    if (!formValues.email) newErrors.email = "Please input your email!";
    else if (!/\S+@\S+\.\S+/.test(formValues.email))
      newErrors.email = "Email is invalid!";
    if (!formValues.password) newErrors.password = "Please input your password!";

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
      const res = await createUserApi(
        formValues.name,
        formValues.email,
        formValues.password
      );

      if (res && res.EC !== 0) {
        setNotification({
          message: res.EM || "Register failed!",
          type: "error",
        });
        return;
      }

      setNotification({
        message: "Register successful!",
        type: "success",
      });

      setTimeout(() => navigate("/login"), 1500);

    } catch (error) {
      setNotification({
        message: error?.response?.data?.message || "Server error!",
        type: "error",
      });
    }
  };

  return (
    <div className="register-page">

      {/* Notification */}
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="register-card">

        {/* LEFT SIDE */}
        <div className="register-left">
          <h1>Create Account</h1>
          <p>Join us and start your journey now.</p>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="register-right">
          <form className="register-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Register</h2>

            {/* Name */}
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Full name"
                value={formValues.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formValues.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="form-group">
              <div className="password-container">
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
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <button className="submit-btn">Create Account</button>

            <p className="login-link">
              Already have an account? <a href="/login">Sign In</a>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
