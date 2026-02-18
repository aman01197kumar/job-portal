import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  profileImage: "",
  user: {},
  user_id: "",
  user_selection: ""
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
    addUserId: (state, action) => { state.user = action.payload },

    addUserSelection: (state, action) => {
      state.user_selection = action.payload;
    }


  },
});

export const { addUsername, addProfileImage, addUser, addUserId, addUserSelection } = userInfoSlice.actions;
export default userInfoSlice.reducer;
