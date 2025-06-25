import * as Speech from "expo-speech";
import { useEffect } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const isSmallPhone = SCREEN_WIDTH < 360;
const isMidPhone = SCREEN_WIDTH >= 360 && SCREEN_WIDTH < 768;
const isTablet = SCREEN_WIDTH >= 768;

// Dynamic responsivenes omayyyy
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

const RestScreen = ({ remainingTime, nextExercise, progress, isResting }) => {
	const getTintColor = () => {
		if (progress >= 0.7) return "#e74c3c";
		else if (progress >= 0.4) return "#f1c40f";
		else return "#2ecc71";
	};

	useEffect(() => {
		if (isResting) {
			Speech.stop();
		}
	}, [isResting]);

	useEffect(() => {
		if (nextExercise) {
			Speech.stop();
			Speech.speak(`Take a Rest: Next warm up: ${nextExercise.name}`, {
				rate: 0.75,
				onDone: () => console.log("Speech finished"),
				onStopped: () => console.log("Speech stopped"),
				onError: (err) => console.log("Speech error:", err),
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
						style={[
							styles.timerText,
							{
								fontSize: timerFontSize,
								marginLeft: isSmallPhone ? 10 : 25,
							},
						]}
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
