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
