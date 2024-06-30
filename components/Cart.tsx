import { View, Text } from "react-native";
import React from "react";

interface CartProps {
  image: string;
  title: string;
  description: string;
  period: string;
}

const Cart:React.FC<CartProps> = ({
    image,
    title,
    description,
    period,
}) => {
  return (
    <View
    className="flex-row p-4"
    >
      <View
      className="bg-yellow-300 w-32 h-32 rounded-lg"
      >

      </View>
    </View>
  );
};

export default Cart;
