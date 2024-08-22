import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addEmployeeData: any = createAsyncThunk(
  "addemployee/addEmployeeData",
  async (employeeData) => {
    try {
      const response = await fetch("/api/employee/addemployee", {
        method: "POST",
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

const addemployeeSlice = createSlice({
  name: "addemployee",
  initialState: {
    id: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addEmployeeData.fulfilled, (state: any, action: any) => {
      state.data = action.payload;
    });
  },
});

export default addemployeeSlice.reducer;
