import { Ionicons } from "@expo/vector-icons";
import { Video } from "expo-av";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import * as Speech from "expo-speech";
import React, { useRef, useState } from "react";
import {
	ActivityIndicator,
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
import { exercises } from "../../constants/exercises";

const ExerciseDetail = () => {
	const { id } = useLocalSearchParams();
	const exercise = exercises.find((exercise) => exercise.id === id);
	const { video, name, description } = exercise || {};

	const videoRef = useRef(null);
	const [isVideoReady, setIsVideoReady] = useState(false);
	const [isSpeaking, setIsSpeaking] = useState(false);

	const handleVideoLoad = () => setIsVideoReady(true);

	const handleSpeakToggle = () => {
		if (!isSpeaking) {
			setIsSpeaking(true);
			Speech.speak(description, {
				language: "en",
				rate: 0.9,
				pitch: 1,
				onDone: () => setIsSpeaking(false),
				onStopped: () => setIsSpeaking(false),
			});
		} else {
			Speech.stop();
			setIsSpeaking(false);
		}
	};

	useFocusEffect(
		React.useCallback(() => {
			if (videoRef.current && isVideoReady) {
				videoRef.current.playAsync();
			}

			const handleAppStateChange = (appStatus) => {
				if (appStatus === "active" && isVideoReady) {
					videoRef.current?.playAsync();
				} else {
					videoRef.current?.pauseAsync();
				}
			};

			const appStateListener = AppState.addEventListener(
				"change",
				handleAppStateChange
			);

			return () => {
				appStateListener.remove();
				videoRef.current?.pauseAsync();
				Speech.stop();
				setIsSpeaking(false);
			};
		}, [isVideoReady])
	);

	if (!exercise) {
		return <Text style={styles.errorText}>Exercise not found</Text>;
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{name}</Text>

			{video ? (
				<>
					{!isVideoReady && (
						<View style={styles.loadingContainer}>
							<ActivityIndicator size="large" color="#00A86B" />
						</View>
					)}

					<View style={styles.videoContainer}>
						<Video
							ref={videoRef}
							source={video}
							style={[
								styles.video,
								!isVideoReady && { opacity: 0 },
							]}
							useNativeControls={false}
							shouldPlay={isVideoReady}
							isLooping
							resizeMode="cover"
							onLoad={handleVideoLoad}
							onError={(error) =>
								console.log("Error loading video:", error)
							}
						/>

						<TouchableOpacity
							onPress={handleSpeakToggle}
							style={styles.soundButton}
						>
							<Ionicons
								name="volume-high-outline"
								size={wp(6.5)}
								color={isSpeaking ? "red" : "#fff"}
							/>
						</TouchableOpacity>
					</View>
				</>
			) : (
				<Text style={styles.errorText}>Video not available</Text>
			)}

			<View style={styles.detailsContainer}>
				<Text style={styles.detailTitle}>Description</Text>
				<Text style={styles.detailText}>{description}</Text>
			</View>
		</View>
	);
};

export default ExerciseDetail;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		paddingTop: hp(2),
	},
	title: {
		fontSize: wp(8),
		color: "#222",
		fontFamily: "Roboto-ExtraBold",
		letterSpacing: -1.2,
		textAlign: "center",
		marginBottom: hp(1.5),
	},
	videoContainer: {
		width: wp(90),
		height: hp(50),
		alignSelf: "center",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: wp(3),
		overflow: "hidden",
		marginTop: hp(1),
		position: "relative",
	},
	video: {
		width: "100%",
		height: "100%",
	},
	soundButton: {
		position: "absolute",
		top: hp(1.5),
		right: wp(3),
		backgroundColor: "rgba(0,0,0,0.4)",
		padding: wp(2),
		borderRadius: wp(7),
	},
	detailsContainer: {
		backgroundColor: "#fff",
		padding: wp(5),
		borderRadius: wp(3.5),
		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowRadius: 8,
		elevation: 3,
		marginTop: hp(2),
		width: wp(90),
		alignSelf: "center",
	},
	detailTitle: {
		fontSize: wp(5),
		color: "#222",
		fontFamily: "Roboto-Bold",
	},
	detailText: {
		fontSize: wp(4),
		color: "#444",
		lineHeight: hp(2.5),
		fontFamily: "Roboto-Regular",
		textAlign: "left",
		marginTop: hp(1.5),
	},
	loadingContainer: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: hp(3),
	},
	errorText: {
		color: "red",
		fontSize: wp(4),
		marginTop: hp(5),
		textAlign: "center",
	},
});
