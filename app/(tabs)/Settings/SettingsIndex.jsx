// SettingsIndex.js
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import useSettingsLogic from '../../hooks/useSettingsLogic';

const SettingsIndex = () => {
     const {
          // State values
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

          // Handlers
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
               <Text style={styles.settings}>Settings</Text>

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
                    <Text style={[styles.label, { marginTop: 15 }]}>Warm-up Intensity:</Text>
                    <DropDownPicker
                         open={intensityOpen}
                         value={intensityValue}
                         items={intensityItems}
                         setOpen={handleIntensityOpen}
                         setValue={handleIntensityValue}
                         style={[
                              styles.dropdown,
                              {
                                   backgroundColor: intensityBgColor || 'white',
                              },
                         ]}
                         textStyle={styles.dropdownText}
                         dropDownContainerStyle={styles.dropdownList}
                         zIndex={1000}
                         zIndexInverse={2000}
                    />
               </View>

               <ScrollView>
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
                                   <Text style={[styles.recommendedText, isInvalid.duration && styles.invalidText]}>
                                        Recommended Range: {recommendedRange.duration}
                                        {isInvalid.duration && ' (invalid range)'}
                                   </Text>
                                   <TouchableOpacity
                                        style={[
                                             styles.button,
                                             (!exerciseValue || isInvalid.duration) && styles.buttonDisabled,
                                        ]}
                                        disabled={!exerciseValue || isInvalid.duration}
                                        onPress={handleSaveDuration}
                                   >
                                        <Text style={styles.buttonText}>Save Duration</Text>
                                   </TouchableOpacity>
                              </View>

                              {/* Repetitions */}
                              <View style={styles.inputGroup}>
                                   <Text style={styles.inputLabelText}>Repetitions:</Text>
                                   <TextInput
                                        style={styles.input}
                                        value={repetitions}
                                        placeholder="Enter Repetitions"
                                        keyboardType="numeric"
                                        editable={!!exerciseValue}
                                        onChangeText={handleRepetitionsChange}
                                   />
                                   <Text style={[styles.recommendedText, isInvalid.repetitions && styles.invalidText]}>
                                        Recommended Range: {recommendedRange.repetitions}
                                        {isInvalid.repetitions && ' (invalid range)'}
                                   </Text>
                                   <TouchableOpacity
                                        style={[
                                             styles.button,
                                             (!exerciseValue || isInvalid.repetitions) && styles.buttonDisabled,
                                        ]}
                                        disabled={!exerciseValue || isInvalid.repetitions}
                                        onPress={handleSaveRepetitions}
                                   >
                                        <Text style={styles.buttonText}>Save Repetitions</Text>
                                   </TouchableOpacity>
                              </View>
                         </View>

                         {/* Rest Timer */}
                         <Text style={styles.inputLabelText}>Rest Timer:</Text>
                         <TextInput
                              style={styles.input}
                              value={restDuration}
                              placeholder="Enter Rest Duration"
                              keyboardType="numeric"
                              editable={!!exerciseValue}
                              onChangeText={handleRestDurationChange}
                         />
                         <Text style={[styles.recommendedText, isInvalid.restDuration && styles.invalidText]}>
                              Recommended Range: {recommendedRange.restDuration}
                              {isInvalid.restDuration && ' (invalid range)'}
                         </Text>
                         <TouchableOpacity
                              style={[
                                   styles.button,
                                   (!exerciseValue || isInvalid.restDuration) && styles.buttonDisabled,
                              ]}
                              disabled={!exerciseValue || isInvalid.restDuration}
                              onPress={handleSaveRestDuration}
                         >
                              <Text style={styles.buttonText}>Save Rest Timer</Text>
                         </TouchableOpacity>

                         <TouchableOpacity style={styles.buttonReset} onPress={handleReset}>
                              <Text style={styles.buttonText}>Reset to Default Values</Text>
                         </TouchableOpacity>
                    </View>
               </ScrollView>
          </View>
     );
};

const styles = StyleSheet.create({
     container: { flex: 1, padding: 20, backgroundColor: 'white' },
     settings: {
          fontSize: 35,
          fontFamily: 'Roboto-ExtraBold',
          marginVertical: 20,
     },
     label: {
          fontSize: 19,
          fontFamily: 'Roboto-ExtraBold',
          marginBottom: 5,
     },
     dropdownContainer: { marginBottom: 15 },
     dropdown: {
          borderWidth: 3,
          borderColor: '#222',
          borderRadius: 5,
          backgroundColor: 'white',
     },
     dropdownText: {
          fontFamily: 'Karla-SemiBold',
          fontSize: 18,
          letterSpacing: -1,
     },
     dropdownList: { borderColor: '#ccc', borderWidth: 1 },
     inputContainer: { marginTop: 10 },
     input: {
          height: 50,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          backgroundColor: 'white',
          marginBottom: 10,
          paddingHorizontal: 10,
          fontFamily: 'Karla-Regular',
          fontSize: 16,
     },
     inputLabelText: {
          fontSize: 16,
          fontFamily: 'Roboto-ExtraBold',
          marginBottom: 5,
     },
     rowContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 15,
     },
     inputGroup: { width: '48%' },
     button: {
          backgroundColor: 'black',
          paddingVertical: 15,
          borderRadius: 10,
          alignItems: 'center',
          marginTop: 10,
     },
     buttonDisabled: {
          backgroundColor: '#bbb',
     },
     buttonText: {
          color: 'white',
          fontSize: 15,
          fontFamily: 'Karla-Bold',
     },
     buttonReset: {
          backgroundColor: '#FFAC04',
          paddingVertical: 15,
          borderRadius: 10,
          alignItems: 'center',
          marginTop: 40,
          width: '80%',
          alignSelf: 'center',
     },
     recommendedText: {
          color: 'black',
          fontSize: 11,
          marginLeft: 2,
          fontFamily: 'Karla-Bold',
          letterSpacing: -1,
     },
     invalidText: {
          color: 'red',
     },
});

export default SettingsIndex;
