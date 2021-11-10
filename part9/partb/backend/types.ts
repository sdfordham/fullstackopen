export interface Diagnoses {
  code: string,
  name: string,
  latin?: string
}

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  gender: string,
  occupation: string,
  ssn: string
}

export interface NonSensitivePatient {
  id: string,
  name: string,
  dateOfBirth: string,
  gender: string,
  occupation: string
}

export type NewPatient = {
  name: unknown,
  dateOfBirth: unknown,
  gender: unknown,
  occupation: unknown,
  ssn: unknown
};

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
};
