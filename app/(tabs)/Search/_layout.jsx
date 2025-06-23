import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Layout = () => {
     const router = useRouter();

     return (
          <SafeAreaView style={styles.container}>
               <Stack>
                    <Stack.Screen name="SearchIndex" options={{ headerShown: false }} />
                    {/* <Stack.Screen
					name="[id]"
					options={{
						headerShown: true,
						headerTitleAlign: "center",
						headerTitle: "WarmUps Exercise Details",
					}}
				/> */}
                    <Stack.Screen
                         name="[id]"
                         options={{
                              headerShown: true,
                              headerTransparent: true,
                              header: () => (
                                   <View
                                        style={{
                                             height: 65,
                                             flexDirection: 'row',
                                             alignItems: 'center',
                                             backgroundColor: 'transparent',
                                             //  borderBottomWidth: 3,
                                             //  borderBottomColor: '#161616',
                                             //  paddingHorizontal: 10,
                                        }}
                                   >
                                        {/* Back Button */}

                                        <TouchableOpacity
                                             onPress={() => router.back()}
                                             style={{
                                                  marginLeft: 25,
                                             }}
                                        >
                                             <Ionicons name="arrow-back" size={28} color="black" />
                                        </TouchableOpacity>
                                        {/* Title */}
                                        <View style={{ flex: 1, alignItems: 'center' }}>
                                             <Text
                                                  style={{
                                                       position: 'relative',
                                                       top: 0,
                                                       left: -15,
                                                       color: '#161616',
                                                       fontSize: 23,
                                                       fontFamily: 'Roboto-SemiBold',
                                                       textTransform: 'capitalize',
                                                  }}
                                             >
                                                  {/* Exercise Details */}
                                             </Text>
                                        </View>
                                   </View>
                              ),
                         }}
                    />
               </Stack>
          </SafeAreaView>
     );
};

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: '#fff', // Change this to match your app's background color
     },
});
export default Layout;
