// client/src/components/Header.js
import React from "react";

const Header = ({ name }) => {
  return (
    <header className="portfolio-header-nav">
      <div className="header-logo">
        {name ? name.split(" ")[0] : "Portfolio"}
      </div>
      <nav>
        <a href="#skills">Skills</a>
        <a href="#experience">Experience</a>
        <a href="#education">Education</a>
      </nav>
    </header>
  );
};

export default Header;
