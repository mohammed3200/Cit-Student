export interface InfoStudent {
  StudentName: string;
  RegistrationNumber: string;
  PersonalPicture: string | null;
  DepartmentName: string;
  DateOfBirth: string;
  Nationality: string;
  gender: string;
  citemail: string | null;
  CumulativeAverage: string;
  UnitsCompleted: number;
  DiplomaGPA: string;
  PhoneNumber: string;
  QrCode: string;
  SchoolSystem: string;
}

export interface InfoStudentItem {
  StudentName: string;
  RegistrationNumber: string;
  PersonalPicture: string | undefined;
  DepartmentName: string;
  DateOfBirth: string;
  Nationality: string;
  gender: string;
  citemail: string | null;
  CumulativeAverage: string;
  UnitsCompleted: string;
  PhoneNumber:string;
}
