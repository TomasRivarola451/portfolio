import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import { initializeAnimations, refreshAnimations } from "./lib/animations";

function App() {
  const [language, setLanguage] = useState("en");

  useEffect(() => initializeAnimations(), []);

  useEffect(() => {
    document.documentElement.lang = language;
    refreshAnimations();
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"));
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden portfolio-shell">
      {/* Fondo global visible en todas las pantallas */}
      <div className="absolute inset-0 -z-10 bg-gradient"></div>

      {/* Contenido principal */}
      <Navbar language={language} toggleLanguage={toggleLanguage} />
      <Hero language={language} />
      <About language={language} />
      <Projects language={language} />
      <Skills language={language} />
      <Contact language={language} />
      <Footer language={language} />
    </div>
  );
}

export default App;
