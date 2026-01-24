import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	allExercises: [],
	exerciseOpen: false,
	exerciseValue: null,
	intensityOpen: false,
	intensityValue: null,
	exerciseData: {
		duration: "",
		repetitions: "",
		restDuration: "",
	},
};

const exerciseSlice = createSlice({
	name: "exercise",
	initialState,
	reducers: {
		setExerciseOpen: (state, action) => {
			state.exerciseOpen = action.payload;
		},
		setExerciseValue: (state, action) => {
			state.exerciseValue = action.payload;
		},
		setIntensityOpen: (state, action) => {
			state.intensityOpen = action.payload;
		},
		setIntensityValue: (state, action) => {
			state.intensityValue = action.payload;
		},
		setExerciseData: (state, action) => {
			state.exerciseData = action.payload;
		},
		setDuration: (state, action) => {
			state.exerciseData.duration = action.payload;
		},
		setRepetitions: (state, action) => {
			state.exerciseData.repetitions = action.payload;
		},
		setRestDuration: (state, action) => {
			state.exerciseData.restDuration = action.payload;
		},
		setAllExercises: (state, action) => {
			state.allExercises = action.payload;
		},
		resetExercises: (state) => {
			state.exerciseValue = null;
			state.exerciseData = {
				duration: "",
				repetitions: "",
				restDuration: "",
			};
		},
	},
});

export const {
	setExerciseOpen,
	setExerciseValue,
	setIntensityOpen,
	setIntensityValue,
	setExerciseData,
	setDuration,
	setRepetitions,
	setRestDuration,
	setAllExercises,
	resetExercises,
} = exerciseSlice.actions;

export default exerciseSlice.reducer;
