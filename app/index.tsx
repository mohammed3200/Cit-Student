import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { router,Link } from "expo-router";
import { Images } from "@/constants";
import { Image } from "expo-image";
import { useAuth } from "@/context";

import { StrokeAnimation } from "@/components";

const Page = () => {
  // const {authState} = useAuth();
  // useEffect(()=>{
  //   if(!authState?.token) router.replace("/Onboarding");
  //   if(authState?.token && !authState.authenticated) router.replace("/(auth)/sign-in");
  //   if(authState?.token && authState.token) router.replace("/(home)/(tabs)/time-table");
  // },[])
  return (
    <>
      <View
        className="flex-1 w-full justify-center 
        items-center h-full py-5"
      >
        <Image
          source={Images.logo}
          className="w-36 h-36 rounded-2xl"
          contentFit="contain"
        />
        {/* <View className="mt-24 block">
          <StrokeAnimation />
        </View> */}
        <Link href="/Onboarding">
            <Text>Go Onboarding</Text>
          </Link>
          <Link href="/(home)/(tabs)/grades">
            <Text>Go grades</Text>
          </Link>
      </View>
    </>
  );
};

export default Page;
