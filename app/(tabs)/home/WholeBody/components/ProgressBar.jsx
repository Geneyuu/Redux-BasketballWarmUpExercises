// import * as Speech from "expo-speech";
// import { useEffect, useRef } from "react";
// import { StyleSheet, Text, View } from "react-native";
// import * as Progress from "react-native-progress";
// import { heightPercentageToDP as hp } from "react-native-responsive-screen";
// import useSounds from "../../../../hooks/useSounds";

// const ProgressBar = ({ progress, remainingTime, isPlaying, isResting }) => {
// 	const lastSpoken = useRef(null);
// 	const hasSpokenTimesUp = useRef(false);
// 	const { tickSound, soundsLoaded } = useSounds();

// 	//  Tick Sound
// 	useEffect(() => {
// 		if (!soundsLoaded || !tickSound) return;

// 		if (isPlaying) {
// 			tickSound.setIsLoopingAsync(true);
// 			tickSound.playAsync();
// 		}

// 		return () => {
// 			if (tickSound) {
// 				tickSound.stopAsync();
// 			}
// 		};
// 	}, [isPlaying, isResting, tickSound, soundsLoaded]);

// 	//  Countdown Speech (10s to 1s)
// 	useEffect(() => {
// 		const speakCountdown = async () => {
// 			const isSpeaking = await Speech.isSpeakingAsync();

// 			if (
// 				isPlaying &&
// 				remainingTime <= 10 &&
// 				remainingTime >= 1 &&
// 				lastSpoken.current !== remainingTime &&
// 				!isSpeaking
// 			) {
// 				Speech.speak(remainingTime.toString(), { rate: 1.2 });
// 				lastSpoken.current = remainingTime;
// 			}

// 			if (!isPlaying || remainingTime > 10) {
// 				lastSpoken.current = null;
// 			}
// 		};

// 		speakCountdown();
// 	}, [remainingTime, isPlaying]);

// 	//  Time's Up Speech
// 	useEffect(() => {
// 		const interval = setInterval(async () => {
// 			if (isPlaying && remainingTime === 0 && !hasSpokenTimesUp.current) {
// 				if (tickSound) {
// 					await tickSound.stopAsync();
// 				}

// 				Speech.speak("Time's up!", {
// 					rate: 1,
// 					queue: true,
// 				});
// 				hasSpokenTimesUp.current = true;
// 			}

// 			if (remainingTime > 0) {
// 				hasSpokenTimesUp.current = false;
// 			}
// 		}, 400);

// 		return () => clearInterval(interval);
// 	}, [remainingTime, isPlaying, tickSound]);

// 	// 🎨 Tint Color based on progress
// 	const getTintColor = () => {
// 		if (progress >= 0.7) return "#e74c3c";
// 		else if (progress >= 0.4) return "#fad542";
// 		else return "#2ecc71";
// 	};

// 	return (
// 		<View style={styles.progressbarContainer}>
// 			<Progress.Bar
// 				progress={progress}
// 				width={null}
// 				height={hp("6.5%")}
// 				color={getTintColor()}
// 				unfilledColor="#ECF0F1"
// 				borderRadius={0}
// 			/>
// 			<View style={styles.timerOverlay}>
// 				<Text style={styles.timerText}>
// 					{remainingTime}
// 					<Text style={styles.timerTextSecs}> secs</Text>
// 				</Text>
// 			</View>
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	progressbarContainer: {
// 		position: "relative",
// 		justifyContent: "center",
// 		paddingHorizontal: 0,
// 	},
// 	timerOverlay: {
// 		position: "absolute",
// 		top: 0,
// 		left: 0,
// 		right: 0,
// 		bottom: 0,
// 		justifyContent: "center",
// 		alignItems: "center",
// 	},
// 	timerText: {
// 		fontFamily: "Roboto-ExtraBold",
// 		fontSize: hp("3%"),
// 		color: "rgba(0,0,0,0.7)",
// 	},
// 	timerTextSecs: {
// 		fontFamily: "Karla-ExtraBold",
// 		fontSize: hp("1.5%"),
// 		color: "rgba(0,0,0,0.7)",
// 	},
// });

// export default ProgressBar;

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Video } from "expo-av";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
	Dimensions,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import * as Progress from "react-native-progress";
import { useSelector } from "react-redux";

const windowHeight = Dimensions.get("window").height;
const progressBarHeight = windowHeight * 0.065;

