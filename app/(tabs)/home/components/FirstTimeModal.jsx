import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch } from "react-redux";
import { setIntensityValue } from "../../../store/slices/exerciseSlice";

const FirstTimeModal = () => {
	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);
	const [difficulty, setDifficulty] = useState("beginner");
	const [showModal, setShowModal] = useState(false);

	const difficultyItems = [
		{ label: "Beginner", value: "beginner" },
		{ label: "Intermediate", value: "intermediate" },
		{ label: "Advanced", value: "advanced" },
	];

	useEffect(() => {
		const checkFirstTime = async () => {
			try {
				const firstTime = await AsyncStorage.getItem("firstTime");

				if (firstTime === null || firstTime === "true") {
					setShowModal(true);
				}
			} catch (error) {
				console.error("Error checking first time:", error);
			}
		};

		checkFirstTime();
	}, []);

	if (!showModal) return null;

	const handleSaveDifficulty = async () => {
		try {
			await AsyncStorage.setItem("firstTime", "false");
			await AsyncStorage.setItem("SelectedIntensity", difficulty);
			dispatch(setIntensityValue(difficulty));
			setShowModal(false);
		} catch (error) {
			console.error("Error saving preference:", error);
		}
	};

	return (
		<>
			<StatusBar
				barStyle="dark-content"
				backgroundColor="rgba(0, 0, 0, 0.5)"
			/>
			<View style={styles.overlay}>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>Let's Get Started</Text>
						<Text style={styles.modalText}>
							Please select your preference for performing the
							Basketball Warm-Up Exercise:
						</Text>

						<View style={styles.dropdownWrapper}>
							<DropDownPicker
								open={open}
								setOpen={setOpen}
								value={difficulty}
								setValue={setDifficulty}
								items={difficultyItems}
								listMode="SCROLLVIEW"
								style={styles.dropdown}
								dropDownContainerStyle={
									styles.dropdownContainerStyle
								}
								zIndex={5000}
								zIndexInverse={6000}
							/>
						</View>

						<TouchableOpacity
							style={styles.saveButton}
							onPress={handleSaveDifficulty}
						>
							<Text style={styles.saveButtonText}>
								Save Preference
							</Text>
						</TouchableOpacity>

						<Text style={styles.noteText}>
							Note: You can later change the Warmup Intensity
							Level anytime in the settings.
						</Text>
					</View>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 999,
	},
	modalContainer: {
		width: "80%",
		borderRadius: 10,
		overflow: "hidden",
		backgroundColor: "white",
		padding: 20,
		elevation: 10,
		zIndex: 1000,
	},
	modalContent: {
		alignItems: "center",
	},
	modalTitle: {
		fontSize: 22,
		marginBottom: 10,
		textAlign: "center",
		fontFamily: "Roboto-ExtraBold",
	},
	modalText: {
		fontSize: 14,
		marginBottom: 20,
		textAlign: "center",
		fontFamily: "Roboto-Regular",
	},
	dropdownWrapper: {
		width: "100%",
		marginBottom: 20,
		zIndex: 2000,
	},
	dropdown: {
		borderWidth: 2,
		borderColor: "#888",
	},
	dropdownContainerStyle: {
		borderWidth: 2,
		borderColor: "#888",
		marginTop: 2,
	},
	saveButton: {
		backgroundColor: "black",
		paddingVertical: 12,
		paddingHorizontal: 10,
		borderRadius: 5,
		width: "60%",
		alignItems: "center",
	},
	saveButtonText: {
		color: "white",
		fontFamily: "Roboto-Regular",
	},
	noteText: {
		fontSize: 12,
		textAlign: "center",
		marginTop: 15,
		width: "75%",
		fontFamily: "Roboto-Regular",
	},
});

export default FirstTimeModal;
