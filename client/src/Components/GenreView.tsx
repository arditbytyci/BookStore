import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { Genre } from "../Models/Genre";

const GenreView = () => {
  const [genreData, setGenreData] = useState<Genre[]>([]);
  const [, setError] = useState<string | null>();

  useEffect(() => {
    fetchGenre();
  }, []);

  const fetchGenre = async () => {
    try {
      const response = await axiosClient.get("/genre");

      setGenreData(response.data);
    } catch (error) {
      console.log(setError("Could not find Genre"));
    }
  };

  return (
    <div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {genreData.map((g, i) => (
            <tr key={i}>
              <th>{g.genreID}</th>
              <th>{g.genreName}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenreView;
