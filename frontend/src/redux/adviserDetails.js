import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adviser: {},
};

const adviserSlice = createSlice({
  name: "adviserDetails",
  initialState,
  reducers: {
    addAdviserDetails: (state, action) => {
      state.adviser = action.payload;
    },
  },
});

export const { addAdviserDetails } = adviserSlice.actions;
export default adviserSlice.reducer; // 👈 This is what you import in store.js
