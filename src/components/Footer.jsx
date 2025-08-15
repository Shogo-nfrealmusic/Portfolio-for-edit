import { Container, Row, Col } from "react-bootstrap";
import { FaInstagram, FaYoutube, FaLinkedin, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  const year = new Date().getFullYear();

  const links = [
    { href: "https://www.instagram.com/copilot_shogo/", icon: <FaInstagram />, label: "Instagram" },
    { href: "https://www.youtube.com/@copilot_shogo", icon: <FaYoutube />, label: "YouTube" },
    { href: "https://www.linkedin.com/in/shogo-kikuchi-19b792321/", icon: <FaLinkedin />, label: "LinkedIn" },
    { href: "https://x.com/copilot_shogo", icon: <FaXTwitter />, label: "X (Twitter)" },
    { href: "https://www.tiktok.com/@copilot_shogo", icon: <FaTiktok />, label: "TikTok" },
  ];

  return (
    <footer className="footer border-top py-4 mt-5">
      <Container>
        <Row className="align-items-center gy-3">
          {/* 左：ブランド名（モバイル中央 / SM以上は左） */}
          <Col xs={12} sm={6} className="text-center text-sm-start">
            <div className="d-inline-flex align-items-baseline gap-2">
              <span className="fw-semibold" style={{ letterSpacing: "0.2px" }}>
                @copilot_shogo
              </span>
              <small className="text-muted">Portfolio</small>
            </div>
          </Col>

          {/* 右：SNS（モバイル中央 / SM以上は右） */}
          <Col xs={12} sm={6} className="text-center text-sm-end">
            <nav aria-label="Social links" className="mb-2">
              <ul className="list-unstyled d-flex justify-content-center justify-content-sm-end align-items-center gap-3 flex-wrap mb-0">
                {links.map(({ href, icon, label }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="d-inline-flex align-items-center justify-content-center rounded-circle border"
                      style={{
                        width: 40,
                        height: 40,
                        fontSize: "1.2rem",
                        opacity: 0.85,
                        transition: "opacity .2s, transform .2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = "1";
                        e.currentTarget.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = "0.85";
                        e.currentTarget.style.transform = "none";
                      }}
                    >
                      {icon}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <small className="text-muted">© {year} copilot_shogo. All rights reserved.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
