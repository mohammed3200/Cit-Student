
export interface Courses {
  Units: number;
  Courses: Course[];
}

export interface Course {
  Title: string;
  Code: string;
  CourseUnits: number;
  IsCompleted: boolean;
  Prerequisites: null | string;
}