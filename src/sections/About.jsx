import "../styles/About.css";

const COPY = {
  es: {
    title: "Sobre mí",
    p1: "Soy Tomás Rivarola, desarrollador frontend de Mendoza, Argentina, con formación en programación y experiencia previa en diseño gráfico.",
    p2: "Combino ambas disciplinas para construir experiencias digitales donde la estética, la funcionalidad y la experiencia de usuario trabajan en conjunto.",
    prefix: "Soy fundador de ",
    suffix: ", mi marca de diseño y desarrollo web, desde donde trabajo con clientes reales y transformo sus ideas en proyectos digitales.",
  },
  en: {
    title: "About me",
    p1: "I'm Tomás Rivarola, a frontend developer based in Mendoza, Argentina, with a background in programming and previous experience in graphic design.",
    p2: "I combine both disciplines to build digital experiences where aesthetics, functionality, and user experience work together.",
    prefix: "I'm the founder of ",
    suffix: ", my web design and development brand, where I work with real clients and turn their ideas into digital projects.",
  },
};
const FRAME = "M185 170 H542 C577 170 598 198 586 232 L478 595 C471 620 450 635 424 635 H49 C19 635 3 609 13 582 L130 215 C140 185 158 170 185 170 Z";

const About = ({ language }) => {
  const t = COPY[language] || COPY.en;
  return (
    <section id="about" className="about-section" aria-labelledby="about-heading">
      <div className="about-layout">
        <h2 className="about-title" data-reveal="up" id="about-heading">{t.title}<span>.</span></h2>
        <figure className="about-portrait" data-reveal="left">
          <svg className="about-ascii" viewBox="0 0 700 760" aria-hidden="true" focusable="false">
            <defs>
              <pattern id="about-ascii-pattern" width="116" height="28" patternUnits="userSpaceOnUse">
                <text x="0" y="18" fill="#9eb5cc" fontSize="16" fontFamily="monospace">S8S88S8S88</text>
              </pattern>
              <radialGradient id="about-ascii-fade"><stop stopColor="white"/><stop offset="1" stopColor="black"/></radialGradient>
              <mask id="about-ascii-mask"><rect width="700" height="760" fill="url(#about-ascii-fade)"/></mask>
            </defs>
            <rect width="700" height="760" fill="url(#about-ascii-pattern)" mask="url(#about-ascii-mask)"/>
          </svg>
          <svg className="about-frame" viewBox="0 0 600 650" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="about-frame-fill" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#17263d"/><stop offset="1" stopColor="#101923"/></linearGradient>
              <clipPath id="about-photo-window" clipPathUnits="objectBoundingBox">
                <path d="M0 0 H1 V.30 L.976 .33 L.796 .933 Q.775 1 .706 1 H.082 Q.01 1 .024 .922 L.218 .30 V0 Z"/>
              </clipPath>
            </defs>
            <path d={FRAME} fill="url(#about-frame-fill)"/>
          </svg>
          <img className="about-photo" src="/images/perfil.png" alt="Tomás Rivarola" width="1000" height="1000" loading="lazy" decoding="async" />
          <svg className="about-frame-outline" viewBox="0 0 600 650" aria-hidden="true" focusable="false"><path d={FRAME} fill="none" stroke="#a5d8ff" strokeWidth="1.2" vectorEffect="non-scaling-stroke"/></svg>
        </figure>
        <div className="about-copy">
          <p data-reveal="up" data-reveal-delay="60">{t.p1}</p>
          <p data-reveal="up" data-reveal-delay="120">{t.p2}</p>
          <p data-reveal="up" data-reveal-delay="180">{t.prefix}<a href="https://tarostudio.framer.website/" target="_blank" rel="noopener noreferrer">Taro Studio <span aria-hidden="true">↗</span></a>{t.suffix}</p>
        </div>
      </div>
    </section>
  );
};
export default About;
