import { BookType } from './../../Types/Types';
import { booksAPI } from './../../API/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';


interface BookState {
    books:BookType[] | null,
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
        if (response.status===200) {
            dispatch(setBooks(response.data))
        } dispatch(toggleIsFetching())
    }
)

export const bookSlice = createSlice({
    name:'book',
    initialState,
    reducers: {
        setBooks:(state, action:PayloadAction<BookType[]>)=>{
            state.books = action.payload
        },
        toggleIsFetching:(state)=>{
            state.isFetching=!state.isFetching
        }
    }
})


export const {setBooks, toggleIsFetching} = bookSlice.actions
export default bookSlice.reducer

// export const selectBooks = (state: {book: BookState}) => state.book.books
// export const selectIsFetching = (state: {book: BookState}) => state.book.books