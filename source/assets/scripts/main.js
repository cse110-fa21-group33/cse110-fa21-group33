// test.js

import { makeCard } from './recipeCard.js';

const recipes = [
  'assets/jsons/Ghost-Pepper-Wings.json',
  'assets/jsons/Jalapeno-Garlic-Onion-CheeseBurger.json',
  'assets/jsons/Sichuan-Style-Bird-Eye-Chili-Sauce.json',
  'assets/jsons/Southwest-Stuffed-Poblano-Pepper.json',
  'assets/jsons/Spicy-Shrimp-Pad-Thai.json',
];

/**
 * Initialize event listeners
 */
function init() {
  const title = document.querySelector('h1');
  title.addEventListener('click', () => {
    title.textContent = 'This should be the new text';
  });

  for (let i = 0; i < recipes.length; i += 1) {
    fetch(recipes[i])
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then((data) => {
        makeCard(data);
      })
      .catch((error) => {
        console.error('Fetch failed', error);
      });
  }
}

window.addEventListener('DOMContentLoaded', init);
