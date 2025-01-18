import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  isLoggedIn: false,
  enter: false,
  EmailVerified:false,
  name:"",
  url:"",
  form:false,
  forgotpassword:false,
  details:"",
  form:false,
};


const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    
    login: (state, action) => {
      state.isLoggedIn = true;
      // state.idToken = action.payload?.idToken || null; 
      state.enter = true;
    },

    
    logout: (state) => {
      state.isLoggedIn = false;
      // state.idToken = null;
      state.enter = false;
    },
    Verified:(state,action)=>{
      state.EmailVerified = action.payload;
    },
    setName:(state,action)=>{
      state.name= action.payload.name;
    },
    setUrl:(state,action)=>{
      state.url = action.payload.url;
    },
    setForm:(state,action)=>{
      state.form = action.payload;
    },
    // setIdToken:(state,action)=>{
    //   state.idToken = action.payload.idToken;
    // },
    setForgotPassword:(state,action)=>{
      state.forgotpassword = action.payload;
    },
    setDetails:(state,action)=>{
      state.details=action.payload;
    },
    setform:(state,action)=>{
      state.form=action.payload;
    }
  },
});

// Export actions and reducer
export const { login,Verified,setDetails,setform,setName,setUrl,setForm,setForgotPassword, logout } = AuthSlice.actions;
export const authReducer = AuthSlice.reducer;
