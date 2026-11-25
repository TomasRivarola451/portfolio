import { useEffect, useState } from "react";
import "./../styles/Projects.css";
import { FaArrowUp, FaGithub, FaLaptop, FaTabletAlt, FaMobileAlt } from "react-icons/fa";
import { SiReact, SiTailwindcss, SiNextdotjs } from "react-icons/si";

// Traducciones
const translations = {
  en: {
    title: "Projects",
    intro: "A selection of client and personal projects that reflect my approach to design, development, and user experience.",
    devices: ["MacBook", "iPad", "iPhone"],
    selector: "Device preview",
    loading: "Loading preview…",
    error: "The preview could not be loaded. Please try again.",
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
    intro: "Una selección de proyectos reales y personales que reflejan mi enfoque en el diseño, el desarrollo y la experiencia de usuario.",
    devices: ["MacBook", "iPad", "iPhone"],
    selector: "Vista por dispositivo",
    loading: "Cargando vista…",
    error: "No se pudo cargar la vista. Volvé a intentarlo.",
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

const DEVICE_ICONS = [FaLaptop, FaTabletAlt, FaMobileAlt];

const Projects = ({ language }) => {
  const langData = translations[language] || translations.en;
  return (
    <section className="projects-section" id="projects" aria-labelledby="projects-heading">
      <div className="projects-container">
        <header className="projects-header">
          <h2 id="projects-heading">{langData.title}<span>.</span></h2>
          <p>{langData.intro}</p>
        </header>
        <div className="projects-list">
          {projects.map((project, index) => (
            <ProjectShowcase key={project.name} project={project} index={index} copy={langData} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectShowcase = ({ project, index, copy }) => {
  const [selected, setSelected] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [error, setError] = useState(false);
  const pending = selected !== displayed;
  const headingId = `project-${index + 1}-heading`;
  const previewId = `project-${index + 1}-preview`;
  const text = copy.projects[index];

  // Keep the current preview visible until the requested original is decoded.
  // Cleanup ignores stale loads after rapid selection changes or unmounting.
  useEffect(() => {
    if (selected === displayed) return;
    let current = true;
    const image = new Image();
    image.src = project.images[selected];
    image.decode().then(() => {
      if (current) setDisplayed(selected);
    }).catch(() => {
      if (current) { setSelected(displayed); setError(true); }
    });
    return () => { current = false; };
  }, [selected, displayed, project.images]);

  return (
    <article className={`project-row${index % 2 ? " project-row-reversed" : ""}`} aria-labelledby={headingId}>
      <header className="project-heading">
        <p className="project-number">{String(index + 1).padStart(2, "0")} /</p>
        <h3 id={headingId}>{text.name}</h3>
      </header>
      <figure className="project-visual">
        <div className="project-preview" id={previewId} aria-busy={pending}>
          <img src={project.images[displayed]} alt={`${project.name} — ${copy.devices[displayed]}`} loading="lazy" decoding="async" />
        </div>
        <figcaption className="project-device-controls">
          <div className="project-device-group" role="group" aria-label={`${copy.selector} — ${project.name}`}>
            {DEVICE_ICONS.map((Icon, device) => (
              <button key={device} type="button" className="project-device" aria-label={`${project.name} — ${copy.devices[device]}`} title={copy.devices[device]} aria-pressed={selected === device} aria-controls={previewId} onClick={() => { setError(false); setSelected(device); }}>
                <Icon aria-hidden="true" focusable="false" />
              </button>
            ))}
          </div>
          <span className="project-device-label" aria-hidden="true">{copy.devices[selected]}</span>
          <span className="sr-only" role="status">{error ? copy.error : pending ? copy.loading : ""}</span>
        </figcaption>
      </figure>
      <div className="project-details">
        <p className="project-description">{text.description}</p>
        <ul className="project-tech" aria-label={project.name + " — " + (copy === translations.es ? "Tecnologías" : "Technologies")}>
          {project.tech.map(tech => (
            <li key={tech} className="project-tag">
              {techIcons[tech] && <span className="project-tech-icon" aria-hidden="true">{techIcons[tech]}</span>}{tech}
            </li>
          ))}
        </ul>
        <div className="project-links">
          <a href={project.website} target="_blank" rel="noopener noreferrer">{copy.website}<FaArrowUp className="project-external-icon" aria-hidden="true" /></a>
          {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer"><FaGithub aria-hidden="true" />{copy.github}<FaArrowUp className="project-external-icon" aria-hidden="true" /></a>}
        </div>
      </div>
    </article>
  );
};

export default Projects;
