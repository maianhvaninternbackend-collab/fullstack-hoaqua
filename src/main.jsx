import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, Navigate, RouterProvider, } from "react-router-dom";
import RegisterPage from './pages/Client/Register/register.jsx';
import UserPage from './pages/Admin/User/user.jsx';
import HomeAdmin from './pages/Admin/Home/home.jsx';
import HomePage from './pages/Client/Home/home.jsx';
import LoginPage from './pages/Client/Login/login.jsx';
import LoginAdmin from './pages/Admin/LoginAdmin/login.jsx';
import RegisterAdmin from './pages/Admin/RegisterAdmin/register.jsx';
import { AuthWrapper } from './context/auth.context.jsx';
import AdminLogin from './pages/Admin/LoginAdmin/login.jsx';
import AdminPage from './pages/Admin/Admin Page/accounts.jsx';
import ProtectedAdminRoute from './router/ProtectedAdminRoute.jsx';


const router = createBrowserRouter([
  // ===== CLIENT =====
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      
    ],
  },

  // ===== ADMIN PUBLIC =====
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/register",
    element: <RegisterAdmin />,
  },
  { path: "login", 
    element: <LoginPage /> 
  },
  { path: "register", 
    element: <RegisterPage /> 
  },

  // ===== ADMIN PRIVATE (BẮT BUỘC LOGIN) =====
  {
    path: "/admin",
    element: <ProtectedAdminRoute />, // 🔥 CHỐT CHẶN Ở ĐÂY
    children: [
      { index: true, element: <Navigate to="/admin/home" replace /> },
      { path: "home", element: <HomeAdmin /> },
      { path: "user", element: <UserPage /> },
      { path: "accounts", element: <AdminPage /> },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>   
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>
  </React.StrictMode>,
)

