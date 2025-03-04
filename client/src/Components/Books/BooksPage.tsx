/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import { Book } from "../../Models/Book";
import viewIcon from "../../assets/viewIcon.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Authentication/AuthContext";
import { RotateLoader } from "react-spinners";
import AddToCartButton from "../Cart/AddToCartButton";
import { Genre } from "../../Models/Genre";

const BooksPage = () => {
  const [bookData, setBookData] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [genres, setGenres] = useState<string[]>([]);
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    fetchBooks();
    fetchGenres();
  }, []);

  const redirectToDetails = (id: string | number) => {
    navigate(`/bookdetails/${id}`);
  };

  const fetchBooks = async () => {
    try {
      const res = await axiosClient.get("/book");
      setBookData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGenres = async () => {
    try {
      const res = await axiosClient.get("/genre");

      const genreNames = res.data.map((genre: Genre) => genre.genreName);

      setGenres(["All", ...genreNames]);
    } catch (error) {
      console.error("Failed to fetch genres", error);
    }
  };
  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  // Filter books based on selected genre
  const filteredBooks =
    selectedGenre === "All"
      ? bookData
      : bookData.filter((book) => book.genreName === selectedGenre);

  // Calculate paginated data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination component
  const Pagination = () => {
    const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

    return (
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-button-color bg-transparent text-black text-sm rounded-3xl hover:bg-button-color hover:text-white transition-colors"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-button-color bg-transparent text-black text-sm rounded-3xl hover:bg-button-color hover:text-white transition-colors"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col justify-start items-center font-normal">
      {/* Show spinner while loading */}
      {loading ? (
        <div className="flex justify-center items-center h-screen w-full absolute left-0 top-0">
          <RotateLoader
            color="black"
            loading={loading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
            margin={15}
            speedMultiplier={1}
          />
        </div>
      ) : (
        <>
          {/* Genre Filter Dropdown */}
          <div className="w-full max-w-7xl px-4 py-6">
            <label
              htmlFor="genre"
              className="text-sm font-medium text-gray-700"
            >
              Filter:
            </label>
            <select
              id="genre"
              value={selectedGenre}
              onChange={(e) => handleGenreChange(e.target.value)}
              className="ml-2 px-4 py-2  border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-0"
              aria-label="Filter by genre"
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          {/* Book Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full p-4">
            {currentItems.map((b) => (
              <div
                key={b.bookID}
                className="h-auto w-full sm:w-auto p-4 flex flex-col items-center border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Image */}
                <img
                  src={b.imageUrl}
                  alt="bookimg"
                  className="w-auto h-auto max-w-full max-h-[200px] sm:max-h-[270px] object-contain shadow-bottom-left rounded-tr-lg rounded-br-lg"
                />

                {/* Card Body */}
                <div className="w-full mt-4 flex flex-col justify-evenly">
                  <h2 className="text-lg font-semibold text-left">{b.title}</h2>
                  <p className="text-sm text-gray-600">{b.authorName}</p>
                  <p className="text-sm text-gray-700 mt-2">
                    {b.description.substring(0, 60)}...
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-row items-center justify-between mt-4">
                    <div>{isLoggedIn && <AddToCartButton book={b} />}</div>
                    <button
                      className="flex items-center justify-center px-4 py-2 border border-button-color bg-transparent text-black text-sm rounded-3xl hover:bg-button-color hover:text-white transition-colors"
                      onClick={() => redirectToDetails(b.bookID)}
                    >
                      <img src={viewIcon} alt="View" className="w-4 h-4 mr-2" />
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <Pagination />
        </>
      )}
    </div>
  );
};

export default BooksPage;
