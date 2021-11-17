// database.js
import Dexie from '../../../node_modules/dexie/dist/dexie.mjs';
import { importDB, exportDB } from '../../../node_modules/dexie-export-import/dist/dexie-export-import.mjs';

export const database = {};

// TODO: None of the methods involving recipe JSONs actually validate whether
// the JSON is the correct format. This could cause some serious headaches if
// we add an invalid JSON.

// TODO: Instead of adding each recipe to this array, find a way to automate
// reading files from directory.
const recipesFromFile = [
  'assets/jsons/Ghost-Pepper-Wings.json',
  'assets/jsons/Jalapeno-Garlic-Onion-Cheeseburger.json',
  'assets/jsons/Sichuan-Style-Bird-Eye-Chili-Sauce.json',
  'assets/jsons/Southwest-Stuffed-Poblano-Pepper.json',
  'assets/jsons/Spicy-Shrimp-Pad-Thai.json',
];

let loaded = false;

let db = new Dexie('MyDB');
db.version(1).stores({ recipes: 'recipe_name,spice_level' });

/**
 * Converts a string reprentation of a blob to a blob.
 * Lifted from https://gist.github.com/davoclavo/4424731
 * @param {string} dataURI A string represntation of a blob
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
 * Saves the Dexie database into local storage.
 * This function must only be called after calling loadDB().
 * @returns {Promise} Resolves true if database successfully saved, rejects otherwise.
 */
async function saveDB() {
  return new Promise((resolve, reject) => {
    if (!loaded) {
      reject(new Error('Database not loaded yet! Call loadDB().'));
    } else {
      exportDB(db)
        .then((blob) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            localStorage.setItem('database', event.target.result);
          };
          reader.readAsDataURL(blob);
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}

/**
 * Loads the Dexie database from local storage if it exists.
 * Otherwise, loads recipes from file into database.
 * @returns {Promise} Resolves true if recipes succesfully loaded, rejects otherwise.
 */
async function loadDB() {
  return new Promise((resolve, reject) => {
    db.recipes.clear().then(() => {
    // If the local storage contains database, import it
      if (localStorage.getItem('database')) {
        importDB(dataURItoBlob(localStorage.getItem('database')))
          .then((data) => {
            db = data;
            loaded = true;
            resolve(true);
          })
          .catch(() => {});
      } else { // Else, fetch recipes from file and load database
        let numImported = 0;
        recipesFromFile.forEach((recipe) => {
          fetch(recipe)
            .then((response) => response.json())
            .then((data) => {
              numImported += 1;
              db.recipes.put({
                recipe_name: data.title,
                spice_level: data.spiceRating,
                recipe_data: data,
              })
                .then(() => {
                  if (numImported === recipesFromFile.length) {
                  // Importing from file takes a while, so save to local storage
                    loaded = true;
                    saveDB()
                      .then(() => {
                        resolve(true);
                      });
                  }
                });
            })
            .catch((error) => {
              loaded = false;
              reject(error);
            });
        });
      }
    });
  });
}

// TODO: addRecipe() currently rejects if trying to add a recipe of the same name.
// Find a way to accept different recipes of the same name (maybe by ID?)
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
      const name = recipeJSON.title;
      db.recipes.get(name)
        .then((recipe) => {
          // If a recipe of the same name already exists, reject
          if (recipe !== undefined) {
            reject(new Error('A recipe of the same name already exists!'));
          } else {
            db.recipes.put({
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
      const name = recipeJSON.title;
      db.recipes.get(name).then((recipe) => {
        if (recipe === undefined) {
          reject(new Error('Recipe does not exist in database!'));
        }
        db.recipes.delete(name)
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

database.loadDB = loadDB;
database.saveDB = saveDB;
database.addRecipe = addRecipe;
database.updateRecipe = updateRecipe;
database.deleteRecipe = deleteRecipe;
