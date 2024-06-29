import { View, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Images } from "@/constants";

interface ProfileProps {}
const { width } = Dimensions.get("window");
export const DRAWER_WIDTH = width * 0.8;
const aspectRatio = 750 / 1125;
const height = DRAWER_WIDTH * aspectRatio;

const Profile = ({ ...props }) => {
  return (
    <View className="flex-1">
      <View style={{ flex: 0.2 }} className="bg-primary">
        <View
          className="absolute top-0 left-0 right-0 bottom-0 
          rounded-br-[55px] bg-Bg"
        />
      </View>
      <View style={{ flex: 0.8 }}>
        <View className="flex-1 bg-Bg" />
        <View className="flex-1 bg-secondary-200" />
        <Image
          source={Images.bg_patterns[1]}
          style={{
            height,
            position: "absolute",
            width: DRAWER_WIDTH,
            bottom: -height * 0.61,
            left: 0,
            right: 0,
          }}
        />
        <View
          className="absolute top-0 left-0 right-0 bottom-0 
          rounded-tl-[55px] rounded-br-[55px] bg-primary"
        ></View>
      </View>

      <View
        style={{
          width: DRAWER_WIDTH,
          height: height * 0.61,
        }}
        className="bg-primary overflow-hidden"
      >
        <Image
          source={Images.bg_patterns[0]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: -height * (1 - 0.61),
            width: DRAWER_WIDTH,
            height,
            borderTopLeftRadius: 55,
          }}
        />
      </View>
    </View>
  );
};

export default Profile;
