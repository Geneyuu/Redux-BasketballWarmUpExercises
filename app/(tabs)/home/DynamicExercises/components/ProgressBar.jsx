import * as Speech from "expo-speech";
import { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import useSounds from "../../../../hooks/useSounds";

const ProgressBar = ({ progress, remainingTime, isPlaying, isResting }) => {
	const lastSpoken = useRef(null); // To track countdown numbers
	const hasSpokenTimesUp = useRef(false); // To avoid repeat "Time's up!"
	const { tickSound, soundsLoaded } = useSounds();

	//  Tick Sound (play looped tick when playing)
	useEffect(() => {
		if (!soundsLoaded || !tickSound) return;

		if (isPlaying) {
			tickSound.setIsLoopingAsync(true);
			tickSound.playAsync();
		}

		return () => {
			if (tickSound) {
				tickSound.stopAsync();
			}
		};
	}, [isPlaying, isResting, tickSound, soundsLoaded]);

	// Countdown Speech
	useEffect(() => {
		if (
			isPlaying &&
			remainingTime <= 10 &&
			remainingTime >= 1 &&
			lastSpoken.current !== remainingTime
		) {
			Speech.speak(remainingTime.toString(), { rate: 1.2 });
			lastSpoken.current = remainingTime;
		}

		if (!isPlaying || remainingTime > 10) {
			lastSpoken.current = null;
		}
	}, [remainingTime, isPlaying]);

	// 🗣️ Time's Up Speech
	useEffect(() => {
		const interval = setInterval(async () => {
			if (isPlaying && remainingTime === 0 && !hasSpokenTimesUp.current) {
				if (tickSound) {
					await tickSound.stopAsync();
				}

				Speech.speak("Time's up!", {
					rate: 1,
					queue: true,
				});
				hasSpokenTimesUp.current = true;
			}

			if (remainingTime > 0) {
				hasSpokenTimesUp.current = false;
			}
		}, 400);

		return () => clearInterval(interval);
	}, [remainingTime, isPlaying, tickSound]);

	// Tint color logic
	const getTintColor = () => {
		if (progress >= 0.7) return "#e74c3c";
		else if (progress >= 0.4) return "#fad542";
		else return "#2ecc71";
	};

	return (
		<View style={styles.progressbarContainer}>
			<Progress.Bar
				progress={progress}
				width={null}
				height={hp("5%")}
				color={getTintColor()}
				unfilledColor="#ECF0F1"
				borderRadius={0}
			/>
			<View style={styles.timerOverlay}>
				<Text style={styles.timerText}>
					{remainingTime}
					<Text style={styles.timerTextSecs}> secs</Text>
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	progressbarContainer: {
		position: "relative",
		justifyContent: "center",
		paddingHorizontal: 0,
	},
	timerOverlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
	},
	timerText: {
		fontFamily: "Roboto-ExtraBold",
		fontSize: hp("3%"),
		color: "rgba(0,0,0,0.7)",
	},
	timerTextSecs: {
		fontFamily: "Karla-ExtraBold",
		fontSize: hp("1.5%"),
		color: "rgba(0,0,0,0.7)",
	},
});

export default ProgressBar;
