import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';
import exercises from '../../constants/exercises';

// New async action to reset to default values
import { Alert } from 'react-native';

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
     resetExercises,
} = exerciseSlice.actions;

// iniitialize nilagay ko yung dispatch sa index para di ko makalimutan lol. nandun parar mai 
export const initializeExerciseData = () => async (dispatch) => {
     try {
     // dito sa try ng savedintensity para kunin yung selectedIntensity tapos condition to check syempre kung meron bang seleectedintensity value kung wala iseset natin yon na beginner.
          let savedIntensity = await AsyncStorage.getItem('SelectedIntensity');
          if (!savedIntensity) {
               savedIntensity = 'beginner';
               await AsyncStorage.setItem('SelectedIntensity', savedIntensity);
          } else {
            dispatch(setIntensityValue(savedIntensity));
          }

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
               exercise.id === exerciseId ? { ...exercise, ...updatedFields } : exercise
          );

          await AsyncStorage.setItem('ExerciseDatabase', JSON.stringify(updatedExercises));
          dispatch(setAllExercises(updatedExercises));
     } catch (error) {
          console.error('Update Error:', error);
     }
};

export const resetToDefault = () => async (dispatch) => {
     Alert.alert(
          'Reset to Default',
          'Are you sure you want to reset all exercises to default values?',
          [
               {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => {},
               },
               {
                    text: 'Confirm',
                    style: 'destructive',
                    onPress: async () => {
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

                         } catch (error) {
                              console.error('Error resetting to default:', error);
                         }
                    },
               },
          ]
     );
};


export default exerciseSlice.reducer;
