import { useState } from "react";
import { Book } from "../../../Models/Book";
import "../admin.css";
import { useBooks } from "../hooks/useBooks";
import EditModal from "./EditModal";

const BookList: React.FC = () => {
  const { books, loading, error, handleUpdateBook, handleDeleteBook } =
    useBooks();

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
                <button
                  onClick={() => setSelectedBook(b)}
                  className="btn btn-md btn-outline btn-circle btn-warning text-white font-semibold mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteBook(b.bookID)}
                  className="btn btn-md btn-outline btn-circle btn-error text-white font-semibold"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedBook && (
        <EditModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onSave={(updatedBook) => {
            handleUpdateBook(updatedBook);
            setSelectedBook(null);
          }}
        />
      )}
    </div>
  );
};

export default BookList;
