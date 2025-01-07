import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../Slices/AuthSice";
import { expensesReducer } from "../Slices/ExpenseSlice";
import themeReducer from '../Slices/themeSlice';

export const store = configureStore({
   reducer:{
    auth:authReducer,
    expenses:expensesReducer,
    theme: themeReducer
   }
})