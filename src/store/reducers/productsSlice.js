import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Thunk con parámetros de búsqueda y categoría
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ category = '', search = '' } = {}) => {
    const url = `http://localhost:8080/api/products/all?category=${category}&search=${search}`
    const res = await axios.get(url)
    return res.data.response
  }
)

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
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { setCategory, setSearch } = productsSlice.actions
export default productsSlice.reducer
