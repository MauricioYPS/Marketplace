import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import axios from 'axios'  

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
    try {
            const response = await axios.get('http://localhost:8080/api/products/all')
    console.log(response.data.response);

    return response.data.response
    
    } catch (error) {
        console.log("Error fetching items", error);
        
    }
    

})


const initialSate = {
    items: [],
    loading: false,
    error: null
}

export const itemsReducer = createReducer(initialSate, (builder) => {
    builder
    .addCase(fetchItems.pending, (state) => {
        state.loading = true
        state.error = null
    })
    .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
    })
    .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
})