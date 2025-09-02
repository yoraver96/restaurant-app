import React from "react";
import "./Footer.css"; // Make sure this path matches

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="font-bold">Made by Yoraver</p>
        <p>
          Email: <a href="mailto:yoraver123@gmail.com">yoraver123@gmail.com</a>
        </p>
        <p>
          Mobile: <a href="tel:+916280270772">6280270772</a>
        </p>
        <p className="copyright">
          © {new Date().getFullYear()} Restaurant POS. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
