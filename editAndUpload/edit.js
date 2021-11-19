// main.js
// Taken from Lab 7

const recipes = [
  '../source/assets/jsons/Ghost-Pepper-Wings.json',
  '../source/assets/jsons/Jalapeno-Garlic-Onion-CheeseBurger.json',
  '../source/assets/jsons/Sichuan-Style-Bird-Eye-Chili-Sauce.json',
  '../source/assets/jsons/Southwest-Stuffed-Poblano-Pepper.json',
  '../source/assets/jsons/Spicy-Shrimp-Pad-Thai.json',
];

const recipeData = {};

window.addEventListener('DOMContentLoaded', init);

/**
 * Initialize event listeners
 */
async function init() {
  try {
    await fetchRecipes();
    console.log(recipeData);
    filling_in();
  } catch (err) {
    console.log(`Error fetching recipes: ${err}`);
  }
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
          // console.log(recipeData[0]);
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

function filling_in() {
  const data = recipeData['../source/assets/jsons/Ghost-Pepper-Wings.json'];
  document.getElementById('recipeName').value = data.title;
  document.getElementById('description').value = data.description;
  document.getElementById('url').innerText = data.image;
  document.getElementById('scoville').value = data.scoville;
  document.getElementById('prepMins').value = data.time[0].minutes;
  document.getElementById('prepHrs').value = data.time[0].hours;
  document.getElementById('cookMins').value = data.time[1].minutes;
  document.getElementById('cookHrs').value = data.time[1].hours;
  document.getElementById('servingSize').value = data.servingSize;
  for (let i = 0; i < data.ingredientList.length; i++) {
    document.getElementById('ingredients').value;
  }
}
// const data = recipeData['../source/assets/jsons/Ghost-Pepper-Wings.json'];
console.log(recipeData);
// document.getElementById('recipeName').value = data.title;
