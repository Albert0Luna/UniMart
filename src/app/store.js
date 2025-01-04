import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice.js";

import { allProducts } from "../features/products/productsSlice.js";

/*
export default configureStore({
  reducer: {
    cart: cartReducer,
  }
});
*/


export default configureStore({
  reducer: {
    cart: cartReducer,
    [allProducts.reducerPath]: allProducts.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(allProducts.middleware),
});
