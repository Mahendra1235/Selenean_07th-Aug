import React from "react";
import { Link } from "react-router-dom";
import {
  FaLinkedinIn,
  FaGlobe,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaArrowUp,
} from "react-icons/fa";

import logo from "../assets/footer logo.jpg";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Background Glow */}
      <div className="footer-glow"></div>

      {/* Premium SVG Waves */}
      <div className="footer-waves">
        <svg
          className="wave-svg"
          viewBox="0 0 1920 350"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="waveGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Glow Wave */}
          <path
            className="wave1"
            d="M0 190
               C220 130 420 240 640 175
               C880 105 1130 250 1370 170
               C1580 105 1760 170 1920 150"
          />

          {/* Main Bright Wave */}
          <path
            className="wave2"
            d="M0 215
               C240 155 450 275 690 195
               C930 115 1160 270 1410 185
               C1640 115 1810 185 1920 170"
          />

          {/* Thin White Wave */}
          <path
            className="wave3"
            d="M0 240
               C260 190 520 300 770 225
               C1040 145 1290 295 1540 215
               C1730 155 1845 205 1920 200"
          />

          {/* Bottom Soft Wave */}
          <path
            className="wave4"
            d="M0 280
               C280 250 560 340 870 280
               C1180 220 1480 315 1710 270
               C1810 250 1885 250 1920 255"
          />
        </svg>
      </div>

      {/* Floating Particles */}
      <div className="footer-light"></div>

      <div className="footer-container">
        {/* Left */}
        <div className="footer-about">
          <div className="footer-logo-box">
            <img
              src={logo}
              alt="Selenean Technologies"
              className="footer-logo"
            />
          </div>

          <p>
            Engineering intelligent solutions that empower a connected,
            sustainable and better tomorrow.
          </p>

          <div className="footer-social">
            <a
              href="https://www.linkedin.com/company/selenean-technologies"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="https://seleneantech.com"
              target="_blank"
              rel="noreferrer"
            >
              <FaGlobe />
            </a>
          </div>
        </div>

        {/* Solutions */}
        <div className="footer-links">
          <h3>Solutions</h3>

          <Link to="/silicon">Silicon</Link>

          <Link to="/systems">Systems</Link>

          <Link to="/sustainability">
            Sustainability
          </Link>

        </div>

        {/* Company */}
        <div className="footer-links">
          <h3>Company</h3>

          <Link to="/">Home</Link>

          <Link to="/#about">About Us</Link>

          <Link to="/partners">Partners</Link>


          <Link to="/contact">Contact</Link>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <h3>Contact Us</h3>

          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <span>sales@seleneantech.com</span>
          </div>

          <div className="contact-item">
            <FaPhoneAlt className="contact-icon" />
            <span>+91 98807 19724</span>
          </div>

          <h4>Corporate Office</h4>

          <div className="contact-item address">
            <FaMapMarkerAlt className="contact-icon" />

            <span>
              Nandi Infotech, KIADB Plot No. 8,
              <br />
              1st Cross, Sadaramangala Road,
              <br />
              Mahadevapura Post,
              <br />
              Bengaluru – 560048
            </span>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <div className="footer-line"></div>

        <div className="footer-bottom-content">
          <p>
            © 2026 Selenean Technologies. All Rights Reserved.
          </p>

          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>

            <span>|</span>

            <Link to="/terms">Terms of Use</Link>
          </div>
        </div>
        <button
          className="footer-to-top"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FaArrowUp />
        </button>
      </div>
    </footer>
  );
};

export default Footer;