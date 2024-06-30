import { View, Text, Dimensions } from "react-native";
import React from "react";

const { width } = Dimensions.get("window");
const height = (682 * width) / 375;

interface CartContainerProps {
  children: React.ReactNode;
}

const CartContainer: React.FC<CartContainerProps> = ({ children }) => {
  return (
    <View className="flex-1 bg-Bg">
        {children}
    </View>
  );
};

export default CartContainer;
