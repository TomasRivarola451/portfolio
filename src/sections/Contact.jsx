import { useRef, useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/Contact.css";

const Contact = ({ language }) => {
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

  // Traducción dinámica
  const texts = {
    en: {
      title: "Contact",
      name: "Name",
      email: "Email",
      message: "Message",
      placeholderName: "Your name",
      placeholderEmail: "youremail@example.com",
      placeholderMsg: "Write your message...",
      send: "Send",
      sending: "Sending...",
      success: "✅ Message sent successfully!",
      error: "❌ Something went wrong.",
    },
    es: {
      title: "Contacto",
      name: "Nombre",
      email: "Correo electrónico",
      message: "Mensaje",
      placeholderName: "Tu nombre",
      placeholderEmail: "tucorreo@ejemplo.com",
      placeholderMsg: "Escribe tu mensaje...",
      send: "Enviar",
      sending: "Enviando...",
      success: "✅ ¡Mensaje enviado con éxito!",
      error: "❌ Ocurrió un error.",
    },
  };

  const t = texts[language === "es" ? "es" : "en"];

  return (
    <section className="contact-section" id="contact">
      <h2 className="contact-title" data-aos="fade-up">
        {t.title}
      </h2>

      <div className="contact-container">
        {/* Redes sociales */}
        <div className="social-cards" data-aos="fade-right">
          <a
            href="mailto:tomasrivarola451@gmail.com"
            target="_blank"
            className="social-card"
            rel="noopener noreferrer"
          >
            <FaEnvelope className="social-icon" />
            <h3>Email</h3>
            <p>tomasrivarola451@gmail.com</p>
          </a>

          <a
            href="https://www.linkedin.com/in/tomás-rivarola"
            target="_blank"
            className="social-card"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="social-icon" />
            <h3>LinkedIn</h3>
            <p>www.linkedin.com/in/tomás-rivarola</p>
          </a>

          <a
            href="https://www.instagram.com/rivarolatomas_/"
            target="_blank"
            className="social-card"
            rel="noopener noreferrer"
          >
            <FaInstagram className="social-icon" />
            <h3>Instagram</h3>
            <p>@rivarolatomas_</p>
          </a>

          <a
            href="https://github.com/TomasRivarola451"
            target="_blank"
            className="social-card"
            rel="noopener noreferrer"
          >
            <FaGithub className="social-icon" />
            <h3>GitHub</h3>
            <p>github.com/TomasRivarola451</p>
          </a>
        </div>

        {/* Formulario */}
        <div className="form-card" data-aos="fade-left">
          <form ref={form} onSubmit={sendEmail} className="contact-form">
            <div className="input-group">
              <label>{t.name}</label>
              <input
                type="text"
                name="user_name"
                placeholder={t.placeholderName}
                required
              />
            </div>

            <div className="input-group">
              <label>{t.email}</label>
              <input
                type="email"
                name="user_email"
                placeholder={t.placeholderEmail}
                required
              />
            </div>

            <div className="input-group">
              <label>{t.message}</label>
              <textarea
                name="message"
                placeholder={t.placeholderMsg}
                required
              ></textarea>
            </div>

            <button type="submit" className="send-btn">
              {status === "sending" ? t.sending : t.send}
            </button>

            {status === "success" && (
              <p className="success-message">{t.success}</p>
            )}
            {status === "error" && (
              <p className="error-message">{t.error}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
