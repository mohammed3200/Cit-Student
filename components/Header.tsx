import { View, TouchableOpacity, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderProps {
  left: {
    icon: string;
    onPress: () => void;
    size?: number;
    backgroundColor?: string;
  };
  title: string;
  right?: {
    icon: string;
    onPress: () => void;
    size?: number;
    backgroundColor?: string;
  };
  dark?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  left,
  title,
  right,
  dark = false,
}) => {
  const insets = useSafeAreaInsets();
  const color = dark ? "#13163e" : "#CDCDE0";
  const backgroundColor = dark ? "#CDCDE0" : "#13163e";
  return (
    <View
      className="flex-row justify-between px-2"
      style={{ marginTop: insets.top }}
    >
      <TouchableOpacity
        style={{
          width: left.size ?? 24,
          height: left.size ?? 24,
          backgroundColor: left.backgroundColor ?? backgroundColor,
        }}
        onPress={left.onPress}
      >
        <Image
          source={left.icon}
          contentFit="contain"
          style={{
            width: left.size ? left.size * 0.8 : 18,
            height: left.size ? left.size * 0.8 : 18,
          }}
          tintColor={color}
        />
      </TouchableOpacity>

      <Text className="font-DNNextLT" style={{ color }}>
        {title}
      </Text>

      {right ? (
        <TouchableOpacity
          style={{
            width: right.size ?? 24,
            height: right.size ?? 24,
            backgroundColor: right.backgroundColor ?? backgroundColor,
          }}
          onPress={right.onPress}
        >
          <Image
            source={right.icon}
            contentFit="contain"
            style={{
              width: right.size ? right.size * 0.8 : 18,
              height: right.size ? right.size * 0.8 : 18,
            }}
            tintColor={color}
          />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

export default Header;
