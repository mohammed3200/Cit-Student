import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Header } from "@/components";
import Icons from "@/constants/Icons";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { router } from "expo-router";
import { timeTableItem, timeTable } from "@/Storage";
import { useFetch } from "@/hooks";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { configDataTimeTable } from "@/Storage";

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

  return (
    <AlertNotificationRoot>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ height: "100%" }}
      >
        <View className="flex-1">
          <View
            style={{
              flex: 0.2,
            }}
            className="bg-Bg rounded-b-[55px]"
          >
            <Header
              title="جدول المحاضرات"
              left={{
                icon: Icons.Dot,
                onPress: () => navigation.dispatch(DrawerActions.openDrawer()),
              }}
              right={{
                icon: Icons.menuDot,
                onPress: () =>
                  router.replace({
                    pathname: "listOfCourses",
                    params: {
                      CurrentCourseDates: Data?.CurrentCourseDates?.map(
                        (item) => JSON.stringify(item)
                      ),
                    },
                  }),
              }}
            />
            <View className="flex-1 justify-center px-4">
              <Text className="font-DNNextLTB text-lg text-primary">
                {" "}
                الفصل الحالي : {Data?.SemesterName}
              </Text>
              <Text className="font-DNNextLT text-base text-gray-300">
                {" "}
                الفصل الدراسي الحالي : {Data?.Semester}
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 0.7,
            }}
            className="bg-primary"
          ></View>
        </View>
      </ScrollView>
    </AlertNotificationRoot>
  );
};

export default TimeTable;
