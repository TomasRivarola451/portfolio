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
      p1: "I’m Tomás Rivarola, I’m 22 years old, a frontend developer living in Mendoza, Argentina. I enjoy combining design and technology to build clean, modern, and engaging web experiences.",
      p2: "My journey started in graphic design, where I discovered my passion for visual composition. Over time, I found in web development a creative and challenging path that pushes me to think, design, and build every day.",
      p3: "Since 2022, I've been learning and growing through real projects always focused on detail, usability, and delivering intuitive digital interfaces.",
      label: "Available to work",
    },
    es: {
      title: "Sobre mí",
      p1: "Soy Tomás Rivarola, tengo 22 años, soy desarrollador frontend y vivo en Mendoza, Argentina. Disfruto combinar diseño y tecnología para crear experiencias web limpias, modernas y atractivas.",
      p2: "Mi camino comenzó en el diseño gráfico, donde descubrí mi pasión por la composición visual. Con el tiempo, encontré en el desarrollo web un camino creativo y desafiante que me impulsa a pensar, diseñar y construir cada día.",
      p3: "Desde 2022, he estado aprendiendo y creciendo a través de proyectos reales, siempre enfocado en el detalle, la usabilidad y en ofrecer interfaces digitales intuitivas.",
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
