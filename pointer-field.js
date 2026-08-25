(() => {
  if (window.__wzFlowTrailV1) return;
  window.__wzFlowTrailV1 = true;
  if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;

  const field = document.querySelector(".pointerField");
  const tail = [...document.querySelectorAll(".meteorTail")];
  if (!field || !tail.length) return;

  const followRates = [14, 11.5, 9.5, 8, 6.8, 5.8, 4.9, 4.1, 3.4];
  const path = [];
  const particles = tail.map(() => ({ progress: 0 }));
  let headProgress = 0;
  let initialized = false;
  let running = false;
  let lastFrame = 0;
  let idleTimer;

  const appendPoint = (x, y) => {
    const previous = path.at(-1);
    if (previous?.x === x && previous?.y === y) return;
    if (previous) headProgress += Math.hypot(x - previous.x, y - previous.y);
    path.push({ x, y, progress: headProgress });
  };

  const pointAtProgress = (progress) => {
    if (!path.length) return null;
    if (progress <= path[0].progress) return path[0];

    for (let index = path.length - 1; index > 0; index -= 1) {
      const current = path[index];
      const previous = path[index - 1];
      if (progress < previous.progress) continue;
      const segmentLength = current.progress - previous.progress;
      const ratio = segmentLength ? (progress - previous.progress) / segmentLength : 0;
      return {
        x: previous.x + (current.x - previous.x) * ratio,
        y: previous.y + (current.y - previous.y) * ratio,
      };
    }
    return path.at(-1);
  };

  const placeSquare = (square, point) => {
    square.dataset.ready = String(Boolean(point));
    if (!point) return;
    const x = Math.round(point.x * 10) / 10;
    const y = Math.round(point.y * 10) / 10;
    square.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const trimPath = () => {
    const slowestProgress = Math.min(...particles.map((particle) => particle.progress));
    while (path.length > 2 && path[1].progress < slowestProgress - 24) path.shift();
  };

  const render = (timestamp) => {
    if (!initialized) {
      running = false;
      return;
    }

    const elapsed = lastFrame ? (timestamp - lastFrame) / 1000 : 1 / 60;
    const delta = Math.min(Math.max(elapsed, 0), 0.05);
    lastFrame = timestamp;
    let stillCatchingUp = false;

    particles.forEach((particle, index) => {
      const gap = headProgress - particle.progress;
      if (gap > 0.05) {
        particle.progress += gap * (1 - Math.exp(-followRates[index] * delta));
        stillCatchingUp = true;
      } else {
        particle.progress = headProgress;
      }
      placeSquare(tail[index], pointAtProgress(particle.progress));
    });

    trimPath();
    if (field.dataset.visible === "true" || stillCatchingUp) {
      requestAnimationFrame(render);
    } else {
      running = false;
    }
  };

  const startAnimation = () => {
    if (running) return;
    running = true;
    lastFrame = 0;
    requestAnimationFrame(render);
  };

  window.addEventListener("pointermove", (event) => {
    const samples = event.getCoalescedEvents?.() ?? [];
    (samples.length ? samples : [event]).forEach((sample) => appendPoint(sample.clientX, sample.clientY));

    if (!initialized) {
      initialized = true;
      particles.forEach((particle, index) => {
        particle.progress = headProgress;
        placeSquare(tail[index], path.at(-1));
      });
    }

    field.dataset.visible = "true";
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => { field.dataset.visible = "false"; }, 420);
    startAnimation();
  }, { passive: true });

  document.documentElement.addEventListener("mouseleave", () => {
    clearTimeout(idleTimer);
    field.dataset.visible = "false";
    path.length = 0;
    headProgress = 0;
    initialized = false;
    tail.forEach((square) => { square.dataset.ready = "false"; });
  });
})();
