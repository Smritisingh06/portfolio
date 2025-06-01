import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Contact = () => {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});
  const [errors, setErrors] = useState({});

 const validate = () => {
  const errs = {};

  // Validate First Name
  if (!formDetails.firstName.trim()) {
    errs.firstName = "First Name is required.";
  } else {
    const nameRegex = /^[A-Za-z\s]+$/;  // Only letters and spaces
    if (!nameRegex.test(formDetails.firstName)) {
      errs.firstName = "First Name must contain only characters.";
    } else if (formDetails.firstName.length > 50) {
      errs.firstName = "First Name cannot exceed 50 characters.";
    }
  }

  // Validate Last Name
  if (!formDetails.lastName.trim()) {
    errs.lastName = "Last Name is required.";
  } else {
    const nameRegex = /^[A-Za-z\s]+$/;  // Only letters and spaces
    if (!nameRegex.test(formDetails.lastName)) {
      errs.lastName = "Last Name must contain only characters.";
    } else if (formDetails.lastName.length > 50) {
      errs.lastName = "Last Name cannot exceed 50 characters.";
    }
  }

  // Validate Email (unchanged)
  if (!formDetails.email.trim()) {
    errs.email = "Email is required.";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formDetails.email)) {
      errs.email = "Email is invalid.";
    }
  }

  // Validate Phone (unchanged)
  if (!formDetails.phone.trim()) {
    errs.phone = "Phone number is required.";
  } else {
    const phoneRegex = /^\+?\d{10,15}$/;
    if (!phoneRegex.test(formDetails.phone)) {
      errs.phone = "Phone number is invalid.";
    }
  }

  // Validate Message
  if (!formDetails.message.trim()) {
    errs.message = "Message is required.";
  } else {
    // Count words in the message
    const wordCount = formDetails.message.trim().split(/\s+/).length;
    if (wordCount > 300) {
      errs.message = "Message cannot exceed 300 words.";
    }
  }

  return errs;
};


  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value
    });
    // Clear error on input change
    setErrors({
      ...errors,
      [category]: ''
    });
    // Clear status message when editing
    setStatus({});
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    setStatus({ success: false, message: "Please fix the errors before submitting." });
    return;
  }

  setButtonText("Sending...");

  try {
    const response = await fetch("http://localhost:5000/api/contact/submitContactForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(formDetails),
    });

    const result = await response.json();
    setButtonText("Send");

    if (response.ok) { // checks if status code is 2xx
      setStatus({ success: true, message: result.message || "Message sent successfully." });
      setFormDetails(formInitialDetails);
      setErrors({});
    } else {
      setStatus({ success: false, message: result.message || "Something went wrong, please try again later." });
    }
  } catch (error) {
    setButtonText("Send");
    setStatus({ success: false, message: "Network error. Please try again." });
  }
};


  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6} className="d-none d-md-block">
            <TrackVisibility>
              {({ isVisible }) =>
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us" />
              }
            </TrackVisibility>
          </Col>

          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Get In Touch</h2>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="text"
                          value={formDetails.firstName}
                          placeholder="First Name"
                          onChange={(e) => onFormUpdate('firstName', e.target.value)}
                        />
                        {errors.firstName && <p style={{ color: 'red', fontSize: '0.85rem' }}>{errors.firstName}</p>}
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="text"
                          value={formDetails.lastName}
                          placeholder="Last Name"
                          onChange={(e) => onFormUpdate('lastName', e.target.value)}
                        />
                        {errors.lastName && <p style={{ color: 'red', fontSize: '0.85rem' }}>{errors.lastName}</p>}
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="email"
                          value={formDetails.email}
                          placeholder="Email Address"
                          onChange={(e) => onFormUpdate('email', e.target.value)}
                        />
                        {errors.email && <p style={{ color: 'red', fontSize: '0.85rem' }}>{errors.email}</p>}
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="tel"
                          value={formDetails.phone}
                          placeholder="Phone No."
                          onChange={(e) => onFormUpdate('phone', e.target.value)}
                        />
                        {errors.phone && <p style={{ color: 'red', fontSize: '0.85rem' }}>{errors.phone}</p>}
                      </Col>
                      <Col size={12} className="px-1">
                        <textarea
                          rows="6"
                          value={formDetails.message}
                          placeholder="Message"
                          onChange={(e) => onFormUpdate('message', e.target.value)}
                        ></textarea>
                        {errors.message && <p style={{ color: 'red', fontSize: '0.85rem' }}>{errors.message}</p>}

                        {/* Status message placed just above the button */}
                        {status.message && (
                          <p style={{
                            color: status.success ? "green" : "red",
                            marginBottom: "10px",
                            fontWeight: "bold"
                          }}>
                            {status.message}
                          </p>
                        )}

                        <button type="submit"><span>{buttonText}</span></button>
                      </Col>
                    </Row>
                  </form>
                </div>
              }
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
