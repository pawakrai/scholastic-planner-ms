import { httpClient } from "./httpClient";
export const getCourses = async () => {
    const data = await httpClient
      .get("path/path")
      .catch(async () => {
        return { data: { getCourses: null } };
      });
    return data?.data;
  };
  