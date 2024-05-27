import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  containerStyle?: string;
  textStyle?: string;
  isLoading?: boolean;
  variant?: "default" | "primary";
}
const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  containerStyle,
  textStyle,
  isLoading = false,
  variant = "default",
}) => {
  const backgroundColor =
    variant === "primary" ? "#FF6600" : "rgba(12, 13, 52, 0.05)";
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={` 
      bg-secondary-100 rounded-full min-h-[62px] 
      justify-center items-center
      ${containerStyle && containerStyle}
            ${isLoading && "opacity-50"}
            `}
      disabled={isLoading}
      style={{ backgroundColor }}
    >
      <Text
        className={`font-DNNextLT p-4
        ${textStyle && textStyle}
        ${variant === "primary" ? "text-white font-DNNextLTB" : "text-[#0C0D34] text-md"}
      `}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
