import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/productsSlice";
import authReducer from "./reducers/authSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
  },
});

export default store;
