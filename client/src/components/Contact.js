import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { FaPaperPlane } from 'react-icons/fa';

export const Contact = () => {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send Message');
  const [status, setStatus] = useState({});
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};

    if (!formDetails.firstName.trim()) {
      errs.firstName = "First Name is required.";
    } else {
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(formDetails.firstName)) {
        errs.firstName = "First Name must contain only characters.";
      } else if (formDetails.firstName.length > 50) {
        errs.firstName = "First Name cannot exceed 50 characters.";
      }
    }

    if (!formDetails.lastName.trim()) {
      errs.lastName = "Last Name is required.";
    } else {
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(formDetails.lastName)) {
        errs.lastName = "Last Name must contain only characters.";
      } else if (formDetails.lastName.length > 50) {
        errs.lastName = "Last Name cannot exceed 50 characters.";
      }
    }

    if (!formDetails.email.trim()) {
      errs.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formDetails.email)) {
        errs.email = "Email is invalid.";
      }
    }

    if (!formDetails.phone.trim()) {
      errs.phone = "Phone number is required.";
    } else {
      const phoneRegex = /^\+?\d{10,15}$/;
      if (!phoneRegex.test(formDetails.phone)) {
        errs.phone = "Phone number is invalid.";
      }
    }

    if (!formDetails.message.trim()) {
      errs.message = "Message is required.";
    } else {
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
    setErrors({
      ...errors,
      [category]: ''
    });
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
      const response = await fetch("https://portfolio-phi-olive-79.vercel.app/api/contact/submitContactForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(formDetails),
      });

      const result = await response.json();
      setButtonText("Send Message");

      if (response.ok) {
        setStatus({ success: true, message: result.message || "Message sent successfully." });
        setFormDetails(formInitialDetails);
        setErrors({});
      } else {
        setStatus({ success: false, message: result.message || "Something went wrong, please try again later." });
      }
    } catch (error) {
      setButtonText("Send Message");
      setStatus({ success: false, message: "Network error. Please try again." });
    }
  };

  return (
    <section className="contact" id="connect" style={{ background: 'linear-gradient(90.21deg, rgb(8, 6, 7) -5.91%, rgb(16 13 29) 111.58%)' }}>
      <Container>
        <Row className="justify-content-center">
          <Col size={12} md={8} lg={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div>
                  <h2 className="text-center mb-4" style={{ 
                    fontSize: '32px', 
                    fontWeight: '600',
                    color: '#fff',
                    letterSpacing: '0.5px'
                  }}>
                    Get In Touch
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="text"
                          value={formDetails.firstName}
                          placeholder="First Name"
                          onChange={(e) => onFormUpdate('firstName', e.target.value)}
                          style={{
                            fontSize: '14px',
                            padding: '16px 24px',
                            borderRadius: '12px'
                          }}
                        />
                        {errors.firstName && <p className="error-message">{errors.firstName}</p>}
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="text"
                          value={formDetails.lastName}
                          placeholder="Last Name"
                          onChange={(e) => onFormUpdate('lastName', e.target.value)}
                          style={{
                            fontSize: '14px',
                            padding: '16px 24px',
                            borderRadius: '12px'
                          }}
                        />
                        {errors.lastName && <p className="error-message">{errors.lastName}</p>}
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="email"
                          value={formDetails.email}
                          placeholder="Email Address"
                          onChange={(e) => onFormUpdate('email', e.target.value)}
                          style={{
                            fontSize: '14px',
                            padding: '16px 24px',
                            borderRadius: '12px'
                          }}
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="tel"
                          value={formDetails.phone}
                          placeholder="Phone No."
                          onChange={(e) => onFormUpdate('phone', e.target.value)}
                          style={{
                            fontSize: '14px',
                            padding: '16px 24px',
                            borderRadius: '12px'
                          }}
                        />
                        {errors.phone && <p className="error-message">{errors.phone}</p>}
                      </Col>
                      <Col size={12} className="px-1">
                        <textarea
                          rows="5"
                          value={formDetails.message}
                          placeholder="Message"
                          onChange={(e) => onFormUpdate('message', e.target.value)}
                          style={{
                            fontSize: '14px',
                            padding: '16px 24px',
                            borderRadius: '12px',
                            resize: 'vertical'
                          }}
                        ></textarea>
                        {errors.message && <p className="error-message">{errors.message}</p>}

                        {status.message && (
                          <div className={`status-message ${status.success ? 'success' : 'error'}`}>
                            {status.message}
                          </div>
                        )}

                        <button 
                          type="submit"
                          style={{
                            backgroundColor: '#0dcaf0',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '16px 32px',
                            fontSize: '14px',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            width: '100%',
                            marginTop: '24px',
                            color: '#000',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <span>{buttonText}</span>
                          <FaPaperPlane />
                        </button>
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