import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import HeaderAdmin from "../components/Admin/Header/header";

const ProtectedAdminRoute = () => {
  const { auth } = useContext(AuthContext);

  if (!auth?.isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div id="admin-layout">
      <HeaderAdmin />
      <Outlet />
    </div>
  );
};

export default ProtectedAdminRoute;
