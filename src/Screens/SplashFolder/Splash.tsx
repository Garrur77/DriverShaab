import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  ImageBackground,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS, IMAGEPATH } from "../../assets/Theme";
import LogoSvg from "../../Components/SVGComponents/LogoSvg";
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
import LogoText from "../../Components/SVGComponents/LogoText";

import PermitionPopUp from "../../Components/PermitionPopUp";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../ReduxConfig/Store";
import { CommonActions } from "@react-navigation/native";
import Geolocation from "@react-native-community/geolocation";
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";
import { PermissionsAndroid } from "react-native";
import { setLocation } from "../../ReduxConfig/DriverLocationSlice";
import { useLocation } from "../../Context/LocationContext";

const Splash = (props: any) => {
  // const [location, setLocation] = React.useState("");
  const { latitude, longitude } = useLocation();
  const dispatch = useDispatch();
  const Data = useSelector(
    (state: RootState) => state.TokenUserID_DETAILS?.userTokenAndId
  );
  const Location = useSelector((state: RootState) => state.INITIAL_LOCATION);
  const CheckHanlder = () => {
    if (Data?.token) {
      if (!Data?.isProfileUpdated) {
        props?.navigation?.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "CompleteProfile" }],
          })
        );
        // props.navigation.navigate("CompleteProfile")
      } else {
        props?.navigation?.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "MyDrawer" }],
          })
        );
        // props.navigation.navigate("MyDrawer")
      }
    } else {
      props?.navigation?.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Introduction" }],
        })
      );
      // props.navigation.navigate("Introduction")
    }
  };
  useEffect(() => {
    setTimeout(() => {
      CheckHanlder();
      // props.navigation.navigate("SplashWithModal");
    }, 10000);
  }, []);

  // React.useEffect(() => {
  //   requestPermissionLocation();
  // }, []);

  // const getLocation = async () => {
  //   result.then((res) => {
  //     // console.log("res is:-------1698", res);
  //     if (res) {
  //       Geolocation.getCurrentPosition(
  //         (position) => {
  //           setLatitude(position?.coords?.latitude);
  //           setLongitude(position.coords?.longitude);
  //         },
  //         (error) => {
  //           console.log("sdgdsfhdsh----198", error);
  //         },
  //         { enableHighAccuracy: false, timeout: 15000 }
  //       );
  //     } else {
  //       console.log("location permission decline");
  //     }
  //   });
  //   // console.log(location);
  // };
  // async function requestPermissionLocation() {
  //   try {
  //     if (Platform.OS === "android") {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //         {
  //           title: "Allow Ponttual to use your location?",
  //           message:
  //             "Pontual App needs access to your device's location to provide accurate information.",
  //           buttonNeutral: "Ask Me Later",
  //           buttonNegative: "Cancel",
  //           buttonPositive: "OK",
  //         }
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         getLocation();
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     } else if (Platform.OS === "ios") {
  //       const currentStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  //       if (currentStatus === RESULTS.GRANTED) {
  //         // Permission is already granted
  //         return true;
  //       } else {
  //         const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  //         if (result === "granted") {
  //           return true;
  //         } else if (result === "blocked") {
  //           return false;
  //         } else {
  //           // ExitApp.exitApp();

  //           return false;
  //         }
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     return false;
  //   }
  // }

  return (
    <>
      {/* <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
      <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} /> */}
      {/* <SafeAreaView style={styles.MainContainer}> */}
      <ImageBackground
        source={require("../../assets/Images/Background/SplashScreens.png")}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image source={IMAGEPATH.LogoMain} style={styles.LOGOImage} />
        <Text allowFontScaling={false} style={styles.FirstText}>
          SAADHAN
        </Text>
        <Text allowFontScaling={false} style={styles.SecondText}>
          SAFAR Humari ज़िम्मेदारी
        </Text>
        {/* <PermitionPopUp showPopup={showPopup} setShowPopup={setShowPopup} props={props}/> */}
        {/* </SafeAreaView> */}
      </ImageBackground>
    </>
  );
};
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.ORANGE,
  },
  FirstText: {
    color: COLORS.WHITE,
    fontSize: 40,
    fontFamily: FONTS.bold,
    paddingTop: "3%",
  },
  SecondText: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontFamily: FONTS.bold,
    paddingTop: "1%",
  },
  LOGOImage: {
    height: HEIGHT * 0.15,
    width: WIDTH * 0.27,
    resizeMode: "contain",
  },
});
export default Splash;
