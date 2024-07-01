import { View, Text } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Background, Header } from "@/components";
import { icons } from "@/constants";

const post = () => {
  const { image, title, description, period } = useLocalSearchParams();
  return (
    <>
      <View
      className="flex-1 bg-primary"
      >
        <Header
          title={title as string}
          left={{
            icon: icons.arrow,
            onPress: () => router.replace("ads"),
            size:30,
            backgroundColor:"#F0F0F5"
          }}
          dark
        />
        <View
        className="flex-1"
        >
            <Background/>
        </View>


      </View>
    </>
  );
};

export default post;
