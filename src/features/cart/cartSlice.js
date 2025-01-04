import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Renamed for clarity
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, id } = action.payload;

      const existingProduct = state.items.find((item) => item.id === id);

      if (existingProduct) {
        if (existingProduct.count >= 99) return;
        // Update count and amount
        existingProduct.count += 1;
        existingProduct.amount = existingProduct.count * existingProduct.price;
      } else {
        // Add new product to cart
        state.items.push({ ...product, count: 1, amount: product.price });
      }
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;

      const existingProduct = state.items.find((item) => item.id === id);

      if (existingProduct) {
        existingProduct.count -= 1;

        if (existingProduct.count <= 0) {
          // Remove product if count is zero
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingProduct.amount =
            existingProduct.count * existingProduct.price;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
