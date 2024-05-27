import { View, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import SocialLogin from "./SocialLogin";
import NextButton from "./NextButton";
import { router } from "expo-router";

interface FooterProps {
  onPress: () => void;
  title: string;
  action: string;
}

const Footer: React.FC<FooterProps> = ({ onPress, title, action }) => {
  return (
    <>
      <SocialLogin />
      <View className="items-center m-4 ">
        <TouchableWithoutFeedback {...{onPress}}>
          <View className="flex-row-reverse justify-center">
            <Text className="text-primary font-DNNextLT">
              {title}{" "}
            </Text>
              <Text className="text-secondary-100 font-DNNextLT">
                {action}
              </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

export default Footer;
