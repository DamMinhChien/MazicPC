import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../apis/authService";

// Lấy user từ localStorage (nếu có)
const storedUser = localStorage.getItem("user");

// Thunk gọi API server để logout
export const logoutAsync = createAsyncThunk(
  "auth/logoutAsync",
  async (_, thunkAPI) => {
    try {
      await authService.logout(); // Gọi API logout server
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Có lỗi xảy ra khi đăng xuất"
      );
    }
  }
);

export const fetchMe = createAsyncThunk("fetchMe", async (_, thunkAPI) => {
  try {
    return await authService.me();
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data || "Lỗi không xác định"
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null,
    isLoading: false,
    error: null,
  },
  reducers: {
    // Chỉ dùng để logout client nếu muốn
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },

    // cho phép cập nhật user trực tiếp từ component (ví dụ sau khi fetch /users/me)
    setUser: (state, action) => {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchMe
      .addCase(fetchMe.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // logoutAsync
      .addCase(logoutAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        localStorage.removeItem("user");
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // don't forcibly remove user from localStorage here; keep current behavior but ensure user cleared
        state.user = null;
        localStorage.removeItem("user");
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
