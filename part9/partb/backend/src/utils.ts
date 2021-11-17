import { Entry, Gender } from "./types";
import { NewPatientEntry } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
      throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseGender = (gender: unknown): Gender=> {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};
  
type Fields = { name : unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown, ssn: unknown, entries: unknown };

export const toNewPatientEntry = ( {name, dateOfBirth, gender, occupation, ssn, entries }: Fields ): NewPatientEntry => {
    const newPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        ssn: parseSsn(ssn),
        entries: entries as Entry[]
    };
  return newPatientEntry;
};

export default toNewPatientEntry;