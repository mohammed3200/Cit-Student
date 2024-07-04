export interface GradesData {
  SemesterName: string;
  SemesterNumber: number;
  Courses: Course[];
}

interface Course {
  Code: string;
  Title: string;
  CourseUnits: number;
  IsCompleted: boolean;
  ScheduledMark: number;
}