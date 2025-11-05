import React, { useState, useEffect } from "react";
import "./../styles/projects.css";
import { FaGlobe, FaGithub } from "react-icons/fa";
import { SiReact, SiTailwindcss, SiNextdotjs } from "react-icons/si";
import AOS from "aos";
import "aos/dist/aos.css";

const projects = [
  {
    name: "ImportNow",
    description:
      "E-commerce for electronic products with a modern design, smooth animations, and a dynamic catalog connected to an external spreadsheet.",
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
    description:
      "Responsive guitar and accessories store with a dynamic product catalog and minimalist layout.",
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
    description:
      "Web store specialized in football boots, with a dark modern design, smooth animations, and professional layout.",
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
    name: "Spotify Clone",
    description:
      "Functional clone of the Spotify Web interface, featuring dynamic playlists, interactive player, and design identical to the original app.",
    tech: ["React", "Vite", "TailwindCss"],
    images: [
      "/projects/spotify-mobile.png",
      "/projects/spotify-tablet.png",
      "/projects/spotify-desktop.png",
    ],
    website: "https://spotifyclone.vercel.app",
    github: "https://github.com/tomasrivarola/spotify-clone",
  },
];

const techIcons = {
  React: <SiReact className="tech-icon react" />,
  Vite: (
    <img
      src="https://raw.githubusercontent.com/vitejs/vite/main/docs/public/logo.svg"
      alt="Vite logo"
      className="tech-icon vite-img"
    />
  ),
  CSS: (
    <img
      src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg"
      alt="CSS3 logo"
      className="tech-icon css-img"
    />
  ),
  TailwindCss: <SiTailwindcss className="tech-icon tailwind" />,
  NextJs: <SiNextdotjs className="tech-icon next" />,
};

const Projects = () => {
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

  return (
    <section className="projects-section" id="projects">
      <h2 className="projects-title" data-aos="fade-up">
        Projects
      </h2>
      <div className="projects-container">
        {projects.map((project, index) => (
          <ProjectCard project={project} key={index} />
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ project }) => {
  const [mainImage, setMainImage] = useState(project.images[2]);

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

      <h3 className="project-name">{project.name}</h3>
      <div className="project-tech">
        {project.tech.map((t, i) => (
          <span key={i} className="tech-tag">
            {techIcons[t] && <span className="icon-wrapper">{techIcons[t]}</span>}
            {t}
          </span>
        ))}
      </div>
      <p className="project-description">{project.description}</p>

      <div className="project-buttons">
        <a
          href={project.website}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          <FaGlobe className="btn-icon" /> Website
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
        >
          <FaGithub className="btn-icon" /> Github
        </a>
      </div>
    </div>
  );
};

export default Projects;
