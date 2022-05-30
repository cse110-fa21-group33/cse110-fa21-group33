// database.js
export const database = {};

const serverEnv = 'production';
const serverUrlLocal = 'http://localhost:3000';
const serverUrlProd = 'http://exploding-kitchen.us-west-1.elasticbeanstalk.com/api';
const url = (serverEnv === 'production') ? serverUrlProd : serverUrlLocal;

/**
 * load challenges
 * @returns {Promise<void>}
 */
async function loadChallenges() {
  await loadChallengesFromFile()
    .then((challenges) => {
      saveChallenges(challenges);
    });
}

/**
 * TODO: change the following to match the challenges.json (will need a new route).
 * Fetches the challenge list from file.
 * @returns {Promise} Resolves with the challenge list json if successful, rejects otherwise.
 */
async function loadChallengesFromFile() {
  return new Promise((resolve, reject) => {
    fetch('assets/jsons/challenges.json')
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * Adds a recipe to the database.
 * If a recipe of the same name already exists, does not add in the recipe.
 * This function must only be called after calling loadDB().
 * @param {JSON} recipeJSON The JSON of the recipe to add.
 * @returns {Promise} Resolves true if the recipe was successfully added, rejects otherwise.
 */
async function addRecipe(recipeJSON) {
  // TODO: fetch POST /recipe with recipeJSON as the body. https://github.com/cse112-group10/cse112-sp22-group10/blob/main/source/backend/routes/recipes.js#L104
}

/**
 * Updates a recipe in the database.
 * This function must only be called after calling loadDB().
 * @param {JSON} recipeJSON The JSON of the recipe to update.
 * @returns {Promise} Resolves true if the recipe was successfully updated, rejects otherwise.
 */
async function updateRecipe(recipeJSON) {
  // TODO: fetch PUT /recipe/:recipeId, with the authorization header + recipeId param. https://github.com/cse112-group10/cse112-sp22-group10/blob/main/source/backend/routes/recipes.js#L32
}

/**
 * Deletes a recipe from the database.
 * This function must only be called after calling loadDB();
 * @param {JSON} recipeJSON The JSON of the recipe to delete.
 * @returns {Promise} Resolves true if the recipe was successfully deleted, rejects otherwise.
 */
async function deleteRecipe(recipeJSON) {
  // TODO: fetch DELETE /recipe/:recipeId: https://github.com/cse112-group10/cse112-sp22-group10/blob/main/source/backend/routes/recipes.js#L119
}

/**
 * TODO: refactor this function to save challenge in the backend instead of localstorage
 *
 * Saves the challenge JSON into local storage
 * @param {JSON} challengeJSON The JSON to save
 */
function saveChallenges(challengeJSON) {
  const challengeString = JSON.stringify(challengeJSON);
  localStorage.setItem('challenges', challengeString);
}
/**
 * TODO: lots of refactoring of this function
 * @param recipeJSON
 * @returns {Promise<unknown>}
 */
async function completeRecipe(recipeJSON) {
  return new Promise((resolve, reject) => {
    // TODO: get it from the backend
    const challengeJSON = JSON.parse(localStorage.getItem('challenges'));

    // KEEP
    for (let i = 0; i < recipeJSON.challenges.length; i += 1) {
      for (let j = 0; j < challengeJSON.challenges.length; j += 1) {
        if (challengeJSON.challenges[j].title === recipeJSON.challenges[i]) {
          challengeJSON.challenges[j].numberCompleted += 1;
          break;
        }
      }
    }

    // KEEP below
    recipeJSON.completed = true;
    updateRecipe(recipeJSON)
      .then(() => {
        saveChallenges(challengeJSON);
        resolve(true);
      });
  });
}

/**
 * Gets a list of recipes that have a given spice level.
 * @param {Number} spiceLevel The spice level query between 1 and 5 inclusive.
 * @returns {Promise} Resolves with an array of recipe JSONs that match the query spice level,
 *                    rejects if spice level out of range.
 */
async function getBySpice(spiceLevel) {
  try {
    if (typeof spiceLevel !== 'number') {
      return new Error('Query was not a number!');
    } else if (spiceLevel < 1 || spiceLevel > 5) {
      return new Error('Spice level out of range!');
    }
    const response = await fetch(`${url}/recipes/spiceRating/${spiceLevel}`);
    const recipe = await response.json();
    return recipe;
  } catch (err) {
    return new Error('Get recipe by spice level failed');
  }
}

/**
 * TODO: make a new route for this function
 * @param {Array} recipeNames A list of recipe name queries.
 * @returns {Promise} Resolves with the number of recipes matching the given names,
 *                    rejects if it fails.
 */
async function countRecipes(recipeNames) {
  return new Promise((resolve) => {
    const numRecipes = 0;
    const namesProcessed = 0;
    if (recipeNames.length === 0) {
      resolve(0);
      return;
    }
    recipeNames.forEach((recipeName) => {
      // TODO: replace below with fetch call.
      // db.recipes.where('recipe_name').equals(recipeName).count()
      //   .then((count) => {
      //     numRecipes += count;
      //     namesProcessed += 1;
      //     if (namesProcessed === recipeNames.length) {
      //       resolve(numRecipes);
      //     }
      //   });
    });
  });
}

/**
 * TODO: need a route for this as well. GET /recipes/:title
 * @param {String} queryName The recipe name query.
 * @returns {Promise} Resolves with an array of recipe JSONs whose name contains the query,
 *                    rejects if it fails.
 */
async function getByName(query) {
  return new Promise((resolve, reject) => {
    if (typeof query !== 'string') {
      reject(new Error('Query was not a string!'));
    } else {
      const recipesPushed = 0;
      const recipeNames = [];
      let filteredNames;
      const queryLower = query.toLowerCase();
      // TODO: modify the below stuff
      // db.recipes.orderBy('recipe_name').eachUniqueKey((name) => {
      //   recipeNames.push(name);
      // })
      //   .then(() => {
      //     filteredNames = recipeNames.filter((name) => name.toLowerCase().includes(queryLower));
      //     return countRecipes(filteredNames);
      //   })
      //   .then((numRecipes) => {
      //     const jsonArray = [];
      //     if (numRecipes === 0) {
      //       resolve(jsonArray);
      //       return;
      //     }
      //     filteredNames.forEach(async (name) => {
      //       const collection = db.recipes.where('recipe_name').equals(name);
      //       collection.each((recipe) => {
      //         jsonArray.push(recipe.recipe_data);
      //         recipesPushed += 1;
      //       })
      //         .then(() => {
      //           if (recipesPushed === numRecipes) {
      //             resolve(jsonArray);
      //           }
      //         });
      //     });
      //   });
    }
  });
}

/**
 * Returns a recipe json associated with the ID
 * @param {String} id The recipe id query.
 * @returns {Promise} Resolves with a recipe JSON whose id is the query,
 *                    rejects if it fails.
 */
async function getById(id) {
  return new Promise((resolve, reject) => {
    // TODO: replace the below with fetch GET /recipeId/:recipeId
    // db.recipes.get(id)
    //   .then((data) => {
    //     resolve(data.recipe_data);
    //   })
    //   .catch((error) => {
    //     reject(error);
    //   });
  });
}

/**
 * TODO: modify to use challenge route. add a GET /user/completedChallenges
 * @returns {JSON} The challenge list JSON
 */
function getChallenges() {
  return JSON.parse(localStorage.getItem('challenges'));
}

database.loadChallenges = loadChallenges;
database.addRecipe = addRecipe;
database.updateRecipe = updateRecipe;
database.deleteRecipe = deleteRecipe;
database.completeRecipe = completeRecipe;
database.getBySpice = getBySpice;
database.getByName = getByName;
database.getById = getById;
database.getChallenges = getChallenges;
