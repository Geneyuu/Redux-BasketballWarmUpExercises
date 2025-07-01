import * as Speech from "expo-speech";
import { useEffect, useRef } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import useSounds from "../../../../hooks/useSounds";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const isSmallPhone = SCREEN_WIDTH < 360;
const isMidPhone = SCREEN_WIDTH >= 360 && SCREEN_WIDTH < 768;
const isTablet = SCREEN_WIDTH >= 768;

let restFontSize,
	timerFontSize,
	timerSecFont,
	nextFontSize,
	nameFontSize,
	doneFontSize,
	imageSize;

if (isSmallPhone) {
	restFontSize = wp("8.5%");
	timerFontSize = wp("10.5%");
	timerSecFont = wp("2.5%");
	nextFontSize = wp("5.5%");
	nameFontSize = wp("5.5%");
	doneFontSize = wp("4.5%");
	imageSize = { width: wp("52%"), height: hp("18%") };
} else if (isMidPhone) {
	restFontSize = wp("9%");
	timerFontSize = wp("12%");
	timerSecFont = wp("3%");
	nextFontSize = wp("6%");
	nameFontSize = wp("6%");
	doneFontSize = wp("5%");
	imageSize = { width: wp("55%"), height: hp("20%") };
} else if (isTablet) {
	restFontSize = wp("7.5%");
	timerFontSize = wp("10%");
	timerSecFont = wp("2.8%");
	nextFontSize = wp("5.5%");
	nameFontSize = wp("5.5%");
	doneFontSize = wp("4.5%");
	imageSize = { width: wp("40%"), height: hp("16%") };
}

const RestScreen = ({
	remainingTime,
	nextExercise,
	progress,
	isResting,
	isPlaying,
}) => {
	const { tickSound, soundsLoaded } = useSounds();
	const lastSpoken = useRef(null); // To track countdown numbers
	const hasSpokenTimesUp = useRef(false); // To avoid repeat "Time's up!"

	// 🔊 Start/stop ticking sound based on state
	useEffect(() => {
		if (!tickSound || !soundsLoaded) return;

		const handleTickSound = async () => {
			const status = await tickSound.getStatusAsync();

			if (isResting && isPlaying && status.isLoaded) {
				await tickSound.setIsLoopingAsync(true);
				await tickSound.playAsync();
			} else if (status.isLoaded) {
				await tickSound.stopAsync();
			}
		};

		handleTickSound();

		return () => {
			tickSound.stopAsync();
		};
	}, [isResting, isPlaying, tickSound, soundsLoaded]);

	// ⏹ Stop ticking sound IMMEDIATELY when time runs out
	useEffect(() => {
		const handleTickAndSpeak = async () => {
			if (remainingTime === 0 && tickSound) {
				const status = await tickSound.getStatusAsync();
				if (status.isLoaded) {
					await tickSound.stopAsync();
				}

				// ✅ Speak "Time's up!" once
				if (!hasSpokenTimesUp.current) {
					Speech.speak("Time's up!", { rate: 1.2 });
					hasSpokenTimesUp.current = true;
				}
			}

			// Reset flag when time is > 0
			if (remainingTime > 0) {
				hasSpokenTimesUp.current = false;
			}
		};

		handleTickAndSpeak();
	}, [remainingTime, tickSound]);

	// 🔟 Countdown Speech
	// 🔟 Countdown Speech
	useEffect(() => {
		const speakCountdown = async () => {
			const isSpeaking = await Speech.isSpeakingAsync();

			if (
				isPlaying &&
				remainingTime <= 10 &&
				remainingTime >= 1 &&
				lastSpoken.current !== remainingTime &&
				!isSpeaking // 🛑 Huwag magsalita kung may ongoing speech
			) {
				Speech.speak(remainingTime.toString(), { rate: 1.2 });
				lastSpoken.current = remainingTime;
			}

			if (!isPlaying || remainingTime > 10) {
				lastSpoken.current = null;
			}
		};

		speakCountdown();
	}, [remainingTime, isPlaying]);

	// 🗣 What’s next announcement
	useEffect(() => {
		if (nextExercise) {
			Speech.stop();
			Speech.speak(`Take a Rest: Next warm up: ${nextExercise.name}`, {
				rate: 1.2,
			});
		} else {
			Speech.stop();
			Speech.speak(
				`All exercises completed! Please finish the rest timer before playing basketball.`
			);
		}

		return () => {
			Speech.stop();
		};
	}, []);

	// 🟢 Tint Color
	const getTintColor = () => {
		if (progress >= 0.7) return "#e74c3c";
		else if (progress >= 0.4) return "#f1c40f";
		else return "#2ecc71";
	};

	return (
		<View style={styles.container}>
			<Text style={[styles.restText, { fontSize: restFontSize }]}>
				REST
			</Text>

			<AnimatedCircularProgress
				size={wp(isTablet ? "55%" : isMidPhone ? "70%" : "60%")}
				width={isTablet ? 28 : isMidPhone ? 22 : 16}
				fill={progress * 100}
				tintColor={getTintColor()}
				backgroundColor="#ecf0f1"
				rotation={0}
				lineCap="butt"
				style={styles.circularProgress}
			>
				{() => (
					<Text
						style={[styles.timerText, { fontSize: timerFontSize }]}
					>
						{remainingTime}
						<Text
							style={[
								styles.timerSecs,
								{ fontSize: timerSecFont },
							]}
						>
							{" "}
							secs
						</Text>
					</Text>
				)}
			</AnimatedCircularProgress>

			{nextExercise ? (
				<>
					<Text style={[styles.nextText, { fontSize: nextFontSize }]}>
						Next Warm-up:
					</Text>
					<Image
						source={nextExercise.image}
						style={[
							styles.warmupImage,
							imageSize,
							isTablet && { borderRadius: 18 },
						]}
						resizeMode="contain"
					/>
					<Text
						style={[styles.warmupName, { fontSize: nameFontSize }]}
					>
						{nextExercise.name}
					</Text>
				</>
			) : (
				<Text style={[styles.done, { fontSize: doneFontSize }]}>
					All exercises completed!{"\n"}Please finish the rest timer
					before playing basketball.
				</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		paddingTop: hp("8%"),
	},
	restText: {
		fontFamily: "Karla-ExtraBold",
		color: "#34495E",
		marginBottom: hp("5%"),
	},
	circularProgress: {
		marginBottom: hp("5%"),
	},
	timerText: {
		fontFamily: "Roboto-ExtraBold",
		color: "#2C3E50",
		textAlign: "center",
		marginLeft: 25,
	},
	timerSecs: {
		color: "#7F8C8D",
	},
	nextText: {
		fontFamily: "Karla-ExtraBold",
		letterSpacing: -2,
		color: "#34495E",
		alignSelf: "flex-start",
		marginLeft: wp("10%"),
	},
	warmupImage: {
		marginTop: hp("2%"),
		borderRadius: 10,
	},
	warmupName: {
		fontFamily: "Karla-Regular",
		color: "#2C3E50",
		marginTop: hp("1%"),
	},
	done: {
		fontFamily: "Karla-ExtraBold",
		letterSpacing: -1.3,
		color: "#34495E",
		marginTop: hp("4%"),
		textAlign: "center",
		width: wp("80%"),
	},
});

export default RestScreen;
