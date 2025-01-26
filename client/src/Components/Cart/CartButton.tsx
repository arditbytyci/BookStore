import { useCart } from "./CartContext";

const AddToCartButton = ({
  bookID,
  bookName,
  price,
}: {
  bookID: number;
  bookName: string;
  price: number;
}) => {
  const { dispatch } = useCart();

  const handleToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: { bookID, bookName, price, quantity: 1 },
    });
  };

  return (
    <button
      className="btn btn-sm mb-[-30px] text-white  btn-primary"
      onClick={handleToCart}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
