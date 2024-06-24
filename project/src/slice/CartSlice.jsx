import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCartItemsAsync = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    try {
      const response = await fetch(
        "https://react-fast-pizza-api.onrender.com/api/menu"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, name, imageUrl, unitPrice } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        state.items[itemIndex].quantity += 1;
      } else {
        state.items.push({ id, name, imageUrl, unitPrice, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
    },
    incrementItem: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementItem: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItemsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (Array.isArray(action.payload)) {
          state.items = action.payload;
        } else {
          console.error("Data is not an array:", action.payload);
          state.error = "Data is not an array";
        }
      })
      .addCase(fetchCartItemsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const { addItem, removeItem, incrementItem, decrementItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

