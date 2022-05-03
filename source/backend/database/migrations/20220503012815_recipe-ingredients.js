/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('recipe-ingredients', (tbl) => {
      tbl.increments('recipeIngredientsId').unique().notNullable();
      tbl.integer('recipeId').notNullable();
      tbl.integer('quantity').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('recipe-ingredients');
};
