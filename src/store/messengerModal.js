import { createSlice } from "@reduxjs/toolkit";
const initialState = { openModal: false };
const messModalSlicer = createSlice({
  name: "messengerModal",
  initialState,
  reducers: {
    TOGGLE_POPUP(state, action) {
      state.openModal = !state.openModal;
    },
  },
});

export default messModalSlicer.reducer;
export const messModalActions = messModalSlicer.actions;
