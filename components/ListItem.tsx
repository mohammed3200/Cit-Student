import { View, Text, ViewToken } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { LectureDaysItems } from "@/Storage";

interface ListItemProps {
  viewableItems: Animated.SharedValue<ViewToken[]>;
  item: LectureDaysItems | undefined | null;
}

const ListItem: React.FC<ListItemProps> = React.memo(
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
        className="h-20 w-[90%] self-center rounded-lg mt-5"
        style={[
          {
            backgroundColor: "#78CAD2",
          },
          rStyle,
        ]}
      >
        <View className="flex-row items-center">
          <Text>{item?.NameCourse}</Text>
          <Text>{item?.CourseTeacher}</Text>
          <Text>{item?.Group}</Text>
          {item?.ClassRoom && <Text>{item?.ClassRoom}</Text>}
          {item?.Lab && <Text>{item?.Lab}</Text>}
          {item?.Hours?.map((hour)=><Text>{hour.TimeFromTo}</Text>)}
        </View>
      </Animated.View>
    );
  }
);

export default ListItem;
