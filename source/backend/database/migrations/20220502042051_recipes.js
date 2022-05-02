const challenge_enum = [
  'No Challenge', 'Two Spicy', 'Habanero Hero', 'Haunted Bowels', 'I Got the Sauce', 'Spicy Sips',
];
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('recipes', (tbl) => {
    tbl.increments('recipeId').unique().notNullable();
    tbl.text('title').notNullable();
    tbl.text('description').notNullable();
    tbl.text('image').notNullable();
    tbl.decimal('servingSize').notNullable();
    tbl.integer('scoville').notNullable();
    tbl.integer('spiceRating').notNullable();
    tbl.integer('prepTime').notNullable();
    tbl.integer('cookTime').notNullable();
    tbl.integer('totalTime').notNullable();
    tbl.text('directions').notNullable();
    tbl.enum('challenge', challenge_enum, { useNative: true, enumName: 'challenge_enum' }).notNullable().index();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('recipes');
};
