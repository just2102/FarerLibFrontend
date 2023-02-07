import { AuthorType } from './../../Types/Types';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authorsAPI } from './../../API/api';

interface BookState {
    authors:AuthorType[] | null,
    isFetching: boolean
}

const initialState: BookState = {
    authors: null,
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

export const authorSlice = createSlice({
    name:'book',
    initialState,
    reducers: {
        setAuthors:(state, action:PayloadAction<AuthorType[]>)=>{
            state.authors = action.payload
        },
        toggleIsFetching:(state)=>{
            state.isFetching=!state.isFetching
        }
    }
})


export const {setAuthors, toggleIsFetching} = authorSlice.actions

export default authorSlice.reducer