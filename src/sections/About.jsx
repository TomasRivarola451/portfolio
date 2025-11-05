import React, { useEffect } from "react";
import "../styles/About.css";
import profileImg from "/public/images/perfil.png";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
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
    <section id="about" className="about-section" data-aos="fade-up">
      <h2 className="about-title">About Me</h2>

      <div className="about-container" data-aos="fade-up" data-aos-delay="200">
        <div className="about-image" data-aos="fade-right" data-aos-delay="300">
          <img src={profileImg} alt="Tomás Rivarola" />
        </div>

        <div className="about-text" data-aos="fade-left" data-aos-delay="400">
          <p>
            I'm Tomás Rivarola, a 22 years old frontend developer based in Mendoza,
            Argentina. I enjoy combining design and technology to build clean,
            modern, and engaging web experiences.
          </p>

          <p>
            My journey started in graphic design, where I discovered my passion for
            visual composition. Over time, I found in web development a creative and
            challenging path that pushes me to think, design, and build every day.
          </p>

          <p>
            Since 2022, I've been learning and growing through real projects always
            focused on detail, usability, and delivering intuitive digital interfaces.
          </p>

          <button className="about-btn" data-aos="zoom-in" data-aos-delay="500">
            View Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
