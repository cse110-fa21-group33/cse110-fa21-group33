// test.js

import { Router } from './Router.js';

const recipes = [
  'assets/jsons/Ghost-Pepper-Wings.json',
  'assets/jsons/Jalapeno-Garlic-Onion-CheeseBurger.json',
  'assets/jsons/Sichuan-Style-Bird-Eye-Chili-Sauce.json',
  'assets/jsons/Southwest-Stuffed-Poblano-Pepper.json',
  'assets/jsons/Spicy-Shrimp-Pad-Thai.json',
];

const recipeData = {};

const router = new Router(() => {
  document.querySelector('.section--main-page').classList.add('shown');
  document.querySelector('.section--recipe-display').classList.remove('shown');
});

window.addEventListener('DOMContentLoaded', init);

/**
 * Initialize event listeners
 */
async function init() {
  try {
    await fetchRecipes();
  } catch (err) {
    console.log(`Error fetching recipes: ${err}`);
  }

  createRecipeCards();
  bindEscKey();
  bindPopstate();
}

/**
 * Loading JSON into a JS file is oddly not super straightforward (for now), so
 * I built a function to load in the JSON files for you. It places all of the recipe data
 * inside the object recipeData like so: recipeData{ 'ghostcookies': ..., 'birthdayCake': ..., etc }
 */
async function fetchRecipes() {
  return new Promise((resolve, reject) => {
    console.log(recipes);
    recipes.forEach((recipe) => {
      fetch(recipe)
        .then((response) => response.json())
        .then((data) => {
          // This grabs the page name from the URL in the array above
          recipeData[recipe] = data;
          if (Object.keys(recipeData).length === recipes.length) {
            resolve();
          }
        })
        .catch((err) => {
          console.log(`Error loading the ${recipe} recipe`);
          reject(err);
        });
    });
  });
}

/**
 * Populates with recommended page with recipe cards
 */
function createRecipeCards() {
  for (let i = 0; i < recipes.length; i += 1) {
    // Makes a new recipe card
    const recipeCard = document.createElement('recipe-card');
    // Inputs the data for the card. This is just the first recipe in the recipes array,
    // being used as the key for the recipeData object
    recipeCard.data = recipeData[recipes[i]];

    // This gets the page name of each of the arrays - which is basically
    // just the filename minus the .json. Since this is the first element
    // in our recipes array, the ghostCookies URL, we will receive the .json
    // for that ghostCookies URL since it's a key in the recipeData object, and
    // then we'll grab the 'page-name' from it - in this case it will be 'ghostCookies'
    let page = recipeData[recipes[i]].title;
    while (page.includes(' ')) {
      page = page.replace(' ', '-');
    }
    router.addPage(page, () => {
      document.querySelector('.section--main-page').classList.remove('shown');
      document.querySelector('.section--recipe-display').classList.add('shown');
      document.querySelector('recipe-display').data = recipeData[recipes[i]];
    });
    bindRecipeCard(recipeCard, page);
    document.querySelector('.card-body').appendChild(recipeCard);
  }
}

/**
 * Binds the click event listener to the <recipe-card> elements added to the page
 * so that when they are clicked, their card expands into the full recipe view mode
 * @param {Element} recipeCard the <recipe-card> element you wish to bind the event
 *                             listeners to
 * @param {String} pageName the name of the page to navigate to on click
 */
function bindRecipeCard(recipeCard, pageName) {
  recipeCard.addEventListener('click', (e) => {
    if (e.path[0].nodeName === 'A') return;
    router.navigate(pageName);
  });
}

/**
 * Binds the 'keydown' event listener to the Escape key (esc) such that when
 * it is clicked, the home page is returned to
 */
function bindEscKey() {
  document.addEventListener('keydown', (event) => {
    if ((event.key === 'Escape') || (event.key === 'Esc')) {
      router.navigate('home', false);
    }
  });
}

/**
 * Binds the 'popstate' event on the window (which fires when the back &
 * forward buttons are pressed) so the navigation will continue to work
 * as expected. (Hint - you should be passing in which page you are on
 * in your Router when you push your state so you can access that page
 * info in your popstate function)
 */
function bindPopstate() {
  window.addEventListener('popstate', (event) => {
    if (event.state) {
      router.navigate('home', true);
    }
    router.navigate(event.state.page, true);
  });
}
