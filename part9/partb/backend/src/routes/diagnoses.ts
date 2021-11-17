import express from 'express';
const diagnosesRouter = express.Router();
import diagnosesEntries from '../../data/diagnoses';

diagnosesRouter.get('/', async (_request, response) => {
  response.json(diagnosesEntries);
});

module.exports = diagnosesRouter;
