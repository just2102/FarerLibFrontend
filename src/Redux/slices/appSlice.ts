import { getAllAuthors } from './authorSlice';
import { getAllBooks } from './bookSlice';
import { whoAmI } from './authSlice';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface appState {
  isInitialized: boolean;
}
const initialState: appState = {
  isInitialized: false,
};

export const requestInit = createAsyncThunk(
    'app/init',
    async(_,{dispatch})=>{
       const response1 = await dispatch(whoAmI())
       const response2 = await dispatch(getAllBooks())
       const response3 = await dispatch(getAllAuthors())
       await Promise.all([response1,response2,response3])
       dispatch(initSuccess())
    }
)

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    initSuccess: (state) => {
      state.isInitialized = true;
    },
  },
});

export const {initSuccess} = appSlice.actions
export default appSlice.reducer