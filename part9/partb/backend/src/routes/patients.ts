/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
const router = express.Router();
import patientService from '../services/patients';
import toNewPatientEntry from '../utils'

router.get('/', async (_request, response) => {
  response.json(patientService.getNonSensitivePatients());
}); 

router.get('/:id', async (_request, response) => {
  const patient = patientService.findById(_request.params.id);

  if (patient) {
    response.send(patient)
  } else {
    response.sendStatus(404)
  }
}); 

router.post('/', async (_request, response) => {
  try {
    const newPatientEntry = toNewPatientEntry(_request.body)
    const addedEntry = patientService.addPatient(newPatientEntry)
    response.json(addedEntry)
  }  catch (error: unknown) {
    let errorMessage = 'Error: '
    if(error instanceof Error) {
      errorMessage += error.message;
    }
    response.status(400).send(errorMessage);
  }
});

module.exports = router;
