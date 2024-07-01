import { View, Text, Dimensions, StyleSheet, ScrollView } from "react-native";
import React, { useCallback, useEffect } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
// const aspectRatio = width / 375;
// const height = 100 * aspectRatio;
// const d = "M 0 0 A 50 50 0 0 0 50 50 H 325 A 50 50 0 0 1 375 100 V 0 Z";

interface ListOfCoursesProps {}

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;
const ListOfCourses: React.FC<ListOfCoursesProps> = ({}) => {
  const translateY = useSharedValue(0);

  const scrollTo = useCallback((destination: number) => {
    'worklet';
    translateY.value = withSpring(destination, { damping: 50 });
  }, []);

  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 3) {
        scrollTo(0);
      } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
        scrollTo(MAX_TRANSLATE_Y);
      }
    });

  useEffect(() => {
    scrollTo(-SCREEN_HEIGHT / 3);
  }, []);

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [25, 5],
      Extrapolate.CLAMP
    );
    return {
      borderRadius,
      transform: [{ translateY: translateY.value }],
    };
  });
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        className="w-full bg-lightGray absolute rounded-t-[35px]"
        style={[
          { top: SCREEN_HEIGHT, height: SCREEN_HEIGHT },
          rBottomSheetStyle,
        ]}
      >
        <View className="w-20 h-1 bg-gray-700 self-center my-3 rounded-full" />
      </Animated.View>
    </GestureDetector>
  );
};

export default ListOfCourses;
