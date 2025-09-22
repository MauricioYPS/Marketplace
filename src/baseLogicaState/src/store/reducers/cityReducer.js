// src/redux/reducers/cityReducer.js
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';



export const fetchCities = createAsyncThunk(
    'cities/fetchCities',
    async (searchTerm = '', { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/cities/all?name=${searchTerm}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                maxBodyLength: Infinity,
            });

            return response.data.response;
        } catch (error) {
            return rejectWithValue('Error fetching cities');
        }
    }
);

export const fetchCountries = async () => {
    try {
        // Realiza la solicitud GET
        const response = await axios.get('http://localhost:8080/api/countries/all');
        return response.data; // Devuelve los datos de la respuesta
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw error; // Lanza el error para manejarlo donde llames esta función
    }
};



const initialState = {
    cities: [],
    search: "",
    isLoading: false,
    error: null,
};

export const cityReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(fetchCities.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchCities.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cities = action.payload;
        })
        .addCase(fetchCities.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase('cities/changeSearch', (state, action) => {
            state.search = action.payload;
        })
});
