import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Login from "./Screens/Auth/Login";
import Register from "./Screens/Auth/Register";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import HomeOnline from "./Screens/Home/HomeOnline";
import DrawerNavigations from "./DrawerNavigation/DrawerNavigations";

const MyDrawer = (props: any) => {


  return (
    <DrawerNavigations />
    // <Drawer.Navigator
    // //   useLegacyImplementation
    // drawerContent={(props) => <CustomDrawerContent {...props} />}
    // >
    //   <Drawer.Screen name="Home" component={HomeOnline} />
    //   <Drawer.Screen name="Notifications" component={Register} />
    // </Drawer.Navigator>
  );
};

export default MyDrawer;

const styles = StyleSheet.create({});
