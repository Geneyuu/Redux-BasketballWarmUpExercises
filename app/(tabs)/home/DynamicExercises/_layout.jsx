import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

const Layout = () => {
     const router = useRouter();
     // const pathname = usePathname(); // Use this hook to get the current path
     // const [statusBarVisible, setStatusBarVisible] = useState(false); // State to control the status bar

     // useFocusEffect(
     //     React.useCallback(() => {
     //         if (pathname === '/home/WholeBody/StartWarmUps') {
     //             setStatusBarVisible(true); // Set status bar visible after delay
     //         }

     //         return () => {
     //             setStatusBarVisible(false);
     //         };
     //     }, [pathname])
     // );

     return (
          <>
               {/* Conditionally apply translucent status bar with a delay */}
               {/* {statusBarVisible && <StatusBar barStyle='light-content' translucent backgroundColor='transparent' />} */}

               <Stack>
                    {/* With Ball Screen */}
                    <Stack.Screen
                         name="DynamicExercisesIndex"
                         options={{
                              headerShown: true,
                              header: () => (
                                   <SafeAreaView style={{ backgroundColor: '#fff' }}>
                                        <View
                                             style={{
                                                  height: hp(8),
                                                  flexDirection: 'row',
                                                  alignItems: 'center',
                                                  backgroundColor: '#fff',
                                                  borderBottomWidth: 2.5,
                                                  borderBottomColor: '#161616',
                                                  paddingHorizontal: wp(3),
                                             }}
                                        >
                                             <TouchableOpacity
                                                  onPress={() => router.back()}
                                                  style={{ marginLeft: wp(2.5) }}
                                             >
                                                  <Ionicons name="arrow-back" size={hp(3.5)} color="black" />
                                             </TouchableOpacity>

                                             <View style={{ flex: 1, alignItems: 'center' }}>
                                                  <Text
                                                       style={{
                                                            position: 'relative',
                                                            left: wp(-1.5),
                                                            color: '#161616',
                                                            fontSize: hp(2.8),
                                                            fontFamily: 'Roboto-SemiBold',
                                                            textTransform: 'capitalize',
                                                            letterSpacing: -0.7,
                                                       }}
                                                  >
                                                       Dynamic Exercises
                                                  </Text>
                                             </View>
                                        </View>
                                   </SafeAreaView>
                              ),
                         }}
                    />

                    {/* Start Warm-Ups Screen */}
                    <Stack.Screen
                         name="StartWarmUps"
                         options={{
                              headerShown: true,
                              headerTransparent: true,
                              header: () => (
                                   <SafeAreaView style={{ backgroundColor: 'transparent' }}>
                                        <View
                                             style={{
                                                  height: hp(8),
                                                  flexDirection: 'row',
                                                  alignItems: 'center',
                                                  backgroundColor: 'transparent',
                                                  paddingHorizontal: wp(3),
                                             }}
                                        >
                                             <TouchableOpacity
                                                  onPress={() => router.back()}
                                                  style={{ marginLeft: wp(2.5) }}
                                             >
                                                  <Ionicons name="arrow-back" size={hp(3.5)} color="white" />
                                             </TouchableOpacity>

                                             <View style={{ flex: 1, alignItems: 'center' }}>
                                                  <Text
                                                       style={{
                                                            position: 'relative',
                                                            backgroundColor: 'transparent',
                                                            left: wp(-5),
                                                            color: '#161616',
                                                            fontSize: hp(3),
                                                            fontFamily: 'Roboto-SemiBold',
                                                       }}
                                                  >
                                                       {/* Optional title here */}
                                                  </Text>
                                             </View>
                                        </View>
                                   </SafeAreaView>
                              ),
                         }}
                    />

                    {/* Dynamic Screen with ID */}
                    <Stack.Screen
                         name="[id]"
                         options={{
                              headerShown: true,
                              headerTransparent: true,
                              header: () => (
                                   <SafeAreaView style={{ backgroundColor: 'transparent' }}>
                                        <View
                                             style={{
                                                  flexDirection: 'row',
                                                  alignItems: 'center',
                                                  height: hp(8),
                                                  backgroundColor: 'transparent',
                                                  paddingHorizontal: wp(3),
                                             }}
                                        >
                                             <TouchableOpacity
                                                  onPress={() => router.back()}
                                                  style={{
                                                       flexDirection: 'row',
                                                       alignItems: 'center',
                                                       padding: 10,
                                                       marginTop: hp(2.5),
                                                       zIndex: 10,
                                                  }}
                                             >
                                                  <Ionicons name="arrow-back" size={hp(3)} color="black" />
                                                  <Text
                                                       style={{
                                                            color: 'black',
                                                            fontSize: hp(2),
                                                            marginLeft: wp(2),
                                                            fontFamily: 'Roboto-SemiBold',
                                                       }}
                                                  >
                                                       {/* Back */}
                                                  </Text>
                                             </TouchableOpacity>

                                             <View style={{ flex: 1, alignItems: 'center' }}>
                                                  <Text
                                                       style={{
                                                            color: 'black',
                                                            fontSize: hp(2.5),
                                                            fontFamily: 'Roboto-Bold',
                                                       }}
                                                  >
                                                       {/* Optional title here */}
                                                  </Text>
                                             </View>
                                        </View>
                                   </SafeAreaView>
                              ),
                         }}
                    />
               </Stack>
          </>
     );
};

export default Layout;
