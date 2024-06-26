import React from "react";
import { Drawer as ERDrawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import Drawer, { DRAWER_WIDTH } from "./(Drawer)";

const HomeLayout = () => {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ERDrawer
          screenOptions={{
            headerShown: false,
            drawerStyle:{
            //   width: DRAWER_WIDTH,
            },
          }}
        //   drawerContent={Drawer}
        >
        </ERDrawer>
      </GestureHandlerRootView>
    </>
  );
};

export default HomeLayout;