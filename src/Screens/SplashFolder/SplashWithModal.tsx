import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  BackHandler,
  Platform,
  PermissionsAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS, IMAGEPATH } from "../../assets/Theme";
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
import MapImage from "../../Components/SVGComponents/SplashComponents/MapImage";
import { ANDROID, IOS } from "../../Helpers/Platform";
import { CommonActions } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";

import Geolocation from "@react-native-community/geolocation";
import { PERMISSIONS, request } from "react-native-permissions";

const SplashWithModal = (props: any) => {
  const [location, setLocation] = useState(false);
  const OnAllowAction = () => {
    props?.navigation?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Introduction" }],
      })
    );
    // props.navigation.navigate('Introduction');
  };

  // //Location PERMISSIONS
  async function requestPermissionLocation() {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Pnottual App Location Permission",
            message:
              "Pnottual App needs access to your device's location to provide accurate information.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          return false;
        }
      } else if (Platform.OS === "ios") {
        const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

        if (result === "granted") {
          return true;
        } else if (result === "blocked") {
          return false;
        } else {
          return false;
        }
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  // CURRENT LOCATION
  // const getLocation = async () => {
  //   try {
  //     const result = await requestPermissionLocation();
  //     console.log("Location permission result:", result);

  //     if (result) {
  //       Geolocation.getCurrentPosition(
  //         (position) => {
  //           console.log("position-------", position);
  //           // setLocation(position);
  //           // fetchLocationAddress(
  //           //   position?.coords?.latitude,
  //           //   position?.coords?.longitude
  //           // );
  //         },
  //         (error) => {
  //           console.log("Error getting current position:", error);
  //         },
  //         { enableHighAccuracy: false, timeout: 15000 }
  //       );
  //     } else {
  //       console.log("Location permission denied");
  //     }
  //   } catch (err) {
  //     console.warn("Error requesting location permission:", err);
  //   }
  // };

  // useEffect(() => {
  //   getLocation();
  // }, []);

  return (
    <>
      {/* <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
      <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} /> */}
      <ImageBackground
        source={require("../../assets/Images/Background/SplashScreens.png")}
        style={{ flex: 1 }}
      >
        <View style={styles.ImageVIEW}>
          <ImageBackground
            source={IMAGEPATH.LogoMain}
            style={styles.LOGOImage}
          />
        </View>

        <View style={{ justifyContent: "center", flex: 1 }}>
          <View style={styles.MainView}>
            <Text allowFontScaling={false} style={styles.popupTextOne}>
              Allow “Pnottual” to use you location?
            </Text>
            <Text allowFontScaling={false} style={styles.popupTextTwo}>
              For a reliable ride, Ponttual collects Location data form the time
              you open the app until a trip ends. this improves pikups, support,
              and more.
            </Text>
            <TouchableOpacity
              style={{ marginTop: ANDROID ? "2.5%" : undefined }}
            >
              {/* <MapImage/> */}
              <MapView
                style={styles.MAP_image}
                region={{
                  latitude: 37.7749,
                  longitude: -122.4194,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{ latitude: 37.7749, longitude: -122.4194 }}
                  title="Marker"
                />
              </MapView>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                OnAllowAction();
              }}
              style={[styles.AllowButtonONE, { borderBottomWidth: 0.5 }]}
            >
              <Text allowFontScaling={false} style={[styles.AllowText]}>
                Allow
              </Text>
              {/* fontFamily:FONTS.bold */}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.AllowButton, { borderBottomWidth: 0.5 }]}
              onPress={() => BackHandler.exitApp()}
            >
              <Text allowFontScaling={false} style={styles.AllowText}>
                Don’t Allow
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.CANCELButton}
              onPress={() => BackHandler.exitApp()}
            >
              <Text allowFontScaling={false} style={styles.AllowText}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView> */}
        {/* </SafeAreaView> */}
      </ImageBackground>
    </>
  );
};

export default SplashWithModal;

const styles = StyleSheet.create({
  LOGOImage: {
    height: IOS ? HEIGHT * 0.15 : HEIGHT * 0.16,
    width: IOS ? WIDTH * 0.27 : WIDTH * 0.27,
    // android 18 31
    resizeMode: "cover",
    marginTop: IOS ? "12%" : "6%",
    // backgroundColor:'red',
  },
  ImageVIEW: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "8%",
    position: "absolute",
    alignSelf: "center",
    //  backgroundColor:'blue',
  },
  MainView: {
    alignItems: "center",
    // height: ANDROID ? HEIGHT  0.567 : HEIGHT  0.5,
    width: ANDROID ? WIDTH * 0.7 : WIDTH * 0.69,
    alignSelf: "center",
    backgroundColor: COLORS.WHITE,
    borderRadius: 15,
  },
  popupTextOne: {
    color: COLORS.BLACK,
    fontSize: 17,
    fontFamily: FONTS.bold,
    textAlign: "center",
    lineHeight: 22,
    paddingTop: "4%",
    width: WIDTH * 0.59,
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  popupTextTwo: {
    color: COLORS.BLACK,
    fontSize: 13,
    fontFamily: FONTS.medium,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: "6%",
    paddingTop: "1.5%",

    // backgroundColor:'blue',
  },
  AllowText: {
    color: COLORS.BLUE,
    fontSize: 16,
    fontFamily: FONTS.light,
  },
  AllowButton: {
    borderBlockColor: "rgba(0, 0, 0, 0.24)",
    width: WIDTH * 0.7,
    paddingVertical: IOS ? "3.4%" : "3%",
    alignItems: "center",
  },
  AllowButtonONE: {
    borderBlockColor: "rgba(0, 0, 0, 0.24)",
    width: WIDTH * 0.7,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: ANDROID ? "3%" : undefined,
    paddingBottom: "2.6%",
  },
  CANCELButton: {
    borderBlockColor: "rgba(0, 0, 0, 0.24)",
    width: WIDTH * 0.7,
    paddingVertical: "3%",
    alignItems: "center",
    marginBottom: IOS ? "1%" : "1%",
  },
  EntireScreenView: {
    backgroundColor: COLORS.ORANGE,
    // backgroundColor:'red',
    flex: 1,
  },
  MAP_image: {
    height: IOS ? HEIGHT * 0.24 : HEIGHT * 0.24,
    width: IOS ? WIDTH * 0.69 : WIDTH * 0.7,
    // resizeMode: "contain",
    // backgroundColor:'blue',
  },
});
