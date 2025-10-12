import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import currentPageReducer from "./slices/currentPageSlice";
import cartReducer from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    currentPage: currentPageReducer,
    cart: cartReducer,
  },
});

export default store;
