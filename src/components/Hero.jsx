import { memo } from "react";
import GradientASCII from "./GradientASCII/GradientASCII";
import { FaGithub, FaLinkedinIn, FaInstagram, FaEnvelope } from "react-icons/fa";
import "../styles/Hero.css";

const COLORS = ["#17263d", "#9eb5cc", "#a5d8ff", "#456b92"];

// This subtree stays mounted when the page language changes.
const HeroBackground = memo(function HeroBackground() {
  return (
    <div className="hero-background" aria-hidden="true">
      <GradientASCII
        colors={COLORS}
        shape="horizon"
        characters=" =+xX0S8#@"
        cellSize={18}
        density={0.8}
        glyphOpacity={0.85}
        gradientOpacity={0.9}
        glow={0.2}
        depthOfField={0}
        flicker={0.2}
        softness={0.5}
        scale={1}
        flow={0.5}
        speed={1}
        grain={0.08}
        variation={0}
        mouseInteraction={true}
        scrambleRadius={0.1}
        clickEffect="wave"
        intro={true}
        introOffset={0.5}
        lightMode={false}
        fontFamily={'"Geist Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'}
      />
    </div>
  );
});

const Hero = ({ language }) => {
  const isEnglish = language === "en";
  const exploreProjects = () => {
    const section = document.getElementById("projects");
    if (!section) return;
    const navHeight = document.querySelector(".navbar")?.offsetHeight || 0;
    window.scrollTo({
      top: section.getBoundingClientRect().top + window.scrollY - navHeight,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  return (
    <section className="hero" id="hero" aria-labelledby="hero-heading">
      <HeroBackground />
      <div className="hero-inner">
        <div className="hero-heading-block">
          <p className="hero-eyebrow">TOMÁS RIVAROLA<span aria-hidden="true" /></p>
          <h1 className="hero-title" id="hero-heading" aria-label="Frontend Developer.">
            <span>Frontend</span>
            <span>Developer<span className="hero-title-dot">.</span></span>
          </h1>
        </div>
        <div className="hero-side">
          <p className="hero-description">
            <span>{isEnglish ? "Web development, design" : "Desarrollo web, diseño"}</span>{" "}
            <span>{isEnglish ? "and digital experiences." : "y experiencias digitales."}</span>
          </p>
          <div className="hero-actions">
            <button type="button" className="hero-action hero-action-primary" onClick={exploreProjects}>
              {isEnglish ? "Explore my work" : "Ver mis proyectos"}<span aria-hidden="true">↗</span>
            </button>
            <a
              href="https://drive.google.com/file/d/1DNTftyCltN9cn3pqxhNnxX7X__6k45d4/view?usp=drive_link"
              target="_blank" rel="noopener noreferrer"
              className="hero-action hero-action-secondary"
            >
              {isEnglish ? "Download CV" : "Descargar CV"}<span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
      <div className="hero-socials" aria-label={isEnglish ? "Social links" : "Redes sociales"}>
        <a href="https://www.linkedin.com/in/tomás-rivarola" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
        <a href="https://github.com/TomasRivarola451" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
        <a href="https://www.instagram.com/rivarolatomas_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
        <a href="mailto:tomasrivarola451@gmail.com" aria-label="Email"><FaEnvelope /></a>
      </div>
    </section>
  );
};

export default Hero;
