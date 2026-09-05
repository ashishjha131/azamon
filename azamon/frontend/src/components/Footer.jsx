import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-links">
        <Link to="/about">About</Link>
        <a href="mailto:ashisjha1123@gmail.com">Gmail</a>
        <a href="https://github.com/ashishjha131" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/ashish-kumar-301a93365/" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href="https://www.instagram.com/lejhaww23" target="_blank" rel="noreferrer">
          Instagram
        </a>
      </div>

      <p className="footer-copyright">
        © 2026 Azamon. All rights reserved.
      </p>

    </footer>
  );
}

export default Footer;