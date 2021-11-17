// test
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry} from '../types';
import {v1 as uuid} from 'uuid';
import patientEntries from '../../data/patients';

const patients: Array<PatientEntry> = patientEntries;

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }))
}

const addPatient = ( entry: NewPatientEntry): PatientEntry => {
  const id = uuid()
  const newPatientEntry = {
      id,
      ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find(p => p.id == id)
  return entry
}

export default {
  getEntries,
  getNonSensitivePatients,
  addPatient,
  findById
};
