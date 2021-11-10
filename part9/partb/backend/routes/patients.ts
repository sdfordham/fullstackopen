/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
const patientsRouter = express.Router();
import patientsData from '../json/patients.json';
import { Patient } from '../types';
import { getNonSensitivePatients, addPatient } from '../services/patients';

const patients: Array<Patient> = patientsData;

patientsRouter.get('/', async (_request, response) => {
  response.json(getNonSensitivePatients(patients));
}); 

patientsRouter.post('/', async (_request, response) => {
  const { name, dateOfBirth, gender, occupation, ssn } = _request.body;
  const newPatient = addPatient({ name, dateOfBirth, gender, occupation, ssn })
  response.json(newPatient);
}); 

module.exports = patientsRouter;
