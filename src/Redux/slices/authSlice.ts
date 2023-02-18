import { authAPI } from "./../../API/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "./../../Types/Types";

interface authState {
  currentUser: UserType | null;
  isAuthorized: boolean;
  isLogging: boolean;
  loginError: null | string
}

const initialState: authState = {
  currentUser: null,
  isAuthorized: false,
  isLogging: false,
  loginError: null
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
    if (response.data.status === "OK") {
      // remember token, then dispatch whoAmI() to get full user object and save it to the store
      // and clear login error
      localStorage.setItem("token", response.data.token);
      dispatch(setLoginError(null))
      dispatch(whoAmI())
    } else if (response.data.status==="ERR") {
      dispatch(setLoginError(response.data.message))
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
    dispatch(toggleIsLogging())
    const response = await authAPI.register(username, password);
    if (response.data.status==="OK") {
      dispatch(setLoginError(null))
      dispatch(toggleIsLogging())
      return true
    } else if (response.data.status==="ERR") {
      dispatch(setLoginError(response.data.message))
      dispatch(toggleIsLogging())
      return false
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
      // 
    },
    setCurrentUser: (state,action:PayloadAction<UserType>) =>{
      state.isAuthorized = true
      state.currentUser = action.payload
    },
    logoutSuccess: (state) => {
      state.isAuthorized = false,
      state.currentUser = null
    },
    setLoginError: (state,action:PayloadAction<string|null>) => {
      state.loginError = action.payload
    }
  },
});

export const { toggleIsLogging, registerSuccess, setCurrentUser, logoutSuccess, setLoginError } = authSlice.actions;

export default authSlice.reducer;
