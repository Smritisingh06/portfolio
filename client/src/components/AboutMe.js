import React, { useEffect, useRef } from 'react';
import portfolioData from '../data/portfolio-data.json';
import './AboutMe.css';

const AboutMe = () => {
  const { personalInfo, experience, skills } = portfolioData;
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-section" ref={sectionRef}>
      <div className="about-container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="gradient-text">{personalInfo.name}</h1>
            <h2>{personalInfo.title}</h2>
            <p className="bio">{personalInfo.bio}</p>
            <div className="social-links">
              <a href={personalInfo.socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-btn">
                <i className="fab fa-github"></i> GitHub
              </a>
              <a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn">
                <i className="fab fa-linkedin"></i> LinkedIn
              </a>
              <a href={`mailto:${personalInfo.email}`} className="social-btn">
                <i className="fas fa-envelope"></i> Email
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-container">
              <img src="/path-to-your-image.jpg" alt={personalInfo.name} />
              <div className="background-pattern"></div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat-card">
            <h3>{experience.current.duration}</h3>
            <p>Years Experience</p>
          </div>
          <div className="stat-card">
            <h3>{portfolioData.projects.featured.length}+</h3>
            <p>Projects Completed</p>
          </div>
          <div className="stat-card">
            <h3>{skills.frontend.length + skills.backend.length}</h3>
            <p>Technologies</p>
          </div>
        </div>

        {/* Current Role */}
        <div className="current-role">
          <h3>Currently Working As</h3>
          <div className="role-card">
            <div className="role-header">
              <h4>{experience.current.title}</h4>
              <span className="company">{experience.current.company}</span>
            </div>
            <div className="role-responsibilities">
              {experience.current.responsibilities.map((resp, index) => (
                <div key={index} className="responsibility-item">
                  <i className="fas fa-check-circle"></i>
                  <p>{resp}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Overview */}
        <div className="skills-overview">
          <h3>Core Competencies</h3>
          <div className="skills-grid">
            {skills.frontend.map((skill, index) => (
              <div key={index} className="skill-card">
                <div className="skill-header">
                  <h4>{skill.name}</h4>
                  <span className={`level-badge ${skill.level.toLowerCase()}`}>
                    {skill.level}
                  </span>
                </div>
                <div className="skill-experience">
                  <div className="experience-bar" style={{ 
                    width: `${(parseInt(skill.experience) / 3) * 100}%`
                  }}></div>
                  <span>{skill.experience}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe; 