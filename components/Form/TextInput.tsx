import {
  View,
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";
import React from "react";
import { Image } from "expo-image";
import { useState } from "react";
import { icons } from "@/constants";

interface TextInputProps extends RNTextInputProps {
  icon: any;
  validator: (input: string) => boolean;
  isPassword?:boolean
}

const Valid = true;
const Invalid = false;
const Pristine = null;

type InputState = typeof Valid | typeof Invalid | typeof Pristine;

const TextInput: React.FC<TextInputProps> = ({ icon,isPassword, validator, ...props }) => {
  const [input, setInput] = useState("");
  const [state, setState] = useState<InputState>(Pristine);
  const reColor =
    state === Pristine
      ? 'border-gray-200'
      : state === Valid
      ? 'border-success'
      : 'border-danger';
  const color =
    state === Pristine
      ? "rgba(47,46,65,0.8)"
      : state === Valid
      ? "#26b1a4"
      : "#f70e0d";

  const onChangeText = (text: string) => {
    setInput(text);
    if (state !== Pristine) validate();
  };
  const validate = () => {
    const valid = validator(input);
    setState(valid);
  };
  return (
    <View
      className={`flex-row-reverse 
     items-center h-12 w-full justify-center px-2
     rounded-lg ${reColor}`}
      style={{ borderWidth: StyleSheet.hairlineWidth * 3 }}
    >
      <View className="p-2" {...{ color }}>
        <Image source={icon} className="h-4 w-4" tintColor={color} />
      </View>
      <View 
      className="flex-1"
      >
      <RNTextInput
        underlineColorAndroid="transparent"
        placeholderTextColor={color}
        onBlur={validate}
        className="flex-1 font-DNNextLT text-right"
        {...{ onChangeText }}
        {...props}
        secureTextEntry={isPassword}
      />
      </View>
      {(state === Valid || state === Invalid) && (
        <View className="w-5 h-5 rounded-full justify-center items-center">
          <Image
            source={state === Valid ? icons.check : icons.crossCircle}
            className="bg-primary h-4 w-4"
            tintColor={state === Valid ? "#26b1a4" : "#f70e0d"}
          />
        </View>
      )}
    </View>
  );
};

export default TextInput;
