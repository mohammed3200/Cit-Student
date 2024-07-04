import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { useFetch } from "@/hooks";
import { GradesData } from "@/Storage/interfaces/Grades";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { Header } from "@/components";
import Icons from "@/constants/Icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";

const Grades = () => {
  const navigation = useNavigation();
  const [Data, setData] = useState<GradesData[]>([]); // useState is initialized with an empty array
  const { data, isLoading, error, refetch } = useFetch("/student/grades");

  useEffect(() => {
    if (data) {
      setData(() => data?.Courses);
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

  return (
    <AlertNotificationRoot>
      <View className="w-full h-full flex-1 bg-primary">
        <View
          className="bg-Bg rounded-br-[55px]"
          style={{
            flex: 0.2,
          }}
        >
          <Header
            title="كشف الدرجات"
            left={{
              icon: Icons.Dot,
              onPress: () => navigation.dispatch(DrawerActions.openDrawer()),
            }}
          />
        </View>
        <View className="flex-1 bg-Bg">
          <View className="flex-1 bg-primary rounded-tl-[55px]">




          </View>
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

export default Grades;
