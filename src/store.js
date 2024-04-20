import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import loadingSlice from "./features/loading/loadingSlice";

// deklarasi store
export default configureStore({
  reducer: {
    cart: cartSlice.reducer,
    loading: loadingSlice.reducer,
  },
});
