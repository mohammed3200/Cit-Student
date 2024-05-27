import { View, Text, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Images } from '@/constants';
import { Image } from "expo-image";

const Page = () => {
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
          <Link href='/(auth)/sign-in'><Text>Go Onboarding</Text></Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Page