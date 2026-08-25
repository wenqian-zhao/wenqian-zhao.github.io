(() => {
  if (window.__wzMeteorTrailV2) return;
  window.__wzMeteorTrailV2 = true;
  if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
  const field = document.querySelector(".pointerField");
  const tail = [...document.querySelectorAll(".meteorTail")];
  if (!field || !tail.length) return;

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let initialized = false;
  let idleTimer;
  const easing = [0.34, 0.24, 0.17, 0.12, 0.085];
  const positions = tail.map(() => ({ x: targetX, y: targetY }));

  const render = () => {
    positions.forEach((position, index) => {
      position.x += (targetX - position.x) * easing[index];
      position.y += (targetY - position.y) * easing[index];
      tail[index].style.transform = `translate3d(${Math.round(position.x)}px, ${Math.round(position.y)}px, 0)`;
    });
    requestAnimationFrame(render);
  };

  window.addEventListener("pointermove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    if (!initialized) {
      positions.forEach((position) => { position.x = targetX; position.y = targetY; });
      initialized = true;
    }
    field.dataset.visible = "true";
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => { field.dataset.visible = "false"; }, 240);
  }, { passive: true });
  document.documentElement.addEventListener("mouseleave", () => {
    clearTimeout(idleTimer);
    field.dataset.visible = "false";
  });
  requestAnimationFrame(render);
})();
