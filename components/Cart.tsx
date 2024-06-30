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
    period
}) => {
  return (
    <View>
      <Text>Cart</Text>
    </View>
  );
};

export default Cart;
