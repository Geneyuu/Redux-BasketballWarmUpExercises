import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isPlaying: false,
	isResting: false,
	currentExerciseIndex: 0,
	remainingTime: 0,
	currentCategory: "",
};

const warmUpSlice = createSlice({
	name: "warmUp",
	initialState,
	reducers: {
		startExercise: (state) => {
			state.isPlaying = true;
		},
		pauseExercise: (state) => {
			state.isPlaying = false;
		},
		setResting: (state, action) => {
			state.isResting = action.payload;
		},
		setRemainingTime: (state, action) => {
			state.remainingTime = action.payload;
		},
		nextExercise: (state) => {
			state.currentExerciseIndex += 1;
			state.isResting = false;
		},
		resetWarmUp: () => initialState,
		setCurrentCategory: (state, action) => {
			state.currentCategory = action.payload;
		},
	},
});

export const {
	startExercise,
	pauseExercise,
	setResting,
	setRemainingTime,
	nextExercise,
	resetWarmUp,
	setCurrentCategory,
} = warmUpSlice.actions;

export default warmUpSlice.reducer;
