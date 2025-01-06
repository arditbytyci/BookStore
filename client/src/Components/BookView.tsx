import { useEffect, useState } from "react";
import { Book } from "../Models/Book";
import axiosClient from "../axiosClient";

const BookView = () => {
  const [bookData, setBookData] = useState<Book[]>([]);
  const [, setError] = useState<string | null>(null);

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
    <div className="bg-custom-gradient-bg min-h-full">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Published Date</th>
            <th>Author</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {bookData.map((b, i) => (
            <tr key={i}>
              <th>{b.bookID}</th>
              <th>{b.title}</th>
              <th>{b.price}</th>
              <th>{b.publishedDate}</th>
              <th>{b.authorName}</th>
              <th>{b.genreName}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookView;
