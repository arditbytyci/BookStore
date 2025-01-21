import { useEffect, useState } from "react";
import { Book } from "../../../Models/Book";
import {
  getBooks,
  updateBook,
  deleteBook,
  addBook,
} from "../services/bookService";
import { getAuthors } from "../services/authorService";
import { Author } from "../../../Models/Author";
import { Genre } from "../../../Models/Genre";
import { getGenres } from "../services/genreService";
export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
    fetchGenres();
  }, []);
  // ==================== BOOKS ======================= //
  // GET
  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      setError("Failed to fetch books.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBook = async (newBook: Book) => {
    try {
      const addedBook = await addBook(newBook);
      setBooks((prev) => [...prev, addedBook]);
    } catch (error) {
      setError("Failed to create book");
    }
  };

  const handleUpdateBook = async (updatedBook: Book) => {
    try {
      await updateBook(updatedBook);

      setBooks((prev) =>
        prev.map((book) =>
          book.bookID === updatedBook.bookID ? updatedBook : book
        )
      );
      fetchBooks();
    } catch (error) {
      setError("Failed to update book");
    }
  };

  const handleDeleteBook = async (bookID: number) => {
    try {
      await deleteBook(bookID);

      setBooks((prev) => prev.filter((book) => book.bookID !== bookID));
    } catch (error) {
      setError("Failed to delete book");
    }
  };

  // ==================== AUTHORS ======================= //

  const fetchAuthors = async () => {
    try {
      const data = await getAuthors();
      setAuthors(data);
    } catch (error) {
      setError("Failed to fetch authors - useBooks error");
    }
  };

  const fetchGenres = async () => {
    try {
      const data = await getGenres();
      setGenres(data);
    } catch (error) {
      setError("Failed to fetch genres - useBooks error");
    }
  };

  return {
    books,
    authors,
    genres,
    error,
    loading,
    handleUpdateBook,
    handleDeleteBook,
    handleCreateBook,
  };
};
