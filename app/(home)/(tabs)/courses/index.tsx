import { View, Text, ViewToken, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Header } from "@/components";
import Icons from "@/constants/Icons";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { useFetch } from "@/hooks";
import { Course, Courses } from "@/Storage";
import { useSharedValue } from "react-native-reanimated";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { router } from "expo-router";

const Courses = () => {
  const navigation = useNavigation();
  const [Data, setData] = useState<Course[]>([]); // useState is initialized with an empty array
  const { data, isLoading, error, refetch } = useFetch("/student/courses");
  const viewableItems = useSharedValue<ViewToken[]>([]);

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
    <View className="w-full h-full flex-1 justify-center items-center">
      <Header
        title="المقررات الدراسية"
        left={{
          icon: Icons.Dot,
          onPress: () => navigation.dispatch(DrawerActions.openDrawer()),
        }}
        dark
      />
      {Data.length > 0 ? (
        <FlatList
          data={Data}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 40 }}
          onViewableItemsChanged={({ viewableItems: vItems }) => {
            viewableItems.value = vItems;
          }}
          renderItem={({ item, index }) => {
            return <View></View>;
          }}
        />
      ) : null}
    </View>
  );
};

export default Courses;
