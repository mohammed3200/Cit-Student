import { View, StyleSheet, Dimensions, Pressable } from "react-native";
import React, { useState } from "react";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { mix, mixColor, snapPoint } from "react-native-redash";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Image } from "expo-image";
import { Images } from "@/constants";

const { width: wWidth } = Dimensions.get("window");
const width = wWidth * 0.75;
const height = width * (425 / 294);

interface CardProps {
  positions: number;
  source: string;
}

const Card: React.FC<CardProps> = ({ positions, source }) => {
  const [imageSource, setImageSource] = useState(source);
  const [isLoading, setIsLoading] = useState(true);
  const [contentFit, setContentFit] = useState<"cover" | "contain">("cover");
  const position = useSharedValue(positions);
  const translateX = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: ({ translationX }) => {
      translateX.value = translationX;
    },
    onEnd: ({ velocityX }) => {
      translateX.value = withSpring(
        snapPoint(translateX.value, velocityX, [-width, 0, width])
      );
    },
  });
  const backgroundColor = mixColor(position.value, "#fac298", "#FF6600");
  const translateY = mix(position.value, 0, -50);
  const scale = mix(position.value, 1, 0.9);

  return (
    <>
      {isLoading && (
        <View
          style={StyleSheet.absoluteFill}
          className="justify-center items-center"
        >
          <PanGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.View
              style={{
                backgroundColor,
                width,
                height,
                transform: [{ translateY }, { translateX }, { scale }],
              }}
              className="rounded-3xl overflow-hidden"
            >
              <Image
                source={imageSource}
                style={{
                  ...StyleSheet.absoluteFillObject,
                  width: undefined,
                  height: undefined,
                }}
                contentFit={contentFit}
                onError={() => {
                  setIsLoading(false);
                  setImageSource(Images.undraw_warning);
                  setContentFit("contain");
                }}
              />
            </Animated.View>
          </PanGestureHandler>
        </View>
      )}
    </>
  );
};

export default Card;
