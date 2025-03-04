import { useEffect, useState } from "react";
import { Author } from "../../Models/Author";
import axiosClient from "../../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { RotateLoader } from "react-spinners";

const AuthorPage: React.FC = () => {
  const [authorData, setAuthorData] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axiosClient.get("/author");
      setAuthorData(response.data);
    } catch (error) {
      console.log("fetchAuthors API error", error);
    } finally {
      setLoading(false);
    }
  };

  const redirectToDetails = (id: string | number) => {
    navigate(`/authordetails/${id}`);
  };

  return (
    <div className="w-full flex flex-col justify-start items-center font-normal">
      {loading ? (
        <div className="flex justify-center items-center h-screen w-full absolute left-0 top-0">
          <RotateLoader
            color="black"
            loading={loading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
            margin={15}
            speedMultiplier={1}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6">
          {authorData.map((a) => (
            <div
              key={a.authorID}
              className="card flex flex-col max-h-fit h-auto bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {/* Image Container */}
              <div className="w-full h-64 overflow-hidden flex justify-center items-center">
                <img
                  src={a.imageUrl || "https://via.placeholder.com/250"}
                  alt={a.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 gap-5 flex flex-col justify-center items-center">
                <h2 className="text-xl font-semibold mb-2">{a.name}</h2>
                <div className="flex flex-row">
                  <button
                    onClick={() => redirectToDetails(a.authorID)}
                    className="bg-black w-auto h-auto text-white px-4 py-2 rounded-lg hover:bg-white hover:text-black hover:border hover:border-black transition-colors duration-300"
                  >
                    View Biography
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthorPage;
