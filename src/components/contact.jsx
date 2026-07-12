// import React, { useEffect, useRef, useState } from "react";
import "../styles/contact.css";
import ContactForm from "../components/contactForm.jsx";

function Contact() {
  return (
    <div className="contact-section">
      <div className="contact-wrapper">
        <div className="contact-body">
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-body-text">
            Got a project in mind, or a question? Send me an e-mail! I'm always
            looking for more collaboration as well as meeting new people!
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}

export default Contact;
