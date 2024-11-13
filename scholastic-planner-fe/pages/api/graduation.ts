import { httpClient } from "./httpClient";

export interface GraduationProfileResponse {
  academicRecords: AcademicRecord[];
  courseId: string;
  studentId: string;
  courseName: string;
  courseDescription: string;
  gpax: number;
  currentCredits: number;
  hasPassedCourses: boolean;
  requirements: Requirements;
}

export interface AcademicRecord {
  subjects: Subject[];
  year: string;
  semester: string;
  gpa: string;
}

export interface Subject {
  id: string;
  name: string;
  credits: number;
  grade: number;
}

export interface Requirements {
  minCredits: number;
  minGPA: number;
  maxDuration: number;
}

export const getGraduationProfile = async () => {
  const data = await httpClient.get<GraduationProfileResponse>(
    "http://localhost:7003/graduation/profile"
  );
  return data?.data;
};

export const registerCourseById = async (id: string) => {
  const data = await httpClient.post(
    "http://localhost:7003/graduation/profile",
    {
      courseId: id,
    }
  );
  return data?.data;
};

export const registerSubjectById = async (id: string) => {
  const data = await httpClient.post(
    "http://localhost:7003/graduation/registerSubject",
    {
      subjectId: id,
      semester: "1",
      year: "2024",
    }
  );
  return data?.data;
};
