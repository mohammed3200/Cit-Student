import { View, Text, ScrollView } from 'react-native'
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Images } from '@/constants';
import { Image } from "expo-image";

interface WelcomeProps { }

const Welcome: React.FC<WelcomeProps> = () => {
    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className='w-full justify-center 
          items-center h-full px-4'>
                    <Image
                        source={Images.logo}
                        className='w-36 h-36 rounded-2xl'
                        contentFit='contain'
                    />
                    <Image
                        source={Images.undraw_welcoming}
                        className='max-w-[380px] w-full h-[300px]'
                        contentFit='contain'
                    />
                    <View className='relative mt-5'>
                        <Text className='text-3xl text-slate-800 
                        font-bold text-center font-DNNestLT'>
                            ابدأ رحلتك الأكاديمية{' '}
                        </Text>
                        <Text className='text-secondary-200'>CIT Student</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Welcome;