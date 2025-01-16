import { createContext, useContext, useReducer } from "react";

interface CartItem {
  bookId: number;
  name: string;
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

const initialState: CartState = { items: [] };

const cartReducer = (state: CartState, action: CartActions): CartState => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.items.find(
        (item) => item.bookId === action.payload.bookId
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.bookId === action.payload.bookId
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return { ...state, items: [...state.items, action.payload] };

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.bookId !== action.payload.bookId
        ),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.bookId === action.payload.bookId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case "CLEAR_CART":
      return initialState;

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

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
