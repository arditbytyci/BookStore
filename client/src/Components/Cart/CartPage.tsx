// src/components/CartPage.tsx
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

  return (
    <div className="w-[100%] p-10 relative border border-black">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.bookID}
              className="border-b-[0.5px] border-gray-300 p-4 flex items-center space-x-4"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-24 h-28 object-contain"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p>Author: {item.authorName}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Book Price: ${item.price}</p>
                <p>Total: ${item.price * item.quantity}</p>
              </div>
              <button
                onClick={() => handleRemoveItem(item.bookID)}
                className="text-red-500 hover:text-red-700"
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
                className="w-16 p-1 rounded"
              />
            </div>
          ))}
        </div>
      )}
      <p className="mt-4 text-xl font-bold">
        <strong>Total Amount:</strong> $
        {cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )}
      </p>
      {cartItems.length > 0 && (
        <button
          className="btn btn-primary mt-4 text-white mr-5"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
      )}

      {cartItems.length > 0 && (
        <Link to="/checkout" className="btn btn-primary">
          Checkout
        </Link>
      )}
    </div>
  );
};

export default CartPage;
