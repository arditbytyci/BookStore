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
    0,
  );

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="flex flex-col sm:flex-row justify-end items-center h-auto sm:h-[4rem] w-full p-4 sm:p-0 sm:left-[8.5rem] sm:w-[88%] absolute z-10 bg-[#f0eee2]">
      {/* Cart and Auth Buttons */}
      <div className="flex flex-row items-center justify-end w-full sm:w-auto space-x-2 sm:space-x-4">
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
              className="btn btn-sm bg-button-color font-thin text-white hover:bg-transparent hover:border-button-color hover:text-gray-800 w-[80px] sm:w-[100px] text-sm rounded-3xl"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              to="/AuthPage"
              className="btn btn-sm bg-button-color font-thin text-white hover:bg-transparent hover:border-button-color hover:text-gray-800 w-[60px] sm:w-[80px] text-xs sm:text-sm rounded-3xl"
            >
              Login
            </Link>
            <Link
              to="/AuthPage"
              className="btn btn-sm bg-button-color font-thin text-white hover:bg-transparent hover:border-button-color hover:text-gray-800 w-[70px] sm:w-[80px] text-xs sm:text-sm rounded-3xl"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopBar;
