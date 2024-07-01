import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";

interface DayProps {
  day: {
    code: string;
    name: string;
    isActive: boolean;
  };
}

const Day: React.FC<DayProps> = ({ day: { code, name, isActive } }) => {
  const [selected, setSelected] = useState(false);
  return (
    <TouchableOpacity
      className="w-12 h-12 rounded-full justify-center items-center p-2"
      style={{
        backgroundColor: isActive ? "#f67d38" : "#E0E0E0",
      }}
      activeOpacity={0.5}
      onPress={() => setSelected((perv) => !perv)}
    >
      {selected && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            borderRadius: 55,
            borderColor: isActive ? "#f67d38" : "#E0E0E0",
            borderWidth: 1,
          }}
        />
      )}
      <View className="justify-center items-center">
        <Text
          style={{
            color: isActive ? "white" : "gray",
          }}
          className="font-DNNextLTB text-sm"
        >
          {code}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Day;
