import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
interface DayProps {
  day: {
    code: string;
    name: string;
    isActive: boolean;
  };
  isSelected: boolean;
  onPress: () => void;
}

const Day: React.FC<DayProps> = ({ day: { code, name, isActive }, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      className="w-12 h-12 rounded-full justify-center items-center p-2"
      style={{
        backgroundColor: isSelected ? "#f67d38" : "#E0E0E0",
      }}
      activeOpacity={0.5}
      onPress={onPress}
    >
      {isSelected && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            borderRadius: 55,
            borderColor: "#f67d38",
            borderWidth: 2,
          }}
        />
      )}
      <View className="justify-center text-center">
        <Text
          style={{
            color: isSelected ? "white" : "gray",
          }}
          className="font-DNNextLTB text-sm"
        >
          {code}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Day