import React from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from 'expo-image';
import Svg, { Path } from "react-native-svg";

interface CustomTabBarButtonProp {
    ActiveIcon: any,
    InactiveIcon: any,
    color: string,
    name: string,
    focused: boolean,
}

const CustomTabBarButton = ({ ActiveIcon, InactiveIcon, color, name, focused }: CustomTabBarButtonProp) => {
    if (focused) {
        return (
            <View className='flex-1 items-center'>
                <View className='flex-row'>
                    <View className='bg-primary flex-1'/>
                    <Svg width={71} height={58} viewBox="0 0 75 61">
                        <Path
                            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                            fill={'rgb(240 240 245)'}
                        />
                    </Svg>
                    <View className='bg-primary flex-1'/>
                </View>
                <TouchableOpacity activeOpacity={1} className='absolute w-12 h-12 rounded-full bg-secondary-100 items-center justify-center -top-6'>
                    <Image
                        source={ActiveIcon}
                        contentFit='contain'
                        tintColor={color}
                        className='w-6 h-6'
                    />
                </TouchableOpacity>
                <Text className='font-DNNestLT text-xs text-center' style={{ color }}>
                    {name}
                </Text>
            </View>
        );
    } else {
        return (
                <TouchableOpacity activeOpacity={1} className='flex-1 bg-primary justify-center items-center'>
                    <Image
                        source={InactiveIcon}
                        contentFit='contain'
                        tintColor={color}
                        className='w-6 h-6'
                    />
                </TouchableOpacity>
        );
    }
}

export default CustomTabBarButton;