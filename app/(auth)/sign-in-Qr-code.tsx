import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Container,
  CustomButton,
  CloseButton,
  QrCodeScanner,
} from "@/components";
import { Image } from "expo-image";
import { Images } from "@/constants";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@/context";
import { usePushNotifications } from "@/hooks";

const SigInQrCode = () => {
  const { onLoginByQrCode } = useAuth();
  const { expoPushToken } = usePushNotifications();
  const [qrCode, setQrCode] = useState<string | null>("");

  const QrCodeStringValidator = (QrCodeString: string): boolean => {
    if (!QrCodeString) {
      setQrCode(null);
      return false;
    }
    const specialCharactersRegex = /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (specialCharactersRegex.test(QrCodeString)) {
      setQrCode(null);
      return false;
    }
    if (QrCodeString.length < 15) {
      setQrCode(null);
      return false;
    }
    setQrCode(QrCodeString);
    console.log("signin",QrCodeString);
    return true;
  };
  const onSubmit = async () => {
    if (qrCode) {
      try {
        const result = await onLoginByQrCode!(qrCode, expoPushToken?.data);
        console.log(result);
        router.replace("/(tabs)/time-table");
        if (result && result.message) {
          alert(result.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const footer = (
    <View className="flex-row justify-center py-3">
      <CloseButton
        onPress={() => {
          router.replace("/sign-in");
        }}
      />
    </View>
  );

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Container pattern={2} {...{ footer }}>
        <View className="px-8 py-4 items-center">
          <Image
            source={Images.logo}
            className="w-24 h-24 rounded-full my-2"
            contentFit="cover"
          />
          <Text className="text-black-100 font-DNNextLTB text-xl">
            مرحبا بعودتك
          </Text>
          <Text className="text-black-200 font-DNNextLT text-sm mt-2 mb-8 text-center">
            ضع كاميرا الهاتف علي رمز الاستجابة السريعة QR code الموجود علي
            بطاقتك الجامعية للوصل لبياناتك
          </Text>
          <QrCodeScanner 
          validator={QrCodeStringValidator}
          onValidQrCode={setQrCode}
          />
          <CustomButton
            title="سجل الدخول"
            variant={qrCode ? "primary" : "default"}
            isLoading={!qrCode}
            containerStyle="w-full mt-4"
            onPress={onSubmit}
          />
        </View>
      </Container>
    </SafeAreaProvider>
  );
};

export default SigInQrCode;
