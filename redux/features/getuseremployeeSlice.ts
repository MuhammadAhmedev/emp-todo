import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  employee: [],
};

export const fetchUserEmployeeData: any = createAsyncThunk(
  "useremployee/fetchUserEmployeeData",
  async (id) => {
    try {
      const response = await fetch(
        `/api/employee/getuseremployee?userId=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await response.json();
      return res;
    } catch (error) {
      throw error;
    }
  }
);

const useremployeeSlice = createSlice({
  name: "useremployee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchUserEmployeeData.fulfilled,
      (state: any, action: any) => {
        state.data = action.payload;
      }
    );
  },
});

export default useremployeeSlice.reducer;
