import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { icons } from "@/constants";

interface SocialLoginProps {}

interface SocialIconProps {
  children: React.ReactNode;
}
const SocialIcon = ({ children }: SocialIconProps) => {
  return (
    <View
      className="
      w-12 h-12
       rounded-full 
        justify-center 
        items-center
         mx-2
          bg-primary"
    >
      {children}
    </View>
  );
};

const SocialLogin: React.FC<SocialLoginProps> = () => {
  return (
    <View className="flex-row justify-center ">
      <SocialIcon>
        <Image
          source={icons.facebook}
          contentFit="contain"
          className="w-7 h-7"
        />
      </SocialIcon>
      <SocialIcon>
        <Image source={icons.web} contentFit="contain" className="w-7 h-7" />
      </SocialIcon>
    </View>
  );
};

export default SocialLogin;
