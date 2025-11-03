import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { combineReducers } from "redux";
import jobReducer from "./jobDescription";
import sentApplicationReducer from "./sentApplications"; // ✅
import userInfoReducer from "./userInfo";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  jobDescription: jobReducer,
  sentApplication: sentApplicationReducer, // ✅ matches slice name
  userInfo: userInfoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
