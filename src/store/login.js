import { createSlice } from "@reduxjs/toolkit";
const initialState = { isAuth: false, user: {}, isLoading: false };
const loginSlicer = createSlice({
  name: "login",
  initialState,
  reducers: {
    ON_LOGIN(state, action) {
      if (action.payload) {
        state.isAuth = action.payload.isAuth;
        state.user = action.payload.user;
      }
    },
    ON_LOGOUT(state) {
      state.isAuth = false;
      state.user = {};
    },
    ISLOADING(state) {
      state.isLoading = !state.isLoading;
    },
  },
});

export default loginSlicer.reducer;
export const loginActions = loginSlicer.actions;
