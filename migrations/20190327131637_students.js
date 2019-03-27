exports.up = function(knex) {
  return knex.schema.createTable('students', function(tbl) {
    // PK, called id, auto-increment
    tbl.increments();

    tbl.string('name', 128).notNullable();

    tbl
      .integer('cohort_id')
      .unsigned()
      .references('id')
      .inTable('cohorts')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    // tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('students');
};
