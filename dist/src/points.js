import { getMarkerColor } from './colors.js';

// Crear tooltip dinámico
const tooltip = document.createElement('div');
tooltip.classList.add('tooltip');
document.body.appendChild(tooltip);

export function createPoint(drink, xyPad) {
  const point = document.createElement('div');
  point.classList.add('point');
  point.dataset.name = drink.name;
  point.style.left = `${(drink.x + 10) * 20}px`;
  point.style.top = `${(drink.y + 10) * 20}px`;
  point.style.backgroundColor = getMarkerColor(drink.x, drink.y);

  // Añadir eventos de hover
  point.addEventListener('mouseover', (e) => showTooltip(e, drink.name));
  point.addEventListener('mouseout', hideTooltip);

  xyPad.appendChild(point);
  return point;
}

export function showTooltip(event, text) {
  tooltip.textContent = text;
  tooltip.style.left = `${event.pageX + 10}px`;
  tooltip.style.top = `${event.pageY + 10}px`;
  tooltip.style.opacity = '1';
}

export function hideTooltip() {
  tooltip.style.opacity = '0';
}

export function removePoint(point) {
  point.remove();
}

export function clearAllPoints() {
  document.querySelectorAll('.point').forEach(point => point.remove());
}