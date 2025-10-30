import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username:''
};

const userInfoSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUsername: (state, action) => {
            console.log(action.payload,'knkcn');
            state.username=action.payload
        },
        
    },
});

export const { addUsername } = userInfoSlice.actions;
export default userInfoSlice.reducer;
