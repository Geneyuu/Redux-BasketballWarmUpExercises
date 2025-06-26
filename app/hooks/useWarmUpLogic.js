/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, usePathname, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { exercises } from "../constants/exercises";
import {
	nextExercise,
	pauseExercise,
	resetWarmUp,
	setCurrentCategory,
	setRemainingTime,
	setResting,
	startExercise,
} from "../store/slices/warmUpSlice";

export const useWarmUpLogic = () => {
	const { allExercises, intensityValue } = useSelector(
		(state) => state.exercise
	);
	const {
		isPlaying,
		isResting,
		currentExerciseIndex,
		remainingTime,
		currentCategory,
	} = useSelector((state) => state.warmUp);

	const dispatch = useDispatch();
	const router = useRouter();
	const pathname = usePathname();
	const videoRef = useRef(null);
	const isRestingRef = useRef(null);
	const prevIntensityRef = useRef(intensityValue);

	// Determine exercise slice based on route
	let sliceStart = 0;
	let sliceEnd = 0;
	let detectedCategory = "";

	switch (true) {
		case pathname.includes("LowerBody"):
			sliceStart = 5;
			sliceEnd = 10;
			detectedCategory = "LowerBody";
			break;
		case pathname.includes("UpperBody"):
			sliceStart = 10;
			sliceEnd = 15;
			detectedCategory = "UpperBody";
			break;
		case pathname.includes("WholeBody"):
			sliceStart = 0;
			sliceEnd = 18;
			detectedCategory = "WholeBody";
			break;
		case pathname.includes("DynamicExercises"):
			sliceStart = 15;
			sliceEnd = 18;
			detectedCategory = "DynamicExercises";
			break;
		default:
			sliceStart = 0;
			sliceEnd = 18;
			detectedCategory = "Unknown";
			break;
	}

	const limitedExercises = exercises
		.slice(sliceStart, sliceEnd)
		.map((exercise) => {
			const updated = allExercises.find((ex) => ex.id === exercise.id);
			return {
				...exercise,
				intensity: updated?.intensity || exercise.intensity,
			};
		});

	const currentExercise = limitedExercises[currentExerciseIndex];
	const nextExerciseData =
		currentExerciseIndex < limitedExercises.length - 1
			? limitedExercises[currentExerciseIndex + 1]
			: null;

	const intensitySettings =
		currentExercise?.intensity?.[intensityValue] || {};

	// Reset when intensity changes
	useEffect(() => {
		if (prevIntensityRef.current !== intensityValue) {
			prevIntensityRef.current = intensityValue;
			// dispatch(resetWarmUp());
			dispatch(setRemainingTime(intensitySettings.duration?.min));
			dispatch(setCurrentCategory(detectedCategory));
			dispatch(pauseExercise());
		}
	}, [intensityValue, intensitySettings.duration?.min, detectedCategory]);

	// Handle route changes
	useEffect(() => {
		const ignoredRoutes = ["Search", "Profile", "Settings"];
		const isIgnored = ignoredRoutes.some((route) =>
			pathname.includes(route)
		);

		if (isIgnored) return;

		if (currentCategory !== detectedCategory) {
			dispatch(resetWarmUp());
			dispatch(setRemainingTime(intensitySettings.duration?.min));
			dispatch(setCurrentCategory(detectedCategory));
			dispatch(pauseExercise());

			AsyncStorage.setItem("lastCategory", detectedCategory);
		}
	}, [detectedCategory, currentCategory, pathname]);

	const totalDuration = isResting
		? intensitySettings.restDuration?.min
		: intensitySettings.duration?.min;

	const progress = 1 - remainingTime / (totalDuration || 1);

	useEffect(() => {
		if (remainingTime === 0) {
			dispatch(setRemainingTime(totalDuration));
		}
	}, [intensityValue, isResting, currentExerciseIndex]);

	// Countdown logic
	useEffect(() => {
		if (!isPlaying) return;

		const timer = setInterval(() => {
			if (remainingTime <= 0) {
				clearInterval(timer);

				setTimeout(() => {
					if (!isResting) {
						dispatch(setResting(true));
					} else {
						if (
							currentExerciseIndex <
							limitedExercises.length - 1
						) {
							dispatch(nextExercise());
						} else {
							Alert.alert(
								"Workout Complete!",
								"Great job! You can now Play Basketball!"
							);
							dispatch(pauseExercise());
							dispatch(resetWarmUp());
							router.replace("/(tabs)/");
						}
					}
				}, 300);
			} else {
				dispatch(setRemainingTime(remainingTime - 1));
			}
		}, 1000);

		return () => clearInterval(timer);
	}, [isPlaying, remainingTime, isResting]);

	const togglePlayPause = async () => {
		if (isPlaying) {
			await videoRef.current?.pauseAsync();
			dispatch(pauseExercise());
		} else {
			await videoRef.current?.playAsync();
			dispatch(startExercise());
		}
	};

	const handleRestart = () => {
		dispatch(pauseExercise());
		dispatch(setResting(false));
		Alert.alert(
			"Restart Warm-Up Exercises",
			"Restart Exercise will reset the exercises from the start, Do you wish to Restart?",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Restart",
					onPress: () => dispatch(resetWarmUp()),
					style: "destructive",
				},
			]
		);
	};

	useFocusEffect(
		React.useCallback(() => {
			if (!isRestingRef.current) {
				dispatch(pauseExercise());
			} else if (currentCategory !== detectedCategory) {
				dispatch(pauseExercise());
			} else {
				dispatch(startExercise());
			}
			return () => {
				dispatch(pauseExercise());
			};
		}, [])
	);

	useEffect(() => {
		isRestingRef.current = isResting;
	}, [isResting]);

	// // Load saved progress on mount

	// useEffect(() => {
	// 	const loadProgress = async () => {
	// 		const saved = await AsyncStorage.getItem("warmUpProgress");
	// 		if (saved) {
	// 			const progress = JSON.parse(saved);
	// 			if (progress.currentExerciseIndex !== undefined)
	// 				dispatch({
	// 					type: "warmUp/setCurrentExerciseIndex",
	// 					payload: progress.currentExerciseIndex,
	// 				});
	// 		}
	// 	};
	// 	loadProgress();
	// }, []);

	// //  Save progress on any state change
	// useEffect(() => {
	// 	const saveProgress = async () => {
	// 		const data = {
	// 			remainingTime,
	// 			isResting,
	// 			currentExerciseIndex,
	// 		};
	// 		await AsyncStorage.setItem("warmUpProgress", JSON.stringify(data));

	// 		if (isResting) {
	// 			dispatch(startExercise());
	// 		}
	// 	};
	// 	saveProgress();
	// }, [remainingTime, isResting]);

	return {
		videoRef,
		currentExerciseIndex,
		isPlaying,
		isResting,
		remainingTime,
		progress,
		currentExercise,
		nextExercise: nextExerciseData,
		intensitySettings,
		togglePlayPause,
		handleRestart,
		limitedExercises,
		intensityValue,
	};
};

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useFocusEffect, usePathname, useRouter } from "expo-router";
// import React, { useEffect, useRef } from "react";
// import { Alert } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { exercises } from "../constants/exercises";
// import {
// 	nextExercise,
// 	pauseExercise,
// 	resetWarmUp,
// 	setCurrentCategory,
// 	setRemainingTime,
// 	setResting,
// 	startExercise,
// } from "../store/slices/warmUpSlice";

