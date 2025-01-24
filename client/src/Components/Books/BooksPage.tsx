import { useState, useEffect } from "react";
import axiosClient from "../../axiosClient";
import { Book } from "../../Models/Book";
import "./book.css";

import { useNavigate } from "react-router-dom";
import { useCart } from "../Cart/CartContext";
import { useAuth } from "../../Authentication/AuthContext";

const BooksPage = () => {
  const [bookData, setBookData] = useState<Book[]>([]);
  const navigate = useNavigate();
  const { dispatch } = useCart();
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
    }
  };

  const handleAddToCart = (book: Book) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        bookId: book.bookID,
        name: book.title,
        price: book.price,
        quantity: 1,
      },
    });
    console.log(book);

    alert(`${book.title} added to cart!`);
  };

  return (
    <div className="book-container h-fit grid grid-cols-3 gap-24">
      {bookData.map((b) => (
        <div key={b.bookID} className="card gap-1">
          <figure className="border border-black h-full">
            <img
              src={b.imageUrl}
              alt="bookimg"
              className="h-[260px] w-[250px]"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-lg">{b.title}</h2>
            <p>{b.authorName}</p>
            <div className="card-actions">
              <button
                className="btn btn-sm bg-button-color text-white w-[100px] text-sm rounded-3xl"
                onClick={() => redirectToDetails(b.bookID)}
              >
                Details
              </button>
              {isLoggedIn && (
                <button
                  className="btn btn-sm bg-button-color text-white w-[100px] text-sm rounded-3xl"
                  onClick={() => handleAddToCart(b)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BooksPage;
