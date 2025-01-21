import axiosClient from "../../../axiosClient";
import { Genre } from "../../../Models/Genre";

export const getGenres = async (): Promise<Genre[]> => {
  const response = await axiosClient.get("/genre");
  return response.data;
};
