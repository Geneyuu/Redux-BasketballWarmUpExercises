import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useWarmUpLogic } from "./../../../hooks/useWarmUpLogic";
import Controls from "./components/Controls";
import ExerciseInfo from "./components/ExerciseInfo";
import ProgressBar from "./components/ProgressBar";
import RestScreen from "./components/RestScreen";
import VideoPlayer from "./components/VideoPlayer";

const StartWarmUps = () => {
	const {
		videoRef,
		currentExerciseIndex,
		isPlaying,
		isResting,
		remainingTime,
		progress,
		currentExercise,
		intensitySettings,
		intensityValue,
		togglePlayPause,
		handleRestart,
		nextExercise,
		limitedExercises,
	} = useWarmUpLogic();

	const [isSpeaking, setIsSpeaking] = useState(false);

	return (
		<View style={styles.container}>
			{isResting ? (
				<RestScreen
					remainingTime={remainingTime}
					nextExercise={nextExercise}
					progress={progress}
					isResting={isResting}
					isPlaying={isPlaying}
				/>
			) : (
				<>
					<VideoPlayer
						videoRef={videoRef}
						videoSource={currentExercise.video}
						isPlaying={isPlaying}
					/>

					<ExerciseInfo
						currentExercise={currentExercise}
						currentExerciseIndex={currentExerciseIndex}
						allExercises={limitedExercises}
						intensitySettings={intensitySettings}
						intensityValue={intensityValue}
						isResting={isResting}
						isSpeaking={isSpeaking}
						setIsSpeaking={setIsSpeaking}
					/>

					<Controls
						isPlaying={isPlaying}
						togglePlayPause={togglePlayPause}
						handleRestart={handleRestart}
						currentExercise={currentExercise}
						setIsSpeaking={setIsSpeaking}
					/>

					<ProgressBar
						progress={progress}
						remainingTime={remainingTime}
						isPlaying={isPlaying}
						isResting={isResting}
					/>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
});

export default StartWarmUps;

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Video } from "expo-av";
// import { useLocalSearchParams } from "expo-router";
// import { useEffect, useState } from "react";
// import { ScrollView, StyleSheet, Text, View } from "react-native";
// import { useSelector } from "react-redux";

// const ExerciseScreen = () => {
// 	const { exercises } = useLocalSearchParams();
// 	const [loading, setLoading] = useState(true);
// 	const [filteredExercises, setFilteredExercises] = useState([]);

// 	const intensityValue = useSelector(
// 		(state) => state.exercise.intensityValue
// 	);

// 	// Selected category order from router params
// 	const selectedCategories = JSON.parse(exercises || "[]").map(
// 		(item) => item.key
// 	);

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const storedData = await AsyncStorage.getItem("exercises");
// 				if (!storedData) {
// 					alert("No exercise data found in AsyncStorage.");
// 					return;
// 				}

// 				const allExercises = JSON.parse(storedData);

// 				// Filter and order exercises based on selected categories
// 				const sortedFiltered = selectedCategories.flatMap((cat) =>
// 					allExercises.filter((ex) => ex.category === cat)
// 				);

// 				setFilteredExercises(sortedFiltered);
// 			} catch (error) {
// 				console.error("Error loading exercises:", error);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		fetchData();
// 	}, []);

// 	if (loading) {
// 		return (
// 			<View style={styles.container}>
// 				<Text>Loading...</Text>
// 			</View>
// 		);
// 	}

// 	return (
// 		<ScrollView contentContainerStyle={styles.container}>
// 			{filteredExercises.map((exercise) => (
// 				<View key={exercise.id} style={styles.exerciseCard}>
// 					<Text style={styles.title}>{exercise.name}</Text>

// 					<Video
// 						source={exercise.video}
// 						rate={1.0}
// 						volume={1.0}
// 						isMuted={false}
// 						resizeMode="contain"
// 						shouldPlay={true}
// 						useNativeControls
// 						style={styles.video}
// 					/>

// 					<Text style={styles.description}>
// 						{exercise.description}
// 					</Text>

// 					<Text style={styles.intensityLabel}>
// 						Recommended for {intensityValue}:
// 					</Text>
// 					<Text style={styles.intensityText}>
// 						Reps:{" "}
// 						{exercise.intensity[intensityValue]
// 							?.recommendedRepetition || "N/A"}
// 					</Text>
// 					<Text style={styles.intensityText}>
// 						Duration:{" "}
// 						{exercise.intensity[intensityValue]
// 							?.recommendedDuration || "N/A"}
// 					</Text>
// 				</View>
// 			))}
// 		</ScrollView>
// 	);
// };

// export default ExerciseScreen;

// const styles = StyleSheet.create({
// 	container: {
// 		padding: 20,
// 		backgroundColor: "#f2f2f2",
// 	},
// 	exerciseCard: {
// 		marginBottom: 30,
// 		padding: 15,
// 		backgroundColor: "#fff",
// 		borderRadius: 10,
// 		elevation: 2,
// 	},
// 	title: {
// 		fontSize: 20,
// 		fontWeight: "bold",
// 		marginBottom: 10,
// 	},
// 	video: {
// 		width: "100%",
// 		height: 200,
// 		backgroundColor: "#000",
// 		borderRadius: 10,
// 		marginBottom: 10,
// 	},
// 	description: {
// 		fontSize: 14,
// 		marginBottom: 8,
// 	},
// 	intensityLabel: {
// 		fontWeight: "bold",
// 		marginTop: 10,
// 	},
// 	intensityText: {
// 		fontSize: 13,
// 	},
// });
