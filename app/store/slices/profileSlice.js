import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

// Function to load name from AsyncStorage
export const loadNameFromStorage = async () => {
  const stored = await AsyncStorage.getItem("name");
  return stored !== null ? stored : null;
};

// Function to save name to AsyncStorage
export const saveNameToStorage = async (name) => {
  try {
    await AsyncStorage.setItem("name", name);
  } catch (err) {
    console.error("Failed to save name to storage", err);
  }
};

const initialState = {
  name: "Gene", 
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateName: (state, action) => {
      state.name = action.payload;
    },
  },
});

// Manual thunk to fetch name from storage or fallback to "Gene"
export function fetchName() {
  return async function (dispatch) {
    const storedName = await loadNameFromStorage();

    if (storedName) {
      dispatch(updateName(storedName));
    } else {
      dispatch(updateName("Gene"));
    }
  };
}

export const { updateName } = profileSlice.actions;
export default profileSlice.reducer;

