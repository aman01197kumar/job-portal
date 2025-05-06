import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import jobReducer from "./jobDescription"; // ✅ Correct import

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  jobDescription: jobReducer, // ✅ Use the actual reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
