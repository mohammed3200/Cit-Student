import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { icons } from "@/constants";
import * as Linking from "expo-linking";

interface SocialLoginProps {}

interface SocialIconProps {
  children: React.ReactNode;
  onPress?: () => void;
}
const SocialIcon: React.FC<SocialIconProps> = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      className="
      w-12 h-12
       rounded-full 
        justify-center 
        items-center
         mx-2
          bg-primary"
      onPress={onPress}
      activeOpacity={0.5}
    >
      {children}
    </TouchableOpacity>
  );
};

const SocialLogin: React.FC<SocialLoginProps> = () => {
  return (
    <View className="flex-row justify-center ">
      <SocialIcon onPress={() => Linking.openURL("https://www.facebook.com/citmisurata/?locale=ar_AR")}>
        <Image
          source={icons.facebook}
          contentFit="contain"
          className="w-7 h-7"
        />
      </SocialIcon>
      <SocialIcon onPress={() => Linking.openURL("https://cit.edu.ly")}>
        <Image source={icons.web} contentFit="contain" className="w-7 h-7" />
      </SocialIcon>
    </View>
  );
};

export default SocialLogin;
