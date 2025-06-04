import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const TabIcon = ({ icon, focused, color }) => (
	<View style={styles.iconWrapper}>
		{focused && <View style={styles.focusedBorder} />}
		<Ionicons
			name={icon}
			size={hp(3)}
			color={focused ? "#161616" : color}
		/>
	</View>
);

const TabButton = ({ onPress, children, style }) => (
	<TouchableOpacity
		onPress={onPress}
		style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, style]}
	>
		<View
			style={{
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{children}
		</View>
	</TouchableOpacity>
);

const Layout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: true,
				tabBarActiveTintColor: "#161616",
				tabBarInactiveTintColor: "#161616",
				tabBarStyle: {
					backgroundColor: "#fff",
					borderTopColor: "#232522",
					elevation: 0,
					height: hp(9),
					borderTopWidth: 1,
					paddingTop: hp(1.5),
					paddingHorizontal: wp(5),
				},
				tabBarLabelStyle: {
					fontFamily: "Karla-Regular",
					fontSize: hp(1.5),
				},
			}}
		>
			{/* Home Screen */}
			<Tabs.Screen
				name="home"
				options={{
					headerShown: false,
					tabBarLabel: "Home",
					tabBarIcon: ({ color, focused }) => (
						<TabIcon
							icon={
								focused
									? "basketball-sharp"
									: "basketball-outline"
							}
							color={color}
							focused={focused}
						/>
					),
					tabBarButton: (props) => <TabButton {...props} />,
				}}
			/>

			{/* Search Screen */}
			<Tabs.Screen
				name="Search"
				options={{
					headerShown: false,
					tabBarLabel: "Exercises",
					tabBarIcon: ({ color, focused }) => (
						<TabIcon
							icon={focused ? "barbell-sharp" : "barbell-outline"}
							color={color}
							focused={focused}
						/>
					),
					tabBarButton: (props) => <TabButton {...props} />,
				}}
			/>

			{/* Profile Screen */}
			<Tabs.Screen
				name="Profile"
				options={{
					headerShown: false,
					tabBarLabel: "Profile",
					tabBarIcon: ({ color, focused }) => (
						<TabIcon
							icon={focused ? "person" : "person-outline"}
							color={color}
							focused={focused}
						/>
					),
					tabBarButton: (props) => <TabButton {...props} />,
				}}
			/>

			{/* Settings Screen */}
			<Tabs.Screen
				name="Settings"
				options={{
					headerShown: false,
					tabBarLabel: "Settings",
					tabBarIcon: ({ color, focused }) => (
						<TabIcon
							icon={focused ? "settings" : "settings-outline"}
							color={color}
							focused={focused}
						/>
					),
					tabBarButton: (props) => <TabButton {...props} />,
				}}
			/>
		</Tabs>
	);
};

export default Layout;

// Styles
const styles = StyleSheet.create({
	iconWrapper: {
		alignItems: "center",
		justifyContent: "center",
		width: wp(16),
		paddingTop: hp(0),
	},
	focusedBorder: {
		width: "100%",
		height: hp(0.6),
		backgroundColor: "#161616",
		position: "absolute",
		top: -hp(1.7),
	},
});
