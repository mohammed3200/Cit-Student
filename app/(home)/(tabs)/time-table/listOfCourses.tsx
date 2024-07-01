import { View, Text, Dimensions, StyleSheet } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Header } from "@/components";
import { icons } from "@/constants";
import Svg, { Path } from "react-native-svg";

const { width } = Dimensions.get("window");
const aspectRatio = width / 375;
const height = 100 * aspectRatio;
const d = "M 0 0 A 50 50 0 0 0 50 50 H 325 A 50 50 0 0 1 375 100 V 0 Z";

const listOfCourses = () => {
  const { CurrentCourseDates } = useLocalSearchParams();
  CurrentCourseDates?.toLocaleString();
  return (
      <View className="flex-1 bg-primary">
      <View className="bg-secondary-200">
        <Header
          title="مقررات الفصل الحالي"
          left={{
            icon: icons.arrow,
            onPress: () => router.replace("time-table"),
            size: 30,
            backgroundColor: "rgba(255,255,255,0.3)",
          }}
        />
        <View className="flex-1 py-4">
          <View
            style={{ width, height }}
            className="absolute top-0 left-0 right-0"
          >
            <Svg style={StyleSheet.absoluteFill} viewBox="0 0 375 100">
              <Path d={d} fill={"#f48430"} />
            </Svg>
          </View>
        </View>
      </View>
      </View>
  );
};

export default listOfCourses;
