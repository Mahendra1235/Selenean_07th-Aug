import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import "./Header.css";

import logo from "../assets/Selenean-new logo.webp";
// import utsLogo from "../assets/UTS_Resized logo,,1.webp";

// Featured solution images
import siliconImage from "../assets/silicon.webp";
import systemsImage from "../assets/systems-menu.jpg";
import sustainabilityImage from "../assets/sustainability.webp";


export default function Header() {

  const [open, setOpen] = useState(false);

  const [solutionsOpen, setSolutionsOpen] = useState(false);

  // Controls the image/content shown on the right side
  const [activeSolution, setActiveSolution] = useState(null);

  const location = useLocation();


  /* -------------------------------------------------------
     CLOSE MENUS WHEN ROUTE CHANGES
  ------------------------------------------------------- */

  useEffect(() => {
    setOpen(false);
    setSolutionsOpen(false);
    setActiveSolution(null);
  }, [location.pathname]);


  /* -------------------------------------------------------
     PREVENT BODY SCROLL WHEN MOBILE MENU IS OPEN
  ------------------------------------------------------- */

  useEffect(() => {

    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };

  }, [open]);


  /* -------------------------------------------------------
     CLOSE EVERYTHING
  ------------------------------------------------------- */

  const closeMenu = () => {
    setOpen(false);
    setSolutionsOpen(false);
    setActiveSolution(null);
  };

  const handleLogoClick = () => {
    closeMenu();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (

    <header className="header">

      {/* =====================================================
          HEADER CONTAINER
      ===================================================== */}

      <div className="header-container">


        {/* ===================================================
            LEFT LOGO
        =================================================== */}

        <Link
          to="/"
          className="logo"
          onClick={handleLogoClick}
        >
          <img
            src={logo}
            alt="Selenean Logo"
            className="logo-img"
          />
        </Link>


        {/* ===================================================
            DESKTOP NAVIGATION
        =================================================== */}

        <nav className="navbar">

          <ul className="nav-list">


            {/* =================================================
                SOLUTIONS
            ================================================= */}

            <li className="nav-dropdown mega-dropdown">

              <Link
                to="/#solutions"
                className="nav-link"
              >
                Solutions

                <FaChevronDown className="arrow" />
              </Link>


              {/* =================================================
                  MEGA MENU
              ================================================= */}

              <div
                className="mega-menu"

                onMouseLeave={() => {
                  setActiveSolution(null);
                }}
              >


                {/* =============================================
                    LEFT SIDE — SOLUTIONS
                ============================================= */}

                <div className="mega-menu-left">


                  {/* Heading */}

                  <div className="mega-heading">

                    <span>
                      OUR SOLUTIONS
                    </span>

                    <p>
                      Engineering solutions for a connected world
                    </p>

                  </div>


                  {/* =========================================
                      SEMICONDUCTOR
                  ========================================= */}

                  <Link
                    to="/silicon"
                    className={`solution-item ${
                      activeSolution === "silicon"
                        ? "active"
                        : ""
                    }`}

                    onMouseEnter={() =>
                      setActiveSolution("silicon")
                    }
                  >

                    <span className="solution-dot"></span>

                    <div>

                      <h4>
                        Silicon
                      </h4>

                      <p>
                        End-to-end silicon design,
                        verification and validation
                      </p>

                    </div>

                    <span className="solution-arrow">
                      →
                    </span>

                  </Link>


                  {/* =========================================
                      EMBEDDED SYSTEMS
                  ========================================= */}

                  <Link
                    to="/systems"
                    className={`solution-item ${
                      activeSolution === "systems"
                        ? "active"
                        : ""
                    }`}

                    onMouseEnter={() =>
                      setActiveSolution("systems")
                    }
                  >

                    <span className="solution-dot"></span>

                    <div>

                      <h4>
                      Systems
                      </h4>

                      <p>
                        Intelligent embedded hardware
                        and system solutions
                      </p>

                    </div>

                    <span className="solution-arrow">
                      →
                    </span>

                  </Link>


                  {/* =========================================
                      SUSTAINABLE DIGITAL SOLUTIONS
                  ========================================= */}

                  <Link
                    to="/sustainability"
                    className={`solution-item ${
                      activeSolution === "sustainability"
                        ? "active"
                        : ""
                    }`}

                    onMouseEnter={() =>
                      setActiveSolution("sustainability")
                    }
                  >

                    <span className="solution-dot"></span>

                    <div>

                      <h4>
                        Sustainability
                      </h4>

                      <p>
                        Digital transformation,
                        energy and decarbonization solutions
                      </p>

                    </div>

                    <span className="solution-arrow">
                      →
                    </span>

                  </Link>


                </div>


                {/* =============================================
                    RIGHT SIDE — FEATURED CONTENT
                ============================================= */}

                <div className="mega-menu-right">


                  {/* -----------------------------------------
                      NOTHING SHOWN INITIALLY
                  ----------------------------------------- */}

                 {activeSolution === null && (
  <div className="featured-placeholder">
    <img
      src={logo}
      alt="Selenean"
      className="mega-menu-logo"
    />
  </div>
)}


                  {/* =========================================
                      SEMICONDUCTOR CONTENT
                  ========================================= */}

                  {activeSolution === "silicon" && (

                    <div className="featured-content">

                      <span className="featured-label">
                        FEATURED SOLUTION
                      </span>


                      <div className="featured-image-box">

                        <img
                          src={siliconImage}
                          alt="Semiconductor Solutions"
                        />

                      </div>


                      <h3>
                        Silicon
                      </h3>


                      <p>
                        Advanced silicon design,
                        verification and post-silicon
                        validation solutions.
                      </p>


                      <Link
                        to="/silicon"
                        className="featured-link"
                      >
                        Learn More

                        <span>
                          →
                        </span>

                      </Link>

                    </div>

                  )}


                  {/* =========================================
                      EMBEDDED SYSTEMS CONTENT
                  ========================================= */}

                  {activeSolution === "systems" && (

                    <div className="featured-content">

                      <span className="featured-label">
                        FEATURED SOLUTION
                      </span>


                      <div className="featured-image-box">

                        <img
                          src={systemsImage}
                          alt="Embedded Systems"
                        />

                      </div>


                      <h3>
                      Systems
                      </h3>


                      <p>
                        Intelligent hardware and
                        embedded system engineering
                        for connected products.
                      </p>


                      <Link
                        to="/systems"
                        className="featured-link"
                      >
                        Learn More

                        <span>
                          →
                        </span>

                      </Link>

                    </div>

                  )}


                  {/* =========================================
                      SUSTAINABILITY CONTENT
                  ========================================= */}

                  {activeSolution === "sustainability" && (

                    <div className="featured-content">

                      <span className="featured-label">
                        FEATURED SOLUTION
                      </span>


                      <div className="featured-image-box">

                        <img
                          src={sustainabilityImage}
                          alt="Sustainable Digital Solutions"
                        />

                      </div>


                      <h3>
                        Sustainability
                      </h3>


                      <p>
                        Digital twin, energy optimization
                        and data-center decarbonization
                        solutions.
                      </p>


                      <Link
                        to="/sustainability"
                        className="featured-link"
                      >
                        Learn More

                        <span>
                          →
                        </span>

                      </Link>

                    </div>

                  )}


                </div>

              </div>

            </li>


            {/* =================================================
                ABOUT
            ================================================= */}

            <li>

              <Link to="/#about">
                About
              </Link>

            </li>


            {/* =================================================
                PARTNERS
            ================================================= */}

            <li>

              <Link to="/partners">
                Partners
              </Link>

            </li>


            {/* =================================================
                CONTACT
            ================================================= */}

            <li>

              <Link to="/contact">
                Contact
              </Link>

            </li>


          </ul>

        </nav>


        {/* ===================================================
            RIGHT UTS LOGO
        =================================================== */}

        {/* <Link
          to="/"
          className="side-logo"
          onClick={handleLogoClick}
        >

          <img
            src={utsLogo}
            alt="Univision Technology Solutions"
            className="logo-img"
          />

        </Link> */}


        {/* ===================================================
            HAMBURGER
        =================================================== */}

        <button
          type="button"

          className={`hamburger ${
            open ? "open" : ""
          }`}

          onClick={() => setOpen(!open)}

          aria-label="Toggle navigation menu"

          aria-expanded={open}
        >

          {open
            ? <FaTimes />
            : <FaBars />
          }

        </button>


      </div>


      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      <div
        className={`mobile-overlay ${
          open ? "open" : ""
        }`}

        onClick={closeMenu}
      ></div>


      {/* =====================================================
          MOBILE DRAWER
      ===================================================== */}

      <div
        className={`mobile-menu ${
          open ? "open" : ""
        }`}
      >

        <div className="mobile-menu-inner">


          {/* ===============================================
              MOBILE SOLUTIONS BUTTON
          =============================================== */}

          <button
            type="button"

            className="mobile-dropdown-btn"

            onClick={() =>
              setSolutionsOpen(!solutionsOpen)
            }

            aria-expanded={solutionsOpen}
          >

            Solutions

            <FaChevronDown
              className={`arrow ${
                solutionsOpen ? "open" : ""
              }`}
            />

          </button>


          {/* ===============================================
              MOBILE SOLUTIONS SUBMENU
          =============================================== */}

          <div
            className={`mobile-submenu ${
              solutionsOpen ? "open" : ""
            }`}
          >

            <Link
              to="/silicon"
              onClick={closeMenu}
            >
              Semiconductor
            </Link>


            <Link
              to="/systems"
              onClick={closeMenu}
            >
              Embedded Systems
            </Link>


            <Link
              to="/sustainability"
              onClick={closeMenu}
            >
              Sustainable Digital Solutions
            </Link>

          </div>


          {/* ===============================================
              MOBILE ABOUT
          =============================================== */}

          <Link
            to="/#about"
            onClick={closeMenu}
          >
            About
          </Link>


          {/* ===============================================
              MOBILE PARTNERS
          =============================================== */}

          <Link
            to="/partners"
            onClick={closeMenu}
          >
            Partners
          </Link>


          {/* ===============================================
              MOBILE CONTACT
          =============================================== */}

          <Link
            to="/contact"
            onClick={closeMenu}
          >
            Contact
          </Link>


        </div>

      </div>


    </header>

  );
}