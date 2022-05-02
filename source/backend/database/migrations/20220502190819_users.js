/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', (tbl) => {
        tbl.increments('userId').unique().notNullable();
        tbl.text('email').notNullable();
        tbl.text('password').notNullable();
        tbl.text('username').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
