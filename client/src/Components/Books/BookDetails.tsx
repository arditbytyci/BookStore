import { useEffect, useState } from "react";
import { Book } from "../../Models/Book";
import axiosClient from "../../axiosClient";
import { useParams } from "react-router-dom";
import harrypotter from "../../img/harrypotter.jpg";

const BookDetails: React.FC = () => {
  const [book, setBook] = useState<Book>();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (id) fetchBookById(id);
  }, [id]);

  const fetchBookById = async (id: number | string): Promise<void> => {
    try {
      const response = await axiosClient.get(`/book/${id}`);

      setBook(response.data);
      console.log(book?.authorName);
    } catch (error) {
      console.log(`failed to fetch book with ${id}`);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center">
        <img
          src={book?.imageUrl}
          alt="Harry Potter"
          className="w-32 h-48 mr-6"
        />

        <div>
          <h1 className="text-2xl font-bold">{book?.title}</h1>

          <p className="text-gray-600 mt-2">{book?.publishedDate}</p>
          <p className="text-gray-600 mt-2">{book?.price}</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
            Start Reading
          </button>
          <p className="text-gray-600 mt-2">{book?.genreName}</p>
          <p>{book?.authorName}</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold">Description</h2>
        <p className="text-gray-600 mt-2">{book?.description}</p>
      </div>
    </div>
  );
};

export default BookDetails;
