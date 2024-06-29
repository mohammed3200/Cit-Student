import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { Images } from "@/constants";
import { router } from "expo-router";
import { useNavigation,DrawerActions } from '@react-navigation/native';
import { useAuth } from "@/context";
import { useFetch } from "@/hooks";
import { configDataInfoStudent } from "@/Storage/studentStrorage";
import { InfoStudentItem } from "@/Storage";
import Icons from "@/constants/Icons";
import { DrawerItem, DrawerItemProps, Header } from "@/components";

interface ProfileProps {}
const { width } = Dimensions.get("window");
export const DRAWER_WIDTH = width * 0.8;
const aspectRatio = 750 / 1125;
const height = DRAWER_WIDTH * aspectRatio;

const Profile = ({ ...props }) => {
  const navigation = useNavigation();
  const { onLogout } = useAuth();
  const [Data, setData] = useState<InfoStudentItem>();
  const [FailedToLoadImage, setFailedToLoadImage] = useState(false);
  const { data, isLoading, error, refetch } = useFetch("/student/me");
  useEffect(() => {
    // Try to toad data from storage first
    // const storedData = StorageInfoStudentGet( ) ;
    if (data) {
      setData(configDataInfoStudent(data));
      setFailedToLoadImage(false);
      // else if (!isLoading !data && error) {
      // // If there ts an error, show a message to the user
      // const errorMessage =
      // getErrorMessageFromStatusCode(parseint(error)) ;
      // alert( er rorMessage ) ;
    }
  }, [isLoading, data, error]);

  const items: DrawerItemProps[] = [
    {
      icon: Icons.hash,
      label: Data?.RegistrationNumber || "XXXXXXXX",
      color: "#2CB9B0",
    },
    {
      icon: Icons.birthday,
      label: Data?.DateOfBirth || "XXXX-XX-XX",
      color: "#338cb2",
    },
    {
      icon: Icons.email,
      label: Data?.citemail || "لا يوجد حاليا",
      color: "#3a5fb3",
    },
    {
      icon: Icons.nationality,
      label: Data?.Nationality || "غير معروف",
      color: "#4805B6",
    },
    {
      icon: Icons.gender,
      label: Data?.gender || "غير معروف",
      color: "#6407A0",
    },
    {
      icon: Icons.test,
      label: Data?.CumulativeAverage || "0",
      color: "#7F088A",
    },
    {
      icon: Icons.points,
      label: Data?.UnitsCompleted || "0",
      color: "#9B0A74",
    },
    {
      icon: Icons.phone,
      label: Data?.PhoneNumber || "XXXXXXXX",
      color: "#B60B5D",
    },
    {
      icon: Icons.signOut,
      label: "تسجيل الخروج",
      color: "#EF3533",
      onPress: () => {
        onLogout;
        router.replace("/(auth)/sign-in");
      },
    },
  ];
  return (
    <View className="flex-1">
      <View style={{ flex: 0.2 }} className="bg-primary">
        <View
          className="absolute top-0 left-0 right-0 bottom-0 
          rounded-br-[55px] bg-Bg"
        >
          <Header
            left={{
              icon: Icons.cross,
              onPress: () =>  navigation.dispatch(DrawerActions.closeDrawer())
            }}
            title="المعلومات الشخصية"
          />
        </View>
      </View>

      <View style={{ flex: 0.8 }}>
        <View className="flex-1 bg-Bg" />
        <View className="flex-1 bg-secondary-200" />
        <Image
          source={Images.bg_patterns[1]}
          style={{
            height,
            position: "absolute",
            width: DRAWER_WIDTH,
            bottom: -height * 0.61,
            left: 0,
            right: 0,
          }}
        />
        <View
          className="absolute top-0 left-0 right-0 bottom-0 
          rounded-tl-[55px] rounded-br-[55px] bg-primary
          justify-center items-end px-12"
        >
          <View
            className="bg-secondary-100
          rounded-full w-28 h-28 self-center
          absolute p-4 items-center justify-center"
            style={{
              top: -50,
              left: DRAWER_WIDTH / 2 - 50,
            }}
          >
            {!FailedToLoadImage ? (
              <Image
                source={Data?.PersonalPicture}
                className="rounded-full w-28 h-28"
                contentFit="cover"
                onError={() => {
                  setFailedToLoadImage(true);
                }}
              />
            ) : (
              <View
                className="bg-[rgba(255,255,255,0.3)]
          rounded-full w-24 h-24 self-center
          absolute p-2 items-center justify-center"
              >
                <Text className="font-DNNextLTB drop-shadow-md text-4xl text-primary">
                  {(data.StudentName?.split(" ")[0]?.charAt(0) || "") +
                    " " +
                    (data.StudentName?.split(" ")[
                      data.StudentName?.split(" ")?.length - 1
                    ]?.charAt(0) || "")}
                </Text>
              </View>
            )}
          </View>
          <View className="mt-16">
            <Text className="font-DNNextLTB text-center text-xl">
              {Data?.StudentName}
            </Text>
            <Text className="font-DNNextLTB text-center text-sm text-gray-200">
              {Data?.DepartmentName}
            </Text>
          </View>
          <View className="mt-4">
            {items.map((item) => (
              <DrawerItem key={item.color} {...item} />
            ))}
          </View>
        </View>
      </View>

      <View
        style={{
          width: DRAWER_WIDTH,
          height: height * 0.61,
        }}
        className="bg-primary overflow-hidden"
      >
        <Image
          source={Images.bg_patterns[0]}
          style={{
            width: DRAWER_WIDTH,
            height,
            borderTopLeftRadius: 55,
          }}
        />
      </View>
    </View>
  );
};

export default Profile;
