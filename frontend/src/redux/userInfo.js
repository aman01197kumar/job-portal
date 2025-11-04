import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    username: "",
    profileImage: "",
  },
};

const userInfoSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserInfo: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { addUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
