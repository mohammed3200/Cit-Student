import { View, Text, TouchableWithoutFeedback, Animated } from "react-native";
import React, { useState } from "react";
import { CourseG } from "@/Storage";
import { Image } from "expo-image";
import { icons } from "@/constants";

interface AccordionProps {
  header: {
    SemesterName: string;
    SemesterNumber: number;
  };
  Courses: CourseG[];
}

const Accordion: React.FC<AccordionProps> = ({ header, Courses }) => {
  const [opened, setOpened] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const toggleAccordion = () => {
    if (!opened) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    setOpened(!opened);
  };

  const heightAnimationInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, (Courses.length ** 2 / 2.6) * 10],
  });

  return (
    <View className="m-4 p-3 bg-lightGray rounded-lg">
      <TouchableWithoutFeedback onPress={toggleAccordion}>
        <View className="flex-row-reverse items-center justify-between px-2">
          <View className="flex-col justify-between">
            <View>
              <Text className="font-DNNextLT text-xl text-right text-black-100 text-wrap">
                {header.SemesterName}
              </Text>
            </View>
            <Text className="font-DNNextLT text-sm text-right text-black-200 text-wrap">
              رقم الفصل الدراسي : {header.SemesterNumber}
            </Text>
          </View>
          <Image
            source={opened ? icons.arrowUp : icons.arrowDown}
            className="w-8 h-8"
            contentFit="contain"
          />
        </View>
      </TouchableWithoutFeedback>

      <Animated.View
        style={{ height: heightAnimationInterpolation }}
        className="py-2 my-1"
      >
        {Courses.map((item, index) => (
          <View
            className="flex-row-reverse justify-between items-center py-2"
            key={index.toString()}
          >
            <View className="h-fit w-28">
              <Text className="font-DNNextLT text-right text-lg text-wrap text-black-100">
                {item.Title}
              </Text>

              <Text className="font-DNNextLT text-right text-base text-wrap text-black-200">
                {item.Code}
              </Text>
            </View>

            <Text className="font-DNNextLT text-right text-base text-wrap text-black-100">
              {item.CourseUnits}
            </Text>

            <Text className="font-DNNextLT text-right text-base text-wrap text-black-100">
              {item.ScheduledMark}
            </Text>
            {item?.IsCompleted ? (
              <View className="flex-col py-1">
                <View className="w-8 h-8 rounded-full justify-center items-center">
                  <Image
                    source={icons.check}
                    className="bg-primary h-6 w-6 rounded-full"
                    tintColor={"#26b1a4"}
                  />
                </View>
                <Text className="font-DNNextLT text-ms text-black-200">
                  منجز
                </Text>
              </View>
            ) : (
              <View>
                <View className="w-8 h-8 rounded-full justify-center items-center">
                  <Image
                    source={icons.crossCircle}
                    className="bg-primary h-6 w-6 rounded-full"
                    tintColor={"#f70e0d"}
                  />
                </View>
                <Text className="font-DNNextLT text-sm text-black-200">
                  غير منجز
                </Text>
              </View>
            )}
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

export default Accordion;
