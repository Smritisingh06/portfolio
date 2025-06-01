import React from "react";
import colorSharp from "../assets/img/color-sharp.png";

export default function Certifications() {
  const certifications = [
    {
      title: "Java Programming: Solving Problems with Software",
      issuer: "Duke University, Coursera",
    },
    {
      title: "Basics of C++ with Data Structures and Algorithms",
      issuer: "Coding Ninjas",
    },
    {
      title: "Data Structures and Algorithms Specialization",
      issuer: "UC San Diego, Coursera",
    },
    {
      title: "Full Stack Web Development",
      issuer: "Apna College",
    },
    {
      title: "Web Development Training",
      issuer: "Internshala",
    },
  ];

  return (
    <section
      className="certifications"
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "rgb(10 10 10)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "3rem 1rem",
        overflow: "hidden",
      }}
    >
      <h2
        style={{
          fontSize: "2.8rem",
          fontWeight: "900",
          marginBottom: "3rem",
          color: "#fff",
          letterSpacing: "2px",
          userSelect: "none",
          textAlign: "center",
          zIndex: 2,
          position: "relative",
        }}
      >
    Certifications
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2rem",
          maxWidth: "1200px",
          width: "100%",
          padding: "0 1rem",
          zIndex: 2,
          position: "relative",
        }}
      >
        {certifications.map((cert, index) => (
          <div
            key={index}
            style={{
              background: "linear-gradient(145deg, #121212, #1e1e1e)",
              borderRadius: "18px",
              width: "340px",          // increased width from 280px to 340px
              padding: "2.5rem 2rem", // increased padding from 1.8rem 1.5rem to 2.5rem 2rem
              color: "#fff",
              cursor: "default",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              userSelect: "none",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px) scale(1.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
            }}
          >
            <h3
              style={{
                fontSize: "1.3rem",
                fontWeight: "700",
                marginBottom: "0.7rem",
                color: "#fff",
              }}
            >
              {cert.title}
            </h3>
            <p
              style={{
                fontSize: "1rem",
                color: "#B8B8B8",
                fontWeight: "500",
                lineHeight: "1.5",
                marginTop: 0,
              }}
            >
              {cert.issuer}
            </p>
          </div>
        ))}
      </div>

      {/* Background image styled inline */}
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
    </section>
  );
}
