// import { StyleSheet, View } from "react-native";
// import Categories from "./components/Categories";
// import FeaturedExercises from "./components/FeaturedExercises";
// import FirstTimeModal from "./components/FirstTimeModal";
// import Header from "./components/Header";

// const HomeIndex = () => {
// 	return (
// 		<View style={styles.HomeContainer}>
// 			<Header />
// 			<FirstTimeModal />
// 			<FeaturedExercises />
// 			<Categories />
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	safeArea: {
// 		flex: 1,
// 		backgroundColor: "white",
// 	},
// 	HomeContainer: {
// 		flex: 1,
// 		backgroundColor: "white",
// 	},
// });

// export default HomeIndex;

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Categories from "./components/Categories";
import FeaturedExercises from "./components/FeaturedExercises";
import FirstTimeModal from "./components/FirstTimeModal";
import Header from "./components/Header";

const HomeIndex = () => {
	const [lastCategory, setLastCategory] = useState(null);
	const [showContinue, setShowContinue] = useState(false);
	const prevCategoryRef = useRef(null);
	const router = useRouter();

	useFocusEffect(
		useCallback(() => {
			const loadLastCategory = async () => {
				const saved = await AsyncStorage.getItem("lastCategory");

				if (saved) {
					setLastCategory(saved);
					if (prevCategoryRef.current !== saved) {
						prevCategoryRef.current = saved;
						setShowContinue(true);
					}
				} else {
					setLastCategory(null);
				}
			};
			loadLastCategory();
		}, [])
	);

	const handleContinue = () => {
		if (lastCategory) {
			router.push(`/home/${lastCategory}/StartWarmUps`);
		}
	};

	const handleClose = () => {
		setShowContinue(false);
	};

	return (
		<View style={styles.HomeContainer}>
			<Header />
			<FirstTimeModal />
			<FeaturedExercises />
			<Categories />

			{lastCategory && showContinue && (
				<TouchableOpacity
					style={styles.floatingContinue}
					onPress={handleContinue}
					activeOpacity={0.9}
				>
					<TouchableOpacity
						style={styles.closeButton}
						onPress={handleClose}
						activeOpacity={0.9}
					>
						<Ionicons name="close" size={23} color="red" />
					</TouchableOpacity>

					<View style={styles.rowCenter}>
						<Text style={styles.floatingText}>
							Tap to continue progress {lastCategory}?
						</Text>
					</View>
				</TouchableOpacity>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	HomeContainer: {
		flex: 1,
		backgroundColor: "white",
	},
	floatingContinue: {
		position: "absolute",
		bottom: 0,
		right: 0,
		backgroundColor: "black",
		paddingVertical: 11,
		paddingHorizontal: 30,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	closeButton: {
		position: "absolute",
		top: -10,
		right: 0,
		backgroundColor: "black",
		borderRadius: 20,
		padding: 4,
		zIndex: 1,
	},
	rowCenter: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	floatingText: {
		color: "white",
		fontSize: 12,
		fontFamily: "Karla-Bold",
	},
});

export default HomeIndex;
