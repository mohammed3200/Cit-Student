export interface timeTable {
  Semester: number;
  SemesterName: string;
  CurrentCourseDates: CurrentCourseDate[];
}

interface CurrentCourseDate {
  NameCourse: string;
  CodeCourse: string;
  Lectures: Lecture[];
}

interface Lecture {
  CourseTeacher: string;
  ClassRoom?: string;
  Day: string;
  Hours: Hour[];
  Group: number;
  Lab?: string;
}

interface Hour {
  TimeFromTo: string;
}

export interface timeTableItem {
  Semester: number;
  SemesterName: string;
  CurrentCourseDates: CurrentCourseDateItem[];
  LectureDays: LectureDaysItems[];
}

export interface CurrentCourseDateItem {
  NameCourse: string;
  CodeCourse: string;
  GroupTheoretical?: number | null;
  GroupPractical?: number | null;
}
export interface LectureDaysItems {
  Day: string;
  NameCourse: string;
  CourseTeacher: string;
  ClassRoom?: string;
  Hours: Hour[];
  Group: number;
  Lab?: string;
}
