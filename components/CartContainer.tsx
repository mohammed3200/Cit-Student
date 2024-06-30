import { View, Text, Dimensions } from "react-native";
import React from "react";
import Svg, { Path, Defs, Image, ClipPath } from "react-native-svg";
import { Images } from "@/constants";
const { width } = Dimensions.get("window");
const viewBox = {
  width: 375,
  height: 100,
};

const height = (100 * width) / viewBox.width;
const d = "M 0 100 A 50 50 0 0 1 50 50 H 325 A 50 50 0 0 0 375 0 V 100 Z";
interface CartContainerProps {
  children: React.ReactNode;
}

const CartContainer: React.FC<CartContainerProps> = ({ children }) => {
  return (
    <View className="flex-1 bg-primary">
      {children}
      <Svg
        className="absolute bottom-0 left-0 right-0"
        width={width}
        height={height}
        viewBox={[0, 0, viewBox.width, viewBox.height].join(" ")}
      >
        <Defs>
          <ClipPath id="clip">
            <Path fill={"#7DB"} d={d} />
          </ClipPath>
        </Defs>
        <Image
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          href={Images.bg_patterns[0]}
          clipPath="url(#clip)"
        />
      </Svg>
    </View>
  );
};

export default CartContainer;
