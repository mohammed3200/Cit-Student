import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";
import { Images } from "@/constants";
import { Image } from "expo-image";
import { StrokeAnimation } from "@/components";

const Page = () => {

  useEffect(() => {
    const OnboardingStart = () => {
        setTimeout(() => {
          router.replace("/Onboarding");
        }, 4000);
    };

    OnboardingStart();
  }, []);
  return (
    <>
      <View
        className="flex-1 w-full justify-center 
        items-center h-full py-5"
      >
        {/* <Image
          source={Images.logo}
          className="w-36 h-36 rounded-2xl"
          contentFit="contain"
        />
        <View className="mt-24 block"> */}
        <StrokeAnimation />
        {/* </View> */}
      </View>
    </>
  );
};

export default Page;
