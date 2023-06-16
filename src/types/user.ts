export interface User {
  id: number;
  name: string;
  surname: string;
  role: Role;
}

export interface Student extends User {
  role: Role.STUDENT;
  group: string;
  absente: Absenta[];
}

export interface Professor extends User {
  role: Role.PROF;
}

export interface Admin extends User {
  role: Role.ADMIN;
}

export interface Absenta {
  id: number;
  student: User;
  prof: User;
  subject: string;
  status: AbsentaStatus;
  datesAbsenta: DataAbsenta[];
  datesRecuperare: DataAbsenta[];
}

export interface DataAbsenta {
  date: string;
  time: string;
}

export enum AbsentaStatus {
  NEACHITAT = "neachitat",
  ACHITAT = "achitat",
  IN_PROGRESS = "in_progress",
  RECUPERAT = "recuperat",
}

export enum Role {
  ADMIN = "admin",
  STUDENT = "student",
  PROF = "professor",
}
