exports.up = function(knex) {
  return knex.schema.createTable('cohorts', function(tbl) {
    // PK, called id, auto-increment
    tbl.increments();

    tbl.string('name', 128).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableExists('cohorts');
};
