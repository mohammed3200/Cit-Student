import { View, Text } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Container, CustomButton, Footer } from "@/components";
import { Image } from "expo-image";
import { Images } from "@/constants";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

const SigInQrCode = () => {
  const footer = (
    <Footer
      title="تسجيل الدخول باستخدام"
      onPress={() => router.replace("/sign-in")}
      action="رقم القيد و كلمة السر"
    />
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
          <Text className="text-black-200 font-DNNextLT text-sm mt-2 mb-10 text-center">
            ضع كاميرا الهاتف علي رمز الاستجابة السريعة QR code الموجود علي
            بطاقتك الجامعية للوصل لبياناتك
          </Text>

          <CustomButton
            title="سجل الدخول"
            // onPress={onSubmit}
            // variant={RegistrationNumber && Password ? "primary" : "default"}
            // isLoading={!(RegistrationNumber && Password)}
            containerStyle="w-full mt-8"
            onPress={() => {}}
          />
        </View>
      </Container>
    </SafeAreaProvider>
  );
};

export default SigInQrCode;
