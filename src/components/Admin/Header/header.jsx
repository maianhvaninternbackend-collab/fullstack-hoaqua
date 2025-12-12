import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { FaHouse, FaUser, FaUserGear, FaChevronDown } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";

import { AuthContext } from "../../../context/auth.context";  // ⭐ THÊM
import "./header.css";

function HeaderAdmin() {
  const location = useLocation();
  const { auth, setAuth } = useContext(AuthContext);  // ⭐ LẤY AUTH
  const [activeMenu, setActiveMenu] = useState("");
  const [openSubmenu, setOpenSubmenu] = useState(false);

  const toggleSubmenu = () => setOpenSubmenu(!openSubmenu);

  // ⭐ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setAuth({
      isAuthenticated: false,
      user: null
    });
    window.location.href = "/admin/login";
  };

  useEffect(() => {
    if (location.pathname.startsWith("/admin/home")) {
      setActiveMenu("/admin/home");
    }
    else if (location.pathname.startsWith("/admin/accounts")) {
      setActiveMenu("/admin/accounts");
    }
    else if (location.pathname.startsWith("/admin/user")) {
      setActiveMenu("/admin/user");
    }
  }, [location]);

  return (
    <aside className="admin-sidebar">
      <img src="/logo.png" className="logo" />

      <nav className="sidebar-menu">

        <Link 
          to="/admin/home"
          className={`menu-item ${activeMenu === "/admin/home" ? "active" : ""}`}
        >
          <FaHouse className="menu-icon" />
          <span>Dashboard</span>
        </Link>

        <Link 
          to="/admin/accounts"
          className={`menu-item ${activeMenu === "/admin/accounts" ? "active" : ""}`}
        >
          <RiAdminFill className="menu-icon" />
          <span>Admin</span>
        </Link>

        <Link 
          to="/admin/user"
          className={`menu-item ${activeMenu === "/admin/user" ? "active" : ""}`}
        >
          <FaUser className="menu-icon" />
          <span>User</span>
        </Link>

        {/* WELCOME MENU */}
        <div className="menu-item submenu" onClick={toggleSubmenu}>
          <div className="submenu-title">
            <FaUserGear className="menu-icon" />
            <span>Welcome</span>
            <FaChevronDown className={`arrow ${openSubmenu ? "open" : ""}`} />
          </div>

          {openSubmenu && (
            <div className="submenu-panel">
              
              {/* 👇 Nếu CHƯA login → hiện Đăng nhập */}
              {!auth.isAuthenticated && (
                <Link to="/admin/login" className="submenu-option">
                  Đăng Nhập
                </Link>
              )}

              {/* 👇 Nếu ĐÃ login → hiện Đăng xuất */}
              {auth.isAuthenticated && (
                <span onClick={handleLogout} className="submenu-option" style={{cursor:"pointer"}}>
                  Đăng Xuất
                </span>
              )}
            </div>
          )}
        </div>

      </nav>
    </aside>
  );
}

export default HeaderAdmin;
