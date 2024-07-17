import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface NextButtonProp {
  label?: string;
  variant?: "default" | "primary" | "transparent";
  onPress: () => void;
  children?: React.ReactNode;
  containerStyle?: string;
}

const NextButton: React.FC<NextButtonProp> = ({
  label,
  variant = "default",
  onPress,
  children,
  containerStyle,
}) => {
  const backgroundColor =
    variant === "primary"
      ? "#FF6600"
      : variant === "transparent"
      ? "transparent"
      : "rgba(12, 13, 52, 0.05)";

  return (
    <TouchableOpacity
      style={{ backgroundColor }}
      className={`
        h-auto py-6 justify-center
         items-center rounded-full
         ${containerStyle}
         `}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View>
        {children ? (
          children
        ) : (
          <Text
            className={`font-DNNextLT text-base text-center
                    ${variant === "primary" ? "text-white" : "text-[#0C0D34]"}
                    `}
          >
            {label}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default NextButton;
