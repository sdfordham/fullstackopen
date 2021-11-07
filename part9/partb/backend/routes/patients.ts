import express from 'express';
const patientsRouter = express.Router();
import patientsData from './json/patients.json';
import { Patient, NonSensitivePatient } from '../types';

const patients: Array<Patient> = patientsData;

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
}

patientsRouter.get('/', async (_request, response) => {
  response.json(getNonSensitivePatients());
}); 

module.exports = patientsRouter;
