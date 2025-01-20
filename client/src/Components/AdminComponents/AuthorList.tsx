import React, { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";

import "./admin.css";
import { Author } from "../../Models/Author";

const AuthorList: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axiosClient.get("/author");
      setAuthors(response.data);
    } catch (error) {
      console.error("fetchAuthors API error", error);
    }
  };
  return (
    <div className="authorlist-container">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>BirthDate</th>
            <th className="pl-12">Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((a) => (
            <tr key={a.authorID}>
              <td>{a.authorID}</td>
              <td>{a.name}</td>
              <td>{new Date(a.birthDate).toLocaleDateString()}</td>
              <td colSpan={2}>
                <button className="btn btn-md btn-outline btn-circle btn-warning text-white font-semibold mr-4">
                  Edit
                </button>
                <button className="btn btn-md btn-outline btn-circle btn-error text-white font-semibold">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuthorList;
