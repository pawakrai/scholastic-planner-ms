import { SubjectResponse } from "./courses";
import { httpClient } from "./httpClient";

export interface TimeTableResponse {
    studentid: string
    semester: string
    year: number
    subjects: SubjectResponse[]
  }

export const getTimeTableById = async (id: string, semester: string, year: string) => {
    const data = await httpClient.get<TimeTableResponse>(`http://localhost:7005/api/timeTable/${id}/${semester}/${year}`);
    return data?.data;
  }