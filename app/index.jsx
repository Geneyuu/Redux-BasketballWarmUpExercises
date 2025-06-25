import { useEffect, useRef } from "react";
import {
	ActivityIndicator,
	Animated,
	Dimensions,
	Image,
	StatusBar,
	StyleSheet,
	Text,
} from "react-native";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import useCheckOnboardingStatus from "./hooks/useCheckOnBoardingStatus";
import useLoadFonts from "./hooks/useLoadFonts";
import { initializeExerciseData } from "./store/thunks/exerciseThunks";
import { fetchName } from "./store/thunks/profileThunks";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const isSmallPhone = SCREEN_WIDTH < 360;
const isMidPhone = SCREEN_WIDTH >= 360 && SCREEN_WIDTH < 768;
const isTablet = SCREEN_WIDTH >= 768;

export default function Index() {
	const dispatch = useDispatch();

	useLoadFonts();
	useCheckOnboardingStatus();

	const scale = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		dispatch(fetchName());
		dispatch(initializeExerciseData());
	}, [dispatch]);

	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(scale, {
					toValue: 1.1,
					duration: 1000,
					useNativeDriver: true,
				}),
				Animated.timing(scale, {
					toValue: 1,
					duration: 1000,
					useNativeDriver: true,
				}),
			])
		).start();
	}, [scale]);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
			<Animated.Image
				source={require("../assets/images/applogo_modified.png")}
				style={[styles.logo, { transform: [{ scale }] }]}
			/>
			<Text style={styles.title}>Basketball Warm Ups</Text>
			<ActivityIndicator
				size="large"
				color="green"
				style={styles.loadingContainer}
			/>
			<Image
				source={require("../assets/images/cvsulogo.png")}
				style={styles.universityLogo}
			/>
			<Text style={styles.universityText}>Cavite State University</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#ffffff",
		paddingHorizontal: isTablet ? wp("10%") : wp("5%"),
	},
	logo: {
		width: isSmallPhone ? wp("32%") : isMidPhone ? wp("40%") : wp("25%"),
		height: isSmallPhone ? wp("40%") : isMidPhone ? wp("50%") : wp("25%"),
		marginBottom: hp(isTablet ? "3%" : "2%"),
		resizeMode: "contain",
	},
	title: {
		fontSize: isSmallPhone
			? hp("2%")
			: isMidPhone
			? hp("2.6%")
			: hp("3.2%"),
		marginTop: hp(isTablet ? "3%" : "2%"),
		width: wp(isTablet ? "40%" : "50%"),
		fontFamily: "Roboto-SemiBold",
		textAlign: "center",
		letterSpacing: 6,
		textTransform: "uppercase",
		color: "black",
	},
	loadingContainer: {
		marginTop: isSmallPhone ? hp("3%") : isMidPhone ? hp("3.5%") : hp("4%"),
	},
	universityLogo: {
		width: isSmallPhone ? wp("16%") : isMidPhone ? wp("13%") : wp("10%"),
		height: isSmallPhone ? wp("16%") : isMidPhone ? wp("13%") : wp("10%"),
		resizeMode: "contain",
		position: "absolute",
		bottom: isSmallPhone ? hp("8%") : isMidPhone ? hp("9%") : hp("11%"),
	},
	universityText: {
		position: "absolute",
		bottom: isSmallPhone ? hp("4%") : isMidPhone ? hp("5%") : hp("6%"),
		fontSize: isSmallPhone
			? hp("1.7%")
			: isMidPhone
			? hp("2%")
			: hp("2.3%"),
		width: wp(isTablet ? "70%" : "80%"),
		fontFamily: "Roboto-SemiBold",
		textAlign: "center",
		letterSpacing: 1.5,
		textTransform: "uppercase",
		color: "#4B5563",
	},
});
