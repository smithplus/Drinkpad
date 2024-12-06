// Crear tooltip dinámico
const tooltip = document.createElement('div');
tooltip.classList.add('tooltip');
document.body.appendChild(tooltip);

export function showTooltip(event, text) {
  tooltip.textContent = text;
  tooltip.style.left = `${event.pageX + 10}px`;
  tooltip.style.top = `${event.pageY + 10}px`;
  tooltip.style.opacity = '1';
}

export function hideTooltip() {
  tooltip.style.opacity = '0';
}