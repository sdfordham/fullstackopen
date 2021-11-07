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
