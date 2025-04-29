import { configureStore } from "@reduxjs/toolkit";
import jobSlice from './jobDescription'

export const store = configureStore({
  reducer: {
    jobDescription:jobSlice, // key should match useSelector
  },
});
