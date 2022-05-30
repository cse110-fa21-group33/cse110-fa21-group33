const db = require('../dbConfig');

/**
 * Get a list of all ingredients by recipe id
 * @param recipeId
 * @returns a promise
 */
async function getAllRecipeIngredients(){
    const result = await db('recipeIngredients')
    .join('recipes', 'recipeIngredients.recipeId', 'recipes.recipeId')
    .join('ingredients', 'recipeIngredients.ingredientId', 'ingredients.ingredientId')
    .select('recipeIngredients.recipeId', 'recipeIngredients.ingredientId',
            'ingredients.name', 'ingredients.quantity', 'ingredients.units');
    return result;
}

module.exports = { getAllRecipeIngredients }