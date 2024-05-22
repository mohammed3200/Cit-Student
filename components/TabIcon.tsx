import React from 'react';
import { View, Text } from "react-native";
import { Image } from 'expo-image';

interface TabIconProp {
    ActiveIcon: any,
    InactiveIcon: any,
    color: string,
    name: string,
    focused: boolean,
}

const TabIcon = ({ ActiveIcon,InactiveIcon, color, name, focused }: TabIconProp) => {
    return (
        <View className='items-center justify-center gap-1'>
            <Image
                source={focused ? ActiveIcon:InactiveIcon}
                contentFit='contain'
                tintColor={color}
                className='w-6 h-6'
            />
            {focused &&
                <Text className='font-DNNestLT  text-xs' style={{color}}>
                    {name}
                </Text>
                }
        </View>
    );
}

export default TabIcon;