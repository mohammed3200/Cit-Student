import { View, Dimensions, StyleSheet, Easing } from "react-native";
import React, { useRef, useState } from "react";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";
import Svg, { Path, Defs, Stop, LinearGradient } from "react-native-svg";

interface AnimatedLogoProps {
  progress: Animated.SharedValue<number>;
}

const vWidth = 711;
const vHeight = 670;
const width = Dimensions.get("window").width - 64;
const height = (width * vHeight) / vWidth;

const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ progress }) => {
  const part1 = useDerivedValue(() =>
    Easing.inOut(Easing.ease)(
      interpolate(progress.value, [0, 0.5], [0, 1], Extrapolation.CLAMP)
    )
  );

  const part2 = useDerivedValue(() =>
    Easing.inOut(Easing.ease)(
      interpolate(progress.value, [0.5, 1], [0, 1], Extrapolation.CLAMP)
    )
  );

  const strokeAnimation = () => {
    "worklet";
    return {strokeDashoffset: length - length * part1.value}
  }

  const animatedProps1 = useAnimatedProps(animatedProps1);
  const animatedProps2 = useAnimatedProps(animatedProps2);
  const animatedProps3 = useAnimatedProps(animatedProps3);
  const [length, setLength] = useState(0);
  const ref = useRef<typeof AnimatedPath>(null);

  return (
    <>
      <View>
        <Animated.View>
          <Svg
            width={width}
            height={height}
            viewBox={`0 0 ${vWidth} ${vHeight}`}
          >
            <AnimatedPath
              onLayout={() => setLength(ref.current?.getTotalLength() || 0)}
              ref={ref}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M25 0C11.1929 0 0 11.1929 0 25V645C0 658.807 11.1929 670 25 670H686C699.807 670 711 658.807 711 645V25C711 11.1929 699.807 0 686 0H25ZM356 639C523.895 639 660 502.895 660 335C660 167.105 523.895 31 356 31C188.105 31 52 167.105 52 335C52 502.895 188.105 639 356 639Z"
              fill="url(#paint0_linear_34_8)"
              strokeDasharray={length}
              strokeDashoffset={length / 2}
            />
            <Defs>
              <LinearGradient
                id="paint0_linear_34_8"
                x1="355.5"
                y1="0"
                x2="355.5"
                y2="670"
                gradientUnits="userSpaceOnUse"
              >
                <Stop stopColor="#F18E29" />
                <Stop offset="1" stopColor="#F96E45" />
              </LinearGradient>
            </Defs>
          </Svg>
        </Animated.View>

        <Animated.View style={[StyleSheet.absoluteFill]}>
          <Svg
            width={width}
            height={height}
            viewBox={`0 0 ${vWidth} ${vHeight}`}
          >
            <AnimatedPath
              fillRule="evenodd"
              clipRule="evenodd"
              d="M25 0C11.1929 0 0 11.1929 0 25V645C0 658.807 11.1929 670 25 670H686C699.807 670 711 658.807 711 645V25C711 11.1929 699.807 0 686 0H25ZM356 639C523.895 639 660 502.895 660 335C660 167.105 523.895 31 356 31C188.105 31 52 167.105 52 335C52 502.895 188.105 639 356 639Z"
              fill="url(#paint0_linear_34_8)"
              strokeDasharray={length}
              strokeDashoffset={length / 2}
            />
            <Defs>
              <LinearGradient
                id="paint0_linear_34_8"
                x1="355.5"
                y1="0"
                x2="355.5"
                y2="670"
                gradientUnits="userSpaceOnUse"
              >
                <Stop stopColor="#F18E29" />
                <Stop offset="1" stopColor="#F96E45" />
              </LinearGradient>
            </Defs>
          </Svg>
        </Animated.View>
      </View>
    </>
  );
};

export default AnimatedLogo;
