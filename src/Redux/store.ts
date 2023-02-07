import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./slices/bookSlice"
import authorReducer from "./slices/authorSlice"

export const store = configureStore({
    reducer: {
        books: bookReducer,
        authors: authorReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch