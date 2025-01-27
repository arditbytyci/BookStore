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
    <div className="authordetails-container">
      <h1>{author?.name}</h1>
      <p>{author?.bio}</p>

      <h3>Books: </h3>
      <ul>
        {author?.books.map((b) => (
          <li key={b.bookID}>
            <h4>Title: {b.title}</h4>
            <p>Date: {new Date(b.publishedDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>

      {/* {
      "bookID": 10,
      "title": "Harry Potter and the Chamber of Secrets",
      "price": 13.5,
      "publishedDate": "2002-11-14T00:00:00",
      "authorID": 7,
      "genreID": 1,
      "authorName": "J.K. Rowling",
      "genreName": null,
      "imageUrl": "/images/harrypotter.jpg",
      "description": "Summaries. Harry Potter lives his second year at Hogwarts with Ron and Hermione when a message on the wall announces that the legendary Chamber of Secrets has been opened. The trio soon realize that, to save the school, it will take a lot of courage."
    } */}
    </div>
  );
};

export default AuthorDetails;
