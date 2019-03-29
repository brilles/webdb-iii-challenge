const router = require('express').Router();
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './data/lambda.sqlite3'
  }
};

const db = knex(knexConfig);

router.get('/', async (req, res) => {
  // return an array of all the cohorts
  try {
    const cohorts = await db('cohorts');
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cohort = await db('cohorts')
      .where({ id: req.params.id })
      .first();
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id/students', async (req, res) => {
  try {
    const students = await db('students').where({ cohort_id: req.params.id });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const [id] = await db('cohorts').insert(req.body);
    const cohort = await db('cohorts')
      .where({ id })
      .first();
    res.status(201).json(cohort);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const count = await db('cohorts')
      .where({ id: req.params.id })
      .update(req.body);

    if (count) {
      const cohort = await db('cohorts')
        .where({ id: req.params.id })
        .first();
      res.status(200).json(cohort);
    } else {
      res.status(404).json({ message: 'Cohort not found.' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await db('cohorts')
      .where({ id: req.params.id })
      .del();

    if (count) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Cohort not found.' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
