import { useState } from "react";
import { Book } from "../Models/Book";

const BookView = () => {
  const [bookData, setBookData] = useState<Book[]>([
    {
      BookID: 1,
      Title: "BookTest",
      Price: 2.5,
      PublishedDate: new Date("2024-12-26"),
      AuthorID: 1,
      GenreID: 1,
    },
  ]);

  return (
    <div>
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
          {bookData.map((b) => (
            <tr>
              <th>{b.BookID}</th>
              <th>{b.Title}</th>
              <th>{b.Price}</th>
              <th>{b.PublishedDate.toLocaleDateString()}</th>
              <th>{b.AuthorID}</th>
              <th>{b.GenreID}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookView;
