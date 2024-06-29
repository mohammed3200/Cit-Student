import { View, Text } from "react-native";
import React from "react";
import { Header } from "@/components";
import Icons from "@/constants/Icons";
import { useNavigation,DrawerActions } from '@react-navigation/native';

const TimeTable = () => {
  const navigation = useNavigation()
  return (
    <View className="flex-1">
      <View
        style={{
          flex: 0.3,
        }}
        className="bg-Bg rounded-b-[55px]"
      >
        <Header
        title="جدول المحاضرات"
        left={{
          icon: Icons.Dot,
          onPress: () => navigation.dispatch(DrawerActions.openDrawer()),
        }}
        right={{
          icon:Icons.menuDot,
          onPress: () => true,
        }}
        />
      </View>
      <View
        style={{
          flex: 0.7,
        }}
        className="bg-primary"
      ></View>
    </View>
  );
};

export default TimeTable;
