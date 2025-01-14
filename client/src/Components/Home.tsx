import { useState, useEffect } from "react";
import axiosClient from "../axiosClient";
import { Book } from "../Models/Book";
import harrypotter from "../../public/images/harrypotter.jpg";
import "./home.css";
import { useNavigate } from "react-router-dom";
const HomeView = () => {
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
    <div className="home-container h-fit grid grid-cols-3 gap-24">
      {bookData.slice(0, 3).map((b) => (
        <>
          <div key={b.bookID} className="card">
            <figure>
              <img
                src={harrypotter}
                alt="car!"
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
        </>
      ))}
    </div>
  );
};

export default HomeView;
