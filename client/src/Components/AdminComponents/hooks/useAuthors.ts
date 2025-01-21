import { useEffect, useState } from "react";
import { Author } from "../../../Models/Author";
import {
  addAuthor,
  deleteAuthor,
  getAuthors,
  updateAuthor,
} from "../services/authorService";

export const useAuthor = () => {
  const [authors, setAuthor] = useState<Author[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const data = await getAuthors();
      setAuthor(data);
    } catch (error) {
      setError("Failed to fetch authors.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAuthor = async (newAuthor: Author) => {
    try {
      const addedAuthor = await addAuthor(newAuthor);
      setAuthor((prev) => [...prev, addedAuthor]);
    } catch (error) {
      setError("Failed to add author");
    }
  };

  const handleAuthorUpdate = async (updatedAuthor: Author) => {
    try {
      await updateAuthor(updatedAuthor);

      setAuthor((prev) =>
        prev.map((author) =>
          author.authorID === updatedAuthor.authorID ? updatedAuthor : author
        )
      );
      fetchAuthors();
    } catch (error: any) {
      console.error("Update failed:", error.response?.data || error.message);
      setError("Failed to update author");
    }
  };

  const handleAuthorDelete = async (authorID: number) => {
    try {
      await deleteAuthor(authorID);

      setAuthor((prev) =>
        prev.filter((author) => author.authorID !== authorID)
      );
    } catch (error) {
      setError("Failed to delete author");
    }
  };

  return {
    authors,
    handleAuthorUpdate,
    handleAuthorDelete,
    handleCreateAuthor,
    error,
    loading,
  };
};
