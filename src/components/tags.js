import { createElement } from '../utils/dom.js';
import { store } from '../state/store.js';
import { toggleAnchor, getActiveAnchors } from '../features/anchors.js';

export class TagsManager {
  constructor(container, xyPad) {
    this.container = container;
    this.xyPad = xyPad;
    this.setupToggle();
  }

  setupToggle() {
    const toggleButton = document.querySelector('.toggle-button');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => {
        const isVisible = this.container.classList.toggle('visible');
        toggleButton.classList.toggle('active');
        toggleButton.textContent = isVisible ? 'Ocultar bebidas -' : 'Mostrar bebidas +';
      });
    }
  }

  update() {
    this.container.innerHTML = '';
    const drinks = store.getCurrentCategoryDrinks();
    
    drinks.forEach((drink) => {
      const tag = createElement('button', 'tag', {
        'data-x': drink.x,
        'data-y': drink.y
      });
      
      tag.textContent = drink.name;
      
      if (getActiveAnchors().has(drink.name)) {
        tag.classList.add('active');
      }
      
      tag.addEventListener('click', () => {
        const isActive = toggleAnchor(drink, this.xyPad);
        tag.classList.toggle('active', isActive);
      });
      
      this.container.appendChild(tag);
    });
  }
}