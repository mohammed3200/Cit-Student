import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Images, icons } from "@/constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Container, CustomButton, Footer, TextInput } from "@/components";
import { router } from "expo-router";
import { useAuth } from "@/context";
import { usePushNotifications } from "@/hooks";
import { StatusBar } from "expo-status-bar";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [RegistrationNumber, setRegistrationNumber] = React.useState<
    string | null
  >(null);
  const [isRegistrationNumber, setIsRegistrationNumber] =
    useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [Password, setPassword] = React.useState<string | null>(null);

  const RegistrationNumberValidator = (RegistrationNumber: string): boolean => {
    if (!RegistrationNumber) {
      setRegistrationNumber(null);
      setIsRegistrationNumber(false);
      return false;
    }
    const specialCharactersRegex = /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (specialCharactersRegex.test(RegistrationNumber)) {
      setRegistrationNumber(null);
      setIsRegistrationNumber(false);
      return false;
    }

    if (RegistrationNumber.length > 9) {
      setRegistrationNumber(null);
      setIsRegistrationNumber(false);
      return false;
    }

    setRegistrationNumber(RegistrationNumber);
    return true;
  };

  const passwordValid = (Password: string): boolean => {
    if (!Password) {
      setPassword(null);
      setIsPassword(false);
      return false;
    }
    if (Password.length < 6) {
      setPassword(null);
      setIsPassword(false);
      return false;
    }
    setPassword(Password);
    return true;
  };

  useEffect(() => {
    setIsLoading(isPassword && isRegistrationNumber);
  }, [RegistrationNumber, Password]);
  const { onLogin } = useAuth();
  const { expoPushToken } = usePushNotifications();

  const onSubmit = async () => {
    if (RegistrationNumber && Password) {
      try {
        setIsLoading(true);
        const result = await onLogin!(
          RegistrationNumber,
          Password,
          expoPushToken?.data
        );
        if(result.status >= 200 || result.status <= 300)
        router.replace("(home)/(tabs)/time-table");
      } catch (error) {
        setIsLoading(false);
        setIsPassword(true);
        setIsRegistrationNumber(true);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "خطاء",
          textBody: "يرجى التأكد من البيانات المدخلة واعادة المحاولة لاحقا",
        });
      }
    }
  };
  const footer = (
    <Footer
      title="نسيت كلمة المرور التسجيل عبر"
      onPress={() => router.replace("/sign-in-Qr-code")}
      action="QrCode رمز"
    />
  );

  return (
    <SafeAreaProvider>
      <AlertNotificationRoot>
        <StatusBar style="light" />
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEnabled={true}
        >
          <Container pattern={0} {...{ footer }}>
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
                استخدام رقم القيد و كلمة المرور الخاص بك للوصول الي بياناتك
              </Text>
              <View className="mb-4 w-full">
                <TextInput
                  icon={icons.hash}
                  placeholder="ادخل رقم القيد الخاص بك"
                  validator={RegistrationNumberValidator}
                  autoCapitalize="none"
                  autoComplete={"cc-number"}
                  returnKeyType={"next"}
                  returnKeyLabel={"next"}
                />
              </View>
              <TextInput
                icon={icons.lock}
                placeholder="ادخل كلمة المرور"
                validator={passwordValid}
                isPassword={true}
                autoCapitalize="none"
                autoComplete={"password"}
                returnKeyLabel={"go"}
                returnKeyType={"go"}
              />
              <CustomButton
                title="سجل الدخول"
                onPress={onSubmit}
                variant={RegistrationNumber && Password ? "primary" : "default"}
                isLoading={isLoading}
                containerStyle="w-full mt-8"
              />
            </View>
          </Container>
        </KeyboardAwareScrollView>
      </AlertNotificationRoot>
    </SafeAreaProvider>
  );
};

export default SignIn;
