<<<<<<< HEAD
import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './reducers/productsSlice'
=======
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/productsSlice";
import authReducer from "./reducers/authSlice";
>>>>>>> main

const store = configureStore({
  reducer: {
    products: productsReducer,
<<<<<<< HEAD
  },
})

export default store
=======
    auth: authReducer,
  },
});

export default store;
>>>>>>> main
