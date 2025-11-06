import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import "./styles/globals.css";

function App() {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"));
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Fondo global visible en todas las pantallas */}
      <div className="fixed inset-0 -z-10 bg-gradient"></div>

      {/* Contenido principal */}
      <Navbar language={language} toggleLanguage={toggleLanguage} />
      <Hero language={language} />
      <About language={language} />
      <Projects language={language} />
      <Skills language={language} />
      <Contact language={language} />
    </div>
  );
}

export default App;
