import * as Speech from 'expo-speech';
import { Image, StyleSheet, Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const RestScreen = ({ remainingTime, nextExercise, progress, isResting }) => {
     const getTintColor = () => {
          if (progress >= 0.7) {
               return '#e74c3c';
          } else if (progress >= 0.4) {
               return '#f1c40f';
          } else {
               return '#2ecc71';
          }
     };

     if (isResting) {
          Speech.stop();
     }

     return (
          <View style={styles.container}>
               <Text style={styles.restText}>REST</Text>

               <AnimatedCircularProgress
                    size={wp('60%')}
                    width={20}
                    fill={progress * 100}
                    tintColor={getTintColor()}
                    backgroundColor="#ecf0f1"
                    rotation={0}
                    lineCap="butt"
                    style={styles.circularProgress}
               >
                    {() => (
                         <Text style={styles.timerText}>
                              {remainingTime}
                              <Text style={styles.timerSecs}> secs</Text>
                         </Text>
                    )}
               </AnimatedCircularProgress>

               {nextExercise ? (
                    <>
                         <Text style={styles.nextText}>Next Warm-up:</Text>
                         <Image source={nextExercise.image} style={styles.warmupImage} resizeMode="contain" />
                         <Text style={styles.warmupName}>{nextExercise.name}</Text>
                    </>
               ) : (
                    <Text style={styles.done}>
                         All exercises completed!{'\n'}Please finish the rest timer before playing basketball.
                    </Text>
               )}
          </View>
     );
};

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          paddingTop: hp('8%'),
     },
     restText: {
          fontSize: wp('9%'),
          fontFamily: 'Karla-ExtraBold',
          color: '#34495E',
          marginBottom: hp('5%'),
     },
     circularProgress: {
          marginBottom: hp('5%'),
     },
     timerText: {
          fontSize: wp('12%'),
          fontFamily: 'Roboto-ExtraBold',
          color: '#2C3E50',
          textAlign: 'center',
          marginLeft: 25,
     },
     timerSecs: {
          fontSize: wp('3%'),
          color: '#7F8C8D',
     },
     nextText: {
          fontSize: wp('6%'),
          fontFamily: 'Karla-ExtraBold',
          letterSpacing: -2,
          color: '#34495E',
          alignSelf: 'flex-start',
          marginLeft: wp('10%'),
     },
     warmupImage: {
          width: wp('55%'),
          height: hp('20%'),
          marginTop: hp('2%'),
          borderRadius: 10,
     },
     warmupName: {
          fontSize: wp('6%'),
          fontFamily: 'Karla-Regular',
          color: '#2C3E50',
          marginTop: hp('1%'),
     },
     done: {
          fontSize: wp('5%'),
          fontFamily: 'Karla-ExtraBold',
          letterSpacing: -1.3,
          color: '#34495E',
          marginTop: hp('4%'),
          textAlign: 'center',
          width: wp('80%'),
     },
});

export default RestScreen;
