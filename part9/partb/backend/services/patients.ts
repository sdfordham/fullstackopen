import { Patient, NonSensitivePatient, NewPatient } from '../types';
import patientsData from '../json/patients.json';
import {v1 as uuid} from 'uuid';

const patients: Array<Patient> = patientsData;

export const getNonSensitivePatients = (patients: Array<Patient>): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
}

export const addPatient = ( entry: NewPatient ): Patient => {
    const id = uuid()
    const newPatientEntry = {
        id,
        ...entry
    };

  patients.push(newPatientEntry);
  return newPatientEntry;
};
