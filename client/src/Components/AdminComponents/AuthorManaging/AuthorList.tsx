import React, { useState } from "react";
import { Author } from "../../../Models/Author";
import { useAuthor } from "../hooks/useAuthors";

import AuthorModal from "./AuthorModal";

const AuthorList: React.FC = () => {
  const {
    authors,
    handleAuthorUpdate,
    handleAuthorDelete,
    handleCreateAuthor,
    error,
    loading,
  } = useAuthor();

  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

  if (loading) return <p>{loading}</p>;
  if (error) return <p>{error}</p>;

  const handleSave = () => {
    setSelectedAuthor({
      authorID: 0,
      name: "",
      bio: "",
      birthDate: "",
      imageUrl: "",
      books: [],
    });
  };

  return (
    <div className="authorlist-container">
      <button className="btn btn-primary" onClick={handleSave}>
        Add Author
      </button>
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
                <button
                  onClick={() => setSelectedAuthor(a)}
                  className="btn btn-md btn-outline btn-circle btn-warning text-white font-semibold mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleAuthorDelete(a.authorID)}
                  className="btn btn-md btn-outline btn-circle btn-error text-white font-semibold"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedAuthor && (
        <AuthorModal
          author={selectedAuthor}
          onClose={() => setSelectedAuthor(null)}
          onSave={(updatedAuthor) => {
            if (updatedAuthor.authorID === 0) {
              handleCreateAuthor(updatedAuthor);
            } else {
              handleAuthorUpdate(updatedAuthor);
            }
            setSelectedAuthor(null);
          }}
        />
      )}
    </div>
  );
};

export default AuthorList;
