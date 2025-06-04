import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../app/store/store";

export default function RootLayout() {
	return (
		<Provider store={store}>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen
					name="OnBoarding"
					options={{ headerShown: false }}
				/>
			</Stack>
		</Provider>
	);
}
