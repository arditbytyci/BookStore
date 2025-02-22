import { IonIcon } from "@ionic/react"; // Import IonIcon component from @ionic/react
import { searchOutline } from "ionicons/icons";
import { useAuth } from "../Authentication/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import bag from "../assets/shopping.png";
import { useSelector } from "react-redux";
import { RootState } from "./Cart/store";

const TopBar: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Calculate total cart quantity
  const totalCartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

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
      <div className="flex flex-row right-[5.7rem] absolute items-center justify-between w-[150px]">
        {isLoggedIn ? (
          <>
            <Link to="/Cart" className="relative">
              <img src={bag} alt="Cart" className="w-[30px] h-[30px]" />
              {totalCartQuantity > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-purple-800 text-white text-xs font-semibold rounded-full w-[18px] h-[18px] flex justify-center items-center">
                  {totalCartQuantity}
                </span>
              )}
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
              to="/AuthPage"
              className="btn btn-sm bg-button-color text-white flex flex-col  w-[80px] text-sm rounded-3xl"
            >
              Login
            </Link>
            <Link
              to="/AuthPage"
              className="btn btn-sm bg-button-color text-white w-[80px] text-sm ml-2 rounded-3xl"
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
