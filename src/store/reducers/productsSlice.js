import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { fetchProductsByUser } from '../actions/authActions'

const BASE_URL = 'https://apimarketplace.devmauricioy.com/api'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ category = '', search = '' } = {}) => {
    const url = `${BASE_URL}/products/all?category=${category}&search=${search}`
    const res = await axios.get(url)
    return res.data.response
  }
)

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/products/create`, payload)
      return res.data?.response ?? res.data
    } catch (error) {
      const message =
        error.response?.data?.message ??
        error.message ??
        'Error al crear el producto'
      return rejectWithValue(message)
    }
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
  creation: {
    loading: false,
    error: null,
    success: false,
    lastCreated: null,
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
    clearCreationState(state) {
      state.creation = {
        loading: false,
        error: null,
        success: false,
        lastCreated: null,
      }
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
      .addCase(createProduct.pending, (state) => {
        state.creation.loading = true
        state.creation.error = null
        state.creation.success = false
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.creation.loading = false
        state.creation.success = true
        state.creation.error = null
        state.creation.lastCreated = action.payload ?? null
        const created = action.payload
        if (created && typeof created === 'object' && !Array.isArray(created) && created._id) {
          const index = state.products.findIndex((item) => item._id === created._id)
          if (index >= 0) {
            state.products[index] = created
          } else {
            state.products.unshift(created)
          }
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.creation.loading = false
        state.creation.success = false
        state.creation.error = action.payload ?? action.error?.message ?? 'Error al crear el producto'
      })
  },
})

export const { setCategory, setSearch, clearCreationState } = productsSlice.actions
export default productsSlice.reducer
export {BASE_URL}
