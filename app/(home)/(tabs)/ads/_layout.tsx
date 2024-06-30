import React from "react";
import { Stack } from "expo-router";

const AdsLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="post"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default AdsLayout;
