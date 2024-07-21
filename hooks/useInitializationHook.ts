import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export const useInitialization = () => {
  const [fontsLoaded, error] = useFonts({
    "DINNextLT-Bold": require("../assets/fonts/DINNextLTArabic-Bold-4.ttf"),
    "DINNextLT-Regular": require("../assets/fonts/DINNextLTArabic-Regular-4.ttf"),
    "DINNextLT-Light": require("../assets/fonts/DINNEXTLTARABIC-LIGHT-2-2.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  return { fontsLoaded, error };
};
