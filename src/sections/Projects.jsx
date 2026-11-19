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
        name: "Crux Studio",
        description:
          "Website developed for a tattoo studio, featuring a custom visual identity, responsive design, interactive gallery, and an immersive experience focused on the artist's brand.",
      },
      {
        name: "MoodSync",
        description:
          "A personal project that integrates OpenAI to recommend music based on how you feel. Each mood has its own design: colors, animations, ambient audio. Everything changes according to what the AI ​​detects.",
      },
      {
        name: "Testa Sport",
        description:
          "Commercial website built with Framer for a sportswear brand. Features a category-based product catalog, responsive design, and a simple, intuitive browsing experience.",
      },
      {
        name: "Import Now",
        description:
          "E-commerce for electronic products with a modern design, smooth animations, and a dynamic catalog connected to an external spreadsheet.",
      },
    ],
  },
  es: {
    title: "Proyectos",
    website: "Sitio Web",
    github: "Github",
    projects: [
      {
        name: "Crux Studio",
        description:
          "Sitio web desarrollado para un estudio de tatuajes, con una estética personalizada, diseño responsive, galería interactiva y una experiencia visual enfocada en la identidad del artista.",
      },
      {
        name: "MoodSync",
        description:
          "Proyecto personal que integra OpenAI para recomendar música basada en cómo te sentís, Cada estado tiene su propio diseño: colores, animaciones, audio ambiente. Todo cambia según lo que detecta la IA.",
      },
      {
        name: "Testa Sport",
        description:
          "Sitio web comercial desarrollado en Framer para una marca de indumentaria deportiva. Incluye un catálogo organizado por categorías, diseño responsive y una experiencia de navegación simple e intuitiva.",
      },
      {
        name: "Import Now",
        description:
          "E-commerce de productos electrónicos con diseño moderno, animaciones fluidas y catálogo dinámico conectado a una hoja de cálculo externa.",
      },
    ],
  },
};

const projects = [
  {
    name: "Crux Studio",
    tech: ["React", "TypeScript", "Vite", "CSS Modules"],
    images: ["/images/CruxDeskt.png", "/images/CruxIpad.png", "/images/CruxMovil.png"],
    website: "https://crux-studio.com.ar/",
    github: "https://github.com/TomasRivarola451/crux-studio",
  },
  {
    name: "MoodSync",
    tech: ["React", "Vite", "CSS"],
    images: [
      "/images/MoodDeskt.png",
      "/images/MoodIpad.png",
      "/images/MoodPhone.png",
    ],
    website: "https://moodsync-app.vercel.app/",
    github: "https://github.com/TomasRivarola451/moodsync",
  },
  {
    name: "Testa Sport",
    tech: ["Framer", "Responsive Design", "UI/UX"],
    images: ["/images/TestaDeskt.png", "/images/TestaIpad.png", "/images/TestaMovil.png"],
    website: "https://testasport.ar/",
  },
  {
    name: "Import Now",
    tech: ["React", "Vite", "CSS"],
    images: [
      "/images/ImportDeskt.png",
      "/images/ImportIpad.png",
      "/images/ImportMovil.png",
    ],
    website: "https://import-now.vercel.app/",
    github: "https://github.com/TomasRivarola451/ImportNow",
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
      <h2 className="section-title" data-aos="fade-up">
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
        {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
        >
          <FaGithub className="btn-icon" /> {githubText}
        </a>
        )}
      </div>
    </div>
  );
};

export default Projects;
