import { getMarkerColor } from '../utils/colors.js';
import { createElement } from '../utils/dom.js';
import { tooltipManager } from './tooltip.js';

const activeAnchors = new Set();

export function toggleAnchor(drink, xyPad) {
  const existingAnchor = xyPad.querySelector(`.drink-anchor[data-name="${drink.name}"]`);
  
  if (existingAnchor) {
    existingAnchor.remove();
    activeAnchors.delete(drink.name);
    return false;
  } else {
    createAnchor(drink, xyPad);
    activeAnchors.add(drink.name);
    return true;
  }
}

function createAnchor(drink, xyPad) {
  const anchor = createElement('div', 'drink-anchor', {
    'data-name': drink.name
  });
  
  anchor.style.left = `${(drink.x + 10) * 20}px`;
  anchor.style.top = `${(drink.y + 10) * 20}px`;
  anchor.style.backgroundColor = getMarkerColor(drink.x, drink.y);
  anchor.style.opacity = '0';

  // Eventos de hover con tooltip
  anchor.addEventListener('mouseover', (e) => {
    tooltipManager.show(e, drink.name);
    anchor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    anchor.style.zIndex = '2';
  });

  anchor.addEventListener('mouseout', () => {
    tooltipManager.hide();
    anchor.style.transform = 'translate(-50%, -50%) scale(1)';
    anchor.style.zIndex = '1';
  });

  xyPad.appendChild(anchor);
  
  // Animar la aparición
  requestAnimationFrame(() => {
    anchor.style.opacity = '1';
  });
}

export function clearAnchors(xyPad) {
  const anchors = xyPad.querySelectorAll('.drink-anchor');
  anchors.forEach(anchor => anchor.remove());
  activeAnchors.clear();
}

export function getActiveAnchors() {
  return activeAnchors;
}