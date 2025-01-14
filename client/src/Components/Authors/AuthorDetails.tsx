import React, { useEffect, useState } from "react";
import { Author } from "../../Models/Author";
import axiosClient from "../../axiosClient";
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
    </div>
  );
};

export default AuthorDetails;
