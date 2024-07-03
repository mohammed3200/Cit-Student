import { View, Text, ViewToken } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Course } from "@/Storage";

interface ListItemCourseProps {
  viewableItems: Animated.SharedValue<ViewToken[]>;
  item: Course | undefined | null;
}

const ListItemCourse: React.FC<ListItemCourseProps> = React.memo(
  ({ item, viewableItems }) => {
    const isVisible: boolean = Boolean(
      viewableItems.value
        .filter((item) => item.isViewable)
        .find((viewableItems) => viewableItems.item === item)
    );
    const rStyle = useAnimatedStyle(() => {
      return {
        opacity: withTiming(isVisible ? 1 : 0),
        transform: [
          {
            scale: withTiming(isVisible ? 1 : 0.6),
          },
        ],
      };
    }, []);

    return (
      <Animated.View
        className="h-20 w-[90%] self-center rounded-lg mt-2"
        style={[
          {
            backgroundColor: "#78CAD2",
          },
          rStyle,
        ]}
      >


      </Animated.View>
    );
  }
);

export default ListItemCourse;
