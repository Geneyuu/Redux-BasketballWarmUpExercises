import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from '../app/store/store';

if (global.HermesInternal) {
     console.log('Hermes is enabled!');
} else {
     console.log('Hermes is NOT enabled');
}

export default function RootLayout() {
     return (
          <Provider store={store}>
               <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
               <SafeAreaProvider>
                    <Stack>
                         <Stack.Screen name="index" options={{ headerShown: false }} />
                         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                         <Stack.Screen name="OnBoarding" options={{ headerShown: false }} />
                    </Stack>
               </SafeAreaProvider>
          </Provider>
     );
}
