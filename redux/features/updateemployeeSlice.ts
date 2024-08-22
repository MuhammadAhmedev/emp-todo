import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const updateEmployeeData: any = createAsyncThunk(
  "updateemployee/updateEmployeeData",
  async (employeeData: any) => {
    try {
      const response = await fetch(`/api/employee/updateemployee`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const updateEmployeeSlice = createSlice({
  name: "updateemployee",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateEmployeeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployeeData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateEmployeeData.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default updateEmployeeSlice.reducer;
