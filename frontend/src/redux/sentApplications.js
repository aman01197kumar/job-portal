// sentApplications.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appliedJobsCount: 0,
  sentApplicationsIds: [],
};

const sentApplicationSlice = createSlice({
  name: "sentApplication", // ✅ must match store key
  initialState,
  reducers: {
    setAppliedJobsCount: (state, action) => {
      state.appliedJobsCount = action.payload;
    },
    setSentApplicationsIds: (state, action) => {
      state.sentApplicationsIds = action.payload;
    },
  },
});

export const { setAppliedJobsCount, setSentApplicationsIds } =
  sentApplicationSlice.actions;

export default sentApplicationSlice.reducer;
