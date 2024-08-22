import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteEmployeeData: any = createAsyncThunk(
  "deleteemployee/deleteEmployeeData",
  async (id) => {
    try {
      const response = await fetch(`/api/employee/deleteemployee?id=${id}`, {
        method: "DELETE",
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

const deleteemployeeSlice = createSlice({
  name: "deleteemployee",
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteEmployeeData.fulfilled, (state: any, action: any) => {
      state.data = action.payload;
    });
  },
});

export default deleteemployeeSlice.reducer;
