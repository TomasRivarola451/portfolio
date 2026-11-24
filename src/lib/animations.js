import AOS from "aos";

// AOS owns document-lifetime listeners. StrictMode must not register them twice.
let initialized = false;

export function initializeAnimations() {
  if (initialized) {
    AOS.refreshHard();
    return;
  }
  AOS.init({ duration: 900, once: false, easing: "ease-in-out", offset: 100 });
  initialized = true;
  if (document.readyState !== "complete") {
    window.addEventListener("load", AOS.refresh, { once: true });
  }
}

export function refreshAnimations() {
  if (initialized) AOS.refresh();
}
