export const createUserNameStudent = (user) => {
  if (!user) return;
  const { student, age, degree } = user;
  const cleanStudent = student.replaceAll(" ", "");
  const cleanStudentLower = cleanStudent.toLowerCase();
  const shortStudent = cleanStudentLower.substring(0, 3);
  const userNameStudent = `${shortStudent}${age}${degree}`;
  return userNameStudent;
};
