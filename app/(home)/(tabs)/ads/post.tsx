import { View, Text } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Header } from "@/components";
import { icons } from "@/constants";

const post = () => {
  const { image, title, description, period } = useLocalSearchParams();
  return (
    <>
      <View>
        <Header
          title={title as string}
          left={{
            icon: icons.arrow,
            onPress: () => router.replace("ads/index"),
          }}
          dark
        />
      </View>
    </>
  );
};

export default post;