// export const useWarmUpLogic = () => {
// 	const { allExercises, intensityValue } = useSelector(
// 		(state) => state.exercise
// 	);
// 	const {
// 		isPlaying,
// 		isResting,
// 		currentExerciseIndex,
// 		remainingTime,
// 		currentCategory,
// 	} = useSelector((state) => state.warmUp);

// 	const dispatch = useDispatch();
// 	const router = useRouter();
// 	const pathname = usePathname();
// 	const videoRef = useRef(null);
// 	const isRestingRef = useRef(null);
// 	const prevIntensityRef = useRef(intensityValue);

// 	// 🔍 Detect route category
// 	let sliceStart = 0;
// 	let sliceEnd = 0;
// 	let detectedCategory = "";

// 	switch (true) {
// 		case pathname.includes("LowerBody"):
// 			sliceStart = 5;
// 			sliceEnd = 10;
// 			detectedCategory = "LowerBody";
// 			break;
// 		case pathname.includes("UpperBody"):
// 			sliceStart = 10;
// 			sliceEnd = 15;
// 			detectedCategory = "UpperBody";
// 			break;
// 		case pathname.includes("WholeBody"):
// 			sliceStart = 0;
// 			sliceEnd = 18;
// 			detectedCategory = "WholeBody";
// 			break;
// 		case pathname.includes("DynamicExercises"):
// 			sliceStart = 16;
// 			sliceEnd = 18;
// 			detectedCategory = "DynamicExercises";
// 			break;
// 		default:
// 			sliceStart = 0;
// 			sliceEnd = 18;
// 			detectedCategory = "Unknown";
// 			break;
// 	}

