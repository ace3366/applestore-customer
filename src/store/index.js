import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal";
import loginReducer from "./login";
import cartReducer from "./listCart";
import messModalReducer from "./messengerModal";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    login: loginReducer,
    cart: cartReducer,
    messenger: messModalReducer,
  },
});

export default store;
