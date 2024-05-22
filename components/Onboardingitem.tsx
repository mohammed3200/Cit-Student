import { View, Text, useWindowDimensions,  } from 'react-native';
import React from 'react';
import { Image } from "expo-image";

interface OnboardingItemProp {
    item: any
}

const OnboardingItem: React.FC<OnboardingItemProp> = ({ item }) => {
    const { width } = useWindowDimensions();
    return (
        <View
            className='flex-1 justify-center items-center'
            style={{  width  }}
        >
            <Image
                source={item.image}
                contentFit='contain'
                style={{  width , flex: .7 }}
                className='justify-center py-10'
            />
            <View style={{ flex: .3 }}>
                <Text className='font-DNNestLTB text-lg mb-3 text-center text-slate-900'>{item.title}</Text>
                <Text className='font-DNNestLT text-sm text-slate-800 text-center px-16'>{item.description}</Text>
            </View>
        </View>
    );
};
export default OnboardingItem;