import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { exercises } from "../../constants/exercises";
import {
	resetExercises,
	setAllExercises,
	setIntensityValue,
} from "../slices/exerciseSlice";

export const initializeExerciseData = () => async (dispatch) => {
	try {
		let savedIntensity = await AsyncStorage.getItem("SelectedIntensity");

		if (!savedIntensity) {
			savedIntensity = "beginner";
			await AsyncStorage.setItem("SelectedIntensity", savedIntensity);
		}
		dispatch(setIntensityValue(savedIntensity));

		const storedExercises = await AsyncStorage.getItem("ExerciseDatabase");

		let loadedExercises;
		if (!storedExercises) {
			loadedExercises = exercises.map(
				({ id, name, intensity, description }) => ({
					id,
					name,
					intensity,
					description,
				})
			);
			await AsyncStorage.setItem(
				"ExerciseDatabase",
				JSON.stringify(loadedExercises)
			);
		} else {
			loadedExercises = JSON.parse(storedExercises);
		}

		dispatch(setAllExercises(loadedExercises));
	} catch (error) {
		console.error("Initialization Error:", error);
	}
};

// Update exercise data in AsyncStorage
export const updateExerciseDataInStorageById =
	(exerciseId, updatedFields) => async (dispatch) => {
		try {
			const storedExercises = await AsyncStorage.getItem(
				"ExerciseDatabase"
			);
			if (!storedExercises) return;

			const exercisesArray = JSON.parse(storedExercises);
			const updatedExercises = exercisesArray.map((exercise) =>
				exercise.id === exerciseId
					? { ...exercise, ...updatedFields }
					: exercise
			);

			await AsyncStorage.setItem(
				"ExerciseDatabase",
				JSON.stringify(updatedExercises)
			);
			dispatch(setAllExercises(updatedExercises));
		} catch (error) {
			console.error("Update Error:", error);
		}
	};

// Reset to default exercises
export const resetToDefault = () => async (dispatch) => {
	Alert.alert(
		"Reset to Default",
		"Are you sure you want to reset all exercises?",
		[
			{ text: "Cancel", style: "cancel" },
			{
				text: "Confirm",
				style: "destructive",
				onPress: async () => {
					try {
						const defaultExercises = exercises.map(
							({ id, name, intensity, description }) => ({
								id,
								name,
								description,
								intensity: {
									beginner: { ...intensity.beginner },
									intermediate: { ...intensity.intermediate },
									advanced: { ...intensity.advanced },
								},
							})
						);

						await AsyncStorage.setItem(
							"ExerciseDatabase",
							JSON.stringify(defaultExercises)
						);

						dispatch(setAllExercises(defaultExercises));
						dispatch(resetExercises());
					} catch (error) {
						console.error("Error resetting to default:", error);
					}
				},
			},
		]
	);
};
