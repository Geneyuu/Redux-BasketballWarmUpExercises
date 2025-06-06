// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import exerciseReducer from "./slices/exerciseSlice";
import profileReducer from "./slices/profileSlice";

export const store = configureStore({
	reducer: {
		profile: profileReducer,
		exercise: exerciseReducer,  
	},
});
