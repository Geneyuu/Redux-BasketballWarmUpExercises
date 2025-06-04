import { useEffect, useMemo } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  resetToDefault,
  setDuration,
  setExerciseData,
  setExerciseOpen,
  setExerciseValue,
  setIntensityOpen,
  setIntensityValue,
  setRepetitions,
  setRestDuration,
  updateExerciseDataInStorageById,
} from "../../app/store/slices/exerciseSlice";
import exercises from '../constants/exercises';

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

  const originalExercise = useMemo(
    () => exercises.find((ex) => ex.id === exerciseValue),
    [exerciseValue]
  );

  const selectedExercise = useMemo(
    () => allExercises.find((ex) => ex.id === exerciseValue),
    [allExercises, exerciseValue]
  );

  const exerciseItems = useMemo(() => [
    { label: "Select an Exercise...", value: null },
    ...allExercises.map((exercise) => ({
      label: exercise.name,
      value: exercise.id,
    })),
  ], [allExercises]);

  const intensityItems = useMemo(() => [
    { label: "Beginner", value: "beginner" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Advanced", value: "advanced" },
  ], []);

  const originalIntensitySettings = useMemo(() => {
    return originalExercise?.intensity?.[intensityValue] || {};
  }, [originalExercise, intensityValue]);

  const currentIntensitySettings = useMemo(() => {
    return selectedExercise?.intensity?.[intensityValue] || {};
  }, [selectedExercise, intensityValue]);

  const recommendedRange = useMemo(() => ({
    duration: `${originalIntensitySettings?.duration?.min || 0} - ${
      originalIntensitySettings?.duration?.max || 0
    } seconds`,
    repetitions: `${originalIntensitySettings?.repetitions?.min || 0} - ${
      originalIntensitySettings?.repetitions?.max || 0
    } reps`,
    restDuration: `${originalIntensitySettings?.restDuration?.min || 0} - ${
      originalIntensitySettings?.restDuration?.max || 0
    } seconds`,
  }), [originalIntensitySettings]);

  const isInvalid = useMemo(() => ({
    duration: duration
      ? (parseInt(duration) < originalIntensitySettings?.duration?.min ||
         parseInt(duration) > originalIntensitySettings?.duration?.max)
      : false,
    repetitions: repetitions
      ? (parseInt(repetitions) < originalIntensitySettings?.repetitions?.min ||
         parseInt(repetitions) > originalIntensitySettings?.repetitions?.max)
      : false,
    restDuration: restDuration
      ? (parseInt(restDuration) < originalIntensitySettings?.restDuration?.min ||
         parseInt(restDuration) > originalIntensitySettings?.restDuration?.max)
      : false,
  }), [duration, repetitions, restDuration, originalIntensitySettings]);

  const intensityBgColor = useMemo(() => 
    INTENSITY_BG_COLOR[intensityValue] || "white",
    [intensityValue]
  );

  useEffect(() => {
    if (selectedExercise && intensityValue) {
      dispatch(
        setExerciseData({
          duration: currentIntensitySettings?.duration?.min?.toString() || "",
          repetitions: currentIntensitySettings?.repetitions?.min?.toString() || "",
          restDuration: currentIntensitySettings?.restDuration?.min?.toString() || "",
        })
      );
    } else {
      dispatch(
        setExerciseData({
          duration: "",
          repetitions: "",
          restDuration: "",
        })
      );
    }
  }, [selectedExercise, currentIntensitySettings, intensityValue, dispatch]);

  const handleSave = (field, value) => {
    if (!selectedExercise) return;

    const updatedFields = {
      intensity: {
        ...selectedExercise.intensity,
        [intensityValue]: {
          ...(selectedExercise.intensity?.[intensityValue] || {}),
          [field]: {
            ...selectedExercise.intensity?.[intensityValue]?.[field],
            min: parseInt(value) || 0,
          },
        },
      },
    };

    dispatch(updateExerciseDataInStorageById(exerciseValue, updatedFields));
  };

  // Confirmation alerts before saving
const handleSaveDurationWithConfirm = () => {
  Alert.alert(
    "Confirm Save",
    `Are you sure you want to save the\nduration: to ${duration} seconds?`,
    [
      { text: "Cancel", style: "cancel" },
      { text: "Okay", onPress: () => handleSave("duration", duration) },
    ]
  );
};

const handleSaveRepetitionsWithConfirm = () => {
  Alert.alert(
    "Confirm Save",
    `Are you sure you want to save the repetitions: ${repetitions} reps?`,
    [
      { text: "Cancel", style: "cancel" },
      { text: "Okay", onPress: () => handleSave("repetitions", repetitions) },
    ]
  );
};

const handleSaveRestDurationWithConfirm = () => {
  Alert.alert(
    "Confirm Save",
    `Are you sure you want to save the rest duration: ${restDuration} seconds?`,
    [
      { text: "Cancel", style: "cancel" },
      { text: "Okay", onPress: () => handleSave("restDuration", restDuration) },
    ]
  );
};

  const handleIntensityValueChange = (callback) => {
    const newValue = callback(intensityValue);

    if (newValue === 'intermediate') {
      Alert.alert(
        'Switching to Intermediate',
        'You\'re about to move to the Intermediate level.\n\nPlease make sure you already have a basic understanding of proper form and techniques. This level includes moderately challenging basketball warm-up exercises. Do you want to proceed?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Proceed',
            onPress: () => dispatch(setIntensityValue(newValue)),
          },
        ]
      );
    } else if (newValue === 'advanced') {
      Alert.alert(
        'Switching to Advanced',
        'You\'re about to switch to the Advanced level.\n\nThis level is for users who already feel confident and familiar with basketball warm-up Exercises. Exercises here are more intense and require good control and understanding of movements. If you\'re comfortable with that, you\'re good to go!',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Yes, I\'m Ready!',
            onPress: () => dispatch(setIntensityValue(newValue)),
          },
        ]
      );
    } else {
      dispatch(setIntensityValue(newValue));
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
    
    handleExerciseOpen: (open) => dispatch(setExerciseOpen(open)),
    handleExerciseValue: (callback) => dispatch(setExerciseValue(callback(exerciseValue))),
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
