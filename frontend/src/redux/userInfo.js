import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  profileImage: "",
  user: {},
  user_token: localStorage.getItem("token") || null,
};

const userInfoSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUsername: (state, action) => {
      state.username = action.payload;
    },
    addProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
    addUser: (state, action) => {
      state.user = action.payload
    },
    setLogout: (state) => {
      state.user_token = null
    }
  },
});

export const { addUsername, addProfileImage, addUser, setUserToken,setLogout } = userInfoSlice.actions;
export default userInfoSlice.reducer;
