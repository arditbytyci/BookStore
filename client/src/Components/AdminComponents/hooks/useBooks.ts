import { useEffect, useState } from "react";
import { Book } from "../../../Models/Book";
import { getBooks, updateBook, deleteBook } from "../services/bookService";
export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchBooks();
  }, []);

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

  const handleUpdateBook = async (updatedBook: Book) => {
    try {
      await updateBook(updatedBook);

      setBooks((prev) =>
        prev.map((book) =>
          book.bookID === updatedBook.bookID ? updatedBook : book
        )
      );
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

  return {
    books,
    error,
    loading,
    handleUpdateBook,
    handleDeleteBook,
  };
};
