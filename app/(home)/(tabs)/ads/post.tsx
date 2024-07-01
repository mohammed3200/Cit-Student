import { View, Text, ScrollView } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Background, Header } from "@/components";
import { icons } from "@/constants";
import Card from "./Card";
import { BlurView } from "expo-blur";
import { useSharedValue } from "react-native-reanimated";

const post = () => {
  const { image, title, description, period } = useLocalSearchParams();
  const photo = image?.toString().split(",");
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
        <View className="flex-1">
          <Background />
          <ScrollView
            style={{
              borderBottomLeftRadius: 55,
              borderBottomRightRadius: 55,
              height: undefined,
            }}
            contentContainerStyle={{ paddingVertical: 15, height: undefined }}
            showsVerticalScrollIndicator={false}
          >
            <BlurView
              intensity={100}
              style={{ borderRadius: 20 }}
              className="m-6 h-fit w-fit px-4 py-2 rounded-xl"
            >
              <Text className="font-DNNextLT text-sm text-gray-200">
                {description}
              </Text>
            </BlurView>
          </ScrollView>
          <View className="flex-1">
            {image && Array.isArray(photo)
              ? photo.map((item) => (
                  <Card
                    positions={useSharedValue(1)}
                    source={item}
                    key={item}
                  />
                ))
              : null}
          </View>
        </View>
      </View>
    </>
  );
};

export default post;
