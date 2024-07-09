import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { useFetch } from "@/hooks";
import { CourseG, GradesData } from "@/Storage";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { Accordion, Header } from "@/components";
import Icons from "@/constants/Icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Chase } from "react-native-animated-spinkit";

const Grades = () => {
  const navigation = useNavigation();
  const [Data, setData] = useState<GradesData[]>([]); // useState is initialized with an empty array
  const { data, isLoading, error, refetch } = useFetch("/student/grades");

  useEffect(() => {
    if (data) {
      setData(data);
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
          <View className="flex-1 bg-primary rounded-tl-[55px] overflow-hidden">
            {Data && Data.length > 0 ? (
              <FlatList
                data={Data}
                renderItem={({ item, index }) => (
                  <View>
                    <Accordion
                      header={{
                        SemesterName: item.SemesterName,
                        SemesterNumber: item.SemesterNumber,
                      }}
                      Courses={item.Courses}
                      key={index.toString()}
                    />
                  </View>
                )}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={{
                  borderTopLeftRadius: 55,
                }}
                style={{
                  borderTopLeftRadius: 55,
                }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              />
            ) : (
              <View className="flex-1 w-full h-full items-center justify-center">
                <Chase size={100} color="#333333" />
              </View>
            )}
          </View>
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

export default Grades;