// 	const limitedExercises = exercises
// 		.slice(sliceStart, sliceEnd)
// 		.map((exercise) => {
// 			const updated = allExercises.find((ex) => ex.id === exercise.id);
// 			return {
// 				...exercise,
// 				intensity: updated?.intensity || exercise.intensity,
// 			};
// 		});

// 	const currentExercise = limitedExercises[currentExerciseIndex];
// 	const nextExerciseData =
// 		currentExerciseIndex < limitedExercises.length - 1
// 			? limitedExercises[currentExerciseIndex + 1]
// 			: null;

// 	const intensitySettings =
// 		currentExercise?.intensity?.[intensityValue] || {};
// 	const totalDuration = isResting
// 		? intensitySettings.restDuration?.min
// 		: intensitySettings.duration?.min;

// 	const progress = 1 - remainingTime / (totalDuration || 1);

// 	// Load saved progress on mount
// 	useEffect(() => {
// 		const loadProgress = async () => {
// 			const saved = await AsyncStorage.getItem("warmUpProgress");
// 			if (saved) {
// 				const progress = JSON.parse(saved);
// 				if (progress.remainingTime)
// 					dispatch(setRemainingTime(progress.remainingTime));
// 				if (progress.isResting !== undefined)
// 					dispatch(setResting(progress.isResting));
// 				if (progress.currentExerciseIndex !== undefined)
// 					dispatch({
// 						type: "warmUp/setCurrentExerciseIndex",
// 						payload: progress.currentExerciseIndex,
// 					});
// 				if (progress.currentCategory)
// 					dispatch(setCurrentCategory(progress.currentCategory));
// 			}
// 		};
// 		loadProgress();
// 	}, []);

// 	//  Save progress on any state change
// 	useEffect(() => {
// 		const saveProgress = async () => {
// 			const data = {
// 				remainingTime,
// 				isResting,
// 				currentExerciseIndex,
// 				currentCategory,
// 			};
// 			await AsyncStorage.setItem("warmUpProgress", JSON.stringify(data));

// 			if (isResting) {
// 				dispatch(startExercise());
// 			}
// 		};
// 		saveProgress();
// 	}, [remainingTime, isResting, currentExerciseIndex, currentCategory]);

// 	// Reset when intensity changes
// 	useEffect(() => {
// 		if (prevIntensityRef.current !== intensityValue) {
// 			prevIntensityRef.current = intensityValue;
// 			dispatch(setRemainingTime(intensitySettings.duration?.min));
// 			dispatch(setCurrentCategory(detectedCategory));
// 			dispatch(pauseExercise());
// 		}
// 	}, [intensityValue, intensitySettings.duration?.min, detectedCategory]);

