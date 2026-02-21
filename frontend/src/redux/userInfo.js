import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  profileImage: "",
  user: {},
  user_id: "",
  user_selection: "",
  user_onboarding_credentials: {
    education_details: [],
    experience: [],
    resume: {}
  }
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
    },
    addEducationDetails: (state, action) => {
      if (!state.user_onboarding_credentials) {
        state.user_onboarding_credentials = {
          education_details: [],
          experience: [],
          resume: {}
        };
      }

      state.user_onboarding_credentials.education_details.push(...action.payload);
    },

    addExperienceAction: (state, action) => {
      if (!state.user_onboarding_credentials) {
        state.user_onboarding_credentials = {
          education_details: [],
          experience: [],
          resume: {}
        };
      }

      state.user_onboarding_credentials.experience.push(...action.payload);
    },
    addResume: (state, action) => {
      state.user_onboarding_credentials.resume = action.payload
    }
  },
});

export const { addUsername, addProfileImage, addUser, addUserId, addUserSelection,
  addEducationDetails,
  addExperienceAction,
  addResume
} = userInfoSlice.actions;
export default userInfoSlice.reducer;
