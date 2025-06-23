// app/profile/index.js or wherever this is
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { updateName } from '../../store/slices/profileSlice';
import { loadNameFromStorage, saveNameToStorage } from '../../utils/loadNameFromStorage';

const ProfileIndex = () => {
     const router = useRouter();
     const dispatch = useDispatch();

     const name = useSelector((state) => state.profile.name);
     const [newName, setNewName] = useState(name);
     const [errorMessage, setErrorMessage] = useState('');

     useEffect(() => {
          const fetchName = async () => {
               const savedName = await loadNameFromStorage();
               if (savedName) {
                    dispatch(updateName(savedName));
                    setNewName(savedName);
               }
          };

          fetchName();
     }, []);

     const handleSave = async () => {
          const nameToSave = newName.trim() === '' ? name : newName;

          if (nameToSave.length > 10) {
               setErrorMessage('Maximum of 10 characters allowed.');
          } else {
               setErrorMessage('');
               dispatch(updateName(nameToSave));
               await saveNameToStorage(nameToSave);

               Alert.alert('Profile Updated', `You set your name to:\n\n${nameToSave}!`, [
                    { text: 'OK', onPress: () => router.replace('/(tabs)/') },
               ]);
          }
     };

     return (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
               <View style={styles.container}>
                    <Text style={styles.label}>Profile</Text>

                    <View style={styles.currentNameContainer}>
                         <Text style={styles.currentName}>Current Name:</Text>
                         <Text style={styles.currentNameValue}>{name}</Text>
                    </View>

                    <Text style={styles.newNameLabel}>New Name:</Text>

                    <TextInput
                         style={[styles.input, errorMessage ? styles.inputError : null]}
                         value={newName}
                         onChangeText={(text) => {
                              setNewName(text);
                              setErrorMessage(text.length > 10 ? 'Maximum of 10 characters allowed.' : '');
                         }}
                         placeholder="Set your new Nickname"
                         placeholderTextColor="#999"
                    />
                    {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                         <Text style={styles.buttonText}>Save Profile</Text>
                    </TouchableOpacity>
               </View>
          </TouchableWithoutFeedback>
     );
};

const styles = {
     container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          paddingHorizontal: wp(5),
          paddingBottom: wp(20),
     },
     label: {
          fontSize: hp(4),
          color: '#000',
          fontFamily: 'Roboto-ExtraBold',
          marginBottom: hp(2),
     },
     currentNameContainer: {
          width: '100%',
          alignSelf: 'flex-start',
          marginBottom: hp(1),
     },
     currentName: {
          fontSize: hp(2),
          color: '#666',
          fontFamily: 'Roboto-ExtraBold',
     },
     currentNameValue: {
          color: '#000',
          fontSize: hp(2),
          fontFamily: 'Roboto-ExtraBold',
     },
     newNameLabel: {
          fontSize: hp(2),
          color: '#666',
          fontFamily: 'Roboto-SemiBold',
          marginBottom: hp(0.5),
          marginTop: 10,
          alignSelf: 'flex-start',
     },
     input: {
          width: '100%',
          borderWidth: 1,
          borderColor: '#ccc',
          color: '#000',
          padding: hp(2),
          borderRadius: wp(3),
          marginBottom: hp(1.5),
          fontSize: hp(2),
          fontFamily: 'Roboto-SemiBold',
     },
     inputError: {
          borderColor: 'red',
     },
     errorText: {
          color: 'red',
          marginBottom: hp(1),
          fontFamily: 'Karla-Regular',
          fontSize: hp(1.8),
     },
     button: {
          backgroundColor: '#000',
          paddingVertical: hp(2),
          paddingHorizontal: wp(8),
          borderRadius: wp(3),
          width: '100%',
          alignItems: 'center',
     },
     buttonText: {
          color: '#fff',
          fontSize: hp(2.2),
          fontFamily: 'Roboto-ExtraBold',
     },
};

export default ProfileIndex;