// 	// Reset if user switches route
// 	useEffect(() => {
// 		const ignoredRoutes = ["Search", "Profile", "Settings"];
// 		const isIgnored = ignoredRoutes.some((route) =>
// 			pathname.includes(route)
// 		);
// 		if (isIgnored) return;

// 		if (currentCategory !== detectedCategory) {
// 			dispatch(resetWarmUp());
// 			dispatch(setRemainingTime(intensitySettings.duration?.min));
// 			dispatch(setCurrentCategory(detectedCategory));
// 			dispatch(pauseExercise());

// 			// Save last route for continue feature
// 			AsyncStorage.setItem("lastCategory", detectedCategory);
// 		}
// 	}, [detectedCategory, currentCategory, pathname]);

// 	// Reset timer if time reaches 0
// 	useEffect(() => {
// 		if (remainingTime === 0) {
// 			dispatch(setRemainingTime(totalDuration));
// 		}
// 	}, [intensityValue, isResting, currentExerciseIndex]);

// 	// ⏱️ Countdown timer
// 	useEffect(() => {
// 		if (!isPlaying) return;

// 		const timer = setInterval(() => {
// 			if (remainingTime <= 0) {
// 				clearInterval(timer);
// 				setTimeout(() => {
// 					if (!isResting) {
// 						dispatch(setResting(true));
// 					} else {
// 						if (
// 							currentExerciseIndex <
// 							limitedExercises.length - 1
// 						) {
// 							dispatch(nextExercise());
// 						} else {
// 							Alert.alert(
// 								"Workout Complete!",
// 								"Great job! You can now Play Basketball!"
// 							);
// 							dispatch(pauseExercise());
// 							dispatch(resetWarmUp());
// 							router.replace("/(tabs)/");
// 						}
// 					}
// 				}, 300);
// 			} else {
// 				dispatch(setRemainingTime(remainingTime - 1));
// 			}
// 		}, 1000);

// 		return () => clearInterval(timer);
// 	}, [isPlaying, remainingTime, isResting]);

// 	// ▶️ Pause on back / focus
// 	useFocusEffect(
// 		React.useCallback(() => {
// 			if (!isRestingRef.current) {
// 				dispatch(pauseExercise());
// 			} else if (currentCategory !== detectedCategory) {
// 				dispatch(pauseExercise());
// 			} else {
// 				dispatch(startExercise());
// 			}
// 			return () => {
// 				dispatch(pauseExercise());
// 			};
// 		}, [])
// 	);

// 	// Store rest state ref
// 	useEffect(() => {
// 		isRestingRef.current = isResting;
// 	}, [isResting]);

// 	// Toggle play/pause
// 	const togglePlayPause = async () => {
// 		if (isPlaying) {
// 			await videoRef.current?.pauseAsync();
// 			dispatch(pauseExercise());
// 		} else {
// 			await videoRef.current?.playAsync();
// 			dispatch(startExercise());
// 		}
// 	};

// 	// Restart handler
// 	const handleRestart = () => {
// 		dispatch(pauseExercise());
// 		dispatch(setResting(false));
// 		Alert.alert(
// 			"Restart Warm-Up Exercises",
// 			"Restart Exercise will reset the exercises from the start, Do you wish to Restart?",
// 			[
// 				{ text: "Cancel", style: "cancel" },
// 				{
// 					text: "Restart",
// 					onPress: () => dispatch(resetWarmUp()),
// 					style: "destructive",
// 				},
// 			]
// 		);
// 	};

// 	return {
// 		videoRef,
// 		currentExerciseIndex,
// 		isPlaying,
// 		isResting,
// 		remainingTime,
// 		progress,
// 		currentExercise,
// 		nextExercise: nextExerciseData,
// 		intensitySettings,
// 		togglePlayPause,
// 		handleRestart,
// 		limitedExercises,
// 		intensityValue,
// 	};
// };
