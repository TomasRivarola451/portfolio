import "../styles/Reveal.css";

export function initializeAnimations() {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (motion.matches || !window.IntersectionObserver) return;

  const blocks = document.querySelectorAll("[data-reveal]");
  const reveal = block => {
    block.classList.add("is-revealed");
    observer.unobserve(block);
  };
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      // Oversized blocks may never reach a ratio of 0.1 on a small screen.
      if (entry.intersectionRatio >= 0.1 || entry.boundingClientRect.height > entry.rootBounds?.height) {
        reveal(entry.target);
      }
    }
  }, { threshold: [0, 0.1], rootMargin: "0px" });

  const onFocus = event => {
    const block = event.target.closest("[data-reveal]");
    if (block) reveal(block);
  };
  const cleanup = () => {
    observer.disconnect();
    document.removeEventListener("focusin", onFocus);
    motion.removeEventListener("change", cleanup);
    for (const block of blocks) block.classList.remove("reveal-ready", "is-revealed");
  };

  try {
    for (const block of blocks) {
      // Preserve the current reading position on a reload or a direct link.
      if (window.scrollY > 0 && block.getBoundingClientRect().top < window.innerHeight) continue;
      observer.observe(block);
      block.classList.add("reveal-ready");
    }
    document.addEventListener("focusin", onFocus);
    motion.addEventListener("change", cleanup);
  } catch {
    cleanup();
  }
  return cleanup;
}
