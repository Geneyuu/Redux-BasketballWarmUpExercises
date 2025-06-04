// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { loadNameFromStorage } from "../../utils/loadNameFromStorage";

// export const fetchName = createAsyncThunk("profile/fetchName", async () => {
// 	const name = await loadNameFromStorage();
// 	return name || "";
// });

// const profileSlice = createSlice({
// 	name: "profile",
// 	initialState: {
// 		name: "",
// 	},
// 	reducers: {
// 		updateName: (state, action) => {
// 			state.name = action.payload;
// 		},
// 	},
// 	extraReducers: (builder) => {
//     builder
//     .addCase(fetchName.pending, (state) => {
//       console.log("fetchName pending...");
//       state.loading = true;
//       state.error = null;
//     })
//     .addCase(fetchName.fulfilled, (state, action) => {
//       console.log("fetchName fulfilled! Payload:", action.payload);
//       state.loading = false;
//       state.name = action.payload;
//     })
//     .addCase(fetchName.rejected, (state, action) => {
//       console.log("fetchName rejected! Error:", action.error.message);
//       state.loading = false;
//       state.error = action.error.message;
//     });
// }


// });

// export const { updateName } = profileSlice.actions;
// export default profileSlice.reducer;


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
