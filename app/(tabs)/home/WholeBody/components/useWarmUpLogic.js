import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import exercises from '../../../../constants/exercises';
import {
    decrementRemainingTime,
    incrementExerciseIndex,
    setIsPlaying,
    setIsResting,
    setProgress,
    setRemainingTime,
} from '../components/useWarmUpLogic.js';

export const useWarmUpLogic = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const videoRef = useRef(null);
    const isRestingRef = useRef(false);

    // Get state from Redux
    const { allExercises, intensityValue } = useSelector((state) => state.exercise);
    const { currentExerciseIndex, isPlaying, isResting, remainingTime, progress } = useSelector(
        (state) => state.warmup
    );

    // Process exercises data
    const limitedExercises = exercises.slice(0, 18).map((exercise) => {
        const updatedExercise = allExercises.find((ex) => ex.id === exercise.id);
        return {
            ...exercise,
            intensity: updatedExercise?.intensity || exercise.intensity,
        };
    });

    const currentExercise = limitedExercises[currentExerciseIndex];
    const intensitySettings = currentExercise?.intensity?.[intensityValue] || {};
    const nextExercise =
        currentExerciseIndex < limitedExercises.length - 1 ? limitedExercises[currentExerciseIndex + 1] : null;

    // Initialize time when exercise changes
    useEffect(() => {
        if (!currentExercise || !intensitySettings) return;

        const totalTime = isResting ? intensitySettings.restDuration?.min : intensitySettings.duration?.min;
        if (totalTime != null) {
            dispatch(setRemainingTime(totalTime));
            dispatch(setProgress(0));
            
            // Reset video when exercise changes
            if (!isResting && videoRef.current) {
                videoRef.current.stopAsync();
                videoRef.current.playAsync();
            }
        }
    }, [currentExerciseIndex, isResting, intensityValue, allExercises]);

    // Timer effect
    useEffect(() => {
        if (!currentExercise || !intensitySettings) return;

        let interval;
        if (isPlaying && remainingTime > 0) {
            interval = setInterval(() => {
                dispatch(decrementRemainingTime());
                
                const totalTime = isResting ? intensitySettings.restDuration?.min : intensitySettings.duration?.min;
                if (totalTime) {
                    const newProgress = 1 - (remainingTime - 1) / totalTime;
                    dispatch(setProgress(newProgress));
                }
            }, 1000);
        } else if (remainingTime <= 0 && isPlaying) {
            // When time reaches 0, pause and switch to rest or next exercise
            dispatch(setIsPlaying(false));

            if (!isResting) {
                // Exercise finished, switch to rest
                dispatch(setIsResting(true));
                dispatch(setRemainingTime(intensitySettings.restDuration?.min || 0));
            } else {
                // Rest finished, switch to next exercise
                dispatch(setIsResting(false));
                
                if (currentExerciseIndex < limitedExercises.length - 1) {
                    dispatch(incrementExerciseIndex());
                    const nextExercise = limitedExercises[currentExerciseIndex + 1];
                    const nextDuration = nextExercise?.intensity?.[intensityValue]?.duration?.min || 0;
                    dispatch(setRemainingTime(nextDuration));
                } else {
                    Alert.alert('Workout Complete!', 'Great job! You can now Play Basketball!');
                    router.replace('/(tabs)/');
                }
            }
            dispatch(setProgress(0));
        }
        return () => clearInterval(interval);
    }, [isPlaying, remainingTime, isResting, intensityValue, currentExerciseIndex]);

    const togglePlayPause = async () => {
        if (isPlaying) {
            await videoRef.current?.pauseAsync();
        } else {
            await videoRef.current?.playAsync();
        }
        dispatch(setIsPlaying(!isPlaying));
    };

    const handleRestart = () => {
        const totalTime = isResting ? intensitySettings.restDuration?.min : intensitySettings.duration?.min;
        if (videoRef.current && !isResting) {
            videoRef.current.stopAsync().then(() => {
                videoRef.current.playAsync();
            });
        }
        dispatch(setRemainingTime(totalTime || 0));
        dispatch(setProgress(0));
        dispatch(setIsPlaying(true));
    };

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
        intensityValue,
    };
};