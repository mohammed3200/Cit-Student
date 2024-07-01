import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Images } from "@/constants";

interface BackgroundProps {}

const Background = () => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={{ flex: 1 / 3 }} className="bg-primary">
          <Image
            source={Images.bg_patterns[2]}
            style={{
              ...StyleSheet.absoluteFillObject,
              width: undefined,
              height: undefined,
            }}
          />
        <View className="flex-1 bg-primary rounded-br-[55px]" />
      </View>
      <View style={{ flex: 1 / 3 }}>
      <View className="flex-1 bg-primary"/>
      <View className="flex-1 bg-Bg"/>
        <Image
          source={Images.bg_patterns[1]}
          style={{
            ...StyleSheet.absoluteFillObject,
            width: undefined,
            height: undefined,
          }}
          className="rounded-tl-[55px] rounded-br-[55px]"
        />
      </View>
      <View style={{ flex: 1 / 3 }} >
      <Image
          source={Images.bg_patterns[2]}
          style={{
            ...StyleSheet.absoluteFillObject,
            width: undefined,
            height: undefined,
          }}
        />
        <View
        className="flex-1 bg-Bg rounded-tl-[55px]"
        />
      </View>
    </View>
  );
};

export default Background;
