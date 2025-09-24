import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
<<<<<<< HEAD
=======
import { fetchProductsByUser } from '../actions/authActions'
>>>>>>> main

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ category = '', search = '' } = {}) => {
<<<<<<< HEAD
    const url = `http://localhost:8080/api/products/all?category=${category}&search=${search}`
=======
    const url = `https://apimarketplace.devmauricioy.com/api/products/all?category=${category}&search=${search}`
>>>>>>> main
    const res = await axios.get(url)
    return res.data.response
  }
)

<<<<<<< HEAD
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
    filters: {
      category: '',
      search: '',
    },
  },
=======
const initialState = {
  products: [],
  loading: false,
  error: null,
  status: 'idle',
  filters: {
    category: '',
    search: '',
  },
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
>>>>>>> main
  reducers: {
    setCategory(state, action) {
      state.filters.category = action.payload
    },
    setSearch(state, action) {
      state.filters.search = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
<<<<<<< HEAD
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
=======
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.status = 'succeeded'
        state.products = action.payload ?? []
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.status = 'failed'
        state.error = action.error?.message ?? 'Error al obtener los productos'
      })
      .addCase(fetchProductsByUser.pending, (state) => {
        state.loading = true
        state.error = null
        state.status = 'loading'
      })
      .addCase(fetchProductsByUser.fulfilled, (state, action) => {
        state.loading = false
        state.status = 'succeeded'
        state.products = action.payload ?? []
      })
      .addCase(fetchProductsByUser.rejected, (state, action) => {
        state.loading = false
        state.status = 'failed'
        const payloadMessage =
          typeof action.payload === 'object' ? action.payload?.message : action.payload
        state.error = payloadMessage ?? action.error?.message ?? 'Error al obtener los productos'
>>>>>>> main
      })
  },
})

export const { setCategory, setSearch } = productsSlice.actions
export default productsSlice.reducer
