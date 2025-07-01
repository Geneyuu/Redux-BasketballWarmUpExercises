import { Ionicons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import { useEffect } from "react";
import {
	AppState,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const Controls = ({
	isPlaying,
	togglePlayPause,
	handleRestart,
	currentExercise,
	setIsSpeaking,
}) => {
	// Auto pause on background
	useEffect(() => {
		const subscription = AppState.addEventListener(
			"change",
			(nextAppState) => {
				if (
					nextAppState === "background" ||
					nextAppState === "inactive"
				) {
					Speech.stop();
					setIsSpeaking(false);
					if (isPlaying) togglePlayPause();
				}
			}
		);

		return () => subscription.remove();
	}, [isPlaying, togglePlayPause, setIsSpeaking]);

	useEffect(() => {
		if (isPlaying) {
			setIsSpeaking(true);

			Speech.speak(currentExercise.description, {
				rate: 1.2,
				onDone: () => setIsSpeaking(false),
				onStopped: () => setIsSpeaking(false),
				onError: () => setIsSpeaking(false),
			});
		} else {
			Speech.stop();
			setIsSpeaking(false);
		}

		return () => {
			Speech.stop();
			setIsSpeaking(false);
		};
	}, [isPlaying, currentExercise.description, setIsSpeaking]);

	return (
		<View style={styles.buttonContainer}>
			<TouchableOpacity
				onPress={togglePlayPause}
				style={[styles.button, isPlaying && styles.pauseButton]}
			>
				<View style={styles.iconButtonContent}>
					<Ionicons
						name={
							isPlaying
								? "pause-circle-sharp"
								: "play-circle-sharp"
						}
						size={25}
						color="white"
						style={{ marginRight: 15 }}
					/>
					<Text style={styles.buttonText}>
						{isPlaying ? "Pause Exercise" : "Start Exercise"}
					</Text>
				</View>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.buttonRestart}
				onPress={handleRestart}
			>
				<View style={styles.iconButtonContent}>
					<Ionicons
						name="refresh-outline"
						size={25}
						color="black"
						style={{ marginRight: 5 }}
					/>
					<Text style={styles.buttonTextRestart}>
						Restart Exercise
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: wp("3%"),
		paddingHorizontal: wp("5%"),
		marginBottom: hp("0.8%"),
		width: "100%",
	},
	button: {
		flex: 1,
		minWidth: wp("40%"),
		maxWidth: wp("45%"),
		backgroundColor: "#1A2A3A",
		borderRadius: 12,
		paddingVertical: hp("1.8%"),
		justifyContent: "center",
		alignItems: "center",
		elevation: 3,
		shadowColor: "#2980B9",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
	},
	buttonText: {
		fontFamily: "Karla-SemiBold",
		color: "white",
		fontSize: hp("1.5%"),
		textAlign: "center",
	},
	pauseButton: {
		backgroundColor: "#E74C3C",
	},
	buttonRestart: {
		flex: 1,
		minWidth: wp("40%"),
		maxWidth: wp("45%"),
		borderWidth: 1,
		borderColor: "#BDC3C7",
		backgroundColor: "white",
		borderRadius: 12,
		paddingVertical: hp("1.8%"),
		justifyContent: "center",
		alignItems: "center",
		elevation: 1,
		shadowColor: "#ECF0F1",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
	},
	buttonTextRestart: {
		fontFamily: "Karla-SemiBold",
		color: "black",
		fontSize: hp("1.5%"),
		textAlign: "center",
	},
	iconButtonContent: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default Controls;
