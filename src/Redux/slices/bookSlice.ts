import { booksAPI } from './../../API/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../../API/api';

interface BookState {
    books:Book[] | null,
    isFetching: boolean
}

const initialState: BookState = {
    books: null,
    isFetching: false
}

export const getAllBooks = createAsyncThunk(
    `books/getAllBooks`,
    async(_,{dispatch})=>{
        dispatch(toggleIsFetching())
        const response = await booksAPI.getAllBooks()
        console.log(response)
        dispatch(toggleIsFetching())
    }
)

export const bookSlice = createSlice({
    name:'book',
    initialState,
    reducers: {
        setBooks:(state, action:PayloadAction<Book[]>)=>{
            state.books = action.payload
        },
        toggleIsFetching:(state)=>{
            state.isFetching=!state.isFetching
        }
    }
})


export const {setBooks, toggleIsFetching} = bookSlice.actions

export default bookSlice.reducer