import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../Slices/AuthSice";
import { expensesReducer } from "../Slices/ExpenseSlice";


export const store = configureStore({
   reducer:{
    auth:authReducer,
    expenses:expensesReducer
   }
})