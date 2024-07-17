import { View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  ReduceMotion,
  withSpring,
} from "react-native-reanimated";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Image } from "expo-image";
import { icons } from "@/constants";
import {
  ALERT_TYPE,
  Toast,
} from "react-native-alert-notification";

interface QrCodeScannerProps {
  validator: (input: string) => boolean;
  onValidQrCode: (qrCode: string) => void;
}
interface BarCodeScannerProps {
  data: string;
}

const Valid = true;
const Invalid = false;
const Pristine = null;

type QrCodeScanState = typeof Valid | typeof Invalid | typeof Pristine;

const QrCodeScanner: React.FC<QrCodeScannerProps> = ({
  validator,
  onValidQrCode,
}) => {
  const HeightScanner = 180;
  const moveAnimation = useSharedValue(0);
  const [scanned, setScanned] = useState<boolean | undefined>(false);
  const [state, setState] = useState<QrCodeScanState>(Pristine);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, []);

  const handleBarCodeScanned = ({ data }: BarCodeScannerProps) => {
    setScanned(true);
    validate(data);
  };

  const validate = (qrCode: string) => {
    const valid = validator(qrCode);
    if (valid) {
      setState(Valid);
      onValidQrCode(qrCode); // Use the direct `qrCode` parameter
    } else {
      setState(Invalid);
    }
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: moveAnimation.value }],
    };
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      moveAnimation.value = withSpring(
        moveAnimation.value === 0 ? HeightScanner * 0.96 : 0,

        {
          duration: 1000,
          dampingRatio: 2.3,
          stiffness: 135,
          overshootClamping: true,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 2,
          reduceMotion: ReduceMotion.System,
        }
      );
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  if (!permission?.granted) {
    // Render some UI to request permission or indicate the lack of permissions
    Toast.show({
      type: ALERT_TYPE.WARNING,
      title: "تنويه !!",
      textBody:
        "مطلوب إذن الكاميرا لاستخدام هذه الميزة.",
    });
  }

  return (
      <View
        className="
      justify-center items-center"
        style={{
          height: HeightScanner,
          width: HeightScanner,
        }}
      >
        {!scanned && (
          <Animated.View
            style={[animatedStyles]}
            className="w-[95%] h-1
             bg-secondary-100 rounded-full 
             absolute self-center top-1 z-10"
          />
        )}
        <View className="w-full h-full overflow-hidden rounded-xl border-4 border-Bg">
          <CameraView
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            className="w-full h-full"
          />
        </View>
        {scanned && (
          <TouchableOpacity
            className="absolute place-self-center w-1/4 h-1/4"
            onPress={() => setScanned(false)}
          >
            <Image
              source={icons.rotate}
              className="w-full h-full"
              tintColor={"#ff6000"}
            />
          </TouchableOpacity>
        )}
      </View>

  );
};

export default QrCodeScanner;
