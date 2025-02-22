// src/redux/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  bookID: number;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
  authorName: string;
}

interface CartState {
  items: CartItem[];
}

const loadCartFromLocalStorage = (): CartState => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : { items: [] };
};

const initialState: CartState = loadCartFromLocalStorage();
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.bookID === action.payload.bookID
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.bookID !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state));
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ bookID: number; quantity: number }>
    ) => {
      const item = state.items.find(
        (item) => item.bookID === action.payload.bookID
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
