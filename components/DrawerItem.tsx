import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";

interface DrawerItemProps {
  icon: string;
  color: string;
  label: string;
  onPress?: () => void;
}

const DrawerItem: React.FC<DrawerItemProps> = ({
  icon,
  color,
  label,
  onPress,
}) => {
  return (
    <View>
      <View className="flex-row-reverse py-1">

          <View
            className="w-8 h-8 items-center justify-center rounded-full"
            style={{ backgroundColor: color }}
          >
            <Image
              source={icon}
              contentFit="contain"
              className="w-4 h-4"
              tintColor={"#f0f0f5"}
            />
          </View>
          <TouchableOpacity
          className="mr-4"
          onPress={onPress}
          activeOpacity={0.5}
        >
          <Text className="font-DNNextLTB text-sm">{label}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DrawerItem;
