import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { combineReducers } from "redux";
import jobReducer from "./jobDescription"; // ✅ Correct import
import sentApplicationReducer from './sentApplications'

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  jobDescription: jobReducer, // ✅ Use the actual reducer
  sentApplication: sentApplicationReducer,

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions that have non-serializable values
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
