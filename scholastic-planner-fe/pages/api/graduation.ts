import { httpClient } from './httpClient'

export interface GraduationProfileResponse {
  academicRecords: AcademicRecord[]
  courseId: string
  studentId: string
  courseName: string
  courseDescription: string
  gpax: number
  currentCredits: number
  hasPassedCourses: boolean
  requirements: Requirements
}

export interface AcademicRecord {
  subjects: Subject[]
  year: string
  semester: string
  gpa: string
}

export interface Subject {
  id: string
  name: string
  credits: number
  grade: number
}

export interface Requirements {
  minCredits: number
  minGPA: number
  maxDuration: number
}

export const getGraduationProfile = async () => {
  const data = await httpClient.get<GraduationProfileResponse>(
    '/graduation/profile'
  )
  return data?.data
}

export const registerCourseById = async (id: string) => {
  const data = await httpClient.post('/graduation/profile', {
    courseId: id,
  })
  return data?.data
}

export const registerSubjectById = async (id: string) => {
  const data = await httpClient.post('/graduation/registerSubject', {
    subjectId: id,
    semester: '1',
    year: '2024',
  })
  return data?.data
}

export const updateSubjectById = async (id: string, grade: number) => {
  const data = await httpClient.post<GraduationProfileResponse>(
    '/graduation/updateSubject',
    {
      subjectId: id,
      grade: grade,
      semester: '1',
      year: '2024',
    }
  )
  return data?.data
}
