// import React, { useEffect, useRef, useState } from "react";
import "../styles/contact.css";
import ContactForm from "../components/contactForm.jsx"

function Contact() {
  return (

    <div className="contact-section">
          <h1 className="contact-title">Get in Touch</h1>
          <sub className="contact-body">Hello, my name is Ryan and I am a software developer</sub>
          <ContactForm />
        </div>
)
}

export default Contact