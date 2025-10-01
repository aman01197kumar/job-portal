import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedJobApplications: [],
    jobApplications:[]
};

const sentApplicationSlice = createSlice({
    name: "applications",
    initialState,
    reducers: {
        addAppliedJobs: (state, action) => {
            state.selectedJobApplications = [...action.payload]
        },
        
    },
});

export const { addAppliedJobs } = sentApplicationSlice.actions;
export default sentApplicationSlice.reducer;
