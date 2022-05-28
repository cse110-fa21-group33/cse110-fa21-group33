// database.js
import ShortUniqueId from 'https://esm.sh/short-unique-id';

export const database = {};

const loaded = false;
const uid = new ShortUniqueId();

let url = 'http://localhost:3000'

/**
 * Converts a string representation of a blob to a blob.
 * Lifted from https://gist.github.com/davoclavo/4424731
 * @param {string} dataURI A string representation of a blob
 * @returns {Blob} The converted blob
 */
function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  const byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const _ia = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i += 1) {
    _ia[i] = byteString.charCodeAt(i);
  }

  const dataView = new DataView(arrayBuffer);
  const blob = new Blob([dataView], { type: mimeString });
  return blob;
}

/**
 * Saves the challenge JSON into local storage
 * @param {JSON} challengeJSON The JSON to save
 */
function saveChallenges(challengeJSON) {
  const challengeString = JSON.stringify(challengeJSON);
  localStorage.setItem('challenges', challengeString);
}

/**
 * Adds a recipe to the database.
 * If a recipe of the same name already exists, does not add in the recipe.
 * This function must only be called after calling loadDB().
 * @param {JSON} recipeJSON The JSON of the recipe to add.
 * @returns {Promise} Resolves true if the recipe was successfully added, rejects otherwise.
 */
async function addRecipe(recipeJSON) {
  return new Promise((resolve, reject) => {
    if (!loaded) {
      reject(new Error('Database not loaded yet! Call loadDB().'));
    } else {
      const id = uid();
      recipeJSON.id = id;
      db.recipes.put({
        recipe_id: id,
        recipe_name: recipeJSON.title,
        spice_level: recipeJSON.spiceRating,
        recipe_data: recipeJSON,
      })
        .then(() => {
        // After adding recipe to database, save database
          saveDB()
            .then(() => {
              resolve(true);
            });
        });
    }
  });
}

// TODO: updateRecipe() currently trusts that the recipe updating already exists in the database.
// One way to check is by checking if the recipe name exists in the database.
// However, if the user changes the recipe name, then this check obviously fails.
// Find a way to check if the recipe exists using something other than recipe name (maybe ID?)
/**
 * Updates a recipe in the database.
 * This function must only be called after calling loadDB().
 * @param {JSON} recipeJSON The JSON of the recipe to update.
 * @returns {Promise} Resolves true if the recipe was successfully updated, rejects otherwise.
 */
async function updateRecipe(recipeJSON) {
  return new Promise((resolve, reject) => {
    if (!loaded) {
      reject(new Error('Database not loaded yet! Call loadDB().'));
    } else {
      db.recipes.put({
        recipe_id: recipeJSON.id,
        recipe_name: recipeJSON.title,
        spice_level: recipeJSON.spiceRating,
        recipe_data: recipeJSON,
      }, [recipeJSON.title])
        .then(() => {
          // After updating recipe, save database
          saveDB()
            .then(() => {
              resolve(true);
            });
        });
    }
  });
}

/**
 * Deletes a recipe from the database.
 * This function must only be called after calling loadDB();
 * @param {JSON} recipeJSON The JSON of the recipe to delete.
 * @returns {Promise} Resolves true if the recipe was successfully deleted, rejects otherwise.
 */
async function deleteRecipe(recipeJSON) {
  return new Promise((resolve, reject) => {
    if (!loaded) {
      reject(new Error('Database not loaded yet! Call loadDB().'));
    } else {
      // eslint-disable-next-line prefer-destructuring
      const id = recipeJSON.id;
      db.recipes.get(id).then((recipe) => {
        if (recipe === undefined) {
          reject(new Error('Recipe does not exist in database!'));
        }
        db.recipes.delete(id)
          .then(() => {
          // After deleting recipe, save database
            saveDB()
              .then(() => {
                resolve(true);
              });
          });
      });
    }
  });
}

/**
 * Marks a recipe as completed and updates the challenge list to reflect completion.
 * @param {JSON} recipeJSON The JSON of the recipe to complete
 * @returns {Promise} Resolves true if the recipe is successfully completed, rejects otherwise.
 */
