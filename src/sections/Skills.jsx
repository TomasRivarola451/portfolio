import "../styles/Skills.css";

const technologies = [
  ["html5", "HTML5", "frontend"],
  ["css3", "CSS3", "frontend"],
  ["javascript", "JavaScript", "frontend"],
  ["typescript", "TypeScript", "frontend"],
  ["react", "React", "frontend"],
  ["nextjs", "Next.js", "frontend"],
  ["tailwindcss", "Tailwind CSS", "frontend"],
  ["bootstrap", "Bootstrap", "frontend"],
  ["figma", "Figma", "design"],
  ["framer", "Framer", "design"],
  ["git", "Git", "tools"],
  ["github", "GitHub", "tools"],
  ["vite", "Vite", "tools"],
  ["npm", "npm", "tools"],
  ["vercel", "Vercel", "tools"],
  ["cursor", "Cursor", "ai"],
  ["claude", "Claude", "ai"],
  ["chatgpt", "ChatGPT", "ai"],
  ["codex", "Codex", "ai"],
].map(([id, name, category]) => ({ id, name, category, logo: `/icons/skills/${id}.svg` }));

const categoryIds = ["frontend", "design", "tools", "ai"];
const translations = {
  es: {
    title: "Habilidades",
    intro: "Tecnologías y herramientas que forman parte de mi proceso creativo y de desarrollo.",
    categories: { frontend: "Desarrollo Frontend", design: "Diseño y No-Code", tools: "Herramientas de desarrollo", ai: "Herramientas de IA" },
    complementaryLabel: "Conocimientos complementarios",
    complementary: ["Diseño responsive", "Mobile First", "UX/UI", "APIs REST", "Componentes reutilizables"],
  },
  en: {
    title: "Skills",
    intro: "Technologies and tools that are part of my creative and development process.",
    categories: { frontend: "Frontend Development", design: "Design & No-Code", tools: "Development Tools", ai: "AI Tools" },
    complementaryLabel: "Complementary knowledge",
    complementary: ["Responsive Design", "Mobile First", "UX/UI", "REST APIs", "Reusable Components"],
  },
};

const Skills = ({ language }) => {
  const copy = translations[language] || translations.en;
  return (
    <section className="skills-section" id="skills" aria-labelledby="skills-heading">
      <div className="skills-container">
        <div className="skills-layout">
          <header className="skills-intro" data-reveal="up">
            <h2 id="skills-heading">{copy.title}<span>.</span></h2>
            <p>{copy.intro}</p>
          </header>
          <div className="skills-categories">
            {categoryIds.map((category, index) => (
              <section className="skills-category" key={category} data-reveal="up" data-reveal-delay={index * 70} aria-labelledby={`skills-${category}-heading`}>
                <header className="skills-category-heading">
                  <span className="skills-number" aria-hidden="true">{String(index + 1).padStart(2, "0")} /</span>
                  <h3 id={`skills-${category}-heading`}>{copy.categories[category]}</h3>
                </header>
                <ul className="skills-technologies" aria-labelledby={`skills-${category}-heading`}>
                  {technologies.filter(technology => technology.category === category).map(technology => (
                    <li className="skills-technology" key={technology.id}>
                      <div className="skills-logo-frame">
                        <img src={technology.logo} alt="" aria-hidden="true" width="48" height="48" loading="lazy" decoding="async" />
                      </div>
                      <span className="skills-technology-name">{technology.name}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
        <ul className="skills-complementary" data-reveal="fade" aria-label={copy.complementaryLabel}>
          {copy.complementary.map(item => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </section>
  );
};

export default Skills;
