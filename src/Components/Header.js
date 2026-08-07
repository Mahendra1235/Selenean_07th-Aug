import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import "./Header.css";

import logo from "../assets/Selenean-new logo.webp";
import utsLogo from "../assets/UTS_Resized logo,,1.webp";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    setSolutionsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
    setSolutionsOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}

        <Link to="/" className="logo" onClick={closeMenu}>
          <img src={logo} alt="Selenean Logo" className="logo-img" />
        </Link>

        {/* Desktop Navigation */}

        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-dropdown">
              <Link to="/#solutions" className="nav-link">
                Solutions
                <FaChevronDown className="arrow" />
              </Link>

              <ul className="dropdown-menu">
                <li>
                  <Link to="/silicon">Silicon</Link>
                </li>

                <li>
                  <Link to="/systems">Systems</Link>
                </li>

                <li>
                  <Link to="/sustainability">
                    Sustainability
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#about">About</Link>
            </li>

            <li>
              <Link to="/partners">Partners</Link>
            </li>

            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        {/* Right Logo */}

        <Link to="/" className="side-logo" onClick={closeMenu}>
          <img
            src={utsLogo}
            alt="Univision Technology Solutions"
            className="logo-img"
          />
        </Link>

        {/* Hamburger */}

        <button
          type="button"
          className={`hamburger ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Overlay */}

      <div
        className={`mobile-overlay ${open ? "open" : ""}`}
        onClick={closeMenu}
      ></div>

      {/* Mobile Drawer */}

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <div className="mobile-menu-inner">
          <button
            type="button"
            className="mobile-dropdown-btn"
            onClick={() => setSolutionsOpen(!solutionsOpen)}
            aria-expanded={solutionsOpen}
          >
            Solutions
            <FaChevronDown
              className={`arrow ${solutionsOpen ? "open" : ""}`}
            />
          </button>

          <div
            className={`mobile-submenu ${solutionsOpen ? "open" : ""}`}
          >
            <Link to="/silicon" onClick={closeMenu}>
              Semiconductor
            </Link>

            <Link to="/systems" onClick={closeMenu}>
              Embedded Systems
            </Link>

            <Link to="/sustainability" onClick={closeMenu}>
              Sustainable Digital Solutions
            </Link>
          </div>

          <Link to="/#about" onClick={closeMenu}>
            About
          </Link>

          <Link to="/partners" onClick={closeMenu}>
            Partners
          </Link>

          <Link to="/contact" onClick={closeMenu}>
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
