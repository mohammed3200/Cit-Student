import { Cart, CartContainer, Header } from "@/components";
import { icons } from "@/constants";

import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

import { useFetch } from "@/hooks";

import { configDataEvents, EventItem } from "@/Storage";

import { DrawerActions, useNavigation } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";

import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  RefreshControl,
  ScrollView,
  View,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { Chase } from "react-native-animated-spinkit";

const { width } = Dimensions.get("window");
const aspectRatio = width / 375;
const height = 100 * aspectRatio;
const d = "M 0 0 A 50 50 0 0 0 50 50 H 325 A 50 50 0 0 1 375 100 V 0 Z";

const Ads = () => {
  const navigator = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [sortUp, setSortUp] = useState<boolean>(false);
  const [Data, setData] = useState<EventItem[]>([]); // useState is initialized with an empty array
  const { data, isLoading, error, refetch } = useFetch("/event");

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setData(
        () => data.map((item: any) => configDataEvents(item)) as EventItem[]
      );
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
      if (Array.isArray(data)) {
        setData(
          () => data.map((item: any) => configDataEvents(item)) as EventItem[]
        );
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

  const trimDescription = (description: string) => {
    if (description.length > 30) {
      return description.slice(0, 30) + "...";
    }
    return description;
  };

  const SortByPeriod = (isUp: boolean) => {
    const sortedData = [...Data];
    sortedData.sort((a, b) => {
      if (isUp) {
        return a.date_pub.isBefore(b.date_pub) ? -1 : 1;
      } else {
        return a.date_pub.isAfter(b.date_pub) ? -1 : 1;
      }
    });
    setSortUp((prevSortUp) => !prevSortUp);
    setData(sortedData);
  };

  return (
    // <ScrollView
    //   refreshControl={
    //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    //   }
    //   contentContainerStyle={{ height: "100%" }}
    // >
    <AlertNotificationRoot>
      <CartContainer>
        <View className="bg-Bg">
          <Header
            title="الاعلانات"
            left={{
              icon: icons.Dot,
              onPress: () => navigator.dispatch(DrawerActions.openDrawer()),
              size: 22,
            }}
            right={{
              icon: !sortUp ? icons.sortUp : icons.sortDown,
              onPress: () => SortByPeriod(sortUp),
              size: 22,
            }}
          />
        </View>

        <View className="flex-1 py-4">
          <ScrollView
            style={{
              borderBottomLeftRadius: 55,
              borderBottomRightRadius: 55,
            }}
            contentContainerStyle={{ paddingVertical: 50 * aspectRatio }}
            showsVerticalScrollIndicator={false}
          >
            {Data.length > 0 ? (
              Data.map((item, index) => (
                <Cart
                  image={item.photo[0]}
                  title={item.Title}
                  description={trimDescription(item.Description)}
                  period={item.When}
                  onPress={() =>
                    router.replace({
                      pathname: "ads/post",
                      params: {
                        image: item.photo,
                        title: item.Title,
                        description: item.Description,
                        period: item.When,
                      },
                    })
                  }
                  key={index.toString()}
                />
              ))
            ) : (
              <View className="flex-1 w-full h-full items-center justify-self-center">
                <Chase size={80} color="#333333" />
              </View>
            )}
          </ScrollView>

          <View
            style={{ width, height }}
            className="absolute  top-0 left-0 right-0"
          >
            <Svg style={StyleSheet.absoluteFill} viewBox="0 0 375 100">
              <Path d={d} fill={"#13163e"} />
            </Svg>
          </View>
        </View>
      </CartContainer>
    </AlertNotificationRoot>
    // </ScrollView>
  );
};

export default Ads;
