import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaJava, FaCode, FaNodeJs, FaHtml5, FaCss3, FaReact } from "react-icons/fa";
import { SiCplusplus, SiJavascript, SiMongodb } from "react-icons/si";
import TrackVisibility from "react-on-screen";
import colorSharp from "../assets/img/color-sharp.png";
import "animate.css";

export default function Certifications() {
  const certifications = [
    {
      title: "Java Programming: Solving Problems with Software",
      issuer: "Duke University, Coursera",
      icon: <FaJava />,
      color: "#f89820"  // Java orange color
    },
    {
      title: "Basics of C++ with Data Structures and Algorithms",
      issuer: "Coding Ninjas",
      icon: <SiCplusplus />,
      color: "#00599c"  // C++ blue color
    },
    {
      title: "Data Structures and Algorithms Specialization",
      issuer: "UC San Diego, Coursera",
      icon: <FaCode />,
      color: "#45b7d1"
    },
    {
      title: "Full Stack Web Development",
      issuer: "Apna College",
      icon: <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', minHeight: '40px' }}>
              <FaReact style={{ color: '#61DAFB' }} />
              <FaNodeJs style={{ color: '#68A063' }} />
              <SiMongodb style={{ color: '#47A248' }} />
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
<path d="M49.729 11h-.85c-1.051 0-2.041.49-2.68 1.324l-8.7 11.377-8.7-11.377C28.162 11.49 27.171 11 26.121 11h-.85l10.971 14.346L25.036 40h.85c1.051 0 2.041-.49 2.679-1.324L37.5 26.992l8.935 11.684C47.073 39.51 48.063 40 49.114 40h.85L38.758 25.346 49.729 11zM21.289 34.242c-2.554 3.881-7.582 5.87-12.389 4.116C4.671 36.815 2 32.611 2 28.109L2 27h12v0h11l0-4.134c0-6.505-4.818-12.2-11.295-12.809C6.273 9.358 0 15.21 0 22.5l0 5.573c0 5.371 3.215 10.364 8.269 12.183 6.603 2.376 13.548-1.17 15.896-7.256 0 0 0 0 0 0h-.638C22.616 33 21.789 33.481 21.289 34.242zM2 22.5C2 16.71 6.71 12 12.5 12S23 16.71 23 22.5V25H2V22.5z"></path>
</svg>
            </div>,
      color: "#61DAFB"  // React blue color
    },
    {
      title: "Web Development Training",
      issuer: "Internshala",
      icon: <div style={{ display: 'flex', gap: '8px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '40px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <FaHtml5 style={{ color: '#E34F26' }} />
                <FaCss3 style={{ color: '#1572B6' }} />
                <SiJavascript style={{ color: '#F7DF1E' }} />
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <FaReact style={{ color: '#61DAFB' }} />
                <FaNodeJs style={{ color: '#68A063' }} />
                <SiMongodb style={{ color: '#47A248' }} />
              </div>
            </div>,
      color: "#E34F26"  // HTML5 orange color
    },
  ];

  return (
    <section
      className="certifications"
      id="certifications"
      style={{
        position: "relative",
        padding: "10px 0",
        backgroundColor: "rgb(10, 10, 10)",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      <Container>
        <TrackVisibility>
          {({ isVisible }) => (
            <>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h2
                  style={{
                    fontSize: "32px",
                    fontWeight: "600",
                    textAlign: "center",
                    marginTop: "40px",
                    marginBottom: "40px",
                    letterSpacing: "0.5px"
                  }}
                >
                  Certifications
                </h2>
             <Row className="justify-content-center">
  {certifications.map((cert, index) => (
    <Col key={index} xs={12} md={6} lg={4} className="mb-4 d-flex">
      <div
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "15px",
          padding: "20px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          transition: "all 0.3s ease",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%", // allow flexible height
          minHeight: "230px", // better for responsiveness
        }}
        className="cert-card"
      >
        <div
          style={{
            fontSize: "28px", // slightly smaller for mobile friendliness
            marginBottom: "15px",
            color: cert.color,
            transition: "all 0.3s ease",
            minHeight: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          className="cert-icon"
        >
          {cert.icon}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "8px",
              color: "#fff",
              textAlign: "center",
              lineHeight: "1.4"
            }}
          >
            {cert.title}
          </h3>
          <p
            style={{
              fontSize: "13px",
              color: "#B8B8B8",
              margin: "0",
              textAlign: "center",
              lineHeight: "1.5"
            }}
          >
            {cert.issuer}
          </p>
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${cert.color}15 0%, transparent 100%)`,
            opacity: 0,
            transition: "all 0.3s ease",
          }}
          className="cert-overlay"
        />
      </div>
    </Col>
  ))}
</Row>

              </div>
              <img
                className="background-image-left"
                src={colorSharp}
                alt="Background decoration"
                style={{
                  position: "absolute",
                  left: "2px",
                  bottom: 0,
                  zIndex: 3,
                  maxWidth: "500px",
                  width: "38%",
                  opacity: 0.4,
                  pointerEvents: "none",
                  userSelect: "none",
                  userDrag: "none",
                }}
              />
            </>
          )}
        </TrackVisibility>
      </Container>
    </section>
  );
}
