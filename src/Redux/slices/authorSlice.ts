import { AuthorType } from './../../Types/Types';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authorsAPI } from './../../API/api';

interface BookState {
    authors:AuthorType[] | [],
    finalSelectedAuthor: AuthorType | null
    isFetching: boolean
}

const initialState: BookState = {
    authors: [],
    finalSelectedAuthor: null,
    isFetching: false
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
        const response = await authorsAPI.postAuthor(author)
        console.log(response)
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
        }
    }
})


export const {setAuthors, toggleIsFetching, setFinalSelectedAuthor} = authorSlice.actions

export default authorSlice.reducer