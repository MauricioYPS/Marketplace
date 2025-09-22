import { createReducer } from "@reduxjs/toolkit";
import  {login, setUser}  from "../actions/authActions";

const initialState = {
        loading :false,
        error: false,
        user: null,
        token: null,
    };

 const authReducer = createReducer(initialState, (builder) => {
    builder.addCase(login.fulfilled, (state,action) => {
        console.log("se ha logueado");
        // console.log(action);
        
        
       state.loading = false,
       state.error = false,
       state.user = action.payload.user,
       state.token = action.payload.token
    })
    builder.addCase(login.pending, (state,action) => {
        console.log("se esta logueando");
        
        state.loading = true,
        state.error = false
        state.user = null
        state.token = null
    })
    builder.addCase(login.rejected, (state,action) => {
        console.log("no se ha logueado");
        
        state.loading = false,
        state.error = action.error.message
        state.user = null
        state.token = null
        localStorage.removeItem("token")
    })
    builder.addCase(setUser, (state,action) => {
        state.user = action.payload.user
        state.token = action.payload.token
    })
    builder.addCase("logout", (state,action) => {
        state.user = null
        state.token = null
        localStorage.removeItem("token")
    })
})

export default authReducer