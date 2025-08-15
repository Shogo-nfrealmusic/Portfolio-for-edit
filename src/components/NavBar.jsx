import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaInstagram, FaYoutube, FaLinkedin, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdate = (v) => setActiveLink(v);

  const Socials = ({ className = "" }) => (
    <ul className={`list-unstyled d-flex align-items-center gap-3 mb-0 ${className}`}>
      {[
        { href: "https://www.instagram.com/copilot_shogo/", icon: <FaInstagram />, label: "Instagram" },
        { href: "https://www.youtube.com/@copilot_shogo", icon: <FaYoutube />, label: "YouTube" },
        { href: "https://www.linkedin.com/in/shogo-kikuchi-19b792321/", icon: <FaLinkedin />, label: "LinkedIn" },
        { href: "https://x.com/copilot_shogo", icon: <FaXTwitter />, label: "X (Twitter)" },
        { href: "https://www.tiktok.com/@copilot_shogo", icon: <FaTiktok />, label: "TikTok" },
      ].map(({ href, icon, label }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="d-inline-flex align-items-center justify-content-center rounded-circle border"
            style={{ width: 40, height: 40, fontSize: "1.2rem", opacity: 0.9, transition: "opacity .2s, transform .2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "none"; }}
          >
            {icon}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <Navbar
      expand="lg"
      sticky="top"
      data-bs-theme="dark"                               // ← トグル/文字を白系に
      className={`py-2 ${scrolled ? "bg-dark bg-opacity-75" : "bg-transparent"}`}
      style={{ zIndex: 1041 }}                           // ← Offcanvas 1045 より少し低く
    >
      <Container>
        {/* Brand: モバイルでは非表示（Offcanvas内で表示） */}
        <Navbar.Brand href="#home" className="fw-semibold d-none d-lg-inline">
          @copilot_shogo
        </Navbar.Brand>

        {/* 純正トグル（カスタムCSSは使わない） */}
        <Navbar.Toggle aria-controls="offcanvasNav" className="border-0 shadow-none" onClick={() => setShow(true)}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>

        <Navbar.Offcanvas
          id="offcanvasNav"
          aria-labelledby="offcanvasNavLabel"
          placement="end"
          show={show}                                   // ★ 追加
          onHide={() => setShow(false)}   
          restoreFocus                             // React-Bootstrapの標準挙動
          scroll={false}
          backdrop={true}
          style={{ zIndex: 1045 }}                 // ← いちおう明示
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavLabel">@copilot_shogo</Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            {/* Links */}
            <Nav className="flex-grow-1 align-items-lg-center ms-lg-4 gap-lg-4 gap-3">
              <Nav.Link href="#home"     data-bs-dismiss="offcanvas" onClick={() => { onUpdate("home"); setShow(false); }}     className={activeLink === "home" ? "active" : ""}>Home</Nav.Link>
              <Nav.Link href="#skills"   data-bs-dismiss="offcanvas" onClick={() => { onUpdate("skills"); setShow(false); }}   className={activeLink === "skills" ? "active" : ""}>Skills</Nav.Link>
              <Nav.Link href="#projects" data-bs-dismiss="offcanvas" onClick={() => { onUpdate("projects"); setShow(false); }}  className={activeLink === "projects" ? "active" : ""}>Projects</Nav.Link>
              <Nav.Link href="#connect"  data-bs-dismiss="offcanvas" onClick={() => { onUpdate("contact"); setShow(false); }}  className={activeLink === "contact" ? "active" : ""}>Contact</Nav.Link>
            </Nav>

            {/* Desktop 右側 */}
            <div className="d-none d-lg-flex align-items-center gap-3 ms-lg-3">
              <Socials />
              <a href="#connect" className="btn btn-light rounded-pill px-3">Let&apos;s Connect</a>
            </div>

            {/* Mobile（Offcanvas内） */}
            <div className="d-lg-none mt-4">
              <Socials className="justify-content-start" />
              <a href="#connect" className="btn btn-dark rounded-pill w-100 mt-3" onClick={() => setShow(false)} data-bs-dismiss="offcanvas">
                Let&apos;s Connect
              </a>
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBar;
