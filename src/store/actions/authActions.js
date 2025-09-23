import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://apimarketplace.devmauricioy.com/api";

export const setUser = createAction("auth/setUser", (data) => ({ payload: data }));
export const clearAuthFeedback = createAction("auth/clearFeedback");
export const logout = createAction("auth/logout");

const extractUser = (rawUser) => {
  if (!rawUser) return null;
  if (Array.isArray(rawUser)) {
    return extractUser(rawUser[0]);
  }
  if (rawUser.response !== undefined) {
    return extractUser(rawUser.response);
  }
  if (rawUser.user !== undefined) {
    return extractUser(rawUser.user);
  }
  if (rawUser.data !== undefined) {
    return extractUser(rawUser.data);
  }
  return rawUser;
};

const normalizeUser = (user) => {
  const extracted = extractUser(user);
  if (!extracted) return null;
  const normalized = { ...extracted };
  if (!normalized._id && normalized.id) {
    normalized._id = normalized.id;
  }
  return normalized;
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/signIn`, { email, password });
      const data = response.data ?? {};
      const token = data.token ?? data.accessToken ?? null;
      let user = normalizeUser(
        data.user ??
        data.profile ??
        data.response ??
        data.data ??
        null
      );

      if (!token) {
        throw new Error("No se recibi� el token de autenticaci�n");
      }

      localStorage.setItem("token", token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      if (!user || !user._id) {
        const userByEmailResponse = await axios.get(`${BASE_URL}/users/email/${email}`);
        user = normalizeUser(userByEmailResponse.data ?? userByEmailResponse.response ?? userByEmailResponse);
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
      const user = normalizeUser(
        data.user ??
        data.profile ??
        data.response ??
        data.data ??
        null
      );
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
          `${BASE_URL}/auth/signOut`,
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

export const fetchProductsByUser = createAsyncThunk(
  "products/fetchByUser",
  async (_, { getState, rejectWithValue, dispatch }) => {
    const { auth } = getState();
    const userId = auth.user?._id;

    if (!userId) {
      return rejectWithValue("Usuario no identificado");
    }

    try {
      const response = await axios.get(`${BASE_URL}/products/user/${userId}`);
      return response.data?.response ?? response.data ?? [];
    } catch (error) {
      const status = error.response?.status;

      if (status === 401 || status === 403) {
        dispatch(logout());
      }

      const message =
        error.response?.data?.message ??
        error.message ??
        "No se pudieron obtener los productos";

      return rejectWithValue({ message, status });
    }
  }
);
