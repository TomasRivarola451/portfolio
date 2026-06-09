import React, { useEffect } from "react";
import "../styles/About.css";
import profileImg from "/public/images/perfil.png";
import AOS from "aos";
import "aos/dist/aos.css";

const About = ({ language }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: "ease-in-out",
      offset: 100,
    });

    window.addEventListener("load", AOS.refresh);
    window.addEventListener("scroll", AOS.refresh);

    return () => {
      window.removeEventListener("load", AOS.refresh);
      window.removeEventListener("scroll", AOS.refresh);
    };
  }, []);

  const content = {
    en: {
      title: "About Me",
      p1: "I'm Tomás Rivarola, a freelance frontend developer and web designer based in Mendoza, Argentina. I specialize in building clean, modern, and functional interfaces where design and code work together.",
      p2: "My background in graphic design gave me a strong visual foundation that I now apply directly to every web project — from layout and typography to user experience.",
      p3: "I work independently with real clients, taking projects from brief to launch. I focus on detail, usability, and delivering results that communicate clearly and look great.",
      label: "Available to work",
    },
    es: {
      title: "Sobre mí",
      p1: "Soy Tomás Rivarola, desarrollador frontend y diseñador web freelance con base en Mendoza, Argentina. Me especializo en construir interfaces limpias, modernas y funcionales, donde el diseño y el código trabajan juntos.",
      p2: "Mi background en diseño gráfico me dio una base visual sólida que hoy aplico directamente en cada proyecto web: desde la composición y la tipografía hasta la experiencia de usuario.",
      p3: "Trabajo de forma independiente con clientes reales, llevando proyectos desde el brief hasta la publicación. Me enfoco en el detalle, la usabilidad y en entregar resultados que comuniquen bien y se vean mejor.",
      label: "Disponible para trabajar",
    },
  };

  const t = content[language] || content.en;

  return (
    <section id="about" className="about-section" data-aos="fade-up">
      <h2 className="section-title">{t.title}</h2>

      <div className="about-container" data-aos="fade-up" data-aos-delay="200">
        <div className="about-image" data-aos="fade-right" data-aos-delay="300">
          <img src={profileImg} alt="Tomás Rivarola" />
        </div>

        <div className="about-text" data-aos="fade-left" data-aos-delay="400">
          <p>{t.p1}</p>
          <p>{t.p2}</p>
          <p>{t.p3}</p>

          <span className="available-label" data-aos="zoom-in" data-aos-delay="500">
            {t.label}
          </span>
        </div>
      </div>
    </section>
  );
};

export default About;
