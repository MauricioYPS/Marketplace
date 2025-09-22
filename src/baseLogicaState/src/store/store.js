// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import {cityReducer} from './reducers/cityReducer.js';
import authReducer from './reducers/authReducer.js';

const store = configureStore({
    reducer: {
        cities: cityReducer,
        authStore: authReducer
    },
});

export default store;
