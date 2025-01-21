import axiosClient from "../../../axiosClient";
import { Genre } from "../../../Models/Genre";

export const getGenres = async (): Promise<Genre[]> => {
  const response = await axiosClient.get("/genre");
  return response.data;
};

export const addGenre = async (genre: Genre): Promise<Genre> => {
  const response = await axiosClient.post("/genre", genre);
  return response.data;
};

export const updateGenre = async (genre: Genre): Promise<void> => {
  await axiosClient.put(`/genre/${genre.genreID}`, genre);
};

export const deleteGenre = async (genreID: number): Promise<void> => {
  await axiosClient.delete(`/genre/${genreID}`);
};
