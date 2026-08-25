(() => {
  if (window.__wzPathTrailV1) return;
  window.__wzPathTrailV1 = true;
  if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
  const field = document.querySelector(".pointerField");
  const tail = [...document.querySelectorAll(".meteorTail")];
  if (!field || !tail.length) return;

  const distances = [18, 40, 66, 96, 130];
  const maxPathLength = distances.at(-1) + 80;
  const path = [];
  let pathLength = 0;
  let idleTimer;

  const appendPoint = (x, y) => {
    const previous = path.at(-1);
    if (previous?.x === x && previous?.y === y) return;
    if (previous) pathLength += Math.hypot(x - previous.x, y - previous.y);
    path.push({ x, y });

    while (path.length > 2) {
      const firstSegment = Math.hypot(path[1].x - path[0].x, path[1].y - path[0].y);
      if (pathLength - firstSegment < maxPathLength && path.length <= 500) break;
      pathLength -= firstSegment;
      path.shift();
    }
  };

  const pointAtDistance = (distance) => {
    let travelled = 0;
    for (let index = path.length - 1; index > 0; index -= 1) {
      const current = path[index];
      const previous = path[index - 1];
      const segmentLength = Math.hypot(current.x - previous.x, current.y - previous.y);
      if (travelled + segmentLength >= distance) {
        const ratio = segmentLength ? (distance - travelled) / segmentLength : 0;
        return {
          x: current.x + (previous.x - current.x) * ratio,
          y: current.y + (previous.y - current.y) * ratio,
        };
      }
      travelled += segmentLength;
    }
    return null;
  };

  const renderPath = () => {
    distances.forEach((distance, index) => {
      const point = pointAtDistance(distance);
      tail[index].dataset.ready = String(Boolean(point));
      if (!point) return;
      const x = Math.round(point.x * 10) / 10;
      const y = Math.round(point.y * 10) / 10;
      tail[index].style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  };

  window.addEventListener("pointermove", (event) => {
    const samples = event.getCoalescedEvents?.() ?? [];
    (samples.length ? samples : [event]).forEach((sample) => appendPoint(sample.clientX, sample.clientY));
    renderPath();
    field.dataset.visible = "true";
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => { field.dataset.visible = "false"; }, 240);
  }, { passive: true });

  document.documentElement.addEventListener("mouseleave", () => {
    clearTimeout(idleTimer);
    field.dataset.visible = "false";
    path.length = 0;
    pathLength = 0;
    tail.forEach((square) => { square.dataset.ready = "false"; });
  });
})();
