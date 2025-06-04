import { Stack } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";

const LayoutSettings = () => {
	return (
		<SafeAreaView style={styles.safeArea}>
			<Stack>
				<Stack.Screen
					name="SettingsIndex"
					options={{ headerShown: false }}
				/>
			</Stack>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "white",
	},
});

export default LayoutSettings;
