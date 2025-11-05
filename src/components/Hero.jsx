import React from "react";
import "../styles/Hero.css";
import Orb from "../components/Orb";
import { FaGithub, FaLinkedinIn, FaInstagram, FaEnvelope } from "react-icons/fa";

const Hero = ({ language }) => {
  const isEnglish = language === "en";

  return (
    <section className="hero" id="hero">
      <Orb />

      <div className="hero-content">
        <p className="intro-text">
          {isEnglish ? "Hi, I'm" : "Hola, soy"}
        </p>

        <h1 className="hero-title">Tomás Rivarola</h1>

        <h2 className="hero-subtitle">
          {isEnglish ? "Frontend Developer" : "Desarrollador Frontend"}
        </h2>

        <p className="hero-description">
          {isEnglish
            ? "Turning ideas into digital experiences through clean, modern and dynamic interfaces."
            : "Transformando ideas en experiencias digitales mediante interfaces limpias, modernas y dinámicas."}
        </p>

        <div className="hero-buttons">
          <button className="btn btn-primary">
            {isEnglish ? "Get in touch" : "Contactame"}
          </button>

          <a
            href="https://drive.google.com/uc?export=download&id=119Fa2BdKl2KGVlzfqUCnP6cTuRuSGsVt"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            {isEnglish ? "Download CV" : "Descargar CV"}
          </a>
        </div>

        <div className="social-icons">
          <a
            href="https://www.linkedin.com/in/tomás-rivarola"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://github.com/TomasRivarola451"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/rivarolatomas_/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a href="mailto:tomasrivarola451@gmail.com">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
