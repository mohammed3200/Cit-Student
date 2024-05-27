import { View, Text} from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { Images, icons } from "@/constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Container,
  CustomButton,
  NextButton,
  SocialLogin,
  TextInput,
} from "@/components";
import { router } from "expo-router";

const SignIn = () => {
  const [RegistrationNumber, setRegistrationNumber] =
    React.useState<boolean>(false);
  const [Password, setPassword] = React.useState<boolean>(false);
  const RegistrationNumberValidator = (RegistrationNumber: string): boolean => {
    // 1. Ensure the value is not null
    if (!RegistrationNumber) {
      setRegistrationNumber(false);
      return false;
    }

    // 2. Ensure the value does not contain special characters
    const specialCharactersRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (specialCharactersRegex.test(RegistrationNumber)) {
      setRegistrationNumber(false);
      return false;
    }

    // If both checks pass, return true
    setRegistrationNumber(true);
    return true;
  };
  const passwordValid = (Password: string): boolean => {
    // Ensure the value is not null
    if (!Password) {
      setPassword(false);
      return false;
    }
    if(Password.length < 6) {
      setPassword(false);
      return false;
    }
    setPassword(true);
    return true;
  };
  const footer = (
    <>
      <SocialLogin />
      <View className="items-center">
        <NextButton
          variant="transparent"
          onPress={() => {
            router.replace("/sign-in-Qr-code");
          }}
        >
          <View
            className="
        flex-row-reverse 
        justify-center"
          >
            <Text
              className="
          text-primary 
          font-DNNextLT"
            >
              نسيت كلمة المرور التسجيل عبر{" "}
            </Text>
            <Text>
              <Text
                className="text-secondary-100
             font-DNNextLT
              "
              >
                QrCode رمز
              </Text>
            </Text>
          </View>
        </NextButton>
      </View>
    </>
  );
  return (
    <SafeAreaProvider>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEnabled={true}
      >
        <Container {...{ footer }}>
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
              />
            </View>
            <TextInput
              icon={icons.lock}
              placeholder="ادخل كلمة المرور"
              validator={passwordValid}
              isPassword={true}
            />
            <CustomButton
              title="سجل الدخول"
              onPress={() => {}}
              variant={RegistrationNumber && Password ? "primary" : "default"}
              isLoading={!(RegistrationNumber && Password)}
              containerStyle="w-full mt-8"
            />
          </View>
        </Container>
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default SignIn;
