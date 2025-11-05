import { useRef, useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/Contact.css";

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  useEffect(() => {
    AOS.init({ duration: 900, once: false });
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");
    emailjs
      .sendForm("TomasRivarolaID", "template_j8s4vj8", form.current, "-KTyR2rAQQJXkkbUy")
      .then(
        () => {
          setStatus("success");
          e.target.reset();
        },
        () => setStatus("error")
      );
  };

  return (
    <section className="contact-section" id="contact">
      <h2 className="contact-title" data-aos="fade-up">
        Contact
      </h2>

      <div className="contact-container">
        <div className="social-cards" data-aos="fade-right">
          <div className="social-card">
            <FaEnvelope className="social-icon" />
            <h3>Email</h3>
            <a href="mailto:tomasrivarolad451@gmail.com">tomasrivarola451@gmail.com</a>
          </div>

          <div className="social-card">
            <FaLinkedin className="social-icon" />
            <h3>LinkedIn</h3>
            <a href="www.linkedin.com/in/tomás-rivarola" target="_blank">
              www.linkedin.com/in/tomás-rivarola
            </a>
          </div>

          <div className="social-card">
            <FaInstagram className="social-icon" />
            <h3>Instagram</h3>
            <a href="https://www.instagram.com/rivarolatomas_/" target="_blank">
              @rivarolatomas_
            </a>
          </div>

          <div className="social-card">
            <FaGithub className="social-icon" />
            <h3>GitHub</h3>
            <a href="https://github.com/TomasRivarola451" target="_blank">
              https://github.com/TomasRivarola451
            </a>
          </div>
        </div>

        <div className="form-card" data-aos="fade-left">
          <form ref={form} onSubmit={sendEmail} className="contact-form">
            <div className="input-group">
              <label>Name</label>
              <input type="text" name="user_name" placeholder="Your name" required />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input type="email" name="user_email" placeholder="youremail@example.com" required />
            </div>

            <div className="input-group">
              <label>Message</label>
              <textarea name="message" placeholder="Write your message..." required></textarea>
            </div>

            <button type="submit" className="send-btn">
              {status === "sending" ? "Sending..." : "Send"}
            </button>

            {status === "success" && <p className="success-message">✅ Message sent successfully!</p>}
            {status === "error" && <p className="error-message">❌ Something went wrong.</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
