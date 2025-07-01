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
			dispatch(resetWarmUp());
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
							const finishWorkout = async () => {
								try {
									await AsyncStorage.setItem(
										"lastCategory",
										""
									);
								} catch (error) {
									console.error(
										"Error saving lastCategory:",
										error
									);
								}
								Alert.alert(
									"Workout Complete!",
									"Great job! You can now Play Basketball!"
								);
								dispatch(pauseExercise());
								dispatch(resetWarmUp());
								router.replace("/(tabs)/");
							};

							finishWorkout();
						}
					}
				}, 1000);
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
