import { getMarkerColor } from '../utils/colors.js';
import { updateDrinkDisplay } from './drinks.js';

export class MarkerManager {
  constructor(marker, xyPad, nameElement, descriptionElement) {
    this.marker = marker;
    this.xyPad = xyPad;
    this.nameElement = nameElement;
    this.descriptionElement = descriptionElement;
    
    // Initialize marker at center immediately when constructed
    requestAnimationFrame(() => this.centerMarker());
  }

  centerMarker() {
    const padRect = this.xyPad.getBoundingClientRect();
    const centerX = padRect.width / 2;
    const centerY = padRect.height / 2;
    
    this.marker.style.left = `${centerX}px`;
    this.marker.style.top = `${centerY}px`;

    const color = getMarkerColor(0, 0);
    this.marker.style.backgroundColor = color;
    this.marker.style.boxShadow = `0 0 15px ${color}`;

    updateDrinkDisplay(this.nameElement, this.descriptionElement, 0, 0);
  }

  handlePosition(clientX, clientY) {
    const padRect = this.xyPad.getBoundingClientRect();
    const newX = Math.max(0, Math.min(clientX - padRect.left, padRect.width));
    const newY = Math.max(0, Math.min(clientY - padRect.top, padRect.height));
    
    this.marker.style.left = `${newX}px`;
    this.marker.style.top = `${newY}px`;

    const mappedX = Math.round((newX / padRect.width) * 20 - 10);
    const mappedY = Math.round((newY / padRect.height) * 20 - 10);

    const color = getMarkerColor(mappedX, mappedY);
    this.marker.style.backgroundColor = color;
    this.marker.style.boxShadow = `0 0 15px ${color}`;

    updateDrinkDisplay(this.nameElement, this.descriptionElement, mappedX, mappedY);
  }
}