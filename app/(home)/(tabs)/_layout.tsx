import { Tabs } from 'expo-router';
import React from 'react';
import { TabIcon } from '@/components';
import { icons } from "@/constants";
export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FF6600',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#F0F0F5',
            borderTopWidth: 1,
            borderTopColor: '#E5E5E5',
            height: 60,
          }
        }}
      >
        <Tabs.Screen name="time-table"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                ActiveIcon={icons.tableList}
                InactiveIcon={icons.tableListOutline}
                color={color}
                focused={focused}
                name='الجدول المحاضرات'
              />
            )
          }}
        />
        <Tabs.Screen name="grades"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
              ActiveIcon={icons.test}
              InactiveIcon={icons.testOutline}
                color={color}
                focused={focused}
                name='كشف الدرجات'
              />
            )
          }}
        />
        <Tabs.Screen name="ads"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
              ActiveIcon={icons.bell}
              InactiveIcon={icons.tableListOutline}
                color={color}
                focused={focused}
                name='الاعلانات'
              />
            )
          }}
        />
        <Tabs.Screen name="courses"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
              ActiveIcon={icons.features}
              InactiveIcon={icons.featuresOutline}
                color={color}
                focused={focused}
                name='المقرارت المنجز'
              />
            )
          }}
        />
      </Tabs>
    </>
  );
}
