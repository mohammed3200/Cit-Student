import { View, Text, ViewToken } from "react-native";
import React from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { LectureDaysItems } from "@/Storage";

interface ListItemProps {
  viewableItems: Animated.SharedValue<ViewToken[]>;
  item: LectureDaysItems | undefined | null;
};

const ListItem: React.FC<ListItemProps> = React.memo(
  ({ item, viewableItems }) => {
    const isVisible = Boolean(viewableItems.value
      .filter((item) => item.isViewable)
      .find((viewableItems) => viewableItems.item === item));

    const rStyle = useAnimatedStyle(() => {
      return {
        opacity: 0.5,
      };
    }, []);

    return (
      <Animated.View
        className="h-20 w-[90%] self-center rounded-lg mt-5"
        style={[
          {
            backgroundColor: "#78CAD2",
          },
          rStyle,
        ]}
      />
    );
  }
);

export default ListItem;