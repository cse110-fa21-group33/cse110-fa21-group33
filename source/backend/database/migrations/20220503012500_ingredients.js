/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('ingredients', (tbl) => {
      tbl.increments('ingredientId').unique().notNullable();
      tbl.text('name').notNullable();
      tbl.decimal('quantity').notNullable();
      tbl.text('units').notNullable();
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
      return knex.schema.dropTable('ingredients');
  };
