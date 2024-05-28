import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  totalProduct: [],
};
const cartSlicer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTotalPrice(state, action) {
      state.totalPrice = action.payload.totalPrice;
      state.totalProduct = action.payload.totalProduct;
    },
    decrease(state, action) {
      state.totalPrice -= action.payload;
    },
    increase(state, action) {
      state.totalPrice += action.payload;
    },
    delete(state, action) {
      state.totalPrice -= action.payload.productTotalPrice;
      state.totalProduct = state.totalProduct.filter(
        (prod) => prod.productId._id !== action.payload.id
      );
    },
  },
});
export default cartSlicer.reducer;
export const cartActions = cartSlicer.actions;
