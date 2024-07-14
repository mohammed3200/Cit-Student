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
        className="h-fit w-[90%] self-center rounded-lg mt-2"
        style={
          [
            //   rStyle,
          ]
        }
      >
        <View className="flex-row-reverse h-fit w-full items-center justify-between px-2 mx-2">

          <View className="justify-self-end">
            <Text>{item?.Hours[0]?.TimeFromTo.split("-")[1]}</Text>
          </View>

          <View
            className="h-2 rounded-full w-[70%]"
            style={{
              backgroundColor: "#78CAD2",
              borderWidth: 1,
              borderColor: "#78CA92",
            }}
          />
          <View className="justify-self-start">
            <Text>
              {
                item?.Hours[item.Hours.length - 1]?.TimeFromTo.split(
                  "-"
                ).reverse()[
                  item?.Hours[item.Hours.length - 1]?.TimeFromTo.split("-")
                    .length - 1
                ]
              }
            </Text>
          </View>
        </View>

        <View className="flex-row-reverse items-center justify-between px-2">
          <View className="justify-center">
            <Text className="font-DNNextLT text-lg text-right text-black-200">
              {item?.NameCourse}
            </Text>
            <Text className="font-DNNextLT text-base text-right text-black-200">
              {item?.CourseTeacher}
            </Text>
          </View>
          <View className="justify-center">
            <Text className="font-DNNextLT text-base">
              رقم المجموعة {item?.Group}{" "}
            </Text>
            {item?.ClassRoom && (
              <Text className="font-DNNextLT text-base">{item?.ClassRoom}</Text>
            )}
            {item?.Lab && (
              <Text className="font-DNNextLT text-base">{item?.Lab}</Text>
            )}
          </View>
        </View>
      </Animated.View>
    );
  }
);

export default ListItem;
