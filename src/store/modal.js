import { createSlice } from "@reduxjs/toolkit";
const initialState = { openModal: false, modalInfo: {} };
const modalSlicer = createSlice({
  name: "modal",
  initialState,
  reducers: {
    SHOW_POPUP(state, action) {
      state.openModal = true;
      state.modalInfo = action.payload;
    },
    HIDE_POPUP(state) {
      state.openModal = false;
    },
  },
});

export default modalSlicer.reducer;
export const modalActions = modalSlicer.actions;
