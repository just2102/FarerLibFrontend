import { BookType } from './../../Types/Types';
import { booksAPI } from './../../API/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';


interface BookState {
    books:BookType[] | [],
    isFetching: boolean
}

const initialState: BookState = {
    books: [],
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

export const postBookRequest = createAsyncThunk(
    `books/postBookRequest`,
    async(book:BookType, {dispatch}) => {
        const response = await booksAPI.postBook(book)
        if (response.status===200) {
            dispatch(addBookSuccess(response.data))
            return true
        } else return false
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
        },
        addBookSuccess:(state,action:PayloadAction<BookType>)=>{
            state.books = [...state.books, action.payload]
        }
    }
})


export const {setBooks, toggleIsFetching, addBookSuccess} = bookSlice.actions
export default bookSlice.reducer

// export const selectBooks = (state: {book: BookState}) => state.book.books
// export const selectIsFetching = (state: {book: BookState}) => state.book.books