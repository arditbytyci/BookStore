import { useState } from "react";
import { Book } from "../../../Models/Book";
import "../admin.css";
import { useBooks } from "../hooks/useBooks";
import BookModal from "./BookModal";

const BookList: React.FC = () => {
  const {
    books,
    authors,
    genres,
    loading,
    error,
    handleUpdateBook,
    handleDeleteBook,
    handleCreateBook,
  } = useBooks();

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleSave = () => {
    setSelectedBook({
      bookID: 0,
      title: "",
      price: 0,
      description: "",
      publishedDate: "",
      authorID: authors[0]?.authorID || 0,
      genreID: genres[0]?.genreID || 0,
      authorName: "",
      genreName: "",
      imageUrl: "",
    });
  };

  return (
    <div className="booklist-container">
      <button className="btn btn-primary" onClick={handleSave}>
        Add Book
      </button>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>BookTitle</th>
            <th>PublishedDate</th>
            <th>Price</th>
            <th>Author</th>
            <th>Genre</th>
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
              <td>{b.genreName}</td>
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
        <BookModal
          book={selectedBook}
          authors={authors}
          genres={genres}
          onClose={() => setSelectedBook(null)}
          onSave={(updatedBook) => {
            if (updatedBook.bookID === 0) {
              handleCreateBook(updatedBook);
            } else {
              handleUpdateBook(updatedBook);
            }

            setSelectedBook(null);
          }}
        />
      )}
    </div>
  );
};

export default BookList;
