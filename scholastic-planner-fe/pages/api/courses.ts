import { httpClient } from "./httpClient";
export interface CoursesResponse {
  graduationRequirements: GraduationRequirements
  _id: string
  courseName: string
  courseDescription: string
  departmentId: string
  subjects: Subject[]
  createdAt: string
  updatedAt: string
  __v: number
}

export interface GraduationRequirements {
  minimumCredits: number
  minimumGPA: number
  maximumDuration: number
}

export interface Subject {
  subjectId: string
  mandatory: boolean
  credits: number
  _id: string
}

export const getAllCourses = async () => {
  const data = await httpClient.get<CoursesResponse[]>("http://localhost:7002/api/courses");
  return data?.data;
};
