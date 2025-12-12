import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* ===== LOGO + DESC ===== */}
        <div className="footer-col">
          <h2 className="footer-logo">
            <span className="logo-circle"></span>
            Joygreen
          </h2>
          <p className="footer-desc">
            There are many variations of passages of lorem ipsum available,
            but the majority suffered.
          </p>

          <div className="footer-social">
            <a href="#"><i className="fa-brands fa-twitter"></i></a>
            <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#"><i className="fa-brands fa-pinterest-p"></i></a>
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
          </div>
        </div>

        {/* ===== EXPLORE ===== */}
        <div className="footer-col">
          <h3 className="footer-title">Explore</h3>
          <ul className="footer-list">
            <li><i className="fa-solid fa-leaf"></i> About</li>
            <li><i className="fa-solid fa-leaf"></i> Services</li>
            <li><i className="fa-solid fa-leaf"></i> Our Projects</li>
            <li><i className="fa-solid fa-leaf"></i> Meet the Farmers</li>
            <li><i className="fa-solid fa-leaf"></i> Latest News</li>
            <li><i className="fa-solid fa-leaf"></i> Contact</li>
          </ul>
        </div>

        {/* ===== NEWS ===== */}
        <div className="footer-col">
          <h3 className="footer-title">News</h3>

          <div className="footer-news">
            <p>Bringing Food Production Back To Cities</p>
            <span>July 5, 2022</span>
          </div>

          <div className="footer-news">
            <p>The Future of Farming, Smart Irrigation Solutions</p>
            <span>July 5, 2022</span>
          </div>
        </div>

        {/* ===== CONTACT ===== */}
        <div className="footer-col">
          <h3 className="footer-title">Contact</h3>

          <p><i className="fa-solid fa-phone"></i> +84 988.387.811</p>
          <p><i className="fa-solid fa-envelope"></i> joygreenvn@gmail.com</p>
          <p>
            <i className="fa-solid fa-location-dot"></i>
            226 Lê Trọng Tấn, P. Định Công, Hà Nội
          </p>

          <div className="footer-subscribe">
            <input type="email" placeholder="Your Email Address" />
            <button>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
