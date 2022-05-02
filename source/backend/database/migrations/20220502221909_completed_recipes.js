/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('completedRecipes', (tbl) => {
        tbl.increments('completedRecipeId').unique().notNullable();
        tbl.integer('userId').notNullable();
        tbl.integer('recipeId').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('completedRecipes');
};
