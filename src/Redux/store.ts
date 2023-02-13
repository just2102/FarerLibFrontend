import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./slices/bookSlice"
import authorReducer from "./slices/authorSlice"
import authReducer from "./slices/authSlice"
import appReducer from "./slices/appSlice"

export const store = configureStore({
    reducer: {
        books: bookReducer,
        authors: authorReducer,
        auth: authReducer,
        app: appReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch