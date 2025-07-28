// client/src/components/Portfolio.js
import React from "react";
import {
  FaBriefcase,
  FaGraduationCap,
  FaTools,
  FaEnvelope,
  FaPhone,
  FaProjectDiagram,
  FaCertificate,
  FaUserCircle,
} from "react-icons/fa";
import AnimatedSection from "./AnimatedSection";
import SkillIcon from "./SkillIcon";
import TimelineItem from "./TimelineItem";

const Portfolio = ({ data }) => {
  if (!data) return null;

  const portfolioName = data.name || "Your Name";

  return (
    <div className="new-portfolio-premium">
      <div className="sidebar-premium">
        <div className="sidebar-content">
          <div className="profile-pic-placeholder">
            {portfolioName.charAt(0)}
          </div>
          <h1>{portfolioName}</h1>
          {/* --- TITLE MOVED FROM HERE --- */}
          <div className="contact-info">
            {data.email && (
              <span>
                <FaEnvelope /> {data.email}
              </span>
            )}
            {data.mobile_number && (
              <span>
                <FaPhone /> {data.mobile_number}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="main-content-premium">
        {/* --- TITLE/SUMMARY MOVED TO HERE --- */}
        <AnimatedSection>
          <section id="summary" className="main-section">
            <h2>
              <FaUserCircle /> Professional Summary
            </h2>
            <div className="summary-content">
              {data.summary?.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section id="skills" className="main-section">
            <h2>
              <FaTools /> Technical Skills
            </h2>
            {Object.entries(data.skills_categorized || {}).map(
              ([category, skills]) => (
                <div key={category} className="skill-category">
                  <h3>{category}</h3>
                  <div className="skills-list">
                    {skills.map((skill, index) => (
                      <span key={index} className="skill-tag-premium">
                        <SkillIcon skill={skill} />
                        {skill.charAt(0).toUpperCase() + skill.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>
              )
            )}
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section id="experience" className="main-section">
            <h2>
              <FaBriefcase /> Work Experience
            </h2>
            <div className="timeline-container">
              {data.experience?.map((exp, index) => (
                <TimelineItem key={index} data={exp} />
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section id="projects" className="main-section">
            <h2>
              <FaProjectDiagram /> Projects
            </h2>
            <div className="timeline-container">
              {data.projects?.map((proj, index) => (
                <TimelineItem key={index} data={proj} />
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section id="certifications" className="main-section">
            <h2>
              <FaCertificate /> Certifications
            </h2>
            <div className="certifications-list">
              {data.certifications?.map((cert, index) => (
                <p key={index} className="certification-item">
                  {cert}
                </p>
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section id="education" className="main-section">
            <h2>
              <FaGraduationCap /> Education
            </h2>
            <div className="education-list">
              {data.education?.map((edu, index) => (
                <p key={index} className="education-item">
                  {edu}
                </p>
              ))}
            </div>
          </section>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Portfolio;
