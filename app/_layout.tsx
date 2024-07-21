import { AuthProvider, useAuth } from "@/context";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useInitialization } from "@/hooks";

const InitialLayout = () => {
  const { fontsLoaded, error } = useInitialization();

  useEffect(() => {
    // Prevent the splash screen from auto-hiding before asset loading is complete.
    SplashScreen.preventAutoHideAsync();
  }, []);

  if (!fontsLoaded && !error) return null;
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="Welcome" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
    </Stack>
  );
};
const RootLayoutNav = () => {
  const { authState } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const inTabsGroup = segments[0] === "Onboarding";
    if (!authState?.authenticated && inTabsGroup) {
      router.replace("/(home)/(tabs)/time-table");
    } else if (
      authState?.authenticated === false &&
      typeof authState?.token == "string"
    ) {
      router.replace("/(auth)/sign-in");
    } else if (authState?.token === null) {
      router.replace("/Onboarding");
    }

  }, [authState?.authenticated, segments, router]);
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
};
export default RootLayoutNav;
