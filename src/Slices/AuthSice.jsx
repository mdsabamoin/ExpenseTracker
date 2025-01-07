import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  isLoggedIn: false,
  idToken: null,
  enter: false,
};

// Auth slice
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login action: Updates authentication status and token
    login: (state, action) => {
      state.isLoggedIn = true;
      state.idToken = action.payload?.idToken || null; // Ensure idToken exists
      state.enter = true;
    },

    // Logout action: Resets authentication status and clears token
    logout: (state) => {
      state.isLoggedIn = false;
      state.idToken = null;
      state.enter = false;
    },
  },
});

// Export actions and reducer
export const { login, logout } = AuthSlice.actions;
export const authReducer = AuthSlice.reducer;
