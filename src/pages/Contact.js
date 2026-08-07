import React, { useState } from "react";
import "../App.css";

import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheckCircle,
  FaClock,
  FaHeadset,
  FaShieldAlt,
  FaLightbulb,
} from "react-icons/fa";

const contactInfo = [
  {
    icon: <FaEnvelope />,
    title: "Email Us",
    value: "sales@seleneantech.com",
    note: "We reply within 24 hours",
  },
  {
    icon: <FaPhoneAlt />,
    title: "Call Us",
    value: "+91 98807 19724",
    note: "Mon – Sat, 9:00 AM – 6:00 PM IST",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Corporate Office",
    value:
      "Nandi Infotech, KIADB Plot No. 8, 1st Cross, Sadaramangala Road, Mahadevapura Post, Bengaluru – 560048",
    note: "Bengaluru, India",
  },
];

const perks = [
  {
    icon: <FaHeadset />,
    text: "Dedicated engineering team for every engagement",
  },
  {
    icon: <FaShieldAlt />,
    text: "Confidential and secure handling of your IP",
  },
  {
    icon: <FaLightbulb />,
    text: "End-to-end support from idea to deployment",
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* HERO */}

      <section className="contact-hero">
        <div className="container">
          <span className="page-tag">CONTACT US</span>

          <h1>
            Let's build the
            <span> future </span>
            together.
          </h1>

          <p>
            Have a project in mind or a question about our solutions? Our team
            is ready to help — reach out and let's start the conversation.
          </p>
        </div>
      </section>

      {/* INFO CARDS */}

      <section className="contact-info">
        <div className="container">
          <div className="contact-cards">
            {contactInfo.map((item) => (
              <div className="contact-card" key={item.title}>
                <div className="contact-card-icon">{item.icon}</div>

                <h3>{item.title}</h3>

                <p className="contact-card-value">{item.value}</p>

                <p className="contact-card-note">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM + DETAILS */}

      <section className="contact-form-section">
        <div className="container">
          <div className="contact-layout">
            <div className="contact-form-wrap">
              <span className="section-tag">SEND A MESSAGE</span>

              <h2>Tell us about your project</h2>

              {submitted ? (
                <div className="contact-success">
                  <div className="contact-success-icon">
                    <FaCheckCircle />
                  </div>

                  <h3>Thank you for reaching out!</h3>

                  <p>
                    Your message has been received. Our team will get back to
                    you within one business day.
                  </p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="name">Full Name</label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="email">Email Address</label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@company.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="subject">Subject</label>

                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="How can we help you?"
                      value={form.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="message">Message</label>

                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      placeholder="Tell us about your project, timelines and requirements..."
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="primary-btn contact-submit">
                    Send Message
                    <FaPaperPlane />
                  </button>
                </form>
              )}
            </div>

            <aside className="contact-side">
              <span className="contact-side-tag">WHY SELENEAN</span>

              <h2>We're here to help</h2>

              <p>
                Whether you need silicon engineering, embedded systems or
                sustainable digital solutions, our specialists respond fast and
                tailor the approach to your goals.
              </p>

              <ul className="contact-perks">
                {perks.map((perk) => (
                  <li key={perk.text}>
                    <div className="contact-perk-icon">{perk.icon}</div>

                    <span>{perk.text}</span>
                  </li>
                ))}
              </ul>

              <div className="contact-hours">
                <div className="contact-hours-icon">
                  <FaClock />
                </div>

                <div>
                  <h4>Office Hours</h4>

                  <p>
                    Monday – Saturday
                    <br />
                    9:00 AM – 6:00 PM IST
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
