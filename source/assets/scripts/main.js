// main.js
// Taken from Lab 7

import { Router } from './Router.js';
import { database } from './database.js';

const router = new Router(() => {
  document.querySelector('.section--main-page').classList.add('shown');
  document.querySelector('.section--recipe-display').classList.remove('shown');
  document.querySelector('.section--recipe-upload').classList.remove('shown');
});

window.addEventListener('DOMContentLoaded', init);

/**
 * Initialize event listeners
 */
async function init() {
  let recipeList;
  try {
    await database.loadDB();

    recipeList = await database.getBySpice(3);
  } catch (err) {
    console.log(`Error fetching recipes: ${err}`);
  }
<<<<<<< HEAD
  addCreateRecipe();
<<<<<<< HEAD
  createRecipeCards();
  bindEscKey();
  bindPopstate();
<<<<<<< HEAD
  bindCreateRecipe();
}

/**
 * Loading JSON into a JS file is oddly not super straightforward (for now), so
 * I built a function to load in the JSON files for you. It places all of the recipe data
 * inside the object recipeData like so: recipeData{ 'ghostcookies': ..., 'birthdayCake': ..., etc }
 */
async function fetchRecipes() {
  return new Promise((resolve, reject) => {
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
=======

=======
  bindCreateRecipe();
>>>>>>> c4d149e (Update main.js)
  createRecipeCards(recipeList);
  bindEscKey();
  bindPopstate();
=======
>>>>>>> 4ad80c5 (added edit button)
  bindSlider();
>>>>>>> 1601d73 (Added functionality to the slider)
}

/**
 * Populates with recommended page with recipe cards
 */
function createRecipeCards(recipes) {
  console.log(recipes);
  recipes.forEach((recipe) => {
    // Makes a new recipe card
    const recipeCard = document.createElement('recipe-card');
    // Inputs the data for the card. This is just the first recipe in the recipes array,
    // being used as the key for the recipeData object
    recipeCard.data = recipe;

    // This gets the page name of each of the arrays - which is basically
    // just the filename minus the .json. Since this is the first element
    // in our recipes array, the ghostCookies URL, we will receive the .json
    // for that ghostCookies URL since it's a key in the recipeData object, and
    // then we'll grab the 'page-name' from it - in this case it will be 'ghostCookies'
    let page = recipe.title;
    while (page.includes(' ')) {
      page = page.replace(' ', '-');
    }
    router.addPage(page, () => {
      document.querySelector('.section--main-page').classList.remove('shown');
      document.querySelector('.section--recipe-display').classList.add('shown');
<<<<<<< HEAD
      document.querySelector('.section--recipe-upload').classList.remove('shown');
      document.querySelector('recipe-display').data = recipeData[recipes[i]];
=======
      document.querySelector('recipe-display').data = recipe;
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 1601d73 (Added functionality to the slider)
=======
      const button = document.querySelector('recipe-display').shadowRoot.querySelectorAll('button')[1];
      bindEditButton(button, page);
>>>>>>> 4ad80c5 (added edit button)
=======
      bindEditButton(document.querySelector('recipe-display').shadowRoot.getElementById('editButton'), page);
>>>>>>> 69133c9 (added navigation functional to buttons on edit page)
    });

    router.addPage(`${page}-edit`, () => {
      document.querySelector('.section--main-page').classList.remove('shown');
      document.querySelector('.section--recipe-display').classList.remove('shown');
      document.querySelector('.section--recipe-upload').classList.add('shown');
      document.querySelector('recipe-upload').data = recipe;
      BindSubmitButton(document.querySelector('recipe-upload').shadowRoot.getElementById('submitButton'), page);
      BindDeleteButton(document.querySelector('recipe-upload').shadowRoot.getElementById('deleteButton'));
      BindCancelButton(document.querySelector('recipe-upload').shadowRoot.getElementById('cancelButton'), page);
    });

    bindRecipeCard(document.querySelector('.card-body'), page);
    document.querySelector('.card-body').appendChild(recipeCard);
  });
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
 * Binds the click event listener to the <edit> elements added to the page
 * so that when they are clicked, their card expands into the edit recipe mode
 * @param {Element} button the <edit-button> element you wish to bind the event
 *                             listeners to
 * @param {String} pageName the name of the page to navigate to on click
 */
function bindEditButton(button, pageName) {
  if (button) {
    button.addEventListener('click', (e) => {
      if (e.path[0].nodeName === 'A') return;
      router.navigate(`${pageName}-edit`);
    });
  }
}

/**
 * Binds the click event listener to the <cancel-button> elements added to the page
 * so that when they are clicked, the page navigates back to home.
 * @param {Element} button the <cancel-button> element you wish to bind the event
 *                             listeners to
 */
 function BindCancelButton(button, page) {
   if (button) {
    button.addEventListener('click', () => {
      if (page === 'create') {
        router.navigate('home');
      }
      else {
        router.navigate(page.replace('-edit', ''), false);
      }
    });
  }
}

/**
 * Binds the click event listener to the <submit-button> elements added to the page
 * so that when they are clicked, the page navigates back to home.
 * @param {Element} button the <submit-button> element you wish to bind the event
 *                             listeners to
 */
 function BindSubmitButton(button, page) {
  if (button) {
    button.addEventListener('click', () => {
      router.navigate('home', false);
    });
 }
}

/**
 * Binds the click event listener to the <delete-button> elements added to the page
 * so that when they are clicked, the page navigates back to home.
 * @param {Element} button the <delete-button> element you wish to bind the event
 *                             listeners to
 */
function BindDeleteButton(button) {
  if (button) {
    button.addEventListener('click', () => {
      router.navigate('home');
      window.location.reload();
    });
  }
}

/**
 * Binds the 'keydown' event listener to the Escape key (esc) such that when
 * it is clicked, the home page is returned to
 * TEMPORARY, TODO CHANGE THIS TO WHEN YOU CLICK THE LOGO IT LEADS TO HOME
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
      router.navigate(event.state.page, true);
    } else {
      router.navigate('home', true);
    }
  });
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 4ad80c5 (added edit button)
=======
/**
 * Navigate to create page
 */
>>>>>>> c8622b4 (Populate the edit page)
function bindCreateRecipe() {
  const button = document.getElementById('create-button');
  button.addEventListener('click', (event) => {
    router.navigate('create', false);
  });
}

/**
 * Add create page to navigation
 */
function addCreateRecipe() {
  router.addPage('create', () => {
    document.querySelector('.section--main-page').classList.remove('shown');
    document.querySelector('.section--recipe-display').classList.remove('shown');
    document.querySelector('.section--recipe-upload').classList.add('shown');
    document.querySelector('recipe-upload').data = null;
    console.log('successfully bound stuff');
    BindSubmitButton(document.querySelector('recipe-upload').shadowRoot.getElementById('submitButton'), 'create');
    BindCancelButton(document.querySelector('recipe-upload').shadowRoot.getElementById('cancelButton'), 'create');
  });
}
=======
/**
 * Binds the slider so that the recommended recipes will display cards
 * according to the spice level. This will also include any additional
 * UI changes to indicate the spice level.
 */
async function bindSlider() {
  const spiceSlider = document
    .querySelector('#spice-slider--wrapper')
    .querySelector('.slider');
  spiceSlider.addEventListener('change', async (event) => {
    const cardBody = document.querySelector('.card-body');
    const cards = cardBody.getElementsByTagName('recipe-card');
    while (cards.length > 0) {
      cards[0].remove();
    }

    let recipeList;
    try {
      const spiceLevel = parseInt(event.target.value, 10);
      recipeList = await database.getBySpice(spiceLevel);

      if (recipeList.length > 0) {
        createRecipeCards(recipeList);
      }
    } catch (err) {
      console.log(`Error fetching recipes: ${err}`);
    }
  });
}
<<<<<<< HEAD
>>>>>>> 1601d73 (Added functionality to the slider)
=======
>>>>>>> 4ad80c5 (added edit button)
