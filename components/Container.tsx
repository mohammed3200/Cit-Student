import React from "react";
import { Dimensions, View, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { Images } from "@/constants";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const aspectRatio = 750 / 1125;
const height = width * aspectRatio;

interface ContainerProps {
  children: React.ReactNode;
  footer: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children, footer }) => {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-Bg">
      <StatusBar style="dark"  backgroundColor={'transparent'} />
      <View className="bg-primary">
        <View
          className={`rounded-bl-[75px] overflow-hidden`}
          style={{ height: height * 0.61 }}
        >
          <Image
            source={Images.bg_pattern_hex}
            style={{
              width,
              height,
            }}
            className={`rounded-bl-[75px]`}
          />
        </View>
      </View>
      <View className='flex-1 overflow-hidden'>
        <Image
          source={Images.bg_pattern_hex}
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
        <View  style={{ height: insets.bottom }} />
      </View>
    </View>
  );
};
export default Container;
