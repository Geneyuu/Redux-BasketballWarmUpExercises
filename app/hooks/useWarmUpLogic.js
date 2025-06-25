/* eslint-disable react-hooks/exhaustive-deps */
import { useFocusEffect, usePathname, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { exercises } from "../constants/exercises";
import {
	nextExercise,
	pauseExercise,
	resetWarmUp,
	setRemainingTime,
	setResting,
	startExercise,
} from "../store/slices/warmUpSlice";

export const useWarmUpLogic = () => {
	const { allExercises, intensityValue } = useSelector(
		(state) => state.exercise
	);
	const { isPlaying, isResting, currentExerciseIndex, remainingTime } =
		useSelector((state) => state.warmUp);

	const dispatch = useDispatch();
	const router = useRouter();
	const pathname = usePathname();
	const videoRef = useRef(null);
	const isRestingRef = useRef(null);

	// Determine exercise slice based on route
	let sliceStart = 0;
	let sliceEnd = 0;

	switch (true) {
		case pathname.includes("LowerBody"):
			sliceStart = 5;
			sliceEnd = 10;
			break;
		case pathname.includes("UpperBody"):
			sliceStart = 10;
			sliceEnd = 15;
			break;
		case pathname.includes("WholeBody"):
			sliceStart = 0;
			sliceEnd = 18;
			break;
		case pathname.includes("DynamicExercises"):
			sliceStart = 15;
			sliceEnd = 18;
			break;
		default:
			sliceStart = 0;
			sliceEnd = 18;
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

	// console.log(limitedExercises);

	const currentExercise = limitedExercises[currentExerciseIndex];

	const nextExerciseData =
		currentExerciseIndex < limitedExercises.length - 1
			? limitedExercises[currentExerciseIndex + 1]
			: null;

	const intensitySettings =
		currentExercise?.intensity?.[intensityValue] || {};

	const totalDuration = isResting
		? intensitySettings.restDuration?.min
		: intensitySettings.duration?.min;

	const progress = 1 - remainingTime / (totalDuration || 1);

	useEffect(() => {
		if (totalDuration) {
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
		dispatch(setRemainingTime(intensitySettings.duration?.min || 0));
	};

	useFocusEffect(
		React.useCallback(() => {
			if (!isRestingRef.current) {
				dispatch(pauseExercise());
			} else {
				dispatch(startExercise());
			}
			return () => {
				dispatch(pauseExercise());
				// dispatch(resetPlayingResting());
			};
		}, [])
	);

	useEffect(() => {
		isRestingRef.current = isResting;
	}, [isResting]);

	useEffect(() => {
		return () => {
			dispatch(resetWarmUp());
		};
	}, []);

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
