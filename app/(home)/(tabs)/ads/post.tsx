import { View, Text } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Background, Header } from "@/components";
import { icons } from "@/constants";
import Card from "./Card";
import { BlurView } from "expo-blur";
import { useSharedValue } from 'react-native-reanimated';

const post = () => {
  const { image, title, description, period } = useLocalSearchParams();
  return (
    <>
      <View className="flex-1 bg-primary">
        <Header
          title={title as string}
          left={{
            icon: icons.arrow,
            onPress: () => router.replace("ads"),
            size: 30,
            backgroundColor: "#F0F0F5",
          }}
          dark
        />
        <BlurView intensity={100} className="flex-1 px-4 py-2 rounded-xl">
          <Text className="font-DNNextLT text-sm text-gray-200">
            {description}
          </Text>
        </BlurView>
        <View className="flex-1">
          <Background />
          <Card positions={useSharedValue(1)} source="" />
          <Card positions={useSharedValue(0.5)} source="" />
          <Card positions={useSharedValue(0)} source="" />
        </View>
      </View>
    </>
  );
};

export default post;
