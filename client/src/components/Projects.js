import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/1.png";
import projImg2 from "../assets/img/2.png";
import projImg3 from "../assets/img/3.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import "animate.css";
import TrackVisibility from "react-on-screen";
import BooksCollage from "./BooksCollage";
import { About } from "./About";
export const Projects = () => {
  const projects = [
    {
      title: "Real-time Chat App",
      description:
        "A sleek, WebSocket-powered chat app delivering lightning-fast messaging, rich media sharing, and intelligent group interactions—crafted for seamless, modern communication",
      imgUrl: projImg1,
      url: "https://github.com/Smritisingh06/Chat-App",
    },
    {
      title: "Blinkit-Clone",
      description:
        "A robust MERN-based e-commerce app with secure user authentication, Stripe payments, dynamic product/category management, and seamless Cloudinary-powered image handling.",
      imgUrl: projImg2,
      url: "https://github.com/Smritisingh06/Blinkit-Clone",
    },
    {
      title: "Movie-Web-App",
      description:
        "A Netflix-inspired movie web app built with React.js, featuring user auth via Firebase, Redux for state management, and TMDB API for dynamic movie browsing and streaming UI",
      imgUrl: projImg3,
      url: "https://github.com/Smritisingh06/Movie-Web-App",
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div

                >
                  <h2 style={{ marginBottom: "30px", fontSize: "32px", }}>Projects</h2>
                  {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p> */}
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav
                      variant="pills"
                      className="nav-pills mb-5 justify-content-center align-items-center"
                      id="pills-tab"
                    >
                      <Nav.Item>
                        <Nav.Link eventKey="first">Projects</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">About</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Books</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content
                      id="slideInUp"
                      className={
                        isVisible ? "animate__animated animate__slideInUp" : ""
                      }
                    >
                      <Tab.Pane eventKey="first">
                        <Row>
                          {projects.map((project, index) => {
                            return <ProjectCard key={index} {...project} />;
                          })}
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <div
                          style={{
                            fontSize: "clamp(1rem, 1.6vw, 1.1rem)",
                            lineHeight: "1.7",
                            color: "#ddd",
                            fontWeight: 400,
                            maxWidth: "90vw",
                            margin: "0 auto",
                            textAlign: "start",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "1rem",
                              width: "100%",
                              maxWidth: "800px", // limits width for readability on large screens
                              marginBottom: "1rem",
                              paddingLeft: "1%", // responsive padding instead of fixed px
                              paddingRight: "1%", // balanced right padding
                              textAlign: "left",
                              boxSizing: "border-box", // ensures padding doesn't break layout
                            }}
                          >
                            My name is Smriti Singh. I have completed my B.E. in Computer Science from{" "}
                            <strong>Chandigarh University (2020–2024)</strong>. I’m currently working as a{" "}
                            <strong>Software Developer</strong> at Mobiloitte Technologies and have also worked as a Teaching Assistant at{" "}
                            <strong>Coding Ninjas</strong>, where I guided over 100 students in C++ and Data Structures & Algorithms (DSA). I specialize in{" "}
                            <strong>MERN Stack Development</strong> and have solid knowledge of C++, Java, Python, React.js, Next.js, Node.js, Express.js, MongoDB, and Data Structures & Algorithms.
                          </p>


                          <ul
                            style={{
                              paddingLeft: "1%",
                              listStyle: "none",
                              color: "#B8B8B8",
                              maxWidth: "800px",
                              marginLeft: "auto",
                              marginRight: "auto",
                              boxSizing: "border-box",
                            }}
                          >
                            <li style={{ textDecoration: "underline" }}>
                              Apart from coding, I enjoy:
                            </li>
                            {/* <li>🏸 Playing Badminton</li> */}
                            <li>📚 Reading Books</li>
                            <li>📸 Photography</li>
                            <li>🧘‍♀️ Practicing Yoga</li>
                            <li>🌱 Gardening</li>
                            <li>🌍 Travelling & Exploring Nature</li>
                          </ul>
                        </div>
                        {/* <About /> */}
                      </Tab.Pane>

                      <Tab.Pane eventKey="third">
                        <h2 style={{ marginBottom: "30px", fontSize: "16px" }}>Some of my Favorite Books 📚✨</h2>

                        {/* <p>Some of my Favorite Books 📚✨</p> */}
                        <BooksCollage />
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  );
};
