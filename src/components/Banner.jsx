import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.jpg";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  // ★ 文言だけあなたの内容に変更
  const toRotate = [ "Web Developer", "Content Creator", "Fitness Trainer" ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text]); // そのまま

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <section className="banner" id="home">
      <Container>
        {/* ※ 元コードのクラス名（aligh-items-center）はそのまま残しています */}
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <span className="tagline">Welcome to my Portfolio</span>
                  <h1>
                    {`Hi! I'm Shogo`}{' '} <br />
                    <span
                      className="txt-rotate"
                      dataPeriod="1000"
                      data-rotate='[ "Web Developer", "Content Creator", "Fitness Trainer" ]'
                    >
                      <span className="wrap">{text}</span>
                    </span>
                  </h1>

                  {/* ★ 説明文をあなたの英日テキストに変更 */}
                  <h3>
                    A Japanese university student with study-abroad experience in the U.S.  
                    With a background in software engineering and content creation, now building my own business.
                  </h3>
                  <p className="mt-2">
                    日本の大学生・アメリカ留学経験者。<br />
                    エンジニアとコンテンツ制作の経験を活かし起業。
                  </p>

                  <button onClick={() => window.location.href = "#connect"}>
                    {"Let's Connect"} <ArrowRightCircle size={25} />
                  </button>
                </div>
              }
            </TrackVisibility>
          </Col>

          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img
                    src={headerImg}
                    alt="My Avatar"
                    style={{
                      width: "25vw",            // 画面幅の25%（例）
                      height: "25vw",           // 横と同じにして正方形
                      maxWidth: "300px",        // 最大サイズ
                      maxHeight: "300px",       // 最大サイズ
                      minWidth: "150px",        // 最小サイズ
                      minHeight: "150px",       // 最小サイズ
                      borderRadius: "50%",      // 丸くする
                      border: "3px solid #fff", // 外枠
                      objectFit: "cover",       // 中央でトリミング
                      display: "block",         // 余計な隙間防止
                      margin: "0 auto"          // 中央寄せ
                    }}
                  />
                </div>
              }
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
