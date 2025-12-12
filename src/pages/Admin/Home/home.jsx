import "./home.css"

const HomeAdmin = () => {
  return (
    <div className="home-admin">
      <div className="admin-card">
        <h1 className="admin-title">Welcome Back, Admin 👋</h1>
        <p className="admin-desc">
          Chúc bạn một ngày tốt lành!  
          Dưới đây là bảng điều khiển giúp bạn quản lý hệ thống nhanh chóng và hiệu quả.
        </p>

        <div className="quick-stats">
          <div className="stat-box">
            <h2>120</h2>
            <span>Người dùng</span>
          </div>

          <div className="stat-box">
            <h2>34</h2>
            <span>Đơn hàng hôm nay</span>
          </div>

          <div className="stat-box">
            <h2>5</h2>
            <span>Báo cáo mới</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
