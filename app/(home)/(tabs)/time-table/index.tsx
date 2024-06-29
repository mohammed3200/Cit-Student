import { View, Text } from "react-native";
import React from "react";
import { Header } from "@/components";
import Icons from "@/constants/Icons";

const TimeTable = () => {
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
          onPress: () => console.log("menu"),
          size: 30
        }}
        right={{
          icon:Icons.menuDot,
          onPress: () => true,
          size: 30
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
