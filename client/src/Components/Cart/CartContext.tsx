import { createContext, useContext, useReducer, useEffect } from "react";
import axiosClient from "../../api/axiosClient";

interface CartItem {
  bookID: number;
  bookName: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

interface CartActions {
  type: "ADD_ITEM" | "REMOVE_ITEM" | "UPDATE_QUANTITY" | "CLEAR_CART";
  payload: any;
}

// Initialize state with data from localStorage if available
const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cartItems") || "[]"),
};

const cartReducer = (state: CartState, action: CartActions): CartState => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.items.find(
        (item) => item.bookID === action.payload.bookID
      );
      if (existingItem) {
        // Update quantity if the item already exists
        const updatedItems = state.items.map((item) =>
          item.bookID === action.payload.bookID
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        localStorage.setItem("cartItems", JSON.stringify(updatedItems)); // Persist to localStorage
        return { ...state, items: updatedItems };
      } else {
        // Add new item to cart
        const updatedItems = [...state.items, action.payload];
        localStorage.setItem("cartItems", JSON.stringify(updatedItems)); // Persist to localStorage
        return { ...state, items: updatedItems };
      }

    case "REMOVE_ITEM":
      // Remove the item from the cart
      const updatedItemsAfterRemove = state.items.filter(
        (item) => item.bookID !== action.payload.bookID
      );
      localStorage.setItem(
        "cartItems",
        JSON.stringify(updatedItemsAfterRemove)
      ); // Persist to localStorage
      return { ...state, items: updatedItemsAfterRemove };

    case "UPDATE_QUANTITY":
      // Update the quantity of an item
      const updatedItemsAfterUpdate = state.items.map((item) =>
        item.bookID === action.payload.bookID
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      localStorage.setItem(
        "cartItems",
        JSON.stringify(updatedItemsAfterUpdate)
      ); // Persist to localStorage
      return { ...state, items: updatedItemsAfterUpdate };

    case "CLEAR_CART":
      // Clear the entire cart
      localStorage.removeItem("cartItems"); // Remove cart data from localStorage
      return { ...state, items: [] };

    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartActions>;
}>({ state: initialState, dispatch: () => null });

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Sync with the server when cart changes
  useEffect(() => {
    if (state.items.length > 0) {
      axiosClient
        .post("/cart", state.items)
        .then((response) => {
          console.log("Cart synced with server:", response);
        })
        .catch((error) => {
          console.error("Error syncing cart with server:", error);
        });
    }
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
