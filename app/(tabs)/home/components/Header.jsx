import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';

const Header = () => {
     const router = useRouter();
     const name = useSelector((state) => state.profile.name);

     return (
          <View style={styles.logoContainer}>
               {/* LEFT COLUMN */}
               <View style={styles.textColumn}>
                    <Text style={styles.headerText}>WarmUps</Text>
                    <View style={styles.subHeader}>
                         <Text style={styles.subHeaderText}>Basketball Warm-Up Exercises</Text>
                         <Text style={styles.subHeaderText}>Cavite State University</Text>
                    </View>
               </View>

               {/* RIGHT COLUMN */}
               <View style={styles.profileDiv}>
                    <Text style={styles.greetingText}>
                         Hello, <Text style={styles.greetingName}>{name}</Text>
                    </Text>
                    <TouchableOpacity onPress={() => router.push('/Profile')}>
                         <Ionicons name="create-outline" size={wp(5.5)} color="green" style={styles.editIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.profileContainer}>
                         <Image
                              source={require('../../../../assets/images/cvsulogo.png')}
                              style={styles.profileImage}
                         />
                    </TouchableOpacity>
               </View>
          </View>
     );
};

const styles = StyleSheet.create({
     logoContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: wp(5),
          paddingVertical: hp(2),
          borderBottomWidth: hp(0.2),
          borderBottomColor: 'black',
     },

     textColumn: {
          flexDirection: 'column',
          justifyContent: 'center',
     },

     headerText: {
          fontSize: hp(5.1),
          fontFamily: 'Roboto-ExtraBold',
          color: '#161616',
          letterSpacing: -2,
     },

     subHeader: {
          flexDirection: 'column',
          marginTop: hp(0.5),
     },

     subHeaderText: {
          fontSize: wp('2.8%'),
          fontFamily: 'Roboto-Regular',
          letterSpacing: -0.3,
     },

     profileDiv: {
          flexDirection: 'row',
          alignItems: 'center',
          position: 'relative',
     },

     greetingText: {
          fontSize: wp(3.5),
          color: '#000',
          fontFamily: 'Roboto-Regular',
          marginRight: wp(2),
     },

     greetingName: {
          color: '#161616',
          fontFamily: 'Roboto-ExtraBold',
          fontSize: wp(3.2),
          textTransform: 'uppercase',
          letterSpacing: -0.5,
     },

     profileContainer: {
          width: wp(15),
          height: wp(15),
          alignItems: 'center',
          justifyContent: 'center',
     },

     profileImage: {
          width: '100%',
          height: '100%',
          resizeMode: 'contain',
     },
     editIcon: { marginRight: 2, marginBottom: 4 },
});

export default Header;
