import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Images } from "@/constants";

interface CartProps {
  image: string;
  title: string;
  description: string;
  period: string;
  onPress: () => void;
}

const Cart: React.FC<CartProps> = ({
  image,
  title,
  description,
  period,
  onPress,
}) => {
  return (
    <View className="flex-row p-4 items-center">
      <View
        className="absolute bottom-2 left-3 bg-gray-200
       justify-center items-center rounded-full p-3"
      >
        <Text className="font-DNNextLT text-primary text-xs">{period}</Text>
      </View>
      <View className="flex-1 mx-4 my-2">
        <Text className="font-DNNextLTB text-base">{title}</Text>
        <Text className="font-DNNextLTB text-gray-200 text-sm">
          {description}
        </Text>
        <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
          <Text className="font-DNNextLTB text-blue-400 text-sm mt-1">
            اقرأ المزيد
          </Text>
        </TouchableOpacity>
      </View>
      <View className="w-32 h-32 rounded-lg">
        {image ? (
          <Image
            source={image}
            contentFit="cover"
            className="w-full h-full rounded-lg"
          />
        ) : (
          <Image
            source={Images.logo}
            contentFit="cover"
            className="w-full h-full rounded-lg"
          />
        )}
      </View>
    </View>
  );
};

export default Cart;
