import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const CartPage = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();

  const handleRemoveItem = (bookID: number) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: { bookID },
    });
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {state.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        state.items.map((item) => (
          <div key={item.bookID}>
            <h3>{item.bookName}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
            <p>Total: ${item.price * item.quantity}</p>
            <button onClick={() => handleRemoveItem(item.bookID)}>
              Remove
            </button>
          </div>
        ))
      )}
      <p>
        <strong>Total Amount:</strong> $
        {state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )}
      </p>

      <button className="btn btn-primary" onClick={() => navigate("/checkout")}>
        Procced to checkout
      </button>
    </div>
  );
};

export default CartPage;
