import React, { useState } from "react";
import { useGenres } from "../hooks/useGenres";
import { Genre } from "../../../Models/Genre";

import GenreModal from "./GenreModal";
import toast from "react-hot-toast";

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
    <div className="text-center">
      <button
        onClick={() =>
          setSelectedGenre({
            genreID: 0,
            genreName: "",
          })
        }
        className="btn btn-lg bg-green-900 text-white font-thin hover:border-green-950 hover:text-black mb-5 hover:bg-transparent transition-all duration-300 "
      >
        Add Genre
      </button>
      <table className="table">
        <thead>
          <tr className="text-lg">
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
              toast.success(`Created ${updatedGenre.genreName} successfully!`);
            } else {
              handleUpdateGenre(updatedGenre);
              toast.success(
                `Edited genre with ID: ${updatedGenre.genreID} successfully!`
              );
            }
            setSelectedGenre(null);
          }}
        />
      )}
    </div>
  );
};

export default GenreList;
