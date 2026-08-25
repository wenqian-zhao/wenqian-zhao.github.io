(() => {
  if (window.__wzPixelFieldV2) return;
  window.__wzPixelFieldV2 = true;
  if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
  const field = document.querySelector(".pointerField");
  const core = document.querySelector(".pixelCore");
  const squares = [...document.querySelectorAll(".pixelSquare")];
  if (!field || !core || !squares.length) return;

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let burstTimer;
  const offsets = [[-18, -17], [17, -22], [24, 7], [-27, 10], [4, 24], [-8, -31], [33, -11], [-35, -7], [14, 32]];
  const easing = [0.5, 0.42, 0.36, 0.31, 0.27, 0.23, 0.2, 0.17, 0.14];
  const positions = squares.map(() => ({ x: targetX, y: targetY }));

  const render = () => {
    positions.forEach((position, index) => {
      const [offsetX, offsetY] = offsets[index];
      position.x += (targetX + offsetX - position.x) * easing[index];
      position.y += (targetY + offsetY - position.y) * easing[index];
      squares[index].style.transform = `translate3d(${Math.round(position.x)}px, ${Math.round(position.y)}px, 0)`;
    });
    requestAnimationFrame(render);
  };

  window.addEventListener("pointermove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    core.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
    field.dataset.visible = "true";
  }, { passive: true });
  document.addEventListener("pointerover", (event) => {
    field.dataset.hover = event.target.closest?.("a") ? "true" : "false";
  }, { passive: true });
  document.addEventListener("pointerdown", () => {
    field.dataset.burst = "true";
    clearTimeout(burstTimer);
    burstTimer = setTimeout(() => { field.dataset.burst = "false"; }, 430);
  }, { passive: true });
  document.documentElement.addEventListener("mouseleave", () => {
    field.dataset.visible = "false";
  });
  requestAnimationFrame(render);
})();
