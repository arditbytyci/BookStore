
import { useCart } from "./CartContext";

const AddToCartButton = ({
  bookId,
  name,
  price,
}: {
  bookId: number;
  name: string;
  price: number;
}) => {
  const { dispatch } = useCart();


  const handleToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: { bookId, name, price, quantity: 1 },
    });
  };

  return (
    <button className="btn btn-md" onClick={handleToCart}>
      Add to Cart
    </button>
  );
};
