import { StyleSheet, View } from "react-native";
import Header from "./components/Header";

const HomeIndex = () => {
	return (
		<View style={styles.HomeContainer}>
			<Header />
		</View>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "white",
	},
	HomeContainer: {
		flex: 1,
		backgroundColor: "white",
	},
});

export default HomeIndex;
