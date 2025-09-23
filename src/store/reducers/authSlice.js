import { createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import {
  clearAuthFeedback,
  login,
  logout,
  register,
  setUser,
  signOut,
} from "../actions/authActions";

const storedToken = localStorage.getItem("token");

if (storedToken) {
  axios.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
}

const initialState = {
  loading: false,
  error: null,
  user: null,
  token: storedToken ?? null,
  message: null,
  registrationSuccess: false,
  fieldErrors: null,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.registrationSuccess = false;
      state.fieldErrors = null;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload.user ?? null;
      
      state.token = action.payload.token ?? null;
      state.message = null;
      state.registrationSuccess = false;
      state.fieldErrors = null;
      if (action.payload.token) {
        axios.defaults.headers.common.Authorization = `Bearer ${action.payload.token}`;
      }
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Error al iniciar sesion";
      state.user = null;
      state.token = null;
      state.message = null;
      state.registrationSuccess = false;
      state.fieldErrors = null;
      localStorage.removeItem("token");
      delete axios.defaults.headers.common.Authorization;
    })
    .addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.registrationSuccess = false;
      state.fieldErrors = null;
    })
    .addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload.user ?? state.user;
      state.token = action.payload.token ?? state.token;
      state.message = action.payload.message ?? null;
      state.registrationSuccess = !action.payload.token;
      state.fieldErrors = null;
      if (action.payload.token) {
        axios.defaults.headers.common.Authorization = `Bearer ${action.payload.token}`;
      }
    })
    .addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message ?? "Error al registrar";
      state.message = null;
      state.registrationSuccess = false;
      state.fieldErrors = action.payload?.errors ?? null;
    })
    .addCase(signOut.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.fieldErrors = null;
    })
    .addCase(signOut.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.registrationSuccess = false;
      state.error = null;
      state.message = null;
      state.fieldErrors = null;
    })
    .addCase(signOut.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.registrationSuccess = false;
      state.error = action.payload ?? "Error al cerrar sesion";
      state.message = null;
      state.fieldErrors = null;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload.user ?? null;
      console.log("User",action.payload.user);
      
      
      state.token = action.payload.token ?? state.token;
      state.error = null;
      state.message = null;
      state.loading = false;
      state.registrationSuccess = false;
      state.fieldErrors = null;
      if (action.payload.token) {
        axios.defaults.headers.common.Authorization = `Bearer ${action.payload.token}`;
        localStorage.setItem("token", action.payload.token);
      }
    })
    .addCase(logout, (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.message = null;
      state.registrationSuccess = false;
      state.fieldErrors = null;
      localStorage.removeItem("token");
      delete axios.defaults.headers.common.Authorization;
    })
    .addCase(clearAuthFeedback, (state) => {
      state.error = null;
      state.message = null;
      state.registrationSuccess = false;
      state.fieldErrors = null;
    });
});

export default authReducer;
