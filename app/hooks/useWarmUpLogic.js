import { useFocusEffect, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import exercises from '../constants/exercises';

export const useWarmUpLogic = () => {
    const { allExercises, intensityValue } = useSelector((state) => state.exercise);
	console.log(intensityValue);

    const limitedExercises = exercises.slice(0, 18).map((exercise) => {
        const updatedExercise = allExercises.find((ex) => ex.id === exercise.id);
        return {
            ...exercise,
            intensity: updatedExercise?.intensity || exercise.intensity,
        };
    });

    const router = useRouter();
    const videoRef = useRef(null);
    const isRestingRef = useRef(false);

    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isResting, setIsResting] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);

    const currentExercise = limitedExercises[currentExerciseIndex];
    const intensitySettings = currentExercise.intensity[intensityValue];

    const nextExercise =
        currentExerciseIndex < limitedExercises.length - 1 ? limitedExercises[currentExerciseIndex + 1] : null;

    useEffect(() => {
        const newDuration = isResting ? intensitySettings.restDuration.min : intensitySettings.duration.min;
        setRemainingTime(newDuration);
    }, [intensityValue, isResting, allExercises]);


    const totalDuration = isResting ? intensitySettings.restDuration.min : intensitySettings.duration.min;
    const progress = 1 - remainingTime / totalDuration;

    useEffect(() => {
        if (!isPlaying) return;

        const timer = setInterval(() => {
            setRemainingTime((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);

                    setTimeout(() => {
                        if (!isResting) {
                            setIsResting(true);
                        } else {
                            if (currentExerciseIndex < limitedExercises.length - 1) {
                                setCurrentExerciseIndex((prev) => prev + 1);
                                setIsResting(false);
                            } else {
                                Alert.alert('Workout Complete!', 'Great job! You can now Play Basketball!');
                                setIsPlaying(false);
                                router.replace('/(tabs)/');
                            }
                        }
                    }, 300);

                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isPlaying, isResting, intensityValue, allExercises]);


    const togglePlayPause = async () => {
        if (isPlaying) {
            await videoRef.current?.pauseAsync();
        } else {
            await videoRef.current?.playAsync();
        }
        setIsPlaying(!isPlaying);
    };

    const handleRestart = () => {
        setIsPlaying(false);
        setIsResting(false);
        setRemainingTime(intensitySettings.duration.min);
    };

    useFocusEffect(
        React.useCallback(() => {
            if (!isRestingRef.current) {
                setIsPlaying(false);
            } else {
                setIsPlaying(true);
            }

            return () => {
                setIsPlaying(false);
            };
        }, [])
    );

    useEffect(() => {
        isRestingRef.current = isResting;
    }, [isResting]);

    return {
        videoRef,
        currentExerciseIndex,
        isPlaying,
        isResting,
        remainingTime,
        progress,
        currentExercise,
        nextExercise,
        intensitySettings,
        togglePlayPause,
        handleRestart,
        limitedExercises,
		intensityValue
    };
};
