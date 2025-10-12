import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "@/apis/cartService";

//
// 🧠 1️⃣ Lấy giỏ hàng của user
//
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await cartService.getCart(); // API: GET /cart/me
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

//
// 🧠 2️⃣ Thêm sản phẩm vào giỏ
//
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item, {dispatch, rejectWithValue }) => {
    try {
      await cartService.addToCart(item);
      // gọi lại để đồng bộ
      const res = await dispatch(fetchCart()).unwrap();
      console.log("palyload: ", res)
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await cartService.updateCartItem(productId, { quantity }); // PUT /cart/{productId}
      return { productId, quantity, res };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

//
// 🧠 3️⃣ Xóa sản phẩm khỏi giỏ
//
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (productId, { rejectWithValue }) => {
    try {
      await cartService.deleteCart(productId); // DELETE /cart/items/{productId}
      return productId;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

//
// 🧩 4️⃣ Slice
//
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartId: null,
    accountId: null,
    items: [], // [{ productId, name, price, quantity, stockQty }]
    isLoading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.cartId = null;
      state.accountId = null;
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((x) => x.productId === productId);
      if (item) item.quantity = quantity;
    },
  },
  extraReducers: (builder) => {
    builder
      //
      // 🧩 Fetch cart
      //
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartId = action.payload.cartId;
        state.accountId = action.payload.accountId;
        state.items = action.payload.items || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //
      // 🧩 Add to cart (sau khi thêm xong thì nên fetch lại)
      //
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //
      // 🧩 Update item quantity
      //
      .addCase(updateCartItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        const { productId, quantity } = action.payload;
        const item = state.items.find((x) => x.productId === productId);
        if (item) item.quantity = quantity;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //
      // 🧩 Delete item
      //
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter((x) => x.productId !== action.payload);
      });
  },
});

export const { clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
