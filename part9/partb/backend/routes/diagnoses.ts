import express from 'express';
const diagnosesRouter = express.Router();
import diagnosesData from '../json/diagnoses.json';
import { Diagnoses } from '../types';

const diagnoses: Array<Diagnoses> = diagnosesData;

diagnosesRouter.get('/', async (_request, response) => {
  response.json(diagnoses);
});

module.exports = diagnosesRouter;
