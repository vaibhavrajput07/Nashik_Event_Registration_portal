// src/components/Footer.jsx
import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} Nashik Events. All rights reserved.</p>
        <div className="footer-links">
          <a href="https://example.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          <a href="https://example.com/terms" target="_blank" rel="noopener noreferrer">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
