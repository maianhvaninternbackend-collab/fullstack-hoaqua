import "./home.css";

const HomePage = () => {
  return (
    <div className="home-page">

      {/* ================= HERO ================= */}
      <section className="hero-section">
        <img src="/hero_banner.png" className="hero-bg" />

        <div className="hero-content">
          <h1>
            TRÁI CÂY <br /> TƯƠI MÁT
          </h1>

          <h2>GỌT SẴN TIỆN LỢI</h2>

          <button className="hero-btn">THỬ NGAY NHA</button>
        </div>
      </section>

      {/* ================= FEATURE CARDS ================= */}
      <section className="feature-section">

        <div className="feature-card">
          <img src="/tuoi_ngon_chuan_vi.png" alt="" />
          <h3>TƯƠI NGON CHUẨN VỊ</h3>
          <p>
            Hoa quả được chọn lọc kỹ càng – giòn ngọt tự nhiên, chất lượng khỏi bàn.
          </p>
        </div>

        <div className="feature-card">
          <img src="/da_dang_trong_hop.png" alt="" />
          <h3>ĐA DẠNG TRONG MỘT HỘP</h3>
          <p>
            Một hộp – nhiều loại trái cây theo mùa, ngon miệng bổ sung vitamin.
          </p>
        </div>

        <div className="feature-card">
          <img src="/sach_tien_dep.png" alt="" />
          <h3>SẠCH – TIỆN – ĐẸP</h3>
          <p>
            Gọt sẵn, đóng hộp đẹp – chỉ mở ra là thưởng thức ngay.
          </p>
        </div>

        <div className="feature-card">
          <img src="/mang_di_moi_luc_moi_noi.png" alt="" />
          <h3>MANG ĐI MỌI LÚC, MỌI NƠI</h3>
          <p>
            Nhỏ gọn – tiện mang đi học, đi làm hoặc đi chơi.
          </p>
        </div>

        <div className="feature-card">
          <img src="/linh_hoat_cho_moi_nhu_cau.png" alt="" />
          <h3>LINH HOẠT CHO MỌI NHU CẦU</h3>
          <p>
            Nhận làm hộp theo yêu cầu – phù hợp quà tặng, tiệc, sự kiện.
          </p>
        </div>

      </section>

    </div>
  );
};

export default HomePage;
