import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Chase } from "react-native-animated-spinkit";

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
      activeOpacity={0.5}
      className={` 
      bg-secondary-100 rounded-full min-h-[62px] 
      justify-center items-center
      ${containerStyle && containerStyle}
            
            `}
      disabled={!isLoading}
      style={{
        backgroundColor: !isLoading ? "rgba(12, 13, 52, 0.05)" : backgroundColor,
      }}
    >
      {!isLoading && (
        <View className="mr-8">
          <Chase size={24} color="#333333" />
        </View>
      )}
      <Text
        className={`font-DNNextLT p-4 self-center justify-self-center
        ${textStyle && textStyle}
        ${
          variant === "primary" && !isLoading
            ? "text-white font-DNNextLTB"
            : "text-[#0C0D34] text-md"
        }
      `}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
