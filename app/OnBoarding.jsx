import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
	Image,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const slides = [
	{
		key: "one",
		title: "Tailored WarmUps for Basketball",
		text: "Get basketball-specific warm-up routines that prepare your muscles and reduce injury risks on the court.",
		image: require("../assets/images/Lunges.jpg"),
	},
	{
		key: "two",
		title: "Step-by-Step Exercise Videos",
		text: "Each exercise comes with a video demo to guide your movements step-by-step.",
		image: require("../assets/images/JumpingJacks.jpg"),
	},

	{
		key: "three",
		title: "Customize Your Routine",
		text: "Adjust intensity, rest time, repetitions, and timers — all based on your preference.",
		image: require("../assets/images/Defensive Slides.jpg"),
	},
];

const OnBoarding = () => {
	const router = useRouter();
	const sliderRef = useRef(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	const onDone = async () => {
		try {
			await AsyncStorage.setItem("hasOnboarded", "false");
			router.replace("/(tabs)/home");
		} catch (error) {
			console.log("Error saving onboarding state:", error);
		}
	};

	const goToNextSlide = () => {
		if (currentIndex < slides.length - 1 && sliderRef.current) {
			sliderRef.current.goToSlide(currentIndex + 1);
			setCurrentIndex(currentIndex + 1);
		}
	};

	const renderItem = ({ item }) => (
		<View style={styles.container}>
			{/* StatusBar */}
			<StatusBar
				barStyle="light-content"
				backgroundColor="transparent"
				translucent
			/>
			<View style={styles.slide}>
				<Image
					source={item.image}
					style={styles.image}
					resizeMode="cover"
				/>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.text}>{item.text}</Text>
			</View>
		</View>
	);

	const renderSkipButton = () => (
		<TouchableOpacity style={styles.skipButton} onPress={onDone}>
			<Text style={styles.skipButtonText}>Skip</Text>
		</TouchableOpacity>
	);

	const renderDoneButton = () => (
		<TouchableOpacity style={styles.doneButton} onPress={onDone}>
			<Text style={styles.doneButtonText}>Done</Text>
		</TouchableOpacity>
	);

	const renderNextButton = () => (
		<TouchableOpacity style={styles.nextButton} onPress={goToNextSlide}>
			<Text style={styles.nextButtonText}>Next</Text>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<AppIntroSlider
				ref={sliderRef}
				renderItem={renderItem}
				data={slides}
				onDone={onDone}
				showSkipButton={true}
				onSkip={onDone}
				renderNextButton={renderNextButton}
				renderSkipButton={renderSkipButton}
				renderDoneButton={renderDoneButton}
				activeDotStyle={styles.activeDot}
				dotStyle={styles.dot}
				onSlideChange={(index) => setCurrentIndex(index)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingBottom: 20,
	},
	slide: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: "#fff",
		paddingTop: 0,
	},
	image: {
		width: wp("100%"),
		height: hp("63%"),
	},
	title: {
		fontFamily: "Roboto-ExtraBold",
		fontSize: wp("10%"),
		color: "#1C1C1C",
		textAlign: "center",
		marginTop: hp("4%"),
		letterSpacing: -2.7,
		paddingHorizontal: wp("8%"),
	},
	text: {
		fontFamily: "Roboto-Bold",
		fontSize: wp("3.7%"),
		color: "gray",
		textAlign: "center",
		marginTop: hp("1.5%"),
		paddingHorizontal: wp("10%"),
	},
	activeDot: {
		backgroundColor: "#1C1C1C",
		width: wp("8%"),
		height: hp("1%"),
		borderRadius: wp("2%"),
		marginHorizontal: wp("1%"),
	},
	dot: {
		backgroundColor: "rgba(0, 0, 0, 0.2)",
		width: wp("2%"),
		height: wp("2%"),
		borderRadius: wp("1.25%"),
		marginHorizontal: wp("1%"),
	},
	nextButton: {
		backgroundColor: "#1C1C1C",
		paddingHorizontal: wp("6%"),
		borderRadius: wp("5%"),
	},
	nextButtonText: {
		color: "#fff",
		fontSize: wp("4%"),
		fontFamily: "Karla-Bold",
		paddingHorizontal: wp("4%"),
		paddingVertical: hp("1.2%"),
	},
	skipButton: {
		backgroundColor: "#E5E7EB",
		paddingVertical: hp("1.2%"),
		paddingHorizontal: wp("6%"),
		borderRadius: wp("5%"),
	},
	skipButtonText: {
		color: "#000",
		fontSize: wp("4%"),
		fontFamily: "Karla-Regular",
		paddingHorizontal: wp("1.2%"),
	},
	doneButton: {
		backgroundColor: "#1C1C1C",
		paddingVertical: hp("1.2%"),
		paddingHorizontal: wp("6%"),
		borderRadius: wp("5%"),
	},
	doneButtonText: {
		color: "#fff",
		fontSize: wp("4%"),
		fontFamily: "Karla-Bold",
		paddingHorizontal: wp("5%"),
	},
});

export default OnBoarding;
