(() => {
  if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
  const glow = document.querySelector(".pointerGlow");
  const orbit = document.querySelector(".pointerOrbit");
  if (!glow || !orbit) return;

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let glowX = targetX;
  let glowY = targetY;
  let orbitX = targetX;
  let orbitY = targetY;

  const render = () => {
    glowX += (targetX - glowX) * 0.16;
    glowY += (targetY - glowY) * 0.16;
    orbitX += (targetX - orbitX) * 0.08;
    orbitY += (targetY - orbitY) * 0.08;
    glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
    orbit.style.transform = `translate3d(${orbitX}px, ${orbitY}px, 0)`;
    requestAnimationFrame(render);
  };

  window.addEventListener("pointermove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    glow.dataset.visible = "true";
    orbit.dataset.visible = "true";
  }, { passive: true });
  document.addEventListener("pointerover", (event) => {
    orbit.dataset.hover = event.target.closest?.("a") ? "true" : "false";
  }, { passive: true });
  document.addEventListener("pointerdown", () => orbit.animate(
    [{ scale: "1" }, { scale: "1.55", rotate: "25deg" }, { scale: "1" }],
    { duration: 520, easing: "cubic-bezier(.16,1,.3,1)" },
  ), { passive: true });
  document.documentElement.addEventListener("mouseleave", () => {
    glow.dataset.visible = "false";
    orbit.dataset.visible = "false";
  });
  requestAnimationFrame(render);
})();
