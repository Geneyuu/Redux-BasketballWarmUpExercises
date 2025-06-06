/* eslint-disable react-hooks/exhaustive-deps */

import { useFocusEffect } from '@react-navigation/native';
import { Video } from 'expo-av';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, AppState, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { exercises } from '../../../constants/exercises';

const ExerciseDetails = () => {
     const { id } = useLocalSearchParams();

     const exercise = exercises.find((exercise) => exercise.id === id);

     const videoRef = useRef(null);
     const [isVideoReady, setIsVideoReady] = useState(false);

     useEffect(() => {
          return () => {
               if (videoRef.current) {
                    videoRef.current.pauseAsync();
                    videoRef.current.unloadAsync();
               }
               setIsVideoReady(false);
          };
     }, []);

     useFocusEffect(
          useCallback(() => {
               if (videoRef.current && isVideoReady) {
                    videoRef.current.playAsync();
               }
               const handleAppStateChange = (appStatus) => {
                    if (appStatus === 'active' && isVideoReady) {
                         videoRef.current?.playAsync();
                    } else {
                         videoRef.current?.pauseAsync();
                    }
               };

               const appStateListener = AppState.addEventListener('change', handleAppStateChange);

               return () => {
                    appStateListener.remove();
                    videoRef.current?.pauseAsync();
               };
          }, [isVideoReady])
     );

     if (!exercise) {
          return <Text style={styles.errorText}>Exercise not found</Text>;
     }

     const { video, name, description } = exercise;

     const handleVideoLoad = () => {
          setIsVideoReady(true);
     };

     return (
          <View style={styles.container}>
               {video ? (
                    <>
                         {!isVideoReady && (
                              <View style={styles.loadingContainer}>
                                   <ActivityIndicator size="large" color="green" />
                              </View>
                         )}

                         <View style={styles.videoContainer}>
                              <Video
                                   ref={videoRef}
                                   source={video}
                                   style={[styles.video, !isVideoReady && { opacity: 0 }]}
                                   useNativeControls={false}
                                   shouldPlay={isVideoReady}
                                   isLooping
                                   resizeMode="cover"
                                   onLoad={handleVideoLoad}
                                   onError={(error) => console.log('Error loading video:', error)}
                                   renderToHardwareTextureAndroid={true}
                              />
                         </View>
                    </>
               ) : (
                    <Text style={styles.errorText}>Video not available</Text>
               )}

               <Text style={styles.title}>{name}</Text>
               <View style={styles.detailsContainer}>
                    <Text style={styles.detailTitle}>Description</Text>
                    <Text style={styles.detailText}>{description}</Text>
               </View>
          </View>
     );
};

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: '#fff',
     },
     title: {
          fontSize: wp('8%'),
          color: '#1E1E1E',
          textAlign: 'center',
          fontFamily: 'Roboto-ExtraBold',
          marginTop: hp('3%'),
          marginBottom: hp('1%'),
          letterSpacing: 0.5,
     },
     detailsContainer: {
          backgroundColor: '#f9f9f9',
          padding: wp('5%'),
          borderRadius: wp('4%'),
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowRadius: wp('2%'),
          elevation: 1,
          marginTop: hp('3%'),
          width: wp('90%'),
          alignSelf: 'center',
          borderWidth: 1,
          borderColor: '#eee',
     },
     detailTitle: {
          fontSize: wp('5.2%'),
          color: '#1E90FF',
          marginBottom: hp('1%'),
          fontFamily: 'Roboto-ExtraBold',
          letterSpacing: 0.3,
     },
     detailText: {
          fontSize: wp('4.2%'),
          color: '#444',
          lineHeight: hp('3.2%'),
          fontFamily: 'Karla-Regular',
          textAlign: 'justify',
     },
     videoContainer: {
          width: wp('100%'),
          height: hp('50%'),
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
     },
     video: {
          alignSelf: 'center',
          width: wp('100%'),
          height: hp('55%'),
     },

     loadingContainer: {
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: hp('2%'),
     },
     errorText: {
          color: 'red',
          fontSize: wp('4%'),
          marginTop: hp('2%'),
          textAlign: 'center',
     },
});

export default ExerciseDetails;
