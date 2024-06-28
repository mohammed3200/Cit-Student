import { View, Text } from "react-native";
import React, { useRef, useState } from "react";
import { Path } from "react-native-svg";
import Animated, { useAnimatedProps, Easing } from "react-native-reanimated";

interface AnimatedStrokeProps {
  d: string;
  progress: Animated.SharedValue<number>;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);
const colors = ["#FFC27A", "#7EDAB9", "#45A6E5", "#FE8777"];

const AnimatedStroke: React.FC<AnimatedStrokeProps> = ({ d, progress }) => {
  const stroke = colors[Math.round(Math.random() * (colors.length - 1))];
  const [length, setLength] = useState(0);
  const ref = useRef<typeof AnimatedPath>(null);

  const bgStrokeAnimation = useAnimatedProps(() => ({
    strokeDashoffset: length - length * Easing.ease(progress.value),
  }));

  const strokeAnimation = useAnimatedProps(() => ({
    strokeDashoffset: length - length * Easing.ease(progress.value)
  }));

  return (
    <>
    <AnimatedPath
        animatedProps={strokeAnimation}
        d={d}
        stroke={stroke}
        strokeWidth={10}
        fill={"#F0F0F5"}
        strokeDasharray={length}
      />
      
    <AnimatedPath
        animatedProps={bgStrokeAnimation}
        onLayout={() => setLength(ref.current?.getTotalLength() || 0)}
        ref={ref}
        d={d}
        stroke={stroke}
        strokeWidth={10}
        fill={"#F0F0F5"}
        strokeDasharray={length}
      />
      
    </>
  );
};

export default AnimatedStroke;