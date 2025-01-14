import { useEffect, useState } from "react";
import { Author } from "../../Models/Author";
import axiosClient from "../../axiosClient";
import { useNavigate } from "react-router-dom";

const AuthorPage: React.FC = () => {
  const [authorData, setAuthorData] = useState<Author[]>([]);
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
    }
  };

  const redirectToDetails = (id: string | number) => {
    navigate(`/authordetails/${id}`);
  };

  return (
    <div className="author-container">
      {authorData.map((a) => (
        <>
          <div key={a.authorID} className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img src={a.imageUrl} alt="" className="w-[250px]" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{a.name}</h2>

              <div className="card-actions justify-end">
                <button onClick={() => redirectToDetails(a.authorID)}>
                  View Biography
                </button>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default AuthorPage;
