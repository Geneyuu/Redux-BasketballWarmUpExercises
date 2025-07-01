import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
	setDuration,
	setExerciseData,
	setExerciseOpen,
	setExerciseValue,
	setIntensityOpen,
	setIntensityValue,
	setRepetitions,
	setRestDuration,
} from "../../app/store/slices/exerciseSlice";
import { exercises } from "../constants/exercises";
import {
	resetToDefault,
	updateExerciseDataInStorageById,
} from "../store/thunks/exerciseThunks";

const INTENSITY_BG_COLOR = {
	beginner: "#d0f5e7",
	intermediate: "#fff8c9",
	advanced: "#ffd2d2",
};

const useSettingsLogic = () => {
	const dispatch = useDispatch();
	const {
		allExercises,
		exerciseOpen,
		exerciseValue,
		intensityOpen,
		intensityValue,
		exerciseData: { duration, repetitions, restDuration },
	} = useSelector((state) => state.exercise);

	// Dropdown items
	const exerciseItems = [
		{ label: "Select an Exercise...", value: null },
		...allExercises.map((exercise) => ({
			label: exercise.name,
			value: exercise.id,
		})),
	];

	const intensityItems = [
		{ label: "Beginner", value: "beginner" },
		{ label: "Intermediate", value: "intermediate" },
		{ label: "Advanced", value: "advanced" },
	];

	// Exercise data
	const originalExercise = exercises.find((ex) => ex.id === exerciseValue);
	const selectedExercise = allExercises.find((ex) => ex.id === exerciseValue);
	const currentIntensitySettings =
		selectedExercise?.intensity?.[intensityValue] || {};
	const originalIntensitySettings =
		originalExercise?.intensity?.[intensityValue] || {};

	// Recommended ranges
	const recommendedRange = {
		duration: `${originalIntensitySettings?.duration?.min || 0} - ${
			originalIntensitySettings?.duration?.max || 0
		} seconds`,
		repetitions: `${originalIntensitySettings?.repetitions?.min || 0} - ${
			originalIntensitySettings?.repetitions?.max || 0
		} reps`,
		restDuration: `${originalIntensitySettings?.restDuration?.min || 0} - ${
			originalIntensitySettings?.restDuration?.max || 0
		} seconds`,
	};

	// Validation
	const isInvalid = {
		duration: duration
			? isNaN(parseInt(duration)) ||
			  /[-.,\s]/.test(duration) ||
			  parseInt(duration) < originalIntensitySettings?.duration?.min ||
			  parseInt(duration) > originalIntensitySettings?.duration?.max
			: false,

		repetitions: repetitions
			? isNaN(parseInt(repetitions)) ||
			  /[-.,\s]/.test(repetitions) ||
			  parseInt(repetitions) <
					originalIntensitySettings?.repetitions?.min ||
			  parseInt(repetitions) >
					originalIntensitySettings?.repetitions?.max
			: false,

		restDuration: restDuration
			? isNaN(parseInt(restDuration)) ||
			  /[-.,\s]/.test(restDuration) ||
			  parseInt(restDuration) <
					originalIntensitySettings?.restDuration?.min ||
			  parseInt(restDuration) >
					originalIntensitySettings?.restDuration?.max
			: false,
	};

	const intensityBgColor = INTENSITY_BG_COLOR[intensityValue] || "white";

	// Reset form when exercise or intensity changes
	useEffect(() => {
		const settings = selectedExercise?.intensity?.[intensityValue] || {};
		dispatch(
			setExerciseData({
				duration: settings?.duration?.min?.toString() || "",
				repetitions: settings?.repetitions?.min?.toString() || "",
				restDuration: settings?.restDuration?.min?.toString() || "",
			})
		);
	}, [selectedExercise, intensityValue, dispatch]);

	// Save handler
	const handleSave = (field, value) => {
		if (!selectedExercise) return;

		const updatedFields = {
			intensity: {
				...selectedExercise.intensity,
				[intensityValue]: {
					...(selectedExercise.intensity?.[intensityValue] || {}),
					[field]: {
						...selectedExercise.intensity?.[intensityValue]?.[
							field
						],
						min: parseInt(value) || 0,
					},
				},
			},
		};

		dispatch(updateExerciseDataInStorageById(exerciseValue, updatedFields));
	};

	// Confirmation alerts
	const handleSaveDurationWithConfirm = () => {
		Alert.alert(
			"Confirmation to Save",
			`Are you sure you want to save\nDURATION: to ${duration} seconds?`,
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "CONFIRM",
					onPress: () => handleSave("duration", duration),
				},
			]
		);
	};

	const handleSaveRepetitionsWithConfirm = () => {
		Alert.alert(
			"Confirmation to Save",
			`Are you sure you want to save\nREPETITIONS: to ${repetitions} reps?`,
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "CONFIRM",
					onPress: () => handleSave("repetitions", repetitions),
				},
			]
		);
	};

	const handleSaveRestDurationWithConfirm = () => {
		Alert.alert(
			"Confirm to Save",
			`Are you sure you want to save\n REST TIMER: ${restDuration} seconds?`,
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "CONFIRM",
					onPress: () => handleSave("restDuration", restDuration),
				},
			]
		);
	};

	const handleIntensityValueChange = (callback) => {
		const newValue = callback(intensityValue);

		const saveAndDispatch = async (value) => {
			dispatch(setIntensityValue(value));
			await AsyncStorage.setItem("SelectedIntensity", value);
		};

		if (newValue === "intermediate") {
			Alert.alert(
				"Switching to Intermediate",
				"You're about to move to the Intermediate level.\n\nPlease make sure you already have a basic understanding of proper form and techniques. This level includes moderately challenging basketball warm-up exercises. Do you want to proceed?",
				[
					{ text: "Cancel", style: "cancel" },
					{
						text: "Proceed",
						onPress: () => saveAndDispatch(newValue),
					},
				]
			);
		} else if (newValue === "advanced") {
			Alert.alert(
				"Switching to Advanced",
				"You're about to switch to the Advanced level.\n\nThis level is for users who already feel confident and familiar with basketball warm-up Exercises. Exercises here are more intense and require good control and understanding of movements. If you're comfortable with that, you're good to go!",
				[
					{ text: "Cancel", style: "cancel" },
					{
						text: "Yes, I'm Ready!",
						onPress: () => saveAndDispatch(newValue),
					},
				]
			);
		} else {
			saveAndDispatch(newValue);
		}
	};

	return {
		exerciseOpen,
		exerciseValue,
		intensityOpen,
		intensityValue,
		duration,
		repetitions,
		restDuration,
		exerciseItems,
		intensityItems,
		selectedExercise,
		intensitySettings: currentIntensitySettings,
		recommendedRange,
		isInvalid,
		intensityBgColor,

		// All handlers remain exactly the same
		handleExerciseOpen: (open) => dispatch(setExerciseOpen(open)),
		handleExerciseValue: (callback) =>
			dispatch(setExerciseValue(callback(exerciseValue))),
		handleIntensityOpen: (open) => dispatch(setIntensityOpen(open)),
		handleIntensityValue: handleIntensityValueChange,
		handleDurationChange: (text) => dispatch(setDuration(text)),
		handleRepetitionsChange: (text) => dispatch(setRepetitions(text)),
		handleRestDurationChange: (text) => dispatch(setRestDuration(text)),
		handleSaveDuration: handleSaveDurationWithConfirm,
		handleSaveRepetitions: handleSaveRepetitionsWithConfirm,
		handleSaveRestDuration: handleSaveRestDurationWithConfirm,
		handleReset: () => dispatch(resetToDefault()),
	};
};

export default useSettingsLogic;
