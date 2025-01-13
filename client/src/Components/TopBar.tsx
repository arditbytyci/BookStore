import { IonIcon } from "@ionic/react"; // Import IonIcon component from @ionic/react
import { searchOutline } from "ionicons/icons";
import { useAuth } from "../Authentication/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const TopBar: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/Home", { replace: true });
  };

  return (
    <header className="header absolute left-20 right-0">
      <div className="text-gray-600">
        {isLoggedIn && (
          <>
            <IonIcon
              icon={searchOutline}
              className="w-[17px] h-6 text-gray-600 font-semibold relative top-[5.5px] left-3"
            />
            <input
              type="text"
              name="search"
              placeholder="Search book name, authors..."
              className="input w-[250px] max-h-6 text-md border-none focus:outline-none focus:ring-0 bg-background-color"
            />
          </>
        )}
      </div>
      <div className=" text-gray-600 flex flex-row items-center justify-center mt-3">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="btn btn-sm bg-button-color text-white w-[100px] text-sm rounded-3xl"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="btn btn-sm bg-button-color text-white w-[100px] text-sm rounded-3xl"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-sm bg-button-color text-white w-[100px] text-sm ml-2 rounded-3xl"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default TopBar;
