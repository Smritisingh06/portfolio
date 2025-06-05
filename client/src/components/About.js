import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "animate.css";
import desk_img from "../assets/img/desk.gif"; // Adjust the path as necessary

const About = () => {
  return (
    <section className="about" id="about" style={{ backgroundColor: "#121212", color: "#fff", padding: "4rem 0" }}>
      <Container>
        <Row className="align-items-center">
          <h2 className="mb-4 fw-bold" style={{ fontSize: "2.5rem", textAlign: "center" }}>
  About Me
</h2>
<Col md={6} className="mb-4 mb-md-0 px-md-4">
            <img
              src={desk_img}
              alt="Coding Desk"
              style={{ width: "100%",height:"350px", borderRadius: "12px",  }}
            />
          </Col>

<Col md={6} className="px-md-4">
            <p style={{ fontSize: "1rem", lineHeight: "1.5", color: "#ccc" }}>
I am a Software Developer at Mobiloitte with a B.E in Computer Science from Chandigarh University (2020–2024). I have also worked as a Teaching Assistant at Coding Ninjas, where I guided over 100+ students in C++ and DSA. I specialize in MERN Stack Development and have strong knowledge in Full Stack Development, C++, Java, Python, React.js, Node.js, and Data Structures.    </p>
            <p style={{ fontSize: "1.rem", lineHeight: "1.5", color: "#ccc" }}>
              Apart from coding, I enjoy:
            </p>
            <ul style={{ color: "#bbb", paddingLeft: "1rem", listStyle: "none" }}>
              <li>🏸 Playing Badminton</li>
              <li>📚 Reading Books</li>
              <li>🧘‍♀️ Practicing Yoga</li>
              <li>🌱 Gardening</li>
              <li>🌍 Travelling & Exploring Nature</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
