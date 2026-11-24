import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/Navbar.css";

const SECTIONS = [
  ["hero", "Home", "Inicio"],
  ["about", "About", "Sobre mí"],
  ["projects", "Projects", "Proyectos"],
  ["skills", "Skills", "Habilidades"],
  ["contact", "Contact", "Contacto"],
];

function Navbar({ language, toggleLanguage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef(null);
  const isEnglish = language === "en";

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const navbar = document.querySelector(".navbar");
    let observer;
    const observeHero = () => {
      observer?.disconnect();
      const navHeight = (navbar?.offsetHeight || 0) + 1;
      observer = new IntersectionObserver(([entry]) => {
        setScrolled(!entry.isIntersecting && entry.boundingClientRect.bottom <= navHeight);
      }, { rootMargin: `-${navHeight}px 0px 0px 0px` });
      observer.observe(hero);
    };
    const resizeObserver = new ResizeObserver(observeHero);
    if (navbar) resizeObserver.observe(navbar);
    observeHero();
    return () => { observer?.disconnect(); resizeObserver.disconnect(); };
  }, []);

  const navigate = (event, sectionId) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (!section) return;
    const navHeight = document.querySelector(".navbar")?.offsetHeight || 0;
    window.scrollTo({
      top: sectionId === "hero" ? 0 : section.getBoundingClientRect().top + window.scrollY - navHeight,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
    setMenuOpen(false);
  };

  const closeOnEscape = event => {
    if (event.key === "Escape" && menuOpen) {
      setMenuOpen(false);
      menuButton.current?.focus();
    }
  };

  return (
    <nav className={`navbar${scrolled ? " navbar-scrolled" : ""}`} aria-label={isEnglish ? "Main navigation" : "Navegación principal"} onKeyDown={closeOnEscape}>
      <div className="navbar-container">
        <a className="navbar-logo" href="#hero" onClick={event => navigate(event, "hero")} aria-label={isEnglish ? "Tomás Rivarola — Home" : "Tomás Rivarola — Inicio"}>TR<span>.</span></a>
        <div className={`navbar-links${menuOpen ? " active" : ""}`} id="portfolio-navigation">
          {SECTIONS.map(([id, en, es]) => (
            <a key={id} href={`#${id}`} onClick={event => navigate(event, id)}>{isEnglish ? en : es}</a>
          ))}
        </div>
        <div className="navbar-right">
          <button type="button" className="lang-btn" onClick={toggleLanguage} aria-label={isEnglish ? "Cambiar a español" : "Switch to English"}>
            <span className={isEnglish ? "" : "current-language"}>ES</span><span aria-hidden="true">/</span><span className={isEnglish ? "current-language" : ""}>EN</span>
          </button>
          <button type="button" className="menu-icon" ref={menuButton} onClick={() => setMenuOpen(open => !open)} aria-expanded={menuOpen} aria-controls="portfolio-navigation" aria-label={isEnglish ? (menuOpen ? "Close menu" : "Open menu") : (menuOpen ? "Cerrar menú" : "Abrir menú")}>
            {menuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
