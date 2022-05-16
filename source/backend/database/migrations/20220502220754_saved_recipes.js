/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('savedRecipes', (tbl) => {
    tbl.increments('savedRecipeId').unique().notNullable();
    tbl.integer('userId').notNullable();
    tbl.integer('recipeId').notNullable();
    tbl.boolean('isCreator').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('savedRecipes');
};
