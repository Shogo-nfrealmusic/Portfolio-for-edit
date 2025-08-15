"use client";
import { useState } from "react";
import { Container, Row, Col, Tab, Nav, Modal } from "react-bootstrap";
import "animate.css";
import TrackVisibility from "react-on-screen";
import React from "react";


// 既存の toYouTubeEmbed を置換 → 汎用版
// 置き換え：汎用埋め込みURL変換
function toEmbed(url) {
  try {
    const u = new URL(url);

    // --- Google Drive: /file/d/<ID>/view → /file/d/<ID>/preview (iframe 再生)
    if (u.hostname.includes("drive.google.com") && u.pathname.includes("/file/")) {
      const parts = u.pathname.split("/").filter(Boolean); // ['file','d','<ID>','view']
      const fileId = parts[2];
      return { type: "gdrive", src: `https://drive.google.com/file/d/${fileId}/preview` };
    }

    // --- Instagram Reels ---
    if (u.hostname.includes("instagram.com") && u.pathname.includes("/reel/")) {
      const parts = u.pathname.split("/").filter(Boolean);
      const idx = parts.indexOf("reel");
      const shortcode = parts[idx + 1];
      if (shortcode) {
        return { type: "instagram", src: `https://www.instagram.com/reel/${shortcode}/embed` };
      }
    }

    // --- YouTube (watch / shorts / youtu.be) ---
    const isShort = u.hostname.includes("youtube.com") && u.pathname.startsWith("/shorts/");
    if (u.hostname.includes("youtu.be")) {
      return { type: "youtube", src: `https://www.youtube.com/embed/${u.pathname.slice(1)}?autoplay=1&rel=0` };
    }
    if (isShort) {
      const id = u.pathname.split("/")[2];
      return { type: "youtube", src: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` };
    }
    if (u.hostname.includes("youtube.com") && u.searchParams.get("v")) {
      return { type: "youtube", src: `https://www.youtube.com/embed/${u.searchParams.get("v")}?autoplay=1&rel=0` };
    }
  } catch {}
  // 直MP4など
  return { type: "file", src: url };
}


function isVertical(url) {
  try {
    const u = new URL(url);
    return (
      (u.hostname.includes("youtube.com") && u.pathname.startsWith("/shorts/")) ||
      (u.hostname.includes("instagram.com") && u.pathname.includes("/reel/"))
    );
  } catch {
    return false;
  }
}



function VideoCard({ item, onPlay }) {
  const vertical = isVertical(item.url);
  return (
    <Col sm={12} md={6} lg={4} className="mb-4">
      {/* 再生ボタンのabsolute基準にする */}
      <div className="project-card rounded-4 overflow-hidden border position-relative">
        {vertical ? (
          <div className="ratio" style={{ "--bs-aspect-ratio": "177.78%" }}>
            <img src={item.thumb} alt={item.title} className="w-100 h-100" style={{ objectFit: "cover" }} />
          </div>
        ) : (
          <div className="ratio ratio-16x9">
            <img src={item.thumb} alt={item.title} className="w-100 h-100" style={{ objectFit: "cover" }} />
          </div>
        )}

        <button
          className="btn btn-light rounded-circle position-absolute top-50 start-50 translate-middle shadow"
          style={{ width: 56, height: 56, zIndex: 2 }}
          onClick={() => onPlay(item)}
          aria-label={`Play ${item.title}`}
        >
          ▶
        </button>

        <div className="p-3">
          <h5 className="mb-1">{item.title}</h5>
          {item.description ? <p className="mb-0 text-muted small">{item.description}</p> : null}
        </div>
      </div>
    </Col>
  );
}


function WebsiteCard({ item }) {
  return (
    <Col sm={12} md={6} lg={4} className="mb-4">
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-decoration-none text-reset"
      >
        <div className="project-card rounded-4 overflow-hidden border">
          <div className="ratio ratio-16x9">
            <img
              src={item.thumb}
              alt={item.title}
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="p-3">
            <h5 className="mb-1">{item.title}</h5>
            {item.description ? (
              <p className="mb-0 text-muted small">{item.description}</p>
            ) : null}
          </div>
        </div>
      </a>
    </Col>
  );
}

export default function Projects() {
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState(null);

  const ytVideos = [
    {
      title: "EP2 IG Reel from Portfolio",
      url: "https://youtu.be/smj6jieL9c8?si=xSqNQNkPho_-6x9O",
      thumb: "/images/projects/1.png",
    },
    {
      title: "Lost in Japan. Work engagement.",
      url: "https://youtu.be/ojGbsNnKkko?si=HI6a9PagwUV9x2Fm",
      thumb: "/images/projects/2.png",
    },
    {
      title: "A Perfect Day in Japan【VLOG】",
      url: "https://youtu.be/JPtPrvjP8KY?si=VxvvzcpFkwrNCmPd",
      thumb: "/images/projects/3.png",
    },
    {
      title: "アメリカ創価学会に潜入したら...",
      url: "https://youtu.be/dWgN_MMEJRg?si=FH1GPymPmVeplIEO",
      thumb: "/images/projects/4.png",
    },
    {
      title: "帰国する友達と最後の思い出【留学Vlog】",
      url: "https://youtu.be/r9vrwbaO3nA?si=R3RSUmy7HBGoJ1ym",
      thumb: "/images/projects/5.png",
    },
    {
      title: "THEY WANT ME TO FAIL… AND I LOVE IT",
      url: "https://youtu.be/vS9BjTNy0VM?si=v6R1o2OQQw4E1UM6",
      thumb: "/images/projects/6.png",
    },
  ];

  const shortVideos = [
    {
      title: "Tour '24 AREA: SRKN",
      url: "https://www.instagram.com/reel/DDJ8qkUzwyt/?utm_source=ig_web_copy_link",
      thumb: "/images/projects/s1.png",
    },
    {
      title: "回遊動線のマンションリノベーション ",
      url: "https://www.instagram.com/reel/DIQqCBwOl0y/?utm_source=ig_web_copy_link",
      thumb: "/images/projects/s2.png",
    },
    {
      title: "Why are you learning English?",
      url: "https://www.instagram.com/reel/DLxKJVJzRLk/?utm_source=ig_web_copy_link",
      thumb: "/images/projects/s3.png",
    },
    {
      title: "The next chapter of my life?",
      url: "https://www.instagram.com/reel/DM1LXh4PfFW/?utm_source=ig_web_copy_link",
      thumb: "/images/projects/s4.png",
    },
    {
      title: "Stay hard.",
      url: "https://www.instagram.com/reel/DLbEA-iysi5/",
      thumb: "/images/projects/s5.png",
    },
    {
      title: "Building a workout habit",
      url: "https://drive.google.com/file/d/1EDkH2nn94Rkj36yNQYwsPogJLmxp-x04/view",
      thumb: "/images/projects/s6.png",
    },
  ];

  const websites = [
    {
      title: "Portfolio Site",
      href: "https://portfolio24.utopiahub.live/",
      thumb: "/images/projects/w1.png",
    },
    {
      title: "Fitness Website",
      href: "https://gain-hub.vercel.app/home",
      thumb: "/images/projects/w2.png",
    },
    {
      title: "Clone Apple iPhone 15pro",
      href: "https://shogo-nfrealmusic.github.io/apple_website/",
      thumb: "/images/projects/w3.png",
    },
  ];

  const open = (v) => {
    setCurrent(v);
    setShow(true);
  };
  const close = () => {
    setShow(false);
    setCurrent(null);
  };

  return (
    <section className="project py-5" id="projects">
      <Container>
        <Row>
          <Col xs={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2 className="text-center fw-bold mb-2">Projects</h2>
                  <p className="text-center text-muted mx-auto" style={{ maxWidth: 720 }}>
                    YouTube / Shorts / Websites をタブで切替。クリックで動画を再生します。
                  </p>

                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav
                      variant="pills"
                      className="nav-pills mb-4 justify-content-center align-items-center"
                      id="pills-tab"
                    >
                      <Nav.Item>
                        <Nav.Link eventKey="first">YouTube</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Shorts &amp; Reels</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Websites</Nav.Link>
                      </Nav.Item>
                    </Nav>

                    <Tab.Content
                      id="slideInUp"
                      className={isVisible ? "animate__animated animate__slideInUp" : ""}
                    >
                      <Tab.Pane eventKey="first">
                        <Row>
                          {ytVideos.map((v, i) => (
                            <VideoCard key={i} item={v} onPlay={open} />
                          ))}
                        </Row>
                      </Tab.Pane>

                      <Tab.Pane eventKey="second">
                        <Row>
                          {shortVideos.map((v, i) => (
                            <VideoCard key={i} item={v} onPlay={open} />
                          ))}
                        </Row>
                      </Tab.Pane>

                      <Tab.Pane eventKey="third">
                        <Row>
                          {websites.map((s, i) => (
                            <WebsiteCard key={i} item={s} />
                          ))}
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                  <div className="text-center mt-4">
                    <a
                        href="https://ebony-lake-823.notion.site/All-of-our-portfolio-1ea9ff87b3708092becae0997334301e?pvs=74"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary px-4 py-2 fw-semibold"
                    >
                        Explore More Work
                    </a>
                </div>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={close} size="lg" centered>
        <Modal.Body className="p-0">
            {current ? (() => {
                const { type, src } = toEmbed(current.url);
                const vertical = isVertical(current.url);

                if (type === "instagram") {
                return (
                    <div className="ratio" style={{ "--bs-aspect-ratio": "177.78%" }}>
                    <iframe
                        src={src}
                        title={current.title}
                        allow="encrypted-media; clipboard-write; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        style={{ border: 0, width: "100%", height: "100%" }}
                    />
                    </div>
                );
                }

                if (type === "youtube") {
                return (
                    <div className="ratio ratio-16x9">
                    <iframe
                        src={src}
                        title={current.title}
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                        style={{ border: 0, width: "100%", height: "100%" }}
                    />
                    </div>
                );
                }

                if (type === "gdrive") {
                return (
                    <div className={vertical ? "ratio" : "ratio ratio-16x9"}
                        style={vertical ? { "--bs-aspect-ratio": "177.78%" } : undefined}>
                    <iframe
                        src={src}
                        title={current.title}
                        allow="autoplay; encrypted-media; fullscreen"
                        allowFullScreen
                        style={{ border: 0, width: "100%", height: "100%" }}
                    />
                    </div>
                );
                }

                // その他（直MP4）
                return (
                <div className="ratio ratio-16x9">
                    <video src={src} controls autoPlay style={{ width: "100%", height: "100%" }} />
                </div>
                );
            })() : null}
            </Modal.Body>
        </Modal>
    </section>
  );
}
