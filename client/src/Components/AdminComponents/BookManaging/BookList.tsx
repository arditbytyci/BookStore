import { useState } from "react";
import { Book } from "../../../Models/Book";

import { useBooks } from "../hooks/useBooks";
import BookModal from "./BookModal";
import toast from "react-hot-toast";

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
    <div className="booklist-container  text-center ">
      <button
        className="btn btn-lg bg-green-900 text-white font-thin hover:border-green-950 hover:text-black mb-5 hover:bg-transparent transition-all duration-300 "
        onClick={handleSave}
      >
        Add Book
      </button>
      <table className="table">
        {/* head */}
        <thead>
          <tr className="text-base">
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
                  className="btn btn-md btn-outline btn-circle btn-warning text-white font-thin mr-4 h"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteBook(b.bookID)}
                  className="btn btn-md btn-outline btn-circle btn-error text-white font-thin"
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
              toast.success(`${updatedBook.title} created successfully`);
            } else {
              handleUpdateBook(updatedBook);
              toast.success(`${updatedBook.bookID} edited successfully`);
            }

            setSelectedBook(null);
          }}
        />
      )}
    </div>
  );
};

export default BookList;
