import { SubjectResponse } from './courses'
import { httpClient } from './httpClient'

export interface TimeTableResponse {
  studentid: string
  semester: string
  year: number
  subjects: SubjectResponse[]
}

export const getTimeTableById = async (
  id: string,
  semester: string,
  year: string
) => {
  const data = await httpClient.get<TimeTableResponse>(
    `/api/timeTable/${id}/${semester}/${year}`
  )
  return data?.data
}

export const createTimeTable = async (
  id: string,
  semester: string,
  year: string,
  subjects: SubjectResponse[]
) => {
  const data = await httpClient.post<TimeTableResponse>(
    `/api/timeTable/create`,
    {
      studentId: id,
      semester: semester,
      year: year,
      subjects: subjects,
    }
  )
  return data?.data
}

export const updateTimeTable = async (
  id: string,
  semester: string,
  year: string,
  subjects: SubjectResponse[]
) => {
  const data = await httpClient.put<TimeTableResponse>(
    `/api/timeTable/update/${id}/${semester}/${year}`,
    {
      studentId: id,
      semester: semester,
      year: year,
      subjects: subjects,
    }
  )
  return data?.data
}
