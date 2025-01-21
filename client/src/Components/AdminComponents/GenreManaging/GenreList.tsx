import React, { useState } from "react";
import { useGenres } from "../hooks/useGenres";
import { Genre } from "../../../Models/Genre";

import GenreModal from "./GenreModal";

const GenreList: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  const {
    genres,
    handleUpdateGenre,
    handleCreateGenre,
    handleDeleteGenre,
    error,
    loading,
  } = useGenres();

  if (error) return <p>{error}</p>;
  if (loading) return <p>{loading}</p>;

  return (
    <div>
      <button
        onClick={() =>
          setSelectedGenre({
            genreID: 0,
            genreName: "",
          })
        }
        className="btn btn-primary"
      >
        Add Genre
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>GenreID</th>
            <th>GenreName</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {genres.map((g) => (
            <tr key={g.genreID}>
              <td>{g.genreID}</td>
              <td>{g.genreName}</td>
              <td colSpan={2}>
                <button
                  onClick={() => setSelectedGenre(g)}
                  className="btn btn-md btn-outline btn-circle btn-warning text-white font-semibold mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteGenre(g.genreID)}
                  className="btn btn-md btn-outline btn-circle btn-error text-white font-semibold"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedGenre && (
        <GenreModal
          genre={selectedGenre}
          onClose={() => setSelectedGenre(null)}
          onSave={(updatedGenre) => {
            if (updatedGenre.genreID === 0) {
              handleCreateGenre(updatedGenre);
            } else {
              handleUpdateGenre(updatedGenre);
            }
            setSelectedGenre(null);
          }}
        />
      )}
    </div>
  );
};

export default GenreList;
