import { createElement } from '../utils/dom.js';
import { store } from '../state/store.js';

export class TabsManager {
  constructor(container, onCategoryChange) {
    this.container = container;
    this.onCategoryChange = onCategoryChange;
  }

  generate() {
    this.container.innerHTML = '';
    Object.entries(store.drinksData).forEach(([category, data], index) => {
      const tab = createElement('button', 'tab', {
        'data-category': category
      });
      
      if (index === 0) {
        tab.classList.add('active');
      }
      
      tab.textContent = `${data.emoji} ${category.charAt(0).toUpperCase() + category.slice(1)}`;
      tab.addEventListener('click', () => this.changeCategory(category));
      this.container.appendChild(tab);
    });
  }

  changeCategory(category) {
    store.setCategory(category);
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    const activeTab = document.querySelector(`[data-category="${category}"]`);
    if (activeTab) {
      activeTab.classList.add('active');
    }
    this.onCategoryChange(category);
  }
}