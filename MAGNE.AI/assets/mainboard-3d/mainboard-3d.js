const viewport = document.querySelector("#photo-viewport");
const photo = document.querySelector("#board-photo");
const loading = document.querySelector("#loading-state");
const caption = document.querySelector("#view-caption");
const viewIndex = document.querySelector("#view-index");
const sideButtons = [...document.querySelectorAll("[data-side]")];
const zoomIn = document.querySelector("#zoom-in");
const zoomOut = document.querySelector("#zoom-out");
const resetButton = document.querySelector("#reset-view");
const assetBase = document.documentElement.dataset.assetBase || "";
const isEnglish = document.documentElement.lang === "en";

const records = {
  component: {
    src: `${assetBase}assets/mainboard-3d/images/mainboard-component-side.webp?v=3`,
    alt: isEnglish ? "MAG1 EVT PCBA component-side photograph" : "MAG1 EVT PCBA 元件面實拍",
    caption: isEnglish ? "Component side · COMPONENT SIDE" : "元件面 · COMPONENT SIDE",
    index: "01 / 02",
    focus: { x: 62, y: 210, width: 1070, height: 760 },
  },
  shield: {
    src: `${assetBase}assets/mainboard-3d/images/mainboard-shield-side.webp?v=3`,
    alt: isEnglish ? "MAG1 EVT PCBA shield-side photograph" : "MAG1 EVT PCBA 屏蔽面實拍",
    caption: isEnglish ? "Shield side · SHIELD SIDE" : "屏蔽面 · SHIELD SIDE",
    index: "02 / 02",
    focus: { x: 52, y: 136, width: 1160, height: 860 },
  },
};

let activeSide = "component";
let zoom = 1;
let panX = 0;
let panY = 0;
let naturalWidth = 0;
let naturalHeight = 0;
const pointers = new Map();
let lastPinchDistance = 0;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function applyTransform() {
  if (!naturalWidth || !naturalHeight) return;
  const record = records[activeSide];
  const width = viewport.clientWidth;
  const height = viewport.clientHeight;
  const padding = width < 640 ? 18 : 42;
  const fitScale = Math.min(
    (width - padding * 2) / record.focus.width,
    (height - padding * 2) / record.focus.height,
  );
  const displayScale = fitScale * zoom;
  const focusCenterX = record.focus.x + record.focus.width / 2;
  const focusCenterY = record.focus.y + record.focus.height / 2;
  const x = width / 2 - focusCenterX * displayScale + panX;
  const y = height / 2 - focusCenterY * displayScale + panY;
  photo.style.width = `${naturalWidth}px`;
  photo.style.height = `${naturalHeight}px`;
  photo.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${displayScale})`;
}

function resetView() {
  zoom = 1;
  panX = 0;
  panY = 0;
  applyTransform();
}

function setZoom(nextZoom) {
  zoom = clamp(nextZoom, 1, 4);
  if (zoom === 1) {
    panX = 0;
    panY = 0;
  }
  applyTransform();
}

function setSide(side) {
  if (!records[side]) return;
  activeSide = side;
  zoom = 1;
  panX = 0;
  panY = 0;
  naturalWidth = 0;
  naturalHeight = 0;
  const record = records[side];
  viewport.classList.add("is-switching");
  loading.classList.remove("is-done");
  caption.textContent = record.caption;
  viewIndex.textContent = record.index;
  photo.alt = record.alt;
  sideButtons.forEach((button) => {
    const active = button.dataset.side === side;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  photo.src = record.src;
}

photo.addEventListener("load", () => {
  naturalWidth = photo.naturalWidth;
  naturalHeight = photo.naturalHeight;
  applyTransform();
  viewport.classList.remove("is-switching");
  loading.classList.add("is-done");
});

photo.addEventListener("error", () => {
  loading.querySelector("span").textContent = isEnglish ? "Image failed to load. Please refresh." : "影像載入失敗，請重新整理";
});

sideButtons.forEach((button) => button.addEventListener("click", () => setSide(button.dataset.side)));
zoomIn.addEventListener("click", () => setZoom(zoom * 1.28));
zoomOut.addEventListener("click", () => setZoom(zoom / 1.28));
resetButton.addEventListener("click", resetView);

viewport.addEventListener("wheel", (event) => {
  event.preventDefault();
  setZoom(zoom * (event.deltaY < 0 ? 1.12 : 0.9));
}, { passive: false });

viewport.addEventListener("dblclick", () => setZoom(zoom > 1 ? 1 : 2));

viewport.addEventListener("pointerdown", (event) => {
  viewport.setPointerCapture(event.pointerId);
  pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  viewport.classList.add("is-dragging");
});

viewport.addEventListener("pointermove", (event) => {
  if (!pointers.has(event.pointerId)) return;
  const previous = pointers.get(event.pointerId);
  pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  if (pointers.size === 1) {
    panX += event.clientX - previous.x;
    panY += event.clientY - previous.y;
    applyTransform();
    return;
  }
  const points = [...pointers.values()];
  const distance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
  if (lastPinchDistance) setZoom(zoom * distance / lastPinchDistance);
  lastPinchDistance = distance;
});

function releasePointer(event) {
  pointers.delete(event.pointerId);
  if (pointers.size < 2) lastPinchDistance = 0;
  if (!pointers.size) viewport.classList.remove("is-dragging");
}

viewport.addEventListener("pointerup", releasePointer);
viewport.addEventListener("pointercancel", releasePointer);

viewport.addEventListener("keydown", (event) => {
  const step = 24;
  if (event.key === "+" || event.key === "=") setZoom(zoom * 1.2);
  else if (event.key === "-") setZoom(zoom / 1.2);
  else if (event.key === "0" || event.key === "Home") resetView();
  else if (event.key === "ArrowLeft") panX -= step;
  else if (event.key === "ArrowRight") panX += step;
  else if (event.key === "ArrowUp") panY -= step;
  else if (event.key === "ArrowDown") panY += step;
  else return;
  event.preventDefault();
  applyTransform();
});

new ResizeObserver(applyTransform).observe(viewport);

Object.values(records).forEach(({ src }) => {
  const preload = new Image();
  preload.src = src;
});

setSide("component");
