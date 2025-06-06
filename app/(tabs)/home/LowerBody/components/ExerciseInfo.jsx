import { StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const ExerciseInfo = ({ currentExercise, currentExerciseIndex, allExercises, intensitySettings, intensityValue }) => (
    <View style={styles.descriptionContainer}>
        <View style={styles.headerContainerFlex}>
            <View>
                <Text style={styles.intensityText}>
                    WarmUp Intensity: <Text style={styles.intensityValueText}>{intensityValue}</Text>
                </Text>
                <Text style={styles.descriptionTitle}>{currentExercise.name}</Text>
            </View>
            <Text style={styles.exerciseCount}>
                Exercises: {currentExerciseIndex + 1} of {allExercises.length}
            </Text>
        </View>

        <Text style={styles.descriptionContent}>{currentExercise.description}</Text>

        <View style={styles.valuesRow}>
            <View style={styles.valueItem}>
                <Text style={styles.valueLabel}>Duration</Text>
                <Text style={styles.valueText}>{intensitySettings.duration.min}s</Text>
            </View>
            <View style={styles.valueItem}>
                <Text style={styles.valueLabel}>Repetitions</Text>
                <Text style={styles.valueText}>
                    {intensitySettings.repetitions.min}
                    <Text style={styles.valueReps}> reps</Text>
                </Text>
            </View>
            <View style={styles.valueItem}>
                <Text style={styles.valueLabel}>Rest Timer</Text>
                <Text style={styles.valueText}>{intensitySettings.restDuration.min}s</Text>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    descriptionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        paddingHorizontal: wp('5%'),
        paddingBottom: hp('1%'),
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: hp('-7%'),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    headerContainerFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: hp('1%'),
    },
    descriptionTitle: {
        fontSize: wp('6%'),
        fontFamily: 'Roboto-ExtraBold',
        textAlign: 'left',
        color: '#2C3E50',
    },
    descriptionContent: {
        flexDirection: 'column',
        fontSize: wp('3.5%'),
        lineHeight: hp('1.7%'),
        fontFamily: 'Roboto-Regular',
        color: '#34495E',
        marginBottom: hp('1%'),
    },
    exerciseCount: {
        letterSpacing: -0.8,
        fontFamily: 'Roboto-ExtraBold',
        fontSize: wp('3.5%'),
        color: '#5B8C5A',
        marginTop: hp(4.5),
        marginRight: wp(3),
    },
    intensityText: {
        fontFamily: 'Roboto-ExtraBold',
        fontSize: hp('1.6%'),
        color: '#5B8C5A',
        marginTop: wp(5),
        marginBottom: hp('0.5%'),
        letterSpacing: -0.5,
    },
    intensityValueText: {
        fontFamily: 'Roboto-ExtraBold',
        fontSize: hp('1.6%'),
        color: '#E74C3C',
        marginBottom: hp('0.5%'),
        letterSpacing: -0.5,
    },
    valuesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: '100%',
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('0%'),
        backgroundColor: 'white',
        elevation: 3,
        shadowColor: '#5B8C5A',
        shadowOffset: { width: 10, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        borderWidth: 0.5,
        borderColor: '#ECF0F1',
    },
    valueItem: {
        alignItems: 'center',
        flex: 1,
    },
    valueLabel: {
        fontFamily: 'Karla-ExtraBold',
        fontSize: hp('2%'),
        letterSpacing: -1,
        color: '#E74C3C',
        marginBottom: hp('0.5%'),
    },
    valueText: {
        fontFamily: 'Roboto-ExtraBold',
        fontSize: hp('3%'),
        color: 'rgba(0,0,0,0.7)',
    },
    valueReps: {
        fontSize: hp('1.5%'),
        color: 'rgba(0,0,0,0.7)',
    },
});

export default ExerciseInfo;
