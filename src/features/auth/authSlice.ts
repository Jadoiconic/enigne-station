import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string;
}

// Retrieve and parse user data from localStorage if available
const storedAuthData = typeof window !== "undefined" ? localStorage.getItem("user") : null;
const parsedAuthData = storedAuthData ? JSON.parse(storedAuthData) : null;

const initialState: AuthState = {
  user: parsedAuthData?.user || null,
  token: parsedAuthData?.token || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload)); 
    },
    logout: (state) => {
      state.user = null;
      state.token = "";
      localStorage.removeItem("user"); 
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
