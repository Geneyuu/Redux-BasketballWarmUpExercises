import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { exercises } from '../../../constants/exercises';

const UpperBodyIndex = () => {
     const router = useRouter();
     const [clickedId, setClickedId] = useState(null);
     const [startClickable, setStartClickable] = useState(true);

     const handleExercisePress = (id) => {
          if (clickedId !== null) return;
          setClickedId(id);
          router.push(`/home/UpperBody/${id}`);
          const timeout = setTimeout(() => setClickedId(null), 1300);
          return () => clearTimeout(timeout);
     };

     const handleStartPress = () => {
          if (!startClickable) return;
          setStartClickable(false);
          router.push('/home/UpperBody/StartWarmUps');
          setTimeout(() => setStartClickable(true), 1300);
     };

     const renderExerciseItem = ({ item }) => (
          <View style={styles.cardContainer}>
               <TouchableOpacity
                    onPress={() => handleExercisePress(item.id)}
                    disabled={clickedId !== null}
                    style={styles.card}
               >
                    <Image source={item.image} style={styles.exerciseImage} />
                    <View style={styles.textContainer}>
                         <Text style={styles.exerciseText}>{item.name}</Text>
                         <Ionicons name="chevron-forward-outline" size={wp(5.5)} color="gray" />
                    </View>
               </TouchableOpacity>
          </View>
     );

     // Header: static content on top of FlatList
     const renderHeader = () => (
          <View style={styles.headerContent}>
               <Image source={require('../../../../assets/images/inplacepreview.png')} style={styles.mainImage} />
               <Text style={styles.description}>
                    Improve your basketball performance with these Upper Body warm-up exercises. Strengthening your
                    shoulders, chest, and arms helps you shoot, pass, and defend more effectively while reducing the
                    risk of injury. Get ready to boost your power and mobility on the court!
               </Text>
               <Text style={styles.subheading}>Included exercises:</Text>
          </View>
     );

     return (
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
               <FlatList
                    data={exercises.slice(10, 15)}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderExerciseItem}
                    ListHeaderComponent={renderHeader}
                    ListFooterComponent={<View style={{ height: hp(12) }} />}
                    contentContainerStyle={styles.scrollOnlyExercises}
                    showsVerticalScrollIndicator={true}
               />

               {/* Sticky Start Button */}
               <View style={styles.stickyButtonContainer}>
                    <TouchableOpacity style={styles.stickyButton} onPress={handleStartPress}>
                         <Text style={styles.stickyButtonText}>Start Warmups</Text>
                    </TouchableOpacity>
               </View>
          </View>
     );
};

const styles = StyleSheet.create({
     scrollOnlyExercises: {
          paddingHorizontal: wp(7),
     },
     headerContent: {
          paddingVertical: hp(3),
     },
     mainImage: {
          width: '100%',
          height: hp(30),
          resizeMode: 'cover',
          borderRadius: wp(3),
          marginBottom: hp(2),
     },
     description: {
          fontSize: wp(3.5),
          lineHeight: hp(2),
          color: '#161616',
          marginBottom: hp(2),
          textAlign: 'justify',
          fontFamily: 'Karla-Regular',
     },
     subheading: {
          fontSize: wp(5),
          color: '#161616',
          fontFamily: 'Karla-Bold',
          marginBottom: hp(2),
     },
     cardContainer: {
          width: '100%',
          marginBottom: hp('1.5%'),
          backgroundColor: 'white',
          borderRadius: wp('3%'),
          elevation: 3,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
     },
     card: {
          flexDirection: 'row',
          alignItems: 'center',
     },
     exerciseImage: {
          width: wp(25),
          height: wp(25),
          borderTopLeftRadius: wp(2),
          borderBottomLeftRadius: wp(2),
          marginRight: wp(3),
     },
     textContainer: {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingInline: 10,
     },
     exerciseText: {
          fontSize: wp(4),
          color: '#161616',
          fontFamily: 'Roboto-ExtraBold',
          textAlign: 'left',
     },
     stickyButtonContainer: {
          position: 'absolute',
          bottom: hp(2),
          left: wp(4),
          right: wp(4),
     },
     stickyButton: {
          backgroundColor: '#161616',
          paddingVertical: hp(1.8),
          borderWidth: 2,
          borderRadius: wp(2),
          justifyContent: 'center',
          alignItems: 'center',
     },
     stickyButtonText: {
          fontSize: wp(4.5),
          color: '#fff',
          fontFamily: 'Karla-Bold',
     },
});

export default UpperBodyIndex;
