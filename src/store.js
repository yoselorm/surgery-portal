import { configureStore } from "@reduxjs/toolkit";
import surgeryReducer from "./redux/SurgerySlice";
import authReducer from './redux/AuthSlice';
import profileReducer from './redux/ProfileSlice';

export const store = configureStore({
  reducer: {
    surgeries: surgeryReducer,
    auth: authReducer,
    profile: profileReducer
  }
});
