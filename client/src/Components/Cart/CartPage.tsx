import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity, clearCart } from "../Cart/cartSlice";
import { RootState } from "./store";
import { Link } from "react-router-dom";

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemoveItem = (bookID: number) => {
    dispatch(removeItem(bookID));
  };

  const handleUpdateQuantity = (bookID: number, quantity: number) => {
    dispatch(updateQuantity({ bookID, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Calculate total amount with exactly two decimal places
  const totalAmount = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="w-full max-h-fit p-10 relative  min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.bookID}
              className="border-b border-gray-200 p-4 flex items-center space-x-6  rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-24 h-28 object-contain rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">
                  Author: {item.authorName}
                </p>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
                <p className="text-sm text-gray-600">
                  Book Price: ${item.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => handleRemoveItem(item.bookID)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                Remove
              </button>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleUpdateQuantity(item.bookID, parseInt(e.target.value))
                }
                min="1"
                className="w-16 p-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          ))}
        </div>
      )}

      {/* Total Amount */}
      {cartItems.length > 0 && (
        <p className="mt-6 text-xl font-bold text-gray-800">
          Total Amount: <span className="text-purple-600">${totalAmount}</span>
        </p>
      )}

      {/* Clear Cart and Checkout Buttons */}
      {cartItems.length > 0 && (
        <div className="mt-6 flex space-x-4">
          <button
            onClick={handleClearCart}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Clear Cart
          </button>
          <Link
            to="/checkout"
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
