import { useCart } from "./CartContext";

const CartPage = () => {
  const { state, dispatch } = useCart();

  const handleRemoveItem = (bookId: number) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: { bookId },
    });
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {state.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        state.items.map((item) => (
          <div key={item.bookId}>
            <h3>{item.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
            <p>Total: ${item.price * item.quantity}</p>
            <button onClick={() => handleRemoveItem(item.bookId)}>
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
    </div>
  );
};

export default CartPage;
