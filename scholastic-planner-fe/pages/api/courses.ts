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

export interface SubjectResponse {
  _id: string
  subjectId: string
  subjectName: string
  subjectDescription: string
  credits: number
  semester: number
  year: number
  isOpen: boolean
  date: string[]
  startTime: string
  endTime: string
  sec: number
  createdAt: string
  updatedAt: string
  __v: number
}


export const getAllCourses = async () => {
  const data = await httpClient.get<CoursesResponse[]>("http://localhost:7002/api/courses");
  return data?.data;
};

export const getAllSubject = async () => {
  const data = await httpClient.get<SubjectResponse[]>("http://localhost:7002/api/subjects");
  return data?.data;
}