import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import "animate.css";
import TrackVisibility from "react-on-screen";

export const Contact = () => {
  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <img
                  className={isVisible ? "animate__animated animate__zoomIn" : ""}
                  src={contactImg}
                  alt="Contact Us"
                />
              )}
            </TrackVisibility>
          </Col>

          <Col xs={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Get In Touch</h2>

                  {/* ★ Formspree: バックエンド不要 */}
                  <form
                    action="https://formspree.io/f/xwpqznjb"
                    method="POST"
                  >
                    <Row>
                      <Col xs={12} sm={6} className="px-1">
                        <input
                          type="text"
                          name="firstName"            /* ← name が必須 */
                          placeholder="First Name"
                          required
                        />
                      </Col>
                      <Col xs={12} sm={6} className="px-1">
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          required
                        />
                      </Col>
                      <Col xs={12} sm={6} className="px-1">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          required
                        />
                      </Col>
                      <Col xs={12} sm={6} className="px-1">
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone No."
                        />
                      </Col>
                      <Col xs={12} className="px-1">
                        <textarea
                          rows="6"
                          name="message"
                          placeholder="Message"
                          required
                        />
                        {/* 送信ボタン */}
                        <button type="submit">
                          <span>Send</span>
                        </button>

                        {/* 任意: スパム対策（ハニーポット） */}
                        <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex="-1" autoComplete="off" />

                        {/* 任意: 件名を指定 */}
                        <input type="hidden" name="_subject" value="New contact from portfolio" />
                      </Col>
                    </Row>
                  </form>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