// HeaderSection Component
const HeaderSection = ({
	intensityValue,
	exerciseName,
	currentIndex,
	total,
}) => (
	<View style={styles.headerContainerFlex}>
		<View style={{ flex: 1 }}>
			<Text style={styles.intensityText}>
				WarmUp Intensity:{" "}
				<Text style={styles.intensityValueText}>{intensityValue}</Text>
			</Text>
			<View style={styles.nameRow}>
				<Text style={styles.descriptionTitle}>{exerciseName}</Text>
			</View>
		</View>
		<Text style={styles.exerciseCount}>
			Exercise: {currentIndex + 1} of {total}
		</Text>
	</View>
);

// ExerciseDetails Component
const ExerciseDetails = ({ description, intensitySettings }) => {
	const values = [
		{
			label: "Duration",
			value: `${intensitySettings.duration?.min || 0}s`,
		},
		{
			label: "Repetitions",
			value: `${intensitySettings.repetitions?.min || 0} reps`,
		},
		{
			label: "Rest",
			value: `${intensitySettings.restDuration?.min || 0}s`,
		},
	];

	return (
		<>
			<Text style={styles.descriptionContent}>{description}</Text>
			<View style={styles.valuesRow}>
				{values.map(({ label, value }) => (
					<View style={styles.valueItem} key={label}>
						<Text style={styles.valueLabel}>{label}</Text>
						<Text style={styles.valueText}>{value}</Text>
					</View>
				))}
			</View>
		</>
	);
};

// ControlsSection Component
const ControlsSection = ({ isPlaying, togglePlayPause, handleRestart }) => (
	<View style={styles.controlsContainer}>
		<TouchableOpacity
			onPress={togglePlayPause}
			style={[styles.controlButton, isPlaying && styles.pauseButton]}
		>
			<Ionicons
				name={isPlaying ? "pause-circle" : "play-circle"}
				size={22}
				color="#fff"
				style={{ marginRight: 10 }}
			/>
			<Text style={styles.buttonText}>
				{isPlaying ? "Pause Exercise" : "Start Exercise"}
			</Text>
		</TouchableOpacity>
		<TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
			<Ionicons
				name="refresh-outline"
				size={22}
				color="#000"
				style={{ marginRight: 5 }}
			/>
			<Text style={styles.restartText}>Restart</Text>
		</TouchableOpacity>
	</View>
);

