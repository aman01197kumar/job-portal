import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedJobApplications: [],
};

const sentApplicationSlice = createSlice({
    name: "sentApplication",
    initialState,
    reducers: {
        addAppliedJobs: (state, action) => {
            state.selectedJobApplications = [...action.payload]
        },
        
    },
});

export const { addAppliedJobs } = sentApplicationSlice.actions;
export default sentApplicationSlice.reducer;
