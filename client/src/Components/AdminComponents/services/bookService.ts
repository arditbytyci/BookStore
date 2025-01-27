import axiosClient from "../../../api/axiosClient";
import { Book } from "../../../Models/Book";

export const getBooks = async (): Promise<Book[]> => {
  const res = await axiosClient.get("/book");
  return res.data;
};

export const addBook = async (book: Book): Promise<Book> => {
  const res = await axiosClient.post("/book", book);
  return res.data;
};

export const updateBook = async (book: Book): Promise<void> => {
  await axiosClient.put(`/book/${book.bookID}`, book);
};

export const deleteBook = async (bookID: number): Promise<void> => {
  await axiosClient.delete(`/book/${bookID}`);
};
