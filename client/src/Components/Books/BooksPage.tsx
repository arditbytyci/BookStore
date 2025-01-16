import { useState, useEffect } from "react";
import axiosClient from "../../axiosClient";
import { Book } from "../../Models/Book";
import "./book.css";

import { useNavigate } from "react-router-dom";
import { useCart } from "../Cart/CartContext";

const BooksPage = () => {
  const [bookData, setBookData] = useState<Book[]>([]);
  const [, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { dispatch } = useCart();
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
      setError("Failed to fetch books");
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
        <div className="card">
          <figure>
            <img
              src={b.imageUrl}
              alt="bookimg"
              className="h-[300px] w-[230px]"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{b.title}</h2>
            <p>{b.authorName}</p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-sm bg-button-color text-white w-[100px] text-sm rounded-3xl"
                onClick={() => redirectToDetails(b.bookID)}
              >
                Details
              </button>
              <button
                className="btn btn-sm bg-button-color text-white w-[100px] text-sm rounded-3xl"
                onClick={() => handleAddToCart(b)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BooksPage;
