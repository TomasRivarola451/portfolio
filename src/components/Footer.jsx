import "../styles/Footer.css";

const Footer = ({ language }) => (
  <footer className="portfolio-footer" data-reveal="fade">
    <div className="portfolio-footer-inner">
      <a className="portfolio-footer-logo" href="#hero" aria-label={language === "es" ? "Tomás Rivarola — Inicio" : "Tomás Rivarola — Home"}>TR<span>.</span></a>
      <p>© {new Date().getFullYear()} Tomás Rivarola</p>
      <a className="portfolio-back-top" href="#hero">{language === "es" ? "Volver arriba" : "Back to top"}<span aria-hidden="true">↑</span></a>
    </div>
  </footer>
);
export default Footer;
