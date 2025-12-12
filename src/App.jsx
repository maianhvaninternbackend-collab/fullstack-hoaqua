import { Outlet, useLocation, Navigate } from "react-router-dom";
import axios from "./util/axios.custiomize";
import { useContext, useEffect } from "react";
import Header from "./components/Client/Header/header";
import HeaderAdmin from "./components/Admin/Header/header";
import { AuthContext } from "./context/auth.context";
import Footer from "./components/Client/Footer/footer";


function App() {

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const { auth, setAuth, appLoading, setAppLoading } = useContext(AuthContext);

  const adminPublicRoutes = ["/admin/login", "/admin/register"];
  const isAdminPublic = adminPublicRoutes.includes(location.pathname);

  useEffect(() => {
    const fetchAccount = async () => {
      setAppLoading(true);
      const res = await axios.get(`/v1/api/account`);

      if (res) {
        setAuth({
          isAuthenticated: true,
          user: {
            email: res.email,
            name: res.name,
          }
        });
      }

      setAppLoading(false);
    };

    fetchAccount();
  }, []);

  if (appLoading) {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      {/* Nếu là trang /admin/login hoặc /admin/register → cho vào bình thường */}
      {isAdminPublic ? (
        <Outlet />
      ) : isAdminRoute ? (
        auth.isAuthenticated ? (
          <div id="admin-layout">
            <HeaderAdmin />
            <Outlet />
          </div>
        ) : (
          <Navigate to="/admin/login" replace />
        )
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