async function completeRecipe(recipeJSON) {
  return new Promise((resolve, reject) => {
    if (!loaded) {
      reject(new Error('Database not loaded yet! Call loadDB().'));
    } else if (recipeJSON.completed) {
      reject(new Error('Recipe already completed!'));
    } else {
      const challengeJSON = JSON.parse(localStorage.getItem('challenges'));
      for (let i = 0; i < recipeJSON.challenges.length; i += 1) {
        for (let j = 0; j < challengeJSON.challenges.length; j += 1) {
          if (challengeJSON.challenges[j].title === recipeJSON.challenges[i]) {
            challengeJSON.challenges[j].numberCompleted += 1;
            break;
          }
        }
      }
      recipeJSON.completed = true;
      updateRecipe(recipeJSON)
        .then(() => {
          saveChallenges(challengeJSON);
          resolve(true);
        });
    }
  });
}

/**
 * Gets a list of recipes that have a given spice level.
 * @param {Number} spiceLevel The spice level query between 1 and 5 inclusive.
 * @returns {Promise} Resolves with an array of recipe JSONs that match the query spice level,
 *                    rejects if spice level out of range.
 */
async function getBySpice(spiceLevel) {
  return new Promise((resolve, reject) => {
    if (typeof spiceLevel !== 'number') {
      reject(new Error('Query was not a number!'));
    } else if (spiceLevel < 1 || spiceLevel > 5) {
      reject(new Error('Spice level out of range!'));
    } else {
      console.log('getting recipes by spice');
      fetch(`${url}/recipes/spiceRating/${spiceLevel}`)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          resolve(result);
        })
        .catch(error => {
          reject(new Error('Could not get recipes.'));
        });
    }
  });
}

/**
 * Gets the number of recipes that match a list of given names.
 * @param {Array} recipeNames A list of recipe name queries.
 * @returns {Promise} Resolves with the number of recipes matching the given names,
 *                    rejects if it fails.
 */
async function countRecipes(recipeNames) {
  return new Promise((resolve) => {
    let numRecipes = 0;
    let namesProcessed = 0;
    if (recipeNames.length === 0) {
      resolve(0);
      return;
    }
    recipeNames.forEach((recipeName) => {
      db.recipes.where('recipe_name').equals(recipeName).count()
        .then((count) => {
          numRecipes += count;
          namesProcessed += 1;
          if (namesProcessed === recipeNames.length) {
            resolve(numRecipes);
          }
        });
    });
  });
}

/**
 * Gets a list of recipes whose title contains a given name.
 * This method is slow! Avoid calling it unless necessary.
 * @param {String} queryName The recipe name query.
 * @returns {Promise} Resolves with an array of recipe JSONs whose name contains the query,
 *                    rejects if it fails.
 */
async function getByName(query) {
  return new Promise((resolve, reject) => {
    if (typeof query !== 'string') {
      reject(new Error('Query was not a string!'));
    } else {
      let recipesPushed = 0;
      const recipeNames = [];
      let filteredNames;
      const queryLower = query.toLowerCase();
      db.recipes.orderBy('recipe_name').eachUniqueKey((name) => {
        recipeNames.push(name);
      })
        .then(() => {
          filteredNames = recipeNames.filter((name) => name.toLowerCase().includes(queryLower));
          return countRecipes(filteredNames);
        })
        .then((numRecipes) => {
          const jsonArray = [];
          if (numRecipes === 0) {
            resolve(jsonArray);
            return;
          }
          filteredNames.forEach(async (name) => {
            const collection = db.recipes.where('recipe_name').equals(name);
            collection.each((recipe) => {
              jsonArray.push(recipe.recipe_data);
              recipesPushed += 1;
            })
              .then(() => {
                if (recipesPushed === numRecipes) {
                  resolve(jsonArray);
                }
              });
          });
        });
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
    db.recipes.get(id)
      .then((data) => {
        resolve(data.recipe_data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * Gets the challenge list from local storage
 * @returns {JSON} The challenge list JSON
 */
function getChallenges() {
  return JSON.parse(localStorage.getItem('challenges'));
}

database.addRecipe = addRecipe;
database.updateRecipe = updateRecipe;
database.deleteRecipe = deleteRecipe;
database.completeRecipe = completeRecipe;
database.getBySpice = getBySpice;
database.getByName = getByName;
database.getById = getById;
database.getChallenges = getChallenges;
