import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  expenses: [],
};

// Expense slice
const ExpenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    // Set all expenses
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },

    // Add a new expense
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },

    // Delete an expense by ID
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (item) => item.id !== action.payload.id
      );
    },

    // Update an existing expense
    updateExpense: (state, action) => {
      const index = state.expenses.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        state.expenses[index] = action.payload;
      }
    },
  },
});

// Export actions and reducer
export const { setExpenses, addExpense, deleteExpense, updateExpense } =
  ExpenseSlice.actions;

export const expensesReducer = ExpenseSlice.reducer;
