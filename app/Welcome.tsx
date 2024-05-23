import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Images } from "@/constants";
import { Image } from "expo-image";
import { CustomButton, NextButton } from "@/components";
import { StatusBar } from "expo-status-bar";

interface WelcomeProps {}

const Welcome: React.FC<WelcomeProps> = () => {
  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full px-4 ">
          <Image
            source={Images.logo}
            className="w-24 h-24 rounded-2xl"
            contentFit="contain"
          />
          <Image
            source={Images.undraw_welcoming}
            className="max-w-[380px] h-[300px] w-full"
            contentFit="contain"
          />
          <View className="relative mt-5">
            <Text
              className="text-2xl text-slate-800 
                        text-center font-DNNextLTB"
            >
              ابدأ رحلتك الأكاديمية مع
            </Text>
            <Text
              className="text-2xl text-center 
                        font-DNNextLTB text-secondary-200
                        "
            >
              CIT Student
            </Text>
          </View>
          <Text className="text-sm font-DNNextLT text-gray-700 mt-7 text-center">
            أهلا بكم في تطبيقنا الذي سيجعل رحلتكم الدراسية أسهل وأكثر إنتاجية!
          </Text>
          <View className="flex-1 flex-col gap-4">
            <CustomButton
              variant="primary"
              title="تسجيل الدخول"
              onPress={() => {}}
              containerStyle="w-full mt-7"
            />
            <CustomButton
              title="تسجيل الدخول عبر رمز الاستجابة السريعة "
              onPress={() => {}}
              containerStyle="w-full mt-7"
            />
          </View>
        </View>
      </ScrollView>
      <StatusBar style="dark" backgroundColor="#F0F0F5" />
    </SafeAreaView>
  );
};

export default Welcome;
