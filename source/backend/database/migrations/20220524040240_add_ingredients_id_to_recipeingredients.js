exports.up = function (knex) {
  return knex.schema.table('recipeIngredients', (tbl) => {
    tbl.integer('ingredientId');
  });
};

exports.down = function (knex) {
  return knex.schema.table('recipeIngredients', (tbl) => {
    tbl.dropColumn('ingredientId');
  });
};
