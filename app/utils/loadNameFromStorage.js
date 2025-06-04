// utils/loadNameFromStorage.js
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadNameFromStorage = async () => {
  try {
    const name = await AsyncStorage.getItem("name");
    return name || "";
  } catch (error) {
    console.error("Error loading name from AsyncStorage:", error);
    return "";
  }
};

export const saveNameToStorage = async (name) => {
  try {
    await AsyncStorage.setItem("name", name);
  } catch (error) {
    console.error("Error saving name to AsyncStorage:", error);
  }
};
