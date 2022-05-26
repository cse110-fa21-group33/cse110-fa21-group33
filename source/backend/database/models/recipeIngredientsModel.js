const db = require('../dbConfig');

/**
 * Get a list of all ingredients by recipe id
 * @param recipeId
 * @returns a promise
 */
async function getIngredientsByRecipeId(recipeId){
    const result = await db('recipeIngredients')
    .join('ingredients', 'recipeIngredients.ingredientId', 'ingredients.ingredientId')
    .select('*')
    .where({ recipeId });
    return result
}

module.exports = { getIngredientsByRecipeId }