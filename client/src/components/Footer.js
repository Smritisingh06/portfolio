import { Container, Row, Col } from "react-bootstrap";
import { MailchimpForm } from "./MailchimpForm";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container style={{ paddingTop: "40px" }}>
        <Row className="align-items-center justify-content-center text-center">
          <Col xs={12}>
            <p style={{ marginBottom: "0", fontSize: "0.95rem", fontWeight: "500", color: "#ffffffcc" }}>
              Designed and developed by Smriti
            </p>
          </Col>
          <Col xs={12}>
            <p style={{ marginBottom: "12px", fontSize: "0.95rem", color: "#ffffffa5" }}>
              © 2025. All Rights Reserved.
            </p>
          </Col>
          <Col xs={12}>
            <div className="social-icon" style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
