import { useState, useEffect } from "react";
import axiosClient from "../axiosClient";
import { Book } from "../Models/Book";
import harrypotter from "../../public/images/harrypotter.jpg";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { Author } from "../Models/Author";
const HomeView = () => {
  const [bookData, setBookData] = useState<Book[]>([]);

  const [authorData, setAuthorData] = useState<Author[]>([]);

  // const bookId = bookData.map((b) => b.bookID);

  const navigate = useNavigate();
  useEffect(() => {
    fetchBooks();
    fetchAuthors();
  }, []);

  //books
  const fetchBooks = async () => {
    try {
      const res = await axiosClient.get("/book");
      setBookData(res.data);
    } catch (error) {
      console.log("Failed to fetch books - Home Component", error);
    }
  };

  //authors
  const fetchAuthors = async () => {
    try {
      const res = await axiosClient.get("/author");
      setAuthorData(res.data);
    } catch (error) {
      console.log("Failed to fetch authors - Home component", error);
    }
  };
  return (
    <div className="home-container h-fit">
      <h1>Books</h1>
      <div className="book-container-h  grid grid-cols-3 gap-24">
        {bookData.slice(0, 3).map((b) => (
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
                  onClick={() => navigate(`/BookDetails/${b.bookID}`)}
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>Authors</div>
      <div className="author-containers-h grid grid-cols-3 gap-24">
        {authorData.map((a) => (
          <div key={a.authorID} className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img src={a.imageUrl} alt="" className="w-[250px]" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{a.name}</h2>

              <div className="card-actions justify-end">
                <button
                  onClick={() => navigate(`/authorDetails/${a.authorID}`)}
                >
                  View Biography
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeView;
