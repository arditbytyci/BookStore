// src/components/AddToCartButton.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "./cartSlice";
import { Book } from "../../Models/Book";

interface AddToCartButtonProps {
  book: Book;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addItem({
        bookID: book.bookID,
        title: book.title,
        price: book.price,
        quantity: 1,
        imageUrl: book.imageUrl,
        authorName: book.authorName,
      })
    );
  };

  return (
    <button
      className="btn btn-sm bg-transparent font-thin border border-black hover:bg-black hover:text-white"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
