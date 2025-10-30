import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    appliedJobsCount : 0,
};

const sentApplicationSlice = createSlice({
    name: "applications",
    initialState,
    reducers: {
        setAppliedJobsCount:(state,action)=>{
            state.appliedJobsCount = action.payload
        }
    },
});

export const { setAppliedJobsCount } = sentApplicationSlice.actions;
export default sentApplicationSlice.reducer;
