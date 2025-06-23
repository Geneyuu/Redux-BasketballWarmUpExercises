import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import useSettingsLogic from "../../hooks/useSettingsLogic";

const SettingsIndex = () => {
	const {
		exerciseOpen,
		exerciseValue,
		intensityOpen,
		intensityValue,
		duration,
		repetitions,
		restDuration,
		exerciseItems,
		intensityItems,
		recommendedRange,
		isInvalid,
		intensityBgColor,

		handleExerciseOpen,
		handleExerciseValue,
		handleIntensityOpen,
		handleIntensityValue,
		handleDurationChange,
		handleRepetitionsChange,
		handleRestDurationChange,
		handleSaveDuration,
		handleSaveRepetitions,
		handleSaveRestDuration,
		handleReset,
	} = useSettingsLogic();

	return (
		<View style={styles.container}>
			{/* Top Row */}
			<View style={styles.settingsRow}>
				<Text style={styles.settings}>Settings</Text>
				<TouchableOpacity
					style={styles.buttonResetTop}
					onPress={handleReset}
				>
					<Text style={styles.buttonTextTop}>Reset to default</Text>
				</TouchableOpacity>
			</View>

			{/* Exercise Picker */}
			<View style={styles.dropdownContainer}>
				<Text style={styles.label}>Select an Exercise:</Text>
				<DropDownPicker
					open={exerciseOpen}
					value={exerciseValue}
					items={exerciseItems}
					setOpen={handleExerciseOpen}
					setValue={handleExerciseValue}
					style={styles.dropdown}
					textStyle={styles.dropdownText}
					dropDownContainerStyle={styles.dropdownList}
					zIndex={5000}
					zIndexInverse={1000}
				/>
			</View>

			{/* Intensity Picker */}
			<View style={styles.dropdownContainer}>
				<Text style={[styles.label, { marginTop: hp(2) }]}>
					Warm-up Intensity:
				</Text>
				<DropDownPicker
					open={intensityOpen}
					value={intensityValue}
					items={intensityItems}
					setOpen={handleIntensityOpen}
					setValue={handleIntensityValue}
					style={[
						styles.dropdown,
						{ backgroundColor: intensityBgColor || "white" },
					]}
					textStyle={styles.dropdownText}
					dropDownContainerStyle={styles.dropdownList}
					zIndex={1000}
					zIndexInverse={2000}
				/>
			</View>

			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.inputContainer}>
					<View style={styles.rowContainer}>
						{/* Duration */}
						<View style={styles.inputGroup}>
							<Text style={styles.inputLabelText}>Duration:</Text>
							<TextInput
								style={styles.input}
								value={duration}
								placeholder="Enter Duration"
								keyboardType="numeric"
								editable={!!exerciseValue}
								onChangeText={handleDurationChange}
							/>
							<Text
								style={[
									styles.recommendedText,
									isInvalid.duration && styles.invalidText,
								]}
							>
								Recommended Range: {recommendedRange.duration}
								{isInvalid.duration && " (invalid range)"}
							</Text>
							<TouchableOpacity
								style={[
									styles.button,
									(!exerciseValue || isInvalid.duration) &&
										styles.buttonDisabled,
								]}
								disabled={!exerciseValue || isInvalid.duration}
								onPress={handleSaveDuration}
							>
								<Text style={styles.buttonText}>
									Save Duration
								</Text>
							</TouchableOpacity>
						</View>

						{/* Repetitions */}
						<View style={styles.inputGroup}>
							<Text style={styles.inputLabelText}>
								Repetitions:
							</Text>
							<TextInput
								style={styles.input}
								value={repetitions}
								placeholder="Enter Repetitions"
								keyboardType="numeric"
								editable={!!exerciseValue}
								onChangeText={handleRepetitionsChange}
							/>
							<Text
								style={[
									styles.recommendedText,
									isInvalid.repetitions && styles.invalidText,
								]}
							>
								Recommended Range:{" "}
								{recommendedRange.repetitions}
								{isInvalid.repetitions && " (invalid range)"}
							</Text>
							<TouchableOpacity
								style={[
									styles.button,
									(!exerciseValue || isInvalid.repetitions) &&
										styles.buttonDisabled,
								]}
								disabled={
									!exerciseValue || isInvalid.repetitions
								}
								onPress={handleSaveRepetitions}
							>
								<Text style={styles.buttonText}>
									Save Repetitions
								</Text>
							</TouchableOpacity>
						</View>
					</View>

					{/* Rest Duration */}
					<Text style={styles.inputLabelText}>Rest Timer:</Text>
					<TextInput
						style={styles.input}
						value={restDuration}
						placeholder="Enter Rest Duration"
						keyboardType="numeric"
						editable={!!exerciseValue}
						onChangeText={handleRestDurationChange}
					/>
					<Text
						style={[
							styles.recommendedText,
							isInvalid.restDuration && styles.invalidText,
						]}
					>
						Recommended Range: {recommendedRange.restDuration}
						{isInvalid.restDuration && " (invalid range)"}
					</Text>
					<TouchableOpacity
						style={[
							styles.button,
							(!exerciseValue || isInvalid.restDuration) &&
								styles.buttonDisabled,
						]}
						disabled={!exerciseValue || isInvalid.restDuration}
						onPress={handleSaveRestDuration}
					>
						<Text style={styles.buttonText}>Save Rest Timer</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
};

export default SettingsIndex;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: wp(5),
		backgroundColor: "white",
	},
	settingsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginVertical: hp(2),
	},
	settings: {
		fontSize: wp(8.5),
		fontFamily: "Roboto-ExtraBold",
	},
	label: {
		fontSize: wp(4.5),
		fontFamily: "Roboto-ExtraBold",
		marginBottom: hp(1),
	},
	dropdownContainer: {
		marginBottom: hp(2),
	},
	dropdown: {
		borderWidth: 2,
		borderColor: "#222",
		borderRadius: wp(2),
	},
	dropdownText: {
		fontFamily: "Karla-SemiBold",
		fontSize: wp(4.2),
		letterSpacing: -0.5,
	},
	dropdownList: {
		borderColor: "#ccc",
		borderWidth: 1,
	},
	inputContainer: {
		marginTop: hp(2),
	},
	rowContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: hp(2),
	},
	inputGroup: {
		width: "48%",
	},
	input: {
		height: hp(6.5),
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: wp(2),
		backgroundColor: "white",
		marginBottom: hp(1),
		paddingHorizontal: wp(3),
		fontFamily: "Karla-Regular",
		fontSize: wp(4),
	},
	inputLabelText: {
		fontSize: wp(4),
		fontFamily: "Roboto-ExtraBold",
		marginBottom: hp(1),
	},
	recommendedText: {
		color: "black",
		fontSize: wp(2.3),
		marginLeft: wp(1),
		fontFamily: "Karla-Bold",
		letterSpacing: -0.7,
	},
	invalidText: {
		color: "red",
	},
	button: {
		backgroundColor: "black",
		paddingVertical: hp(1.6),
		borderRadius: wp(2),
		alignItems: "center",
		marginTop: hp(1),
	},
	buttonDisabled: {
		backgroundColor: "#bbb",
	},
	buttonText: {
		color: "white",
		fontSize: wp(3.8),
		fontFamily: "Karla-Bold",
	},
	buttonResetTop: {
		paddingVertical: hp(1),
		paddingHorizontal: wp(4),
		borderRadius: wp(2),
		borderWidth: 1,
		marginTop: hp(1),
	},
	buttonTextTop: {
		color: "black",
		fontFamily: "Roboto-ExtraBold",
		fontSize: wp(3.5),
	},
});
