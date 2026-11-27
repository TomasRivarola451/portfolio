import { useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import "../styles/Contact.css";

const texts = {
  es: {
    availability: "DISPONIBLE PARA OPORTUNIDADES", title: "Hablemos",
    description: "¿Tenés un proyecto en mente o una oportunidad laboral? Me gustaría conocerla.",
    direct: "CONTACTO DIRECTO", emailLink: "Enviame un email", socials: "Redes profesionales",
    name: "TU NOMBRE", email: "TU EMAIL", message: "TU MENSAJE",
    placeholderName: "Nombre completo", placeholderEmail: "correo@ejemplo.com", placeholderMsg: "Contame un poco más...",
    send: "Enviar mensaje", sending: "Enviando...", success: "¡Mensaje enviado con éxito!", error: "Ocurrió un error al enviar el mensaje. Podés volver a intentarlo.",
  },
  en: {
    availability: "AVAILABLE FOR OPPORTUNITIES", title: "Let's talk",
    description: "Have a project in mind or a job opportunity? I'd love to hear about it.",
    direct: "DIRECT CONTACT", emailLink: "Send me an email", socials: "Professional networks",
    name: "YOUR NAME", email: "YOUR EMAIL", message: "YOUR MESSAGE",
    placeholderName: "Full name", placeholderEmail: "email@example.com", placeholderMsg: "Tell me a little more...",
    send: "Send message", sending: "Sending...", success: "Message sent successfully!", error: "Something went wrong. Please try again.",
  },
};

const Contact = ({ language }) => {
  const form = useRef();
  const sending = useRef(false);
  const [status, setStatus] = useState("");
  const t = texts[language] || texts.en;

  const sendEmail = (e) => {
    e.preventDefault();
    if (sending.current) return;
    sending.current = true;
    setStatus("sending");
    emailjs
      .sendForm("TomasRivarolaID", "template_j8s4vj8", form.current, "-KTyR2rAQQJXkkbUy")
      .then(
        () => { setStatus("success"); form.current.reset(); },
        () => setStatus("error")
      )
      .finally(() => { sending.current = false; });
  };

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-heading">
      <div className="contact-container">
        <div className="contact-editorial" data-reveal="up">
          <p className="contact-availability"><span aria-hidden="true" />{t.availability}</p>
          <h2 id="contact-heading">{t.title}<span>.</span></h2>
          <p className="contact-description">{t.description}</p>
          <div className="contact-direct">
            <p>{t.direct}</p>
            <a className="contact-email" href="mailto:tomasrivarola451@gmail.com">{t.emailLink}<span aria-hidden="true">↗</span></a>
            <nav className="contact-socials" aria-label={t.socials}>
              <a href="https://www.linkedin.com/in/tomás-rivarola" target="_blank" rel="noopener noreferrer"><FaLinkedin aria-hidden="true" />LinkedIn<span aria-hidden="true">↗</span></a>
              <a href="https://github.com/TomasRivarola451" target="_blank" rel="noopener noreferrer"><FaGithub aria-hidden="true" />GitHub<span aria-hidden="true">↗</span></a>
              <a href="https://www.instagram.com/rivarolatomas_/" target="_blank" rel="noopener noreferrer"><FaInstagram aria-hidden="true" />Instagram<span aria-hidden="true">↗</span></a>
            </nav>
          </div>
        </div>
        <form ref={form} onSubmit={sendEmail} className="contact-form" aria-busy={status === "sending"} data-reveal="up">
          <div className="contact-field">
            <label htmlFor="contact-name"><span aria-hidden="true">01 /</span>{t.name}</label>
            <input id="contact-name" type="text" name="user_name" autoComplete="name" placeholder={t.placeholderName} required />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-email"><span aria-hidden="true">02 /</span>{t.email}</label>
            <input id="contact-email" type="email" name="user_email" autoComplete="email" placeholder={t.placeholderEmail} required />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-message"><span aria-hidden="true">03 /</span>{t.message}</label>
            <textarea id="contact-message" name="message" placeholder={t.placeholderMsg} required />
          </div>
          <button type="submit" className="contact-send" disabled={status === "sending"}>
            {status === "sending" ? t.sending : t.send}<span aria-hidden="true">↗</span>
          </button>
          <div className="contact-status" aria-live="polite" aria-atomic="true">
            {status === "success" && <p className="contact-success" role="status">{t.success}</p>}
            {status === "error" && <p className="contact-error" role="alert">{t.error}</p>}
          </div>
        </form>
      </div>
    </section>
  );
};
export default Contact;
