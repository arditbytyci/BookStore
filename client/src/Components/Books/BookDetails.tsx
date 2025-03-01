import { useEffect, useState } from "react";
import { Book } from "../../Models/Book";
import axiosClient from "../../api/axiosClient";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { RotateLoader } from "react-spinners";

const BookDetails: React.FC = () => {
  const [book, setBook] = useState<Book>();
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) fetchBookById(id);
  }, [id]);

  const fetchBookById = async (id: number | string): Promise<void> => {
    try {
      const response = await axiosClient.get(`/book/${id}`);
      setBook(response.data);
    } catch (error) {
      toast.error(`failed to fetch book with ${id}`);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen w-full absolute left-0 top-0">
          <RotateLoader
            color="black"
            loading={loading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
            margin={15}
            speedMultiplier={1.5}
          />
        </div>
      ) : (
        <div className="h-full w-full max-w-7xl mx-auto p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <img
              src={book?.imageUrl}
              alt="Book Cover"
              className="w-auto h-auto max-w-[250px] max-h-[400px] object-contain rounded-tr-lg rounded-br-lg shadow-bottom-left"
            />

            <div className="w-full md:w-2/3 flex flex-col justify-between">
              <h1 className="text-4xl font-bold text-gray-800 mb-6">
                {book?.title}
              </h1>
              <div className="w-full border-b-[1px] border-[#d5d2d5] pb-6">
                <button className="btn bg-zinc-950 text-white px-8 py-3 rounded-lg hover:bg-zinc-800 transition-colors duration-300">
                  Add to cart
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 mt-12">
            <div className="w-full md:w-1/2">
              <h1 className="font-semibold text-xl text-gray-800 mb-4">
                Description
              </h1>
              <p className="text-gray-600 leading-relaxed">
                {book?.description}
              </p>
            </div>

            <div className="w-full md:w-1/2">
              <h1 className="font-semibold text-xl text-gray-800 mb-4">
                Author
              </h1>
              <p className="text-gray-600">{book?.authorName}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
