import { View, Text, ViewToken } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Image } from "expo-image";
import { icons } from "@/constants";

export interface Course {
  Title: string;
  Code: string;
  CourseUnits: number;
  IsCompleted: boolean;
  Prerequisites: null | string;
}
interface ListItemCourseProps {
  viewableItems: Animated.SharedValue<ViewToken[]>;
  item: Course | undefined | null;
}

const ListItemCourse: React.FC<ListItemCourseProps> = React.memo(
  ({ item, viewableItems }) => {
    const isVisible: boolean = Boolean(
      viewableItems.value
        .filter((item) => item.isViewable)
        .find((viewableItem) => viewableItem.item?.Code == item?.Code)
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
        className="h-fit w-[90%] self-center"
        style={[
          {
            // backgroundColor: "#78CAD2",
          },
          //   rStyle,
        ]}
      >
        <View className="flex-row-reverse items-center justify-between px-2">
          <View className="w-28 h-fit">
            <Text className="font-DNNextLT text-right text-lg text-black-100 text-wrap">
              {item?.Title}
            </Text>
            <Text className="font-DNNextLT text-right text-base text-black-200">
              {item?.Code}
            </Text>
          </View>

          {item?.Prerequisites ? (
            <View>
              <Text className="font-DNNextLT text-black-100 text-base text-wrap">
                {item?.Prerequisites}
              </Text>
            </View>
          ) : (
            <View />
          )}

          <Text className="font-DNNextLT text-black-100 text-base">
            {item?.CourseUnits} وحدات
          </Text>
          <View>
            <View className="w-8 h-8 rounded-full justify-center items-center">
              <Image
                source={item?.IsCompleted ? icons.check : icons.crossCircle}
                className="bg-primary h-6 w-6"
                tintColor={item?.IsCompleted ? "#26b1a4" : "#f70e0d"}
              />
            </View>
            <Text className="font-DNNextLT text-ms text-black-200">
              {item?.IsCompleted ? "منجز" : "غير منجز"}
            </Text>
          </View>
        </View>
        <View className="w-[85%] rounded-full h-1 bg-black-100 my-2 self-center" />
      </Animated.View>
    );
  }
);

export default ListItemCourse;
