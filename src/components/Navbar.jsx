import React, { useState } from "react";
import "../styles/Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "/public/favicon.svg/Tomas.svg";

function Navbar({ language, toggleLanguage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div
          className="navbar-logo"
          onClick={() => handleScroll("hero")}
          style={{ cursor: "pointer" }}
        >
          <img src={logo} alt="Logo" className="logo" />
        </div>

        {/* Links */}
        <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <span onClick={() => handleScroll("hero")}>
            {language === "en" ? "Home" : "Inicio"}
          </span>
          <span onClick={() => handleScroll("about")}>
            {language === "en" ? "About" : "Sobre mí"}
          </span>
          <span onClick={() => handleScroll("projects")}>
            {language === "en" ? "Projects" : "Proyectos"}
          </span>
          <span onClick={() => handleScroll("skills")}>
            {language === "en" ? "Skills" : "Habilidades"}
          </span>
          <span onClick={() => handleScroll("contact")}>
            {language === "en" ? "Contact" : "Contacto"}
          </span>
        </div>

        {/* Derecha: idioma + menú */}
        <div className="navbar-right">
          {/* Botón de idioma (ahora muestra el idioma al que vas a cambiar) */}
        <button className="lang-btn" onClick={toggleLanguage}>
          {language === "en" ? "ES / EN" : "EN / ES"}
        </button>


          {/* Icono del menú responsive */}
          <div
            className="menu-icon"
            onClick={toggleMenu}
            style={{ cursor: "pointer" }}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
