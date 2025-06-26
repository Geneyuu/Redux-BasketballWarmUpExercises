import { StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const ProgressBar = ({ progress, remainingTime }) => {
	const getTintColor = () => {
		if (progress >= 0.7) return "#e74c3c";
		else if (progress >= 0.4) return "#fad542";
		else return "#2ecc71";
	};

	console.log(remainingTime);

	return (
		<View style={styles.progressbarContainer}>
			<Progress.Bar
				progress={progress}
				width={null}
				height={hp("5%")}
				color={getTintColor()}
				unfilledColor="#ECF0F1"
				borderRadius={0}
			/>
			<View style={styles.timerOverlay}>
				<Text style={styles.timerText}>
					{remainingTime}
					<Text style={styles.timerTextSecs}> secs</Text>
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	progressbarContainer: {
		position: "relative",
		justifyContent: "center",
		paddingHorizontal: 0,
	},
	timerOverlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
	},
	timerText: {
		fontFamily: "Roboto-ExtraBold",
		fontSize: hp("3%"),
		color: "rgba(0,0,0,0.7)",
	},
	timerTextSecs: {
		fontFamily: "Karla-ExtraBold",
		fontSize: hp("1.5%"),
		color: "rgba(0,0,0,0.7)",
	},
});

export default ProgressBar;
