import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './reducers/productsSlice'

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
})

export default store
