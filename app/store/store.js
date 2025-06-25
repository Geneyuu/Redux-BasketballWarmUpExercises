// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import exerciseReducer from "./slices/exerciseSlice";
import profileReducer from "./slices/profileSlice";
import warmUpReducer from "./slices/warmUpSlice";

export const store = configureStore({
	reducer: {
		profile: profileReducer,
		exercise: exerciseReducer,
		warmUp: warmUpReducer,
	},
});
