import { createSlice } from "@reduxjs/toolkit";

const currentPage = createSlice({
  name: "currentPage",
  initialState: {
    currentPage: "",
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = currentPage.actions;
export default currentPage.reducer;
