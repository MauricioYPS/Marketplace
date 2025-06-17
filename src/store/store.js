import { configureStore } from "@reduxjs/toolkit";
import {itemsReducer} from "./reducers/itemsReducer";


const store = configureStore({  
    reducer: {
        items : itemsReducer
    },
})

export default store