import React from "react";
// import Header from "../Components/Header";
// import Footer from "../Components/Footer";
import "../App.css";

import { Cpu, Bot, CircuitBoard, ArrowRight } from "lucide-react";

const services = [
  {
    no: "01",
    icon: <Bot size={38} strokeWidth={1.8} />,
    title: "Flow Automation using AI/ML",
    description:
      "Automating RTL-to-GDSII design flows with machine learning to reduce verification cycles, eliminate repetitive engineering effort, and accelerate project delivery.",
  },
  {
    no: "02",
    icon: <CircuitBoard size={38} strokeWidth={1.8} />,
    title: "Silicon-Proven SoC IP",
    description:
      "Production-ready IP blocks including processing cores, interconnects, and memory controllers that simplify integration and reduce project risk.",
  },
  {
    no: "03",
    icon: <Cpu size={38} strokeWidth={1.8} />,
    title: "Ready-to-Chip using Agentic AI",
    description:
      "Autonomous AI agents supporting design exploration, bug triage, design-rule validation, and engineering productivity throughout the development cycle.",
  },
];

export default function Silicon() {
  return (
    <>

      {/* HERO */}

      <section className="semi-hero">
        <div className="container">
          <span className="page-tag">SILICON</span>

          <h1>
            Engineering the
            <span> intelligence </span>
            inside the chip.
          </h1>

          <p>
            Selenean Technologies designs and delivers next-generation
            semiconductor IP and solutions that power intelligent electronic
            products. From silicon-proven building blocks to AI-driven design
            automation, we help chipmakers and OEMs accelerate innovation while
            reducing engineering complexity and development cost.
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

              <h2>Accelerating Semiconductor Innovation</h2>
            </div>

            <div>
              <p>
                Our semiconductor engineering expertise combines advanced VLSI
                design methodologies with AI-powered automation to streamline
                chip development from concept through silicon. By integrating
                intelligent workflows with proven engineering practices, we help
                organizations build high-performance and reliable semiconductor
                products faster than ever before.
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
