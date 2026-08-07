import React from "react";
// import Header from "../Components/Header";
// import Footer from "../Components/Footer";
import "../App.css";

import { Zap, Server, Network, ArrowRight } from "lucide-react";

const services = [
  {
    no: "01",
    icon: <Zap size={38} strokeWidth={1.8} />,
    title: "UnitwinPower",
    description:
      "Digital twin platform for power systems that models grid behavior in real time, enabling predictive load balancing and fault detection",
  },
  {
    no: "02",
    icon: <Server size={38} strokeWidth={1.8} />,
    title: "UnitwinDC",
    description:
      "Data-center digital twin and energy-optimization engine that reduces PUE (Power Usage Effectiveness) through AI-driven cooling and workload orchestration",
  },
  {
    no: "03",
    icon: <Network size={38} strokeWidth={1.8} />,
    title: "UnitwinIoT",
    description:
      "Unified IoT data platform aggregating sensor data across facilities to drive sustainability dashboards and decarbonization reporting",
  },
];

export default function Sustainability() {
  return (
    <>

      {/* HERO */}

      <section className="semi-hero">
        <div className="container">
          <span className="page-tag">SUSTAINABLE DIGITAL SOLUTIONS</span>

          <h1>
            Powering a smarter,
            <span> greener </span>
            grid.
          </h1>

          <p>
            Selenean Technologies partners with energy and infrastructure
            players to accelerate the shift toward sustainable, data-driven
            operations. Using digital twin technology, AI-powered analytics, and
            optimization algorithms, our Unitwin suite of IPs helps
            organizations reduce energy waste, improve operational visibility,
            and meet decarbonization targets — without compromising
            performance.{" "}
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

              <h2>Accelerating Sustainable Digital Transformation</h2>
            </div>

            <div>
              <p>
                Our Sustainable Digital Solutions combine Digital Twins,
                Artificial Intelligence, and Industrial IoT to optimize critical
                infrastructure, improve operational efficiency, and reduce
                carbon emissions. We help utilities, data centers, and
                industrial enterprises make informed, real-time decisions that
                drive energy efficiency, operational resilience, and long-term
                sustainability.
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
