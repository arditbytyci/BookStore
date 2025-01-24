import { IonIcon } from "@ionic/react"; // Import IonIcon component from @ionic/react
import { searchOutline } from "ionicons/icons";
import { useAuth } from "../Authentication/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./Cart/CartContext";

const TopBar: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const { state } = useCart();

  const handleLogout = () => {
    logout();
    navigate("/Home", { replace: true });
  };

  return (
    <header className="flex flex-row left-[8.5rem] justify-between w-[88%] items-center h-[4rem] absolute z-10 bg-[#f0eee2]">
      <div className="text-gray-600">
        {isLoggedIn && (
          <div className="">
            <IonIcon
              icon={searchOutline}
              className="w-[17px] h-6 text-gray-600 font-semibold relative top-[5.7px] left-2"
            />
            <input
              type="text"
              name="search"
              placeholder="Search book name, authors..."
              className="input w-[250px] max-h-6 text-md border-none focus:outline-none focus:ring-0 bg-background-color"
            />
          </div>
        )}
      </div>
      <div className="text-gray-600">
        {isLoggedIn ? (
          <>
            <Link to="/Cart" className="mx-5">
              Cart ({state.items.length})
            </Link>
            <button
              onClick={handleLogout}
              className="btn btn-sm bg-button-color text-white w-[100px] text-sm rounded-3xl"
            >
              Logout
            </button>
          </>
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
