import { TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "@/constants";
import { Image } from "expo-image";

interface CloseButtonProps {
  onPress: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-14 h-14
     rounded-full bg-primary
     justify-center items-center"
      activeOpacity={0.5}
    >
      <Image
        source={icons.cross}
        className="w-10 h-10 bg-Bg rounded-full"
        contentFit="contain"
        tintColor={"#F0F0F5"}
      />
    </TouchableOpacity>
  );
};

export default CloseButton;
