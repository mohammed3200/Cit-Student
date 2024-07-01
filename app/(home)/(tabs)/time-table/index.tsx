import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "@/components";
import Icons from "@/constants/Icons";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { router } from "expo-router";
import { configDataTimeTable, timeTableItem } from "@/Storage";
import { useFetch } from "@/hooks";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Chase } from "react-native-animated-spinkit";
import ListOfCourses, { ListOfCoursesRefProps } from "./listOfCourses";

const TimeTable = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [Data, setData] = useState<timeTableItem>(); // useState is initialized with an empty array
  const { data, isLoading, error, refetch } = useFetch("/student/timetable");

  useEffect(() => {
    if (data) {
      setData(() => configDataTimeTable(data) as timeTableItem);
    } else if (!isLoading && !data && error) {
      // If there is an error, show a message to the user
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "خطاء",
        textBody: "يجب اعادة تسجيل الدخول",
      });
      router.replace("/Welcome");
    }
  }, [isLoading, data, error]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    // Assuming refetch updates the data
    if (data && !error) {
      if (data) {
        setData(() => configDataTimeTable(data) as timeTableItem);
      }
    } else if (!isLoading && !data && error) {
      // If there is an error, show a message to the user
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "خطاء",
        textBody: "يجب اعادة تسجيل الدخول",
      });
      router.replace("/Welcome");
    }
    setRefreshing(false);
  }, [data, error, refetch]);

  const ref = useRef<ListOfCoursesRefProps>(null);

  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-200);
    }
  }, []);
  return (
    <AlertNotificationRoot>
      <GestureHandlerRootView className="flex-1">
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{ height: "100%" }}
        >
          <View className="flex-1">
            <View
              style={{
                flex: 0.25,
              }}
              className="bg-Bg rounded-b-[55px]"
            >
              <Header
                title="جدول المحاضرات"
                left={{
                  icon: Icons.Dot,
                  onPress: () =>
                    navigation.dispatch(DrawerActions.openDrawer()),
                }}
                right={{
                  icon: Icons.menuDot,
                  onPress: onPress,
                }}
              />
              {isLoading ? (
                <View className="flex-1 items-center justify-center">
                  <Chase size={50} color="rgba(255,255,255,0.5)" />
                </View>
              ) : (
                <View className="flex-1 justify-center px-4 py-3">
                  <Text className="font-DNNextLTB text-lg text-primary">
                    {" "}
                    الفصل الحالي : {Data?.SemesterName}
                  </Text>
                  <Text className="font-DNNextLT text-base text-gray-300">
                    {" "}
                    الفصل الدراسي الحالي : {Data?.Semester}
                  </Text>
                </View>
              )}
            </View>
            <View
              style={{
                flex: 0.7,
              }}
              className="bg-primary"
            >
              <ListOfCourses ref={ref} />
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </AlertNotificationRoot>
  );
};

export default TimeTable;
