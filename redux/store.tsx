import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./auth/registerSlice";
import employeeReducer from "./features/employeeSlice";
import addemployeeReducer from "./features/employeeSlice";
import useremployeeReducer from "./features/employeeSlice";
import deleteemployeeReducer from "./features/employeeSlice";
import updateemployeeReducer from "./features/employeeSlice";
import searchemployeeReducer from "./features/employeeSlice";

export const Store = configureStore({
  reducer: {
    signup: signupReducer,
    employee: employeeReducer,
    addemployee: addemployeeReducer,
    useremployee: useremployeeReducer,
    deleteemployee: deleteemployeeReducer,
    updateemployee: updateemployeeReducer,
    searchemployee: searchemployeeReducer,
  },
});
