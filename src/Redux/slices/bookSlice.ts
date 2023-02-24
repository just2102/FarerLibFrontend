import { getAllAuthors, updateAuthorBook } from './authorSlice';
import { BookType, UserType } from "./../../Types/Types";
import { booksAPI } from "./../../API/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookState {
  books: BookType[] | [];
  isFetching: boolean;
  isGeneratingCover: boolean;

  currentUserBooks: BookType[]
}

const initialState: BookState = {
  books: [],
  isFetching: false,
  isGeneratingCover: false,

  currentUserBooks: [],
};

export const getAllBooks = createAsyncThunk(
  `books/getAllBooks`,
  async (_, { dispatch }) => {
    dispatch(toggleIsFetching());
    const response = await booksAPI.getAllBooks();
    if (response.status === 200) {
      dispatch(setBooks(response.data));
    }
    dispatch(toggleIsFetching());
  }
);

export const getBookById = createAsyncThunk(
  `books/getBookById`,
  async (bookId: string | undefined, { dispatch }) => {
    const response = await booksAPI.getBookById(bookId);
    if (response.status === 200) {
      dispatch(updateBookSuccess(response.data));
      return response.data
    }
  }
);

export const postBookRequest = createAsyncThunk(
  `books/postBookRequest`,
  async (book: BookType, { dispatch }) => {
    const response = await booksAPI.postBook(book);
    if (response.status === 200) {
      await booksAPI.getBookById(response.data._id).then(response2=>{
        dispatch(addBookSuccess(response2.data));
      })
      // refetch authors too
      dispatch(getAllAuthors())
      return true;
    } else return false;
  }
);

export const deleteBookRequest = createAsyncThunk(
  `books/deleteBookRequest`,
  async (bookId: string, { dispatch }) => {
    const response = await booksAPI.deleteBookById(bookId);
    if (response.status === 200) {
      dispatch(deleteBookSuccess(bookId));
      // refetch authors too
      dispatch(getAllAuthors())
      return true;
    } else return false;
  }
);

export const updateBookRequest = createAsyncThunk(
  `books/updateBookRequest`,
  async (book: BookType, { dispatch }) => {
    const response = await booksAPI.updateBookById(book);
    console.log(response)
    // if update was successful, fetch this book from DB again and change state
    if (response.status === 200) {
      dispatch(getBookById(book._id));
      // 
      dispatch(updateAuthorBook(response.data.data))
      return true;
    } else return false;
  }
);

export const toggleBookStatusRequest = createAsyncThunk(
    `books/updateBookStatusRequest`,
    async(book: BookType, {dispatch}) => {
        const response = await booksAPI.toggleBookStatus(book)
        if (response.status===200) {
            dispatch(toggleStatusSuccess(book))
        }
    }
)

export const generateCoverRequest = createAsyncThunk(
  `books/generateCover`,
  async(prompt:string, {dispatch})=>{
    dispatch(toggleIsGeneratingCover())
    const response = await booksAPI.generateBookCover(prompt)
    if (response.status===200) {
      console.log(response)
      dispatch(toggleIsGeneratingCover())
      return response
    }
    dispatch(toggleIsGeneratingCover())
  }
)

export const getUserBooks = createAsyncThunk(
  "auth/getUserBooks",
  async (userId:string, {dispatch}) => {
    dispatch(toggleIsFetching())
    const response = await booksAPI.getUserBooks(userId)
    if (response.status===200) {
      dispatch(setCurrentUserBooks(response.data))
    }
    dispatch(toggleIsFetching())
  }
)

export const bookmarkRequest = createAsyncThunk(
  "auth/bookmarkRequest",
  async ({userId, bookId}:any, {dispatch}) => {
    const response = await booksAPI.bookmarkRequest(userId, bookId)
    if (response.data.status===200) {
      const bookmarkedBook = await dispatch(getBookById(bookId))
      dispatch(bookmarkSuccess(bookmarkedBook.payload))
    }
  }
)

export const unbookmarkRequest = createAsyncThunk(
  "auth/unbookmarkRequest",
  async ({userId, bookId}:any, {dispatch}) => {
    const response = await booksAPI.unbookmarkRequest(userId, bookId)
    if (response.status===200) {
      dispatch(unbookmarkSuccess(bookId))
    }
  }
)

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<BookType[]>) => {
      state.books = action.payload;
    },
    setCurrentUserBooks: (state, action: PayloadAction<BookType[]>) => {
      state.currentUserBooks = action.payload
    },
    bookmarkSuccess: (state, action: PayloadAction<BookType>) => {
      state.currentUserBooks.push(action.payload)
    },
    unbookmarkSuccess: (state, action: PayloadAction<string>) => {
      for (let i = 0; i<state.currentUserBooks.length; i++) {
        if (state.currentUserBooks[i]._id===action.payload) {
          state.currentUserBooks.splice(i,1)
        }
      }
    },
    toggleIsFetching: (state) => {
      state.isFetching = !state.isFetching;
    },
    addBookSuccess: (state, action: PayloadAction<BookType>) => {
      state.books = [...state.books, action.payload];
    },
    deleteBookSuccess: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter((book) => {
        book._id !== action.payload;
      });
    },
    updateBookSuccess: (state, action: PayloadAction<BookType>) => {
      for (let i = 0; i < state.books.length; i++) {
        if (state.books[i]._id === action.payload._id) {
          state.books[i] = action.payload;
        }
      }
    },
    toggleStatusSuccess: (state,action:PayloadAction<BookType>) => {
        for (let i = 0; i<state.books.length; i++) {
            if (state.books[i]._id===action.payload._id) {
                state.books[i].available = !state.books[i].available
            }
        }
    },
    toggleIsGeneratingCover: (state) => {
      state.isGeneratingCover = !state.isGeneratingCover
    }
  },
});

export const {
  setBooks,
  setCurrentUserBooks,
  bookmarkSuccess,
  unbookmarkSuccess,

  toggleIsFetching,
  addBookSuccess,
  deleteBookSuccess,
  updateBookSuccess,
  toggleStatusSuccess,
  toggleIsGeneratingCover
} = bookSlice.actions;
export default bookSlice.reducer;

// export const selectBooks = (state: {book: BookState}) => state.book.books
// export const selectIsFetching = (state: {book: BookState}) => state.book.books
