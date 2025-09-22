import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const setUser = createAction("setUser",(datos)=>{
    return{
        payload:datos
    }
});
const logout = createAction("logout");

// const login = createAsyncThunk("login",async({email,password})=>{
//     console.log("entrado al login");
    
// const credentials = {
//     email:email,
//     password: password
// }
// console.log(credentials);

// const response = await axios.post("http://localhost:8080/api/auth/signIn",credentials)
// console.log("se procede a la solicitud");
// console.log("response",response.data)
// localStorage.setItem("token",response.data.token)

// return response.data

// })

const login = createAsyncThunk("login", async ({ email, password }, thunkAPI) => {
    console.log("entrado al login");
  
    const credentials = {
      email: email,
      password: password,
    };
    console.log(credentials);
  
    try {
      const response = await axios.post("http://localhost:8080/api/auth/signIn", credentials);
      console.log("response", response.data);
  
      // Guardar el token en localStorage
      localStorage.setItem("token", response.data.token);
  
      // Retornar los datos del usuario (incluyendo photoUrl)
      return response.data; // Asegúrate de que el backend devuelva 'user' con 'photoUrl'
    } catch (error) {
      console.error("Error en login:", error);
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  });


export  {login,setUser,logout};