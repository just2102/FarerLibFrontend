import { AuthorType, BookType } from './../../Types/Types';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authorsAPI } from './../../API/api';

interface BookState {
    authors:AuthorType[] | [],
    finalSelectedAuthor: AuthorType | null
    isFetching: boolean
    isAdding: boolean
}

const initialState: BookState = {
    authors: [],
    finalSelectedAuthor: null,
    isFetching: false,
    isAdding: false
}

export const getAllAuthors = createAsyncThunk(
    `authors/getAllAuthors`,
    async(_,{dispatch})=>{
        dispatch(toggleIsFetching())
        const response = await authorsAPI.getAllAuthors()
        if (response.status===200) {
            dispatch(setAuthors(response.data))
        } dispatch(toggleIsFetching())
    }
)
// this thunk is used to get author by id and update the currently selected author (who is stored in redux store)
export const getAuthorById = createAsyncThunk(
    `authors/getAuthorById`,
    async(authorId:string,{dispatch})=>{
        dispatch(toggleIsFetching())
        const response = await authorsAPI.getAuthorById(authorId)
        if (response.status===200) {
            dispatch(setFinalSelectedAuthor(response.data))
        } else {
            console.log('server returned an error, check network tab')
        }
        dispatch(toggleIsFetching())
    }
)

export const postAuthorRequest = createAsyncThunk(
    `authors/postAuthorRequest`,
    async(author:AuthorType, {dispatch})=>{
        dispatch(toggleIsAddingAuthor())
        const response = await authorsAPI.postAuthor(author)
        if (response.status===200) {
            dispatch(postAuthorSuccess(response.data))
            dispatch(toggleIsAddingAuthor())
            return true
        } else {
            dispatch(toggleIsAddingAuthor())
            return false}
    }
)


export const authorSlice = createSlice({
    name:'book',
    initialState,
    reducers: {
        setAuthors:(state, action:PayloadAction<AuthorType[]>)=>{
            state.authors = action.payload
        },
        toggleIsFetching:(state)=>{
            state.isFetching=!state.isFetching
        },
        setFinalSelectedAuthor:(state,action:PayloadAction<AuthorType>)=>{
            state.finalSelectedAuthor = action.payload
        },
        postAuthorSuccess:(state,action:PayloadAction<AuthorType>)=> {
            state.authors = [...state.authors, action.payload]
        },
        updateAuthorBook: (state,action:PayloadAction<any>)=> {
            console.log(action.payload)
            for (let i = 0; i<state.authors.length; i++) {
                if (state.authors[i]._id===action.payload.author._id) {
                    for (let j = 0; j<state.authors[i].books.length; j++) {
                        if (state.authors[i].books[j]._id===action.payload._id) {
                            state.authors[i].books[j] = action.payload
                        }
                    }
                }
            }
        },
        toggleIsAddingAuthor:(state) => {
            state.isAdding = !state.isAdding;
        }
    }
})


export const {setAuthors, 
    toggleIsFetching, 
    setFinalSelectedAuthor, 
    postAuthorSuccess, 
    updateAuthorBook, 
    toggleIsAddingAuthor} = authorSlice.actions

export default authorSlice.reducer