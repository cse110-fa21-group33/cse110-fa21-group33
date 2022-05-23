exports.up = function(knex) {
  return knex.schema.table('recipes', (tbl)=>{
    tbl.integer('userId');
  });
};

exports.down = function(knex) {
  return knex.schema.table('recipes', (tbl)=>{
    tbl.dropColumn('userId');
  });
};
