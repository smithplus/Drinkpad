// Application state management
class Store {
  constructor() {
    this.drinksData = {};
    this.currentCategory = '';
    this.subscribers = new Set();
  }

  async loadData() {
    try {
      const response = await fetch('drinks.json');
      this.drinksData = await response.json();
      this.currentCategory = Object.keys(this.drinksData)[0];
      this.notify();
    } catch (error) {
      console.error('Error loading drinks data:', error);
      throw error;
    }
  }

  setCategory(category) {
    this.currentCategory = category;
    this.notify();
  }

  getCurrentCategoryDrinks() {
    return this.drinksData[this.currentCategory]?.drinks || [];
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    this.subscribers.forEach(callback => callback());
  }
}

export const store = new Store();