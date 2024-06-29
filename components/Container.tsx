import React from "react";
import { Dimensions, View, StyleSheet,Platform } from "react-native";
import { Image } from "expo-image";
import { Images } from "@/constants";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Constants from "expo-constants";

const { width, height: wHeight } = Dimensions.get("window");
const aspectRatio = 750 / 1125;
const height = width * aspectRatio;

interface ContainerProps {
  children: React.ReactNode;
  footer: React.ReactNode;
  pattern: 0 | 1 | 2;
}

const Container: React.FC<ContainerProps> = ({ children, footer,pattern }) => {
  const insets = useSafeAreaInsets();
  const asset = Images.bg_patterns[pattern]
  return (
    <View className="flex-1 bg-Bg"
     style={{ height: wHeight 
      + (Platform.OS === "android" ?  Constants.statusBarHeight : 0)


     }}>
      <StatusBar style="dark" backgroundColor={"transparent"} />
      <View className="bg-primary">
        <View
          className={`rounded-bl-[75px] overflow-hidden`}
          style={{ height: height * 0.61 }}
        >
          <Image
            source={asset}
            style={{
              width,
              height,
            }}
            className={`rounded-bl-[75px]`}
          />
        </View>
      </View>
      <View className="flex-1 overflow-hidden">
        <Image
          source={asset}
          style={{
            ...StyleSheet.absoluteFillObject,
            width,
            height,
            top: -height * 0.61,
          }}
        />
        <View
          className={`
          bg-primary
          rounded-[75px] 
          rounded-tl-none
          flex-1
          `}
        >
          {children}
        </View>
      </View>
      <View className="bg-Bg pt-4">
        {footer}
        <View style={{ height: insets.bottom }} />
      </View>
    </View>
  );
};
export default Container;
