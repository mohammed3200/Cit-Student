import { View, Text } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Images, icons } from "@/constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Container, CustomButton, Footer, TextInput } from "@/components";
import { router } from "expo-router";
import { useAuth } from "@/context";
import { usePushNotifications } from "@/hooks";
import { StatusBar } from "expo-status-bar";

const SignIn = () => {
  const [RegistrationNumber, setRegistrationNumber] = React.useState<
    string | null
  >(null);
  const [Password, setPassword] = React.useState<string | null>(null);

  const RegistrationNumberValidator = (RegistrationNumber: string): boolean => {
    if (!RegistrationNumber) {
      setRegistrationNumber(null);
      return false;
    }
    const specialCharactersRegex = /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (specialCharactersRegex.test(RegistrationNumber)) {
      setRegistrationNumber(null);
      return false;
    }

    if (RegistrationNumber.length > 9) {
      setRegistrationNumber(null);
      return false;
    }

    setRegistrationNumber(RegistrationNumber);
    return true;
  };

  const passwordValid = (Password: string): boolean => {
    if (!Password) {
      setPassword(null);
      return false;
    }
    if (Password.length < 6) {
      setPassword(null);
      return false;
    }
    setPassword(Password);
    return true;
  };

  const { onLogin } = useAuth();
  const { expoPushToken } = usePushNotifications();

  const onSubmit = async () => {
    if (RegistrationNumber && Password) {
      try {
        const result = await onLogin!(
          RegistrationNumber,
          Password,
          expoPushToken?.data
        );
        router.replace("(home)/(tabs)/time-table");
        if (result && result.message) {
          alert(result.message);
        }
      } catch (error) {
        console.error(error);
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
              isLoading={!(RegistrationNumber && Password)}
              containerStyle="w-full mt-8 flex-row"
            />
          </View>
        </Container>
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default SignIn;
