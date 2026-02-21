import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import jobReducer from "./jobDescription";
import sentApplicationReducer from "./sentApplications";
import userInfoReducer from "./userInfo";

const rootReducer = combineReducers({
  jobDescription: jobReducer,
  sentApplication: sentApplicationReducer,
  userInfo: userInfoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});