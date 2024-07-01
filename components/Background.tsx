import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Images } from "@/constants";

interface BackgroundProps {
  backgroundColor?: string;
}

const Background: React.FC<BackgroundProps> = ({ backgroundColor }) => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <View
        style={{
          flex: 1 / 3,
          backgroundColor: backgroundColor ? backgroundColor : "#F0F0F5",
        }}
      >
        <Image
          source={Images.bg_patterns[2]}
          style={{
            ...StyleSheet.absoluteFillObject,
            width: undefined,
            height: undefined,
          }}
        />
        <View
          className="flex-1 rounded-br-[55px]"
          style={{
            backgroundColor: backgroundColor ? backgroundColor : "#F0F0F5",
          }}
        />
      </View>
      <View style={{ flex: 1 / 3 }}>
        <View
          className="flex-1 "
          style={{
            backgroundColor: backgroundColor ? backgroundColor : "#F0F0F5",
          }}
        />
        <View className="flex-1 bg-Bg" />
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
      <View style={{ flex: 1 / 3 }}>
        <Image
          source={Images.bg_patterns[2]}
          style={{
            ...StyleSheet.absoluteFillObject,
            width: undefined,
            height: undefined,
          }}
        />
        <View className="flex-1 bg-Bg rounded-tl-[55px]" />
      </View>
    </View>
  );
};

export default Background;
