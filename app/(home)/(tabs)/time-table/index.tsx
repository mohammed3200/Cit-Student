import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Header } from "@/components";
import Icons from "@/constants/Icons";
import { useNavigation,DrawerActions } from '@react-navigation/native';
import { router } from "expo-router";
import { timeTableItem,timeTable } from "@/Storage";
import { useFetch } from "@/hooks";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { configDataTimeTable } from "@/Storage";


const TimeTable = () => {
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = useState(false);
  const [Data, setData] = useState<timeTableItem>(); // useState is initialized with an empty array
  const { data, isLoading, error, refetch } = useFetch("/student/timetable");

  useEffect(() => {
    if (data) {
      setData(
        () => configDataTimeTable(data) as timeTableItem
      )
    } else if (!isLoading && !data && error) {
      // If there is an error, show a message to the user
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "خطاء",
        textBody: "يجب اعادة تسجيل الدخول",
      });
      router.replace("/Welcome");
    }},[])
  return (
    <View className="flex-1">
      <View
        style={{
          flex: 0.3,
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
          icon:Icons.menuDot,
          onPress: () => router.replace({
            pathname: "listOfCourses",
            params: {
              CurrentCourseDates: Data?.CurrentCourseDates?.map((item) => JSON.stringify(item)),
            },
          })
        }}
        />
      </View>
      <View
        style={{
          flex: 0.7,
        }}
        className="bg-primary"
      ></View>
    </View>
  );
};

export default TimeTable;
