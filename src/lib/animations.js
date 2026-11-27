// Base content is always visible. Native animations are a progressive enhancement.
const seen = new WeakSet();
let controller = null;

export function initializeAnimations() {
  if (controller) return undefined;
  if (!window.IntersectionObserver || !Element.prototype.animate) return undefined;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const observed = new WeakSet();
  const active = new Map();
  let disposed = false;

  const finish = element => {
    active.get(element)?.cancel();
    active.delete(element);
  };
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const element = entry.target;
      observer.unobserve(element);
      seen.add(element);
      if (reduced.matches || disposed) continue;
      const mobile = window.matchMedia("(max-width: 600px)").matches;
      const direction = element.dataset.reveal;
      const distance = mobile ? 12 : 20;
      const transform = direction === "fade" ? "none"
        : !mobile && direction === "left" ? `translate3d(-${distance}px,0,0)`
        : !mobile && direction === "right" ? `translate3d(${distance}px,0,0)`
        : `translate3d(0,${distance}px,0)`;
      const delay = Math.min(mobile ? 80 : 210, Math.max(0, Number(element.dataset.revealDelay) || 0));
      try {
        const animation = element.animate([
          { opacity: 0, transform },
          { opacity: 1, transform: "none" },
        ], { duration: mobile ? 480 : 560, delay, easing: "cubic-bezier(.2,.65,.3,1)", fill: "backwards" });
        active.set(element, animation);
        animation.finished.catch(() => {}).finally(() => {
          if (active.get(element) === animation) active.delete(element);
        });
      } catch { /* Unsupported effects leave the visible base content untouched. */ }
    }
  }, { rootMargin: "0px 0px -16px 0px", threshold: 0 });

  const observeNew = () => {
    for (const element of document.querySelectorAll("[data-reveal]")) {
      if (seen.has(element) || observed.has(element)) continue;
      observed.add(element);
      const rect = element.getBoundingClientRect();
      // Reloads at a lower section and initially visible content never flash hidden.
      if (reduced.matches || (rect.top < innerHeight && rect.bottom > 0)) {
        seen.add(element);
      } else observer.observe(element);
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
    disposed = true;
    observer.disconnect();
    document.removeEventListener("focusin", onFocus);
    reduced.removeEventListener("change", onMotionChange);
    for (const element of active.keys()) finish(element);
    controller = null;
  };
}

export function refreshAnimations() { controller?.observeNew(); }
