import { timeTable, timeTableItem, LectureDaysItems,CurrentCourseDateItem } from "../interfaces";

export const configDataTimeTable = (data: timeTable): timeTableItem => {
    const CurrentCourseDates = data.CurrentCourseDates.map((item) => {
        const GroupTheoretical = item.Lectures.filter(
          (Group) => Group.ClassRoom
        ).map((Group) => Group.Group);
        const GroupPractical = item.Lectures.filter((Group) => Group.Lab).map(
          (Group) => Group.Group
        );
    
        return {
          NameCourse: item.NameCourse,
          CodeCourse: item.CodeCourse,
          GroupTheoretical: GroupTheoretical.length > 0 ? GroupTheoretical[0] : null,
          GroupPractical: GroupPractical.length > 0 ? GroupPractical[0] : null,
        };
      });

  const LectureDays = data.CurrentCourseDates.flatMap((course) =>
    course.Lectures.map((lecture) => ({
      Day: lecture.Day,
      CourseTeacher: lecture.CourseTeacher,
      ClassRoom: lecture.ClassRoom,
      Hours: lecture.Hours,
      Group: lecture.Group,
      Lab: lecture.Lab,
    }))
  );

  const LectureDaysItems = LectureDays.reduce((acc, lecture) => {
    const existingItem = acc.find((item) => item.Day === lecture.Day);
    if (existingItem) {
      existingItem.Hours.push(...lecture.Hours);
    } else {
      acc.push({
        Day: lecture.Day,
        CourseTeacher: lecture.CourseTeacher,
        ClassRoom: lecture.ClassRoom,
        Hours: lecture.Hours,
        Group: lecture.Group,
        Lab: lecture.Lab,
      });
    }
    return acc;
  }, [] as LectureDaysItems[]);

  return {
    Semester: data.Semester,
    SemesterName: data.SemesterName,
    CurrentCourseDates,
    LectureDays: LectureDaysItems,
  };
};
