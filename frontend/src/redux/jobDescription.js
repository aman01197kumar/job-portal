import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedJob: {},
  numb: 0,
};

const jobSlice = createSlice({
  name: "jobDescription",
  initialState,
  reducers: {
    addJobDescription: (state, action) => {
      state.selectedJob = action.payload;
    },
  },
});

export const { addJobDescription } = jobSlice.actions;
export default jobSlice.reducer; // 👈 This is what you import in store.js
