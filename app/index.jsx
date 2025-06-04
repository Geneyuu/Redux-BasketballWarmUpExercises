import { useEffect, useRef } from "react";
import {
	ActivityIndicator,
	Animated,
	Image,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from "react-native";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { fetchName } from "../app/store/slices/profileSlice";
import useCheckOnboardingStatus from "./hooks/useCheckOnBoardingStatus";
import useLoadFonts from "./hooks/useLoadFonts";
import { initializeExerciseData } from "./store/slices/exerciseSlice";

export default function Index() {
	const dispatch = useDispatch();

	useLoadFonts();
	useCheckOnboardingStatus();

	// Animated scale value
	const scale = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		// Dispatch fetchName when screen mounts
		dispatch(fetchName());
	}, [dispatch]);

	useEffect(() => {
		dispatch(initializeExerciseData());
	}, [dispatch]);

	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(scale, {
					toValue: 1.1,
					duration: 1500,
					useNativeDriver: true,
				}),
				Animated.timing(scale, {
					toValue: 1,
					duration: 1500,
					useNativeDriver: true,
				}),
			])
		).start();
	}, [scale]);

	return (
		<View style={styles.container}>
			<StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

			{/* Animated logo */}
			<Animated.Image
				source={require("../assets/images/applogo_modified.png")}
				style={[styles.logo, { transform: [{ scale }] }]}
			/>

			{/* Basketball Warm Ups Text */}
			<Text style={styles.title}>Basketball Warm Ups</Text>

			{/* Loading spinner */}
			<ActivityIndicator
				size="large"
				color="green"
				style={styles.loadingContainer}
			/>

			{/* University logo */}
			<Image
				source={require("../assets/images/cvsulogo.png")}
				style={styles.universityLogo}
			/>

			{/* University Text */}
			<Text style={styles.universityText}>Cavite State University</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#ffffff",
	},
	logo: {
		width: wp("35%"),
		height: wp("35%"),
		marginBottom: hp("2%"),
		resizeMode: "contain",
	},
	title: {
		fontSize: hp("2.2%"),
		marginTop: hp("2%"),
		width: wp("50%"),
		fontFamily: "Roboto-SemiBold",
		textAlign: "center",
		letterSpacing: 6,
		textTransform: "uppercase",
		color: "black",
	},
	loadingContainer: {
		marginTop: 20,
	},
	universityLogo: {
		width: wp("15%"),
		height: wp("15%"),
		resizeMode: "contain",
		position: "absolute",
		bottom: hp("8%"),
	},
	universityText: {
		position: "absolute",
		bottom: hp("4%"),
		fontSize: hp("1.7%"),
		width: wp("80%"),
		fontFamily: "Roboto-SemiBold",
		textAlign: "center",
		letterSpacing: 1.5,
		textTransform: "uppercase",
		color: "#4B5563",
	},
	loadingScreen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#ffffff",
	},
	loadingText: {
		fontSize: 16,
		color: "#333",
	},
});
