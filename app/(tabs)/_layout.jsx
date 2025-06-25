import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";

//Check if tablet
const isTablet = wp("100%") >= 600;

const TabIcon = ({ icon, focused, color }) => (
	<View style={[styles.iconWrapper, isTablet && { marginRight: wp(0.4) }]}>
		{focused && <View style={styles.focusedBorder} />}
		<Ionicons
			name={icon}
			size={isTablet ? hp(2.5) : hp(3)}
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
					height: isTablet ? hp(10) : hp(9),
					borderTopWidth: 1,
					paddingTop: isTablet ? hp(2) : hp(1.5),
					paddingHorizontal: wp(5),
				},
				tabBarLabelStyle: {
					fontFamily: "Karla-Regular",
					fontSize: isTablet ? hp(1.5) : hp(1.5),
				},
			}}
		>
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

const styles = StyleSheet.create({
	iconWrapper: {
		alignItems: "center",
		justifyContent: "center",
		width: wp(16),
		paddingTop: isTablet ? hp(-1) : hp(0),
		height: isTablet ? hp(6.5) : undefined,
	},
	focusedBorder: {
		width: "100%",
		height: hp(0.5),
		backgroundColor: "#161616",
		position: "absolute",
		top: isTablet ? 0 : -hp(1.7),
		borderRadius: 5,
	},
});
