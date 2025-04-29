import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobArray: [],
};

const jobSlice = createSlice({
  name: "jobDescription",
  initialState,
  reducers: {
    addJobDescription: (state, action) => {
      state.jobArray = action.payload; // expects an array of jobs
      console.log(state.jobArray,'cmkm')
    },
  },
});

export const { addJobDescription } = jobSlice.actions;
export default jobSlice.reducer;
