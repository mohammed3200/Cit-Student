import { InfoStudent, InfoStudentItem } from "../interfaces";
import moment from "moment";

export const configDataInfoStudent = (data: InfoStudent): InfoStudentItem => {
  // If the image is empty, it takes the first letter of the first word and the first letter of the last word
  const PersonalPicture =
    data.PersonalPicture ??
    (data.StudentName?.split(" ")[0]?.charAt(0) || "") +
      (data.StudentName?.split(" ")[
        data.StudentName?.split(" ")?.length - 1
      ]?.charAt(0) || "");

  // The date of birth must be converted from the format "2001-09-10T22:00:00.000Z" to "YYYY-MM-DD Year (Age)"
  // Student age
  const dateOfBirth = moment(data.DateOfBirth).format("YYYY-MM-DD");
  const studentAge = moment().diff(moment(data.DateOfBirth), "years");
  const DateOfBirth = `${dateOfBirth}   ${studentAge} سنة`;
  // The CumulativeAverage must first be converted from a string literal to a decimal number.
  // If it is greater than zero, it must be rounded to a decimal number.
  // If it is equal to zero, the DiplomaGPA must be converted from a string literal to a decimal number,
  //  and then it must be rounded to a decimal number.
  const CumulativeAverage =
    parseFloat(data.CumulativeAverage) > 0
      ? `% ${parseFloat(data.CumulativeAverage).toFixed(2)}`
      : parseFloat(data.DiplomaGPA) > 0
      ? `% ${parseFloat(data.DiplomaGPA).toFixed(2)}`
      : "% 0";

  // The international number must be separated from the phone number
  // Extract the international number from the phone number
  const internationalCode = data.PhoneNumber?.slice(0, 4);
  const localNumber = data.PhoneNumber?.slice(4);
  const PhoneNumber = `${internationalCode} ${localNumber}`;

  return {
    StudentName: data.StudentName,
    RegistrationNumber: data.RegistrationNumber,
    PersonalPicture,
    DepartmentName: data.DepartmentName,
    DateOfBirth,
    Nationality: data.Nationality,
    gender: data.gender,
    citemail: data.citemail,
    CumulativeAverage,
    UnitsCompleted: `${data.UnitsCompleted} منجز`,
    PhoneNumber,
  };
};
