import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { CategoriesDay, Header } from "@/components";
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
import { Image } from "expo-image";
import { Images } from "@/constants";

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

  const onPressList = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-350);
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
                  onPress: onPressList,
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
              <CategoriesDay />
              <ListOfCourses ref={ref}>
                <View className="flex-row-reverse px-4">
                  <View className="w-1/4 text-wrap">
                    <Text className="font-DNNextLTB text-base text-primary text-center">
                      اسم المقرر الدراسي
                    </Text>
                  </View>
                  <View className="w-1/4 text-wrap">
                    <Text className="font-DNNextLTB text-base text-primary text-center">
                      رمز المقرر الدراسي
                    </Text>
                  </View>
                  <View className="w-1/4 text-wrap">
                    <Text className="font-DNNextLTB text-base text-primary text-center">
                      المجموعة النظري
                    </Text>
                  </View>
                  <View className="w-1/4 text-wrap">
                    <Text className="font-DNNextLTB text-base text-primary text-center">
                      المجموعة العملي
                    </Text>
                  </View>
                </View>
                <ScrollView
                  contentContainerStyle={{
                    height: "100%",
                    alignItems: "center",
                  }}
                  showsVerticalScrollIndicator={false}
                  style={{ marginTop: 20 }}
                >
                  {Data ? (
                    Data?.CurrentCourseDates?.map((item, index) => (
                      <View
                        className="w-full items-center"
                        key={index.toString()}
                      >
                        <View className="w-full flex-row-reverse px-4 items-center">
                          <View className="w-1/4 text-wrap">
                            <Text className="font-DNNextLT text-lg text-black-200 text-center">
                              {item.NameCourse}
                            </Text>
                          </View>
                          <View className="w-1/4 text-wrap">
                            <Text
                              className="font-DNNextLT text-lg text-black-200 text-center"
                              // How to reverse writing from left to right
                              style={{ writingDirection: "rtl" }}
                            >
                              {item.CodeCourse}
                            </Text>
                          </View>
                          <View className="w-1/4 text-wrap">
                            <Text className="font-DNNextLT text-lg text-black-200 text-center">
                              {item.GroupTheoretical ?? "-"}
                            </Text>
                          </View>
                          <View className="w-1/4 text-wrap">
                            <Text className="font-DNNextLT text-lg text-black-200 text-center">
                              {item.GroupPractical ?? "-"}
                            </Text>
                          </View>
                        </View>
                        <View
                          className="w-[90%] h-[2px] rounded-full px-2 my-2 bg-gray"
                          key={Math.round(Math.random() * 100).toString()}
                        />
                      </View>
                    ))
                  ) : (
                    <View
                      className="flex-1 absolute top-10 right-0 left-0
                    justify-center items-center
                    p-8
                    "
                    >
                      <Image
                        source={Images.undraw_empty}
                        contentFit="contain"
                        className="w-52 h-52"
                      />
                      <Text className="font-DNNextLT text-lg text-black-200 text-center mt-6">
                        لا يوجد مواد في الوقت الحالي
                      </Text>
                    </View>
                  )}
                </ScrollView>
              </ListOfCourses>
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </AlertNotificationRoot>
  );
};

export default TimeTable;
