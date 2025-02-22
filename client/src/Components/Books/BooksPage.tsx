import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import { Book } from "../../Models/Book";
import viewIcon from "../../assets/viewIcon.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Authentication/AuthContext";
import { RotateLoader } from "react-spinners";
import AddToCartButton from "../Cart/AddToCartButton";

const BooksPage = () => {
  const [bookData, setBookData] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    fetchBooks();
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

  return (
    <div className="w-full flex flex-col justify-start items-center font-normal">
      {/* Show spinner while loading */}
      {loading ? (
        <div className="flex justify-center items-center h-screen w-full absolute left-0 top-0">
          <RotateLoader
            color="#007561"
            loading={loading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
            margin={1}
            speedMultiplier={1.3}
          />
        </div>
      ) : (
        // Show books after loading is complete
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full p-4">
          {bookData.map((b) => (
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
      )}
    </div>
  );
};

export default BooksPage;
