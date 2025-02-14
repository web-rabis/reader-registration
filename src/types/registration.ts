
export interface Dictionary {
  id: number;
  name: string;
}

export interface RegistrationFormData {
  photo: string | null;
  iin: string;
  lastName: string;
  firstName: string;
  birthDate: string;
  address: string;
  phoneNumber: string;
  mobilePhone: string;
  email: string;
  gender: number;
  education: number;
  socialStatus: number;
  specialization: number;
  institute: number;
  faculty: number;
  course: string;
  workplace: string;
  position: string;
  academicDegree: number;
}
