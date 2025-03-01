import React, { useEffect, useState } from "react";
import { Author } from "../../Models/Author";
import axiosClient from "../../api/axiosClient";
import { useParams } from "react-router-dom";

const AuthorDetails: React.FC = () => {
  const [author, setAuthor] = useState<Author>();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      fetchAuthorById(id);
    }
  }, [id]);

  const fetchAuthorById = async (id: string | number): Promise<void> => {
    try {
      const response = await axiosClient.get(`/author/${id}`);
      setAuthor(response.data);
    } catch (error) {
      console.log("fetchAuthorId API error", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Author Name */}
      <div className="flex flex-row justify-between items-center my-5">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          {author?.name}
        </h1>
        <img
          src={author?.imageUrl}
          className="w-44 h-44 rounded-2xl object-cover border border-black"
          alt="author-img"
        ></img>
      </div>
      {/* Author Bio */}
      <p className="text-lg text-gray-600 mb-8">{author?.bio}</p>

      {/* Books Section */}
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Books</h3>
      <ul className="space-y-4">
        {author?.books.map((b) => (
          <li
            key={b.bookID}
            className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Book Title */}
            <h4 className="text-xl font-medium text-gray-700">
              Title: {b.title}
            </h4>

            {/* Published Date */}
            <p className="text-sm text-gray-500 mt-2">
              Date: {new Date(b.publishedDate).toLocaleDateString()}
            </p>

            {/* Book Description */}
            <p className="text-gray-600 mt-4">{b.description}</p>

            {/* Book Image */}
            {b.imageUrl && (
              <img
                src={b.imageUrl}
                alt={b.title}
                className="w-full h-48 object-contain rounded-lg mt-4"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorDetails;
