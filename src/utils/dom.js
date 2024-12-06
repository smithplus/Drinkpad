// DOM utility functions
export function getElement(id) {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Element with id "${id}" not found`);
  }
  return element;
}

export function createElement(tag, className, attributes = {}) {
  const element = document.createElement(tag);
  if (className) {
    element.classList.add(...className.split(' '));
  }
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  return element;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}