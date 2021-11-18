import express from 'express';
const router = express.Router();
import diagnosesEntries from '../../data/diagnoses';

router.get('/', async (_request, response) => {
  response.json(diagnosesEntries);
});

module.exports = router;
