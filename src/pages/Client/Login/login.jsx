import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginApi } from "../../../util/api";
import "./login.css";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth.context";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext)

  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formValues.email) newErrors.email = "Email is required!";
    else if (!/\S+@\S+\.\S+/.test(formValues.email))
      newErrors.email = "Invalid email format!";

    if (!formValues.password) newErrors.password = "Password is required!";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const res = await loginApi(formValues.email, formValues.password);

      if (res && res.EC !== 0) {
        setNotification({
          message: res.EM || "Login failed!",
          type: "error",
        });
        return;
      }

      localStorage.setItem("access_token", res.access_token);

      setNotification({
        message: res.EM || "Login successful!",
        type: "success",
      });

      setAuth({
        isAuthenticated: true,
        user: {
          email: res?.user?.email ?? "",
          name: res?.user?.name ?? ""
        }
      })

      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setNotification({
        message: error?.messager || "Server error!",
        type: "error",
      });
    }
  };

  return (
    <div className="login-page">

      {/* Notification */}
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="login-card">

        {/* LEFT banner */}
        <div className="login-left">
          <h1>Welcome back!</h1>
          <p>You can sign in to access with your existing account.</p>
        </div>

        {/* RIGHT form */}
        <div className="login-right">

          <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Sign In</h2>

            {/* Email */}
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Username or email"
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

            <div className="remember">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit" className="submit-btn">Sign In</button>

            <p className="create-account">
              New here? <a href="/register">Create an Account</a>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
