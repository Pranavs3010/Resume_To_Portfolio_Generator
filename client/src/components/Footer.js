// client/src/components/Footer.js
import React from "react";

const Footer = ({ name }) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="portfolio-footer">
      <p>
        © {currentYear} {name}. All rights reserved.
      </p>
      {/* Add links to your social media here later */}
      <div className="social-links">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
