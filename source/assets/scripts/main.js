// main.js
// Taken from Lab 7

import { Router } from './Router.js';
import { database } from './database.js';

const router = new Router(() => {
  document.querySelector('.section--main-page').classList.add('shown');
  document.querySelector('.section--recipe-display').classList.remove('shown');
  document.querySelector('.section--recipe-upload').classList.remove('shown');
});

const [recommendTitle, searchTitle] = [
  'Recommended Recipes For You',
  'Search Results',
];

const challengePath = 'assets/jsons/challenges.json';
let challengeData;

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

  addCreateRecipe();
  bindCreateRecipe();
  createRecipeCards(recipeList);
  bindEscKey();
  bindPopstate();
  bindSlider();
  displaySearchCards();
  clickLogoToGoHome();
  sliderSpiceLevel();
  createProgressBars();
}

/**
 * Populates with recommended page with recipe cards
 */
function createRecipeCards(recipes) {
  // console.log(recipes);
  const i = 0;
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
      document.querySelector('.section--recipe-upload').classList.remove('shown');
      document.querySelector('recipe-display').data = recipe;
      bindEditButton(document.querySelector('recipe-display').shadowRoot.getElementById('editButton'), page);
    });

    router.addPage(`${page}-edit`, () => {
      document.querySelector('.section--main-page').classList.remove('shown');
      document.querySelector('.section--recipe-display').classList.remove('shown');
      document.querySelector('.section--recipe-upload').classList.add('shown');
      document.querySelector('recipe-upload').data = recipe;
      bindSubmitButton(document.querySelector('recipe-upload').shadowRoot.getElementById('submitButton'), page);
      bindDeleteButton(document.querySelector('recipe-upload').shadowRoot.getElementById('deleteButton'));
      bindCancelButton(document.querySelector('recipe-upload').shadowRoot.getElementById('cancelButton'), page);
    });

    bindRecipeCard(recipeCard, page);
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
  recipeCard.addEventListener('click', () => {
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
    button.addEventListener('click', () => {
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
function bindCancelButton(button, page) {
  if (button) {
    button.addEventListener('click', () => {
      if (page === 'create') {
        router.navigate('home');
      } else {
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
function bindSubmitButton(button) {
  if (button) {
    button.addEventListener('click', () => {
      router.navigate('home', false);

      // trigger slider
      triggerSlider();
    });
  }
}

/**
 * Binds the click event listener to the <delete-button> elements added to the page
 * so that when they are clicked, the page navigates back to home.
 * @param {Element} button the <delete-button> element you wish to bind the event
 *                             listeners to
 */
function bindDeleteButton(button) {
  if (button) {
    button.addEventListener('click', () => {
      router.navigate('home', false);
      setTimeout(triggerSlider, 100);
    });
  }
}

/**
 * Binds the 'keydown' event listener to the Escape key (esc) such that when
 * it is clicked, the home page is returned to
 */
function bindEscKey() {
  document.addEventListener('keydown', (event) => {
    if ((event.key === 'Escape') || (event.key === 'Esc')) {
      router.navigate('home', false);
      triggerSlider();
    }
  });
}

/** Binds clicking the website logo to going to the home page
 * just using the same code from bindEscKey()
 */
function clickLogoToGoHome() {
  const websiteLogo = document.getElementById('websiteLogo');
  websiteLogo.addEventListener('click', (event) => {
    router.navigate('home', false);
    triggerSlider();
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

/**
 * Navigate to create page
 */
function bindCreateRecipe() {
  const button = document.getElementById('create-button');
  button.addEventListener('click', () => {
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
    bindSubmitButton(document.querySelector('recipe-upload').shadowRoot.getElementById('submitButton'), 'create');
    bindCancelButton(document.querySelector('recipe-upload').shadowRoot.getElementById('cancelButton'), 'create');
  });
}

// ******************** SLIDER FUNCTIONS *************************************************

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
    document.getElementById('middle-title').innerHTML = recommendTitle;
    document.getElementById('searchBar').value = '';
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

/**
 * Triggers the slider to show newly created/edited/deleted recipes.
 */
function triggerSlider() {
  const spiceSlider = document
    .querySelector('#spice-slider--wrapper')
    .querySelector('.slider');
  const event = new Event('change');
  spiceSlider.dispatchEvent(event);
}

/**
   * Spice slider logic.
   */
function sliderSpiceLevel() {
  const spiceSlider = document.getElementById('myRange');
  const spiceLevel = document.getElementById('spiceLevel');

  let emojiString = '';
  for (let i = 0; i < spiceSlider.value; i++) {
    emojiString += '🌶️';
  }
  spiceLevel.innerHTML = emojiString;

  spiceSlider.oninput = function () {
    emojiString = '';
    for (let i = 0; i < this.value; i++) {
      emojiString += '🌶️';
    }
    spiceLevel.innerHTML = emojiString;
  };
}

// ******************** SEARCH FUNCTIONS *************************************************

/**
 * Displays the search results according to name
 */
async function displaySearchCards() {
  const searchBar = document.getElementById('searchBar');
  searchBar.addEventListener('keyup', (event) => {
    const searchString = event.target.value;
    const cardBody = document.querySelector('.card-body');
    const cards = cardBody.getElementsByTagName('recipe-card');

    if (searchString.length === 0) {
      if (document.getElementById('middle-title').innerHTML === searchTitle) {
        triggerSlider();
      }
      return;
    }

    while (cards.length > 0) {
      cards[0].remove();
    }
    document.getElementById('middle-title').innerHTML = searchTitle;
    let recipeList;
    (async () => {
      try {
        recipeList = await database.getByName(searchString);
        if (recipeList.length > 0) {
          createRecipeCards(recipeList);
        }
      } catch (err) {
        console.log(`Error fetching recipes: ${err}`);
      }
    })();
  });
}

// ************************ CHALLENGE BAR FUNCTIONS *****************************************

/**
 * Populates the challenge progress section
 */
async function createProgressBars() {
  // TODO change this to getting the challengeData from the database
  await fetch(challengePath)
    .then((response) => response.json())
    .then((data) => {
      challengeData = data.challenges;
    })
    .catch((error) => {
    });
  challengeData.forEach((challenge) => {
    const challengeBar = document.createElement('challenge-bar');
    challengeBar.data = challenge;

    document.querySelector('.challenge-body').appendChild(challengeBar);
  });
}
