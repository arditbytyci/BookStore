import axiosClient from "../../../axiosClient";
import { Author } from "../../../Models/Author";

export const getAuthors = async (): Promise<Author[]> => {
  const response = await axiosClient.get("/author");
  return response.data;
};

export const addAuthor = async (author: Author): Promise<Author> => {
  const response = await axiosClient.post("/author", author);
  return response.data;
};

export const updateAuthor = async (author: Author): Promise<void> => {
  await axiosClient.put(`/author/${author.authorID}`, author);
};

export const deleteAuthor = async (authorID: number): Promise<void> => {
  await axiosClient.delete(`/delete/${authorID}`);
};
