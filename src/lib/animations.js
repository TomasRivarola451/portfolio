// Base content stays visible when a reveal is skipped or unsupported.
const seen = new WeakSet();
const LOOKAHEAD = 64;
const MAX_ACTIVE = 3;
const EASING = "cubic-bezier(.22, 1, .36, 1)";
let controller = null;

export function initializeAnimations() {
  if (controller || !window.IntersectionObserver || !Element.prototype.animate) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobile = window.matchMedia("(max-width: 767px), (pointer: coarse)");
  const observed = new WeakSet();
  const active = new Map();

  const finish = element => {
    const animation = active.get(element);
    active.delete(element);
    observer.unobserve(element);
    animation?.cancel();
  };

  const observer = new IntersectionObserver(entries => {
    const viewportHeight = document.documentElement.clientHeight;
    for (const entry of entries) {
      const element = entry.target;
      if (!entry.isIntersecting) {
        if (active.has(element) && entry.boundingClientRect.bottom <= 0) finish(element);
        continue;
      }
      if (seen.has(element)) continue;
      seen.add(element);

      // A fast scroll or anchor jump can land beyond the entry band.
      // Show that content immediately and never queue a delayed reveal.
      const top = entry.boundingClientRect.top;
      if (reduced.matches || top < viewportHeight - 40 ||
          active.size >= MAX_ACTIVE || element.contains(document.activeElement)) {
        observer.unobserve(element);
        continue;
      }

      const compact = mobile.matches;
      const direction = element.dataset.reveal;
      let transform = `translateY(${compact ? 10 : 16}px)`;
      if (!compact && direction === "left") transform = "translateX(-20px)";
      if (!compact && direction === "right") transform = "translateX(20px)";

      try {
        const animation = element.animate([
          { opacity: compact || top < viewportHeight ? 0.86 : 0.62, transform },
          { opacity: 1, transform: "none" },
        ], { duration: compact ? 800 : 960, easing: EASING });
        active.set(element, animation);
        const settle = () => {
          if (active.get(element) !== animation) return;
          active.delete(element);
          observer.unobserve(element);
        };
        animation.finished.then(settle, settle);
      } catch {
        observer.unobserve(element);
      }
    }
  }, { rootMargin: `0px 0px ${LOOKAHEAD}px 0px`, threshold: 0 });

  const observeNew = () => {
    for (const element of document.querySelectorAll("[data-reveal]")) {
      if (seen.has(element) || observed.has(element)) continue;
      observed.add(element);
      // Refreshes, restored scroll positions and initial content stay visible.
      if (reduced.matches || element.getBoundingClientRect().top < document.documentElement.clientHeight) {
        seen.add(element);
      } else {
        observer.observe(element);
      }
    }
  };

  const onFocus = event => {
    for (const element of active.keys()) if (element.contains(event.target)) finish(element);
  };
  const onMotionChange = () => {
    if (reduced.matches) for (const element of active.keys()) finish(element);
  };
  document.addEventListener("focusin", onFocus);
  reduced.addEventListener("change", onMotionChange);
  controller = { observeNew };
  observeNew();

  return () => {
    observer.disconnect();
    document.removeEventListener("focusin", onFocus);
    reduced.removeEventListener("change", onMotionChange);
    for (const element of active.keys()) finish(element);
    controller = null;
  };
}

export function refreshAnimations() { controller?.observeNew(); }
