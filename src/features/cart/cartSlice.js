import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const selectedCartIndex = state.cartItems.findIndex(
        (product) => product.id === newItem.id
      );

      if (selectedCartIndex !== -1) {
        state.cartItems[selectedCartIndex].quantity += 1;
        state.cartItems[selectedCartIndex].totalPrice =
          state.cartItems[selectedCartIndex].quantity * newItem.price;
      } else {
        state.cartItems.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
    },

    reduceQuantity: (state, action) => {
      const newItem = action.payload;
      const selectedCartIndex = state.cartItems.findIndex(
        (product) => product.id === newItem.id
      );
      if (selectedCartIndex !== -1) {
        state.cartItems[selectedCartIndex].quantity -= 1;
        state.cartItems[selectedCartIndex].totalPrice =
          state.cartItems[selectedCartIndex].quantity * newItem.price;
      }
    },

    removeItemFromCart: (state, action) => {
      const newItem = action.payload;
      const selectedCartIndex = state.cartItems.findIndex(
        (product) => product.id === newItem.id
      );
      if (selectedCartIndex !== -1) {
        state.cartItems.splice(selectedCartIndex, 1);
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart, reduceQuantity } =
  cartSlice.actions; //declare sebagai action untuk dikirim keluar

export default cartSlice;

// selector
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalItems = (state) => {
  return state.cart.cartItems.reduce((total, item) => total + item.quantity, 0);
};

export const selectCartTotalPrice = (state) => {
  return state.cart.cartItems.reduce(
    (total, item) => total + item.totalPrice,
    0
  );
};
