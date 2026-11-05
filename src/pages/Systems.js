import React from "react";
// import Header from "../Components/Header";
// import Footer from "../Components/Footer";
import "../App.css";

import { Microchip, Car, Gauge, ArrowRight } from "lucide-react";

const services = [
  {
    no: "01",
    icon: <Car size={38} strokeWidth={1.8} />,
    title: "IoT Sensors for Automotive",
    description:
      "Ruggedized sensing modules for vehicle telemetry, driver-assistance systems, predictive maintenance, and connected mobility applications.",
  },
  {
    no: "02",
    icon: <Gauge size={38} strokeWidth={1.8} />,
    title: "Digital Smart Meters",
    description:
      "Connected metering solutions for utilities enabling remote monitoring, load analytics, energy optimization, and tamper detection.",
  },
  {
    no: "03",
    icon: <Microchip size={38} strokeWidth={1.8} />,
    title: "NVIDIA Jetson-Based IoT Platforms",
    description:
      "Edge-AI computing platforms delivering real-time vision, AI inferencing, industrial automation, robotics, and intelligent edge applications.",
  },
];

export default function Systems() {
  return (
    <>

      {/* HERO */}

      <section className="semi-hero">
        <div className="container">
          <span className="page-tag">SYSTEMS</span>

          <h1>
            Turning connected
            <span> ideas </span>
            into working products.
          </h1>

          <p>
            We build embedded and IoT products that bridge the physical and
            digital worlds — from sensor to cloud. Our engineering teams
            prototype, validate, and productize embedded solutions across
            industries, with a strong focus on edge intelligence, real-time data
            capture, and scalable connectivity. Every solution is built to move
            from proof-of-concept to field deployment with minimal friction.
          </p>

          <a href="#services" className="primary-btn">
            Explore Solutions
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* ABOUT */}

      <section className="semi-about">
        <div className="container">
          <div className="about-grid">
            <div>
              <span className="section-tag">WHY SELENEAN</span>

              <h2>Engineering Intelligent Embedded Systems</h2>
            </div>

            <div>
              <p>
                Selenean Technologies develops intelligent embedded hardware and
                IoT platforms that enable connected products across automotive,
                industrial, energy, and smart infrastructure applications. From
                edge devices and embedded software to AI-powered platforms, we
                help organizations design, deploy, and scale reliable connected
                solutions with faster time-to-market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}

      <section className="semi-services" id="services">
        <div className="container">
          <div className="section-title">
            <small>OUR OFFERINGS</small>

            <h2>What We Deliver</h2>
          </div>

          <div className="service-grid">
            {services.map((item) => (
              <div
                className={`service-card ${
                  item.no === "04" ? "service-card-center" : ""
                }`}
                key={item.no}
              >
                <div className="service-icon">{item.icon}</div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <div className="service-number">{item.no}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </>
  );
}
