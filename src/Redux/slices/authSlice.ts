import { authAPI } from "./../../API/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "./../../Types/Types";

interface authState {
  currentUser: UserType | null;
  isAuthorized: boolean;
  isLogging: boolean;
}

const initialState: authState = {
  currentUser: null,
  isAuthorized: false,
  isLogging: false,
};

export const whoAmI = createAsyncThunk(
  "auth/whoAmI",
  async(_,{dispatch})=>{
    const response = await authAPI.whoAmI()
    if (response.status===200) {
      dispatch(setCurrentUser(response.data))
    }
  }
)

// remembers user's token if successful
export const loginRequest = createAsyncThunk(
  "auth/loginRequest",
  async ({ username, password }: any, { dispatch }) => {
    dispatch(toggleIsLogging())
    const response = await authAPI.login(username, password);
    if (response.status === 200) {
      // remember token, then dispatch whoAmI() to get full user object and save it to the store
      localStorage.setItem("token", response.data.token);
      dispatch(whoAmI())
    } 
    dispatch(toggleIsLogging())
  }
);
export const logoutRequest = createAsyncThunk(
  "auth/logoutRequest",
  async(_,{dispatch}) => {
    const response = await authAPI.logout()
    if (response.status===200) {
      localStorage.clear()
      dispatch(logoutSuccess())
    }
  }
)

export const registerRequest = createAsyncThunk(
  "auth/registerRequest",
  async ({ username, password }: any, { dispatch }) => {
    const response = await authAPI.register(username, password);
    debugger
    if (response.status === 200) {
      // should get full user object from server and dispatch it so that the current user is saved in the store
      dispatch(registerSuccess())
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleIsLogging: (state) => {
      state.isLogging = !state.isLogging
    },
    registerSuccess: (state) => {
      alert("registered successfully");
    },
    setCurrentUser: (state,action:PayloadAction<UserType>) =>{
      state.isAuthorized = true
      state.currentUser = action.payload
    },
    logoutSuccess: (state) => {
      state.isAuthorized = false,
      state.currentUser = null
    }
  },
});

export const { toggleIsLogging, registerSuccess, setCurrentUser, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
