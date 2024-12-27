import { Author } from "../Models/Author";
import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";

const AuthorView = () => {
  const [authorData, setAuthorData] = useState<Author[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axiosClient.get("/author");
      setAuthorData(response.data);
    } catch (error) {
      setError("Failed to fetch books");
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
            <th>Bio</th>
            <th>Birth Date</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {authorData.map((a, i) => (
            <tr key={i}>
              <th>{a.authorID}</th>
              <th>{a.name}</th>
              <th>{a.bio}</th>
              <th>{a.birthDate}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuthorView;
