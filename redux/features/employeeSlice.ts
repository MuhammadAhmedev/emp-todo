import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const fetchEmployeeData: any = createAsyncThunk(
  "employee/fetchEmployeeData",
  async () => {
    try {
      const response = await fetch("/api/employee/getAllemployee", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeData.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchEmployeeData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(fetchEmployeeData.rejected, (state: any, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });
  },
});

export default employeeSlice.reducer;
