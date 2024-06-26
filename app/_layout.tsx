import { AuthProvider } from '@/context';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "DINNextLT-Bold": require("../assets/fonts/DINNextLTArabic-Bold-4.ttf"),
    "DINNextLT-Regular": require("../assets/fonts/DINNextLTArabic-Regular-4.ttf"),
    "DINNextLT-Light": require("../assets/fonts/DINNEXTLTARABIC-LIGHT-2-2.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false}}/>
      <Stack.Screen name="Onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="Welcome" options={{ headerShown: false }} />
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
    </Stack>

  );
}
const RootLayoutNav = () => {
  return (
      <AuthProvider>
        <InitialLayout />
      </AuthProvider>
  );
}
export default RootLayoutNav;
