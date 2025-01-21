import { useEffect, useState } from "react";
import { Genre } from "../../../Models/Genre";
import {
  addGenre,
  deleteGenre,
  getGenres,
  updateGenre,
} from "../services/genreService";

export const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const data = await getGenres();
      setGenres(data);
    } catch (error) {
      setError("Failed to fetch Genres");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGenre = async (newGenre: Genre) => {
    try {
      const addedGenre = await addGenre(newGenre);
      setGenres((prev) => [...prev, addedGenre]);
    } catch (error) {
      setError("Failed to create genre");
    }
  };

  const handleUpdateGenre = async (updatedGenre: Genre) => {
    try {
      await updateGenre(updatedGenre);

      setGenres((prev) =>
        prev.map((genre) =>
          genre.genreID === updatedGenre.genreID ? updatedGenre : genre
        )
      );
      console.log("updated genre", updatedGenre);
    } catch (error: any) {
      console.error("Update failed:", error.response?.data || error.message);
      setError("Failed to update genre");
    }
  };

  const handleDeleteGenre = async (genreID: number) => {
    try {
      await deleteGenre(genreID);
      setGenres((prev) => prev.filter((genre) => genre.genreID !== genreID));
    } catch (error) {
      setError("Failed to delete genre");
    }
  };

  return {
    genres,
    handleCreateGenre,
    handleUpdateGenre,
    handleDeleteGenre,
    error,
    loading,
  };
};
