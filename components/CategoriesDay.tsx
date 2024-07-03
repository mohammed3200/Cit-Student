import { View, Text } from "react-native";
import React from "react";
import Day from "./Day";

interface CategoriesDayProps {
  selectedDay: string;
  onDayPress: (day: { code: string; name: string; isActive: boolean }) => void;
}
const Days = [
  {
    code: "س ب",
    name: "السبت",
    isActive: true,
  },
  {
    code: "أ ح",
    name: "الأحد",
    isActive: false,
  },
  {
    code: "إ ث",
    name: "الإثنين",
    isActive: false,
  },
  {
    code: "ث ل",
    name: "الثلاثاء",
    isActive: false,
  },
  {
    code: "إ ب",
    name: "الإربعاء",
    isActive: false,
  },
  {
    code: "خ س",
    name: "الخميس",
    isActive: false,
  },
].reverse();

const CategoriesDay: React.FC<CategoriesDayProps> = ({ selectedDay, onDayPress }) => {
  return (
    <View className="flex-row justify-between items-center px-2 mt-4">
      {Days.map((item, index) => (
        <Day
          key={index.toString()}
          day={item}
          isSelected={item.code === selectedDay}
          onPress={() => onDayPress(item)}
        />
      ))}
    </View>
  );
};

export default CategoriesDay;
