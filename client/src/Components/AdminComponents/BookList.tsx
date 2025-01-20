import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { Book } from "../../Models/Book";
import "./admin.css";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axiosClient.get("/book");
      setBooks(response.data);
    } catch (error) {
      console.error("fetchBooks API error", error);
    }
  };
  return (
    <div className="booklist-container">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>BookTitle</th>
            <th>PublishedDate</th>
            <th>Price</th>
            <th>Author</th>
            <th className="pl-12">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.bookID}>
              <td>{b.bookID}</td>
              <td>{b.title}</td>
              <td>{new Date(b.publishedDate).toLocaleDateString()}</td>
              <td>{b.price} €</td>
              <td>{b.authorName}</td>
              <td colSpan={2}>
                <button className="btn btn-md btn-outline btn-circle btn-warning text-white font-semibold mr-4">
                  Edit
                </button>
                <button className="btn btn-md btn-outline btn-circle btn-error text-white font-semibold">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
