import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { updateName } from "../slices/profileSlice";

// Load name from AsyncStorage
export const loadNameFromStorage = async () => {
	try {
		const stored = await AsyncStorage.getItem("name");
		return stored !== null ? stored : null;
	} catch (error) {
		console.error("Failed to load name:", error);
		return null;
	}
};

// Save name to AsyncStorage
export const saveNameToStorage = async (name) => {
	try {
		await AsyncStorage.setItem("name", name);
	} catch (error) {
		console.error("Failed to save name:", error);
	}
};

// Fetch and dispatch name from storage
export const fetchName = () => async (dispatch) => {
	const storedName = await loadNameFromStorage();

	if (storedName) {
		dispatch(updateName(storedName));
	} else {
		dispatch(updateName("Set Name!"));
	}
};

export const saveName = (nameToSave, onSuccess) => async (dispatch) => {
	if (nameToSave.length > 10) {
		Alert.alert("Error", "Maximum of 10 characters allowed.");
		return;
	}

	dispatch(updateName(nameToSave));
	await saveNameToStorage(nameToSave);

	if (onSuccess) onSuccess();
};
