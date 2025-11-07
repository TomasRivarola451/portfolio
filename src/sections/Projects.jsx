import React, { useState, useEffect } from "react";
import "./../styles/Projects.css";
import { FaGlobe, FaGithub } from "react-icons/fa";
import { SiReact, SiTailwindcss, SiNextdotjs } from "react-icons/si";
import AOS from "aos";
import "aos/dist/aos.css";

// Traducciones
const translations = {
  en: {
    title: "Projects",
    website: "Website",
    github: "Github",
    projects: [
      {
        name: "ImportNow",
        description:
          "E-commerce for electronic products with a modern design, smooth animations, and a dynamic catalog connected to an external spreadsheet.",
      },
      {
        name: "RiffHouse",
        description:
          "Responsive guitar and accessories store with a dynamic product catalog and minimalist layout.",
      },
      {
        name: "Bota de Oro",
        description:
          "Web store specialized in football boots, with a dark modern design, smooth animations, and professional layout.",
      },
      {
        name: "Text Analyzer",
        description:
          "Advanced text analysis tool with sentiment analysis, readability metrics, and word frequency visualization.",
      },
    ],
  },
  es: {
    title: "Proyectos",
    website: "Sitio Web",
    github: "Github",
    projects: [
      {
        name: "ImportNow",
        description:
          "E-commerce de productos electrónicos con diseño moderno, animaciones fluidas y catálogo dinámico conectado a una hoja de cálculo externa.",
      },
      {
        name: "RiffHouse",
        description:
          "Tienda de guitarras y accesorios responsive, con catálogo dinámico y diseño minimalista.",
      },
      {
        name: "Bota de Oro",
        description:
          "Tienda web especializada en botines de fútbol, con diseño oscuro, moderno, animaciones suaves y estructura profesional.",
      },
      {
        name: "Text Analyzer",
        description:
          "Herramienta avanzada de análisis de texto con análisis de sentimiento, métricas de legibilidad y visualización de la frecuencia de palabras.",
      },
    ],
  },
};

const projects = [
  {
    name: "ImportNow",
    tech: ["React", "Vite", "CSS"],
    images: [
      "/images/importDeskt.svg",
      "/images/ImportIpad.svg",
      "/images/ImportMovil.svg",
    ],
    website: "https://import-now.vercel.app/",
    github: "https://github.com/TomasRivarola451/ImportNow",
  },
  {
    name: "RiffHouse",
    tech: ["React", "Vite", "CSS"],
    images: [
      "/images/RiffDeskt.svg",
      "/images/RiffIpad.svg",
      "/images/RiffMovil.svg",
    ],
    website: "https://riff-house.vercel.app/",
    github: "https://github.com/TomasRivarola451/RiffHouse",
  },
  {
    name: "Bota de Oro",
    tech: ["React", "Vite", "CSS"],
    images: [
      "/images/BotaDeskt.svg",
      "/images/BotaIpad.svg",
      "/images/BotaMovil.svg",
    ],
    website: "https://bota-de-oro.vercel.app/",
    github: "https://github.com/TomasRivarola451/Bota-de-Oro",
  },
  {
    name: "Text Analyzer",
    tech: ["React", "Vite", "TailwindCss"],
    images: [
      "/images/TextDeskt.svg",
      "/images/TextIpad.svg",
      "/images/TextMovil.svg",
    ],
    website: "https://text-analyzer-beryl.vercel.app/",
    github: "https://github.com/TomasRivarola451/text-analyzer",
  },
];

const techIcons = {
  React: <SiReact className="tech-icon react" />,
  Vite: (
    <img
      src="https://raw.githubusercontent.com/vitejs/vite/main/docs/public/logo.svg"
      alt="Vite logo"
      className="tech-icon vite-icon"
    />
  ),
  CSS: (
    <img
      src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg"
      alt="CSS3 logo"
      className="tech-icon css-icon"
    />
  ),
  TailwindCss: <SiTailwindcss className="tech-icon tailwind" />,
  NextJs: <SiNextdotjs className="tech-icon next" />,
};

const Projects = ({ language }) => {
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

  const langData = translations[language] || translations.en;

  return (
    <section className="projects-section" id="projects">
      <h2 className="projects-title" data-aos="fade-up">
        {langData.title}
      </h2>

      <div className="projects-container">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            langData={langData.projects[index]}
            websiteText={langData.website}
            githubText={langData.github}
          />
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ project, langData, websiteText, githubText }) => {
  const [mainImage, setMainImage] = useState(project.images[0]);

  return (
    <div className="project-card" data-aos="fade-up" data-aos-delay="200">
      <div className="project-images">
        <div className="thumbnails">
          {project.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${project.name} view ${i}`}
              className={`thumbnail ${mainImage === img ? "active-thumb" : ""}`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
        <div className="main-image">
          <img src={mainImage} alt={project.name} />
        </div>
      </div>

      <h3 className="project-name">{langData.name}</h3>
      <div className="project-tech">
        {project.tech.map((t, i) => (
          <span key={i} className="tech-tag">
            {techIcons[t] && <span className="icon-wrapper">{techIcons[t]}</span>}
            {t}
          </span>
        ))}
      </div>
      <p className="project-description">{langData.description}</p>

      <div className="project-buttons">
        <a
          href={project.website}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          <FaGlobe className="btn-icon" /> {websiteText}
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
        >
          <FaGithub className="btn-icon" /> {githubText}
        </a>
      </div>
    </div>
  );
};

export default Projects;
