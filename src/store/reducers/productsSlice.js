import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { fetchProductsByUser } from '../actions/authActions'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ category = '', search = '' } = {}) => {
    const url = `https://apimarketplace.devmauricioy.com/api/products/all?category=${category}&search=${search}`
    const res = await axios.get(url)
    return res.data.response
  }
)

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
      })
  },
})

export const { setCategory, setSearch } = productsSlice.actions
export default productsSlice.reducer
