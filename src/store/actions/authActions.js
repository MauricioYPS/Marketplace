import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const setUser = createAction("auth/setUser", (data) => ({ payload: data }));
export const clearAuthFeedback = createAction("auth/clearFeedback");
export const logout = createAction("auth/logout");

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/signIn`, { email, password });
      const data = response.data ?? {};
      const token = data.token ?? data.accessToken ?? null;
      const user =
        data.user ??
        data.profile ??
        data.response ??
        data.data ??
        null;

      if (token) {
        localStorage.setItem("token", token);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      }

      return { user, token };
    } catch (error) {
      const message =
        error.response?.data?.message ??
        error.message ??
        "Error al iniciar sesion";
      return rejectWithValue(message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/register`, payload);
      const data = response.data ?? {};
      const token = data.token ?? data.accessToken ?? null;
      const user =
        data.user ??
        data.profile ??
        data.response ??
        data.data ??
        null;
      const message = data.message ?? data.response?.message ?? "Registro exitoso";

      if (token) {
        localStorage.setItem("token", token);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      }

      return { user, token, message };
    } catch (error) {
      const message =
        error.response?.data?.message ??
        error.message ??
        "Error al registrar";
      const errors = error.response?.data?.errors ?? null;
      return rejectWithValue({ message, errors });
    }
  }
);

export const signOut = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        await axios.post(
          `${BASE_URL}/users/signOut`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      localStorage.removeItem("token");
      delete axios.defaults.headers.common.Authorization;

      return true;
    } catch (error) {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common.Authorization;

      const message =
        error.response?.data?.message ??
        error.message ??
        "Error al cerrar sesion";
      return rejectWithValue(message);
    }
  }
);