const ExerciseScreen = () => {
	const { exercises } = useLocalSearchParams();
	const [loading, setLoading] = useState(true);
	const [filteredExercises, setFilteredExercises] = useState([]);
	const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [remainingTime, setRemainingTime] = useState(0);

	const videoRef = useRef(null);
	const timerRef = useRef(null);

	const intensityValue = useSelector((state) => state.exercise.intensiyValue);

	const selectedCategories = JSON.parse(exercises || "[]").map(
		(item) => item.key
	);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const storedData = await AsyncStorage.getItem("exercises");
				if (!storedData) {
					alert("No exercise data found in AsyncStorage.");
					return;
				}
				const allExercises = JSON.parse(storedData);
				const sortedFiltered = selectedCategories.flatMap((cat) =>
					allExercises.filter((ex) => ex.category === cat)
				);
				setFilteredExercises(sortedFiltered);
			} catch (error) {
				console.error("Error loading exercises:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const currentExercise = filteredExercises[currentExerciseIndex];
	const intensitySettings =
		currentExercise?.intensity?.[intensityValue] || {};

	useEffect(() => {
		setRemainingTime(intensitySettings.duration?.min || 0);
	}, [currentExerciseIndex, intensityValue, intensitySettings.duration]);

	useEffect(() => {
		if (isPlaying && remainingTime > 0) {
			timerRef.current = setInterval(() => {
				setRemainingTime((prev) => Math.max(prev - 1, 0));
			}, 1000);
		} else {
			if (timerRef.current) clearInterval(timerRef.current);
		}
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [isPlaying, remainingTime]);

	const togglePlayPause = async () => {
		if (!videoRef.current) return;
		if (isPlaying) {
			await videoRef.current.pauseAsync();
			setIsPlaying(false);
		} else {
			await videoRef.current.playAsync();
			setIsPlaying(true);
		}
	};

	const handleRestart = async () => {
		if (!videoRef.current) return;
		await videoRef.current.setPositionAsync(0);
		await videoRef.current.pauseAsync();
		setIsPlaying(false);
		setRemainingTime(intensitySettings.duration?.min || 0);
	};

	if (loading || !currentExercise) {
		return (
			<View style={styles.container}>
				<Text style={{ textAlign: "center", marginTop: 50 }}>
					Loading...
				</Text>
			</View>
		);
	}

	const progress = intensitySettings.duration?.min
		? 1 - remainingTime / intensitySettings.duration.min
		: 0;

	const getTintColor = () => {
		if (progress >= 0.7) return "#e74c3c";
		else if (progress >= 0.4) return "#fad542";
		else return "#2ecc71";
	};

	return (
		<View style={styles.container}>
			<ScrollView style={{ flex: 1 }}>
				<Video
					ref={videoRef}
					source={currentExercise.video || null}
					rate={1.0}
					volume={1.0}
					isMuted={false}
					resizeMode="cover"
					shouldPlay={false}
					useNativeControls={false}
					style={styles.video}
				/>

				<View style={styles.descriptionContainer}>
					<HeaderSection
						intensityValue={intensityValue}
						exerciseName={currentExercise.name}
						currentIndex={currentExerciseIndex}
						total={filteredExercises.length}
					/>

					<ExerciseDetails
						description={currentExercise.description}
						intensitySettings={intensitySettings}
					/>
				</View>

				<ControlsSection
					isPlaying={isPlaying}
					togglePlayPause={togglePlayPause}
					handleRestart={handleRestart}
				/>
			</ScrollView>

			{/* Fixed progress bar */}
			<View style={styles.fixedProgressBarWrapper}>
				<Progress.Bar
					progress={progress}
					width={null}
					height={progressBarHeight}
					color={getTintColor()}
					unfilledColor="#ECF0F1"
					borderRadius={0}
				/>
				<Text style={styles.progressText}>{remainingTime} secs</Text>
			</View>
		</View>
	);
};

export default ExerciseScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f2f2f2",
	},
	video: {
		width: "100%",
		height: 450,
		backgroundColor: "#000",
	},
	descriptionContainer: {
		padding: 20,
		backgroundColor: "white",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		marginTop: -40,
	},
	headerContainerFlex: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		marginBottom: 10,
		flexWrap: "nowrap",
		flex: 1,
	},
	descriptionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#2C3E50",
	},
	descriptionContent: {
		fontSize: 14,
		lineHeight: 20,
		color: "#34495E",
		marginBottom: 10,
	},
	exerciseCount: {
		fontSize: 14,
		color: "#5B8C5A",
		marginTop: 20,
		fontWeight: "bold",
	},
	intensityText: {
		fontSize: 14,
		color: "#5B8C5A",
		marginTop: 20,
		marginBottom: 5,
		fontWeight: "bold",
	},
	intensityValueText: {
		color: "#E74C3C",
	},
	nameRow: {
		flexDirection: "row",
		alignItems: "center",
		flexShrink: 1,
	},
	valuesRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignSelf: "center",
		width: "100%",
		paddingVertical: 10,
		borderWidth: 1.5,
		borderColor: "black",
		backgroundColor: "white",
	},
	valueItem: {
		alignItems: "center",
		minWidth: 80,
	},
	valueLabel: {
		fontSize: 14,
		color: "#E74C3C",
		marginBottom: 5,
		fontWeight: "bold",
	},
	valueText: {
		fontSize: 16,
		color: "rgba(0,0,0,0.7)",
		fontWeight: "bold",
	},
	controlsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 15,
		backgroundColor: "#fff",
		marginBottom: 0,
	},
	controlButton: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#5B8C5A",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 8,
	},
	pauseButton: {
		backgroundColor: "#E74C3C",
	},
	buttonText: {
		color: "white",
		fontWeight: "bold",
	},
	restartButton: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#ddd",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 8,
	},
	restartText: {
		color: "#000",
		fontWeight: "bold",
	},
	fixedProgressBarWrapper: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "white",
		height: progressBarHeight,
		justifyContent: "center",
		paddingHorizontal: 10,
		borderTopWidth: 1,
		borderColor: "#f2f2f2",
	},
	progressText: {
		position: "absolute",
		alignSelf: "center",
		top: 0,
		bottom: 0,
		textAlignVertical: "center",
		textAlign: "center",
		fontWeight: "bold",
		color: "rgba(0,0,0,0.7)",
		fontSize: 16,
		lineHeight: progressBarHeight,
	},
});
