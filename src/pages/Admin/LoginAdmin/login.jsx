import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";

import { loginAdminApi } from "../../../util/api";
import { AuthContext } from "../../../context/auth.context";

import "./login.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formValues.email) newErrors.email = "Email required";
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
    const data = await loginAdminApi(formValues.email, formValues.password);
    // Vì interceptor trả về response.data nên KHÔNG có res.data nữa

    if (!data || data.EC !== 0) {
      setNotification({
        message: data?.EM || "Login failed!",
        type: "error",
      });
      return;
    }

    // Lưu token
    localStorage.setItem("access_token", data.access_token);

    // Lưu Auth Context
    setAuth({
      isAuthenticated: true,
      user: {
        email: data.admin.email,
        name: data.admin.name,
        role: data.admin.role,
      },
    });

    // Thông báo thành công
    setNotification({
      message: "Đăng nhập thành công!",
      type: "success",
    });

    // Chuyển trang HOME ADMIN sau 1.2s
    setTimeout(() => navigate("/admin/home"), 1200);

  } catch (error) {
    console.log(error);
    setNotification({ message: "Server error!", type: "error" });
  }
};

  return (
    <div className="admin-login-container">

      {/* ======= NOTIFICATION ======= */}
      {notification.message && (
        <div className={`admin-toast ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="admin-login-card">

        <div className="admin-icon-box">
          <div className="admin-circle">
            <FaUser size={40} />
          </div>
        </div>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          
          <div className="admin-input">
            <FaUser className="admin-input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Admin email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && <p className="admin-error">{errors.email}</p>}

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

          <button className="admin-login-btn">LOGIN</button>

          <p className="admin-create-link">
            New here? <a href="/admin/register">Create an Account</a>
          </p>

        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
