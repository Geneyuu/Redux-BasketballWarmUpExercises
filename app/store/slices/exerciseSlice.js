import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';
import exercises from '../../constants/exercises';

const initialState = {
  allExercises: [],
  exerciseOpen: false,
  exerciseValue: null,
  intensityOpen: false,
  intensityValue: null,
  exerciseData: {
    duration: '',
    repetitions: '',
    restDuration: '',
  },
};

const exerciseSlice = createSlice({
  name: 'exercise',
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
    // New reducer for resetting to default values
    resetExercises: (state) => {
      state.exerciseValue = null;
      // state.intensityValue = 'beginner';
      state.exerciseData = {
        duration: '',
        repetitions: '',
        restDuration: '',
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
  resetExercises, // Export the new action
} = exerciseSlice.actions;

// Initialize AsyncStorage with exercises constant if empty
export const initializeExerciseData = () => async (dispatch) => {
  try {
    let savedIntensity = await AsyncStorage.getItem('SelectedIntensity');
    if (!savedIntensity) {
      savedIntensity = 'beginner';
      await AsyncStorage.setItem('SelectedIntensity', savedIntensity);
    }
    dispatch(setIntensityValue(savedIntensity));

    const storedExercises = await AsyncStorage.getItem('ExerciseDatabase');
    
    let loadedExercises;
    if (!storedExercises) {
      loadedExercises = exercises.map(({ id, name, intensity, description }) => ({
        id,
        name,
        intensity,
        description,
      }));
      await AsyncStorage.setItem('ExerciseDatabase', JSON.stringify(loadedExercises));
      await AsyncStorage.setItem('ExerciseDatabase', JSON.stringify(loadedExercises));
    } else {
      loadedExercises = JSON.parse(storedExercises);
    }

    dispatch(setAllExercises(loadedExercises));
  } catch (error) {
    console.error('Initialization Error:', error);
  }
};

// Update exercise by id directly in AsyncStorage, then update Redux state
export const updateExerciseDataInStorageById = (exerciseId, updatedFields) => async (dispatch) => {
  try {
    const storedExercises = await AsyncStorage.getItem('ExerciseDatabase');
    if (!storedExercises) return;

    const exercisesArray = JSON.parse(storedExercises);

    const updatedExercises = exercisesArray.map((exercise) =>
      exercise.id === exerciseId
        ? { ...exercise, ...updatedFields }
        : exercise
    );

    await AsyncStorage.setItem('ExerciseDatabase', JSON.stringify(updatedExercises));
    dispatch(setAllExercises(updatedExercises));
  } catch (error) {
    console.error('Update Error:', error);
  }
};

// New async action to reset to default values
export const resetToDefault = () => async (dispatch) => {
  try {
    const defaultExercises = exercises.map(({ id, name, intensity, description }) => ({
      id,
      name,
      description,
      intensity: {
        beginner: {
          duration: intensity.beginner.duration,
          repetitions: intensity.beginner.repetitions,
          restDuration: intensity.beginner.restDuration,
        },
        intermediate: {
          duration: intensity.intermediate.duration,
          repetitions: intensity.intermediate.repetitions,
          restDuration: intensity.intermediate.restDuration,
        },
        advanced: {
          duration: intensity.advanced.duration,
          repetitions: intensity.advanced.repetitions,
          restDuration: intensity.advanced.restDuration,
        },
      },
    }));

    await AsyncStorage.setItem('ExerciseDatabase', JSON.stringify(defaultExercises));


    dispatch(setAllExercises(defaultExercises));
    dispatch(resetExercises());
    
    return true;
  } catch (error) {
    console.error('Error resetting to default:', error);
    return false;
  }
};

export default exerciseSlice.reducer;