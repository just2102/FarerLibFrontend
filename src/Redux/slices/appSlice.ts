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
       const response = await dispatch(whoAmI())
       if (response) {
        dispatch(initSuccess())
       }
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