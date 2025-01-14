import { useState, useEffect } from "react";
import axiosClient from "../../axiosClient";
import { Book } from "../../Models/Book";
import "./book.css";
import harrypotter from "../../img/harrypotter.jpg";
import { useNavigate } from "react-router-dom";

const BooksPage = () => {
  const [bookData, setBookData] = useState<Book[]>([]);
  const [, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axiosClient.get("/book");
      setBookData(res.data);
    } catch (error) {
      setError("Failed to fetch books");
    }
  };
  return (
    <div className="book-container h-fit grid grid-cols-3 gap-24">
      {bookData.map((b) => (
        <div className="card">
          <figure>
            <img
              src={harrypotter}
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
                onClick={() => navigate("/BookDetails")}
              >
                Details
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className=" card w-36">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="car!"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{}</h2>
          <p>How to park your car at your garage?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Learn now!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
