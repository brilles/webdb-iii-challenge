exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Jim', cohort_id: 3 },
        { name: 'Jane', cohort_id: 2 },
        { name: 'Bob', cohort_id: 1 }
      ]);
    });
};
