import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { Book } from "../Models/Book";

import { useNavigate } from "react-router-dom";
import { Author } from "../Models/Author";
import Hero from "./Hero";
import { RotateLoader } from "react-spinners";

const HomeView = () => {
  const [bookData, setBookData] = useState<Book[]>([]);
  const [authorData, setAuthorData] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [color] = useState<string>("black");

  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
  }, []);

  // Fetch books
  const fetchBooks = async () => {
    try {
      const res = await axiosClient.get("/book");
      setBookData(res.data);
    } catch (error) {
      console.log("Failed to fetch books - Home Component", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch authors
  const fetchAuthors = async () => {
    try {
      const res = await axiosClient.get("/author");
      setAuthorData(res.data);
    } catch (error) {
      console.log("Failed to fetch authors - Home component", error);
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section (untouched) */}
      <Hero />

      {/* Loading Spinner */}
      {loading && (
        <div className="loading-container flex flex-col justify-start items-center h-screen my-32">
          <RotateLoader
            color={color}
            loading={loading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
            margin={15}
            speedMultiplier={1}
          />
        </div>
      )}

      {/* Books Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-semibold text-gray-800 mb-8 text-center">
          Latest Arrivals
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          {bookData.slice(0, 3).map((b) => (
            <div
              key={b.bookID}
              className="card h-auto w-auto flex flex-col justify-center max-w-[400px] max-h-[500px] bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <img
                src={b.imageUrl}
                alt="bookimg"
                className="w-auto h-auto max-w-full max-h-[200px] sm:max-h-[270px] object-contain shadow-bottom-left rounded-tr-lg rounded-br-lg"
              />
              <div className="p-6 flex flex-col justify-start items-start w-auto h-auto">
                <h2 className="text-2xl w-[250px] h-[50px] font-semibold text-gray-800 mb-5">
                  {b.title}
                </h2>
                <p className="text-gray-600 mb-4">By {b.authorName}</p>
              </div>
            </div>
          ))}
        </div>
        {/* View More Books Button */}
        <div className="flex justify-center mt-8">
          <button
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-white hover:text-black duration-500"
            onClick={() => navigate("/books")} // Update the route as needed
          >
            View More Books
          </button>
        </div>
      </div>

      {/* Authors Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-semibold text-gray-800 mb-8 text-center">
          Featured Authors
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          {authorData.map((a) => (
            <div
              key={a.authorID}
              className="card h-auto p-5 w-auto flex flex-col justify-evenly max-w-[400px] max-h-[400px] bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <img
                src={a.imageUrl}
                alt={a.name}
                className="w-auto h-auto max-w-full max-h-[200px] sm:max-h-[270px] object-contain shadow-2xl rounded-lg"
              />
              <div className="p-6 flex flex-col justify-start items-start w-auto h-auto">
                <h2 className="text-2xl w-[250px] h-[50px] font-semibold text-gray-800 mb-5">
                  {a.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
        {/* View More Authors Button */}
        <div className="flex justify-center mt-8">
          <button
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-white hover:text-black duration-500"
            onClick={() => navigate("/authors")} // Update the route as needed
          >
            View More Authors
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
