import { Stack } from "expo-router";

const LayoutProfile = () => {
	return (
		<Stack>
			<Stack.Screen
				name="ProfileIndex"
				options={{ headerShown: false }}
			/>
		</Stack>
	);
};

export default LayoutProfile;
