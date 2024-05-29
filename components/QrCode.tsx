import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Image } from "expo-image";
import { icons } from "@/constants";

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
      moveAnimation.value = withTiming(
        moveAnimation.value === 0 ? HeightScanner * 1.18 : 0,
        {
          duration: 1400,
          easing: Easing.inOut(Easing.ease),
        }
      );
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  if (!permission?.granted) {
    // Render some UI to request permission or indicate the lack of permissions
    return <Text>Camera permission is required to use this feature.</Text>;
  }

  return (
    <View
      className="
      justify-center items-center
       border-Bg border-4 rounded-2xl"
      style={{
        height: HeightScanner,
        width: HeightScanner,
      }}
    >
      {!scanned && (
        <Animated.View
          style={[animatedStyles]}
          className="
        self-center w-full h-1
         bg-secondary-100 rounded-full 
         absolute left-0 top-0 z-10"
        />
      )}
      <CameraView
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        className="w-full h-full"
      />
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
