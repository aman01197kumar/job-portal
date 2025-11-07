import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  profileImage: "",
};

const userInfoSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUsername: (state, action) => {
      state.username = action.payload;
    },
    addProfileImage: (state, action) => {
      // console.log(action.payload,'oaj')
      state.profileImage = action.payload;
    },
  },
});

export const { addUsername, addProfileImage } = userInfoSlice.actions;
export default userInfoSlice.reducer;
