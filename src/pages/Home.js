import React from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaPlayCircle,
  FaMicrochip,
  FaServer,
  FaLeaf,
  FaLightbulb,
  FaCog,
  FaHandshake
} from "react-icons/fa";

import siliconImg from "../assets/silicon.webp";
import systemImg from "../assets/systems.webp";
import sustainabilityImg from "../assets/sustainability.webp";

import "../App.css";

export default function Home() {
  return (
    <div className="home">
      <div className="homepage-wrapper">

        {/* HERO */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-left">
              <h1>
                Engineering
                <br />
                <span>Tomorrow's Technology</span>
              </h1>

              <h3>Silicon • Systems • Sustainability</h3>

              <p>
                Driving innovation through world-class engineering solutions
                for Semiconductor, Embedded Systems and Sustainable Digital
                Solutions, enabling a smarter, cleaner and more connected
                world.
              </p>

              <div className="hero-buttons">
                <Link to="/#solutions" className="btn-primary">
                  Explore Solutions <FaArrowRight />
                </Link>

                <Link to="/#about" className="btn-secondary">
                  <FaPlayCircle />
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="solutions" className="services-section">
          <div className="services-grid">

            {/* Silicon */}
            <div className="service-card silicon-card">
              <img
                src={siliconImg}
                alt="Silicon"
                loading="lazy"
                decoding="async"
              />

              <div className="card-overlay">
                <div className="icon-box">
                  <FaMicrochip />
                </div>

                <h2>Silicon</h2>

                <p>
                  Offering products and solutions for cutting-edge semiconductor
                  technologies in the following areas:
                </p>

                <ul>
                  <li>Flow automation using AI/ML</li>
                  <li>Silicon-proven SoC IP</li>
                  <li>Ready-to-chip solutions using Agentic AI</li>
                </ul>

                <Link to="/silicon">
                  Learn More <FaArrowRight />
                </Link>
              </div>
            </div>

            {/* Right Cards */}
            <div className="right-cards">

              <div className="service-card systems-card">
                <img
                  src={systemImg}
                  alt="Systems"
                  loading="lazy"
                  decoding="async"
                />

                <div className="card-overlay light">
                  <div className="icon-box light-icon">
                    <FaServer />
                  </div>

                  <div className="card-text">
                    <h2>Systems</h2>

                    <p>
                      Building innovative IoT products for real world
                      applications catering to different industries.
                    </p>

                    <ul>
                      <li>IoT sensors for Automotive</li>
                      <li>Digital smart meters</li>
                      <li>Nvidia Jetson based IoT Platform</li>
                    </ul>

                    <Link to="/systems">
                      Learn More <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="service-card sustainability-card">
                <img
                  src={sustainabilityImg}
                  alt="Sustainability"
                  loading="lazy"
                  decoding="async"
                />

                <div className="card-overlay light">
                  <div className="icon-box green-icon">
                    <FaLeaf />
                  </div>

                  <div className="card-text">
                    <h2>Sustainability</h2>

                    <p>
                      Driving sustainability through Digital Twins,
                      AI-driven analytics and decarbonization.
                    </p>

                    <ul>
                      <li>UniAIPower</li>
                      <li>UniAIDC</li>
                      <li>UniAIIoT</li>
                    </ul>

                    <Link to="/sustainability">
                      Learn More <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ABOUT SECTION */}

        <section id="about" className="about-home">

          <div className="about-top">

            <div className="about-left">

              <span className="about-tag">ABOUT US</span>

              <div className="about-heading">

                <div className="heading-line"></div>

                <h2>
                  Scaling Heights
                  <br />
                  <span>Through Innovation</span>
                </h2>

              </div>

            </div>

            <div className="about-right">

              <p>
                <strong>Selenean Technologies</strong> is a leading engineering
                company specializing in Semiconductor Design, Embedded Systems
                and Sustainable Digital Solutions.
              </p>

              <p>
                We help businesses accelerate innovation through advanced
                silicon engineering, intelligent system development and
                AI-driven sustainability solutions.
              </p>

              <p>
                With expertise across ASIC/SoC Design, Embedded Platforms,
                IoT, Digital Twins and Data Centre Decarbonization,
                we transform ideas into reliable products.
              </p>

            </div>

          </div>

          <div className="about-cards">

            <div className="about-card">

              <div className="card-icon innovation">
                <FaLightbulb />
              </div>

              <h3>Innovation</h3>

              <p>
                Developing next-generation technologies that accelerate digital transformation.
              </p>

              <Link to="/#about">
                Learn More <FaArrowRight />
              </Link>

            </div>

            <div className="about-card">

              <div className="card-icon engineering">
                <FaCog />
              </div>

              <h3>Quality</h3>

              <p>
                Delivering reliable, scalable and high-performance engineering
                solutions with uncompromised quality.
              </p>

              <Link to="/#about">
                Learn More <FaArrowRight />
              </Link>

            </div>

            <div className="about-card">

              <div className="card-icon customer">
                <FaHandshake />
              </div>

              <h3>Customer Focus</h3>

              <p>
                Building long-term partnerships by delivering customized solutions that drive business success.
              </p>

              <Link to="/#about">
                Learn More <FaArrowRight />
              </Link>

            </div>

          </div>

        </section>

      </div>
    </div>
  );
}