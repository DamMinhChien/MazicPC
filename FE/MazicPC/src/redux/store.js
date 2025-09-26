import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import currentPageReducer from "./slices/currentPageSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    currentPage: currentPageReducer,
  },
});

export default store;
