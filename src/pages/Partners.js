import React from "react";
import "../App.css";

import partner1 from "../assets/Tescom logo.png";
import partner2 from "../assets/Trakmate Logo.jpg";
import partner3 from "../assets/Eldaas logo.jpg";
import partner4 from "../assets/Analog-chips logo.webp";

const partners = [
  {
    name: "Tescom",
    logo: partner1,
  },
  {
    name: "Trakmate",
    logo: partner2,
  },
  {
    name: "Eldaas Technologies",
    logo: partner3,
  },
  {
    name: "Analog Chips",
    logo: partner4,
  },
];

export default function Partners() {
  return (
    <>

      <section className="partners-page">
        <div className="container">

          <div className="section-title">
            <small>OUR PARTNERS</small>

            <h2>Trusted Technology Partners</h2>

            <p>
              We collaborate with leading technology companies to deliver
              innovative semiconductor, embedded systems, AI, and sustainable
              digital solutions for our customers.
            </p>
          </div>

          <div className="partners-grid">
            {partners.map((partner) => (
              <div className="partner-card" key={partner.name}>
                <img
                  src={partner.logo}
                  alt={partner.name}
                  loading="lazy"
                  decoding="async"
                  width="220"
                  height="100"
                />
              </div>
            ))}
          </div>

        </div>
      </section>

    </>
  );
}