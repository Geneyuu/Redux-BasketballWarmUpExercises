import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";

// Breakpoints
const SCREEN_WIDTH = Dimensions.get("window").width;
const isSmallPhone = SCREEN_WIDTH < 360;
const isMidPhone = SCREEN_WIDTH >= 360 && SCREEN_WIDTH < 768;
const isTablet = SCREEN_WIDTH >= 768;

// Dynamic sizes
let headerFontSize,
	subHeaderFontSize,
	greetingFontSize,
	nameFontSize,
	profileSize,
	iconSize;

if (isSmallPhone) {
	headerFontSize = hp(4.2);
	subHeaderFontSize = wp(2.5);
	greetingFontSize = wp(3);
	nameFontSize = wp(2.8);
	profileSize = wp(12);
	iconSize = wp(5);
} else if (isMidPhone) {
	headerFontSize = hp(5.1);
	subHeaderFontSize = wp(2.8);
	greetingFontSize = wp(3.5);
	nameFontSize = wp(3.2);
	profileSize = wp(15);
	iconSize = wp(5.5);
} else if (isTablet) {
	headerFontSize = hp(5.5);
	subHeaderFontSize = wp(2.5);
	greetingFontSize = wp(3.2);
	nameFontSize = wp(3.2);
	profileSize = wp(10);
	iconSize = wp(4.5);
}

const Header = () => {
	const router = useRouter();
	const name = useSelector((state) => state.profile.name);

	return (
		<View style={styles.logoContainer}>
			{/* LEFT COLUMN */}
			<View style={styles.textColumn}>
				<Text style={[styles.headerText, { fontSize: headerFontSize }]}>
					WarmUps
				</Text>
				<View style={styles.subHeader}>
					<Text
						style={[
							styles.subHeaderText,
							{ fontSize: subHeaderFontSize },
						]}
					>
						Basketball Warm-Up Exercises
					</Text>
					<Text
						style={[
							styles.subHeaderText,
							{ fontSize: subHeaderFontSize },
						]}
					>
						Cavite State University
					</Text>
				</View>
			</View>

			{/* RIGHT COLUMN */}
			<View style={styles.profileDiv}>
				<Text
					style={[
						styles.greetingText,
						{ fontSize: greetingFontSize },
					]}
				>
					Hello,{" "}
					<Text
						style={[
							styles.greetingName,
							{ fontSize: nameFontSize },
						]}
					>
						{name}
					</Text>
				</Text>

				<TouchableOpacity onPress={() => router.push("/Profile")}>
					<Ionicons
						name="create-outline"
						size={iconSize}
						color="green"
						style={styles.editIcon}
					/>
				</TouchableOpacity>

				<TouchableOpacity
					style={[
						styles.profileContainer,
						{ width: profileSize, height: profileSize },
					]}
				>
					<Image
						source={require("../../../../assets/images/cvsulogo.png")}
						style={styles.profileImage}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	logoContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: wp(5),
		paddingVertical: hp(2.5),
		borderBottomWidth: hp(0.2),
		borderBottomColor: "black",
	},

	textColumn: {
		flexDirection: "column",
		justifyContent: "center",
	},

	headerText: {
		fontFamily: "Roboto-ExtraBold",
		color: "#161616",
		letterSpacing: -2,
	},

	subHeader: {
		flexDirection: "column",
		marginTop: hp(0.5),
	},

	subHeaderText: {
		fontFamily: "Roboto-Regular",
		letterSpacing: -0.3,
	},

	profileDiv: {
		flexDirection: "row",
		alignItems: "center",
		position: "relative",
	},

	greetingText: {
		color: "#000",
		fontFamily: "Roboto-Regular",
		marginRight: wp(2),
	},

	greetingName: {
		color: "#161616",
		fontFamily: "Roboto-ExtraBold",
		textTransform: "uppercase",
		letterSpacing: -0.5,
	},

	profileContainer: {
		alignItems: "center",
		justifyContent: "center",
	},

	profileImage: {
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},

	editIcon: {
		marginRight: 2,
		marginBottom: 4,
	},
});

export default Header;
