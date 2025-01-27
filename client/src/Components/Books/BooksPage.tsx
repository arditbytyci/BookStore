import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import { Book } from "../../Models/Book";
import viewIcon from "../../assets/viewIcon.png";
import "./book.css";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../Authentication/AuthContext";
import AddToCartButton from "../Cart/CartButton";
import { DotLoader, RotateLoader } from "react-spinners";

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
    <div className="book-container h-screen flex flex-col justify-center">
      {/* Show spinner while loading */}
      {loading ? (
        <div className="loading-container flex justify-center items-center h-screen w-full absolute left-0 top-0">
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
        <div className="grid grid-cols-3 gap-16 relative">
          {bookData.map((b) => (
            <div key={b.bookID} className="card">
              <figure className="rounded-2xl shadow-md">
                <img
                  src={b.imageUrl}
                  alt="bookimg"
                  className="h-[410px] w-[250px] object-contain rounded-xl"
                />
              </figure>
              <div className="card-body gap-2">
                <h2 className="card-title text-left text-[19px]">{b.title}</h2>
                <p>{b.authorName}</p>
                <p>{b.description.substring(0, 60)}...</p>
                <div className="card-actions flex flex-row items-center justify-between">
                  <button
                    className="btn btn-sm border-button-color bg-transparent text-black w-[100px] text-sm rounded-3xl mb-[-40px]"
                    onClick={() => redirectToDetails(b.bookID)}
                  >
                    <img src={viewIcon} alt="" className="w-[15px] h-[15px]" />
                    View
                  </button>
                  {isLoggedIn && (
                    <AddToCartButton
                      bookID={b.bookID}
                      bookName={b.title}
                      price={b.price}
                    ></AddToCartButton>
                  )}
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
