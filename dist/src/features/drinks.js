import { store } from '../state/store.js';

export function getClosestDrink(x, y) {
  const drinks = store.getCurrentCategoryDrinks();
  if (!drinks.length) return null;

  return drinks.reduce((closest, drink) => {
    const distance = Math.sqrt((drink.x - x) ** 2 + (drink.y - y) ** 2);
    return distance < closest.distance ? { drink, distance } : closest;
  }, { drink: drinks[0], distance: Infinity }).drink;
}

export function updateDrinkDisplay(nameElement, descriptionElement, x, y) {
  const closestDrink = getClosestDrink(x, y);
  if (!closestDrink) return;

  nameElement.textContent = closestDrink.name;
  descriptionElement.textContent = closestDrink.description;
}