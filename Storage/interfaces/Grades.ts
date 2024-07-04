export interface GradesData {
  SemesterName: string;
  SemesterNumber: number;
  Courses: CourseG[];
}

export interface CourseG {
  Code: string;
  Title: string;
  CourseUnits: number;
  IsCompleted: boolean;
  ScheduledMark: number;
}