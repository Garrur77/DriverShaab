import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ImageBackground,
  Platform,
  PermissionsAndroid,
  Switch,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  CommonActions,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import DashboardHistory from "../Screens/DrawerFolder/DashboardHistory";
import { HEIGHT } from "../Helpers/Dimentions";
import { COLORS, FONTS, IMAGEPATH, VECTOR_ICONS } from "../assets/Theme";
import EnterCode from "../Screens/Home/EnterCode";
import Setting from "../Screens/SideMenu/Setting";
import Account from "../Screens/SideMenu/Account";
import { useState } from "react";
import Notification from "../Screens/NotificationFolder/Notification";

import { UserVisited } from "../ReduxConfig/UserDetails/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import AddBank from "../Screens/SideMenu/AddBank";
import AboutUs from "../Screens/SideMenu/AboutUs";
import EditProfile from "../Screens/SideMenu/EditProfile";
import EditDocumnets from "../Screens/SideMenu/EditDocumnets";
import ChatScreen from "../Screens/Home/ChatScreen";
import LogOutComponent from "../Components/LogOutComponent";
import { RootState } from "../ReduxConfig/Store";
import { setClearState } from "../ReduxConfig/TokenUserID";
import { setClearPersonalInfo } from "../ReduxConfig/PersonalDetailsSlice";
import { setClearVehicle } from "../ReduxConfig/VehicleDetailsSlice";
import Share from "react-native-share";
import {
  cashWallet,
  driverDutyStatus,
  driverLogOut,
} from "../Components/ApiConfig/EndPoints";
import Geolocation from "@react-native-community/geolocation";
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";
import MainHomeOnlineStart from "../Screens/Home/MainHomeOnlineStart";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSocket } from "../Context/SocketContext";
import { roundOff } from "../Utils/RoundOff";
import { showMessage } from "react-native-flash-message";
import { useLocation } from "../Context/LocationContext";
import { useTranslation } from "react-i18next";
import { setDriverDuty } from "../ReduxConfig/DriverDutySlice";
import SpinningLoader from "../assets/SpinningLoader";
import MainHomeTest from "../Screens/Home/MainHomeTest ";
import { red } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
const Drawer = createDrawerNavigator();

const DrawerNavigations = (props: any) => {
  const { t } = useTranslation();
  const Menu = [
    {
      title: t("Home"),
      icon: IMAGEPATH.HOMEDrawer,
      navigates: "MyDrawer",
      screen_: "HomeOnline",
    },
    {
      title: t("Dashboard History"),
      icon: IMAGEPATH.DashbordDRAWER,
      navigates: "DashboardHistory",
    },
    {
      title: t("Profile"),
      icon: IMAGEPATH.account,
      navigates: "Account",
    },
    {
      title: t("Ratings"),
      icon: IMAGEPATH.ratings,
      navigates: "MyRatings",
    },
    {
      title: t("Documents"),
      icon: IMAGEPATH.docs,
      navigates: "MyDocuments",
    },
    {
      title: t("Settings"),
      icon: IMAGEPATH.SETTING,
      navigates: "Setting",
    },
    {
      title: t("Change Language"),
      icon: IMAGEPATH.Language,
      navigates: "Languages",
    },
    {
      title: t("Suggest Friends"),
      icon: IMAGEPATH.suggestFriends,
    },
    {
      title: t("Notices"),
      icon: IMAGEPATH.announcements,
      navigates: "Notices",
    },
    {
      title: t("Messages"),
      icon: IMAGEPATH.message,
      navigates: "Messages",
    },
    {
      title: t("Logout"),
      icon: IMAGEPATH.LOGOUT,
    },
  ];
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const Data = useSelector((state: RootState) => state.TokenUserID_DETAILS);
  const dispatch = useDispatch();
  const UserData = useSelector(
    (state: RootState) => state.TokenUserID_DETAILS?.userData
  );

  const driverStatus = useSelector(
    (state: RootState) => state.driverDuty.driverDuty
  );
  const { setLatitude, setLongitude } = useLocation();
  const [modalVisible1, setmodalVisible1] = useState(false);
  const [wallet, setWallet] = useState("");
  const [isEnabled, setIsEnabled] = useState(
    driverStatus === "available" ? true : false
  );

  const toggleSwitch = () => {
    // setIsEnabled(driverStatus === "avialable" ? true : false);
    driverDutyStatusHandler();
    setIsEnabled((previousState) => !previousState);
  };

  const handleSuggestFriend = async () => {
    const link =
      Platform.OS === "ios"
        ? "https://www.apple.com/app-store/"
        : "https://play.google.com/store/apps";

    await Share.open({ url: link });
  };

  async function requestPermissionLocation() {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: t("Allow Ponttual to use your location?"),
            message: t(
              t(
                "Pontual App needs access to your device's location to provide accurate information."
              )
            ),
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
        const currentStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (currentStatus === RESULTS.GRANTED) {
          // Permission is already granted
          return true;
        } else {
          const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
          if (result === "granted") {
            return true;
          } else if (result === "blocked") {
            return false;
          } else {
            // ExitApp.exitApp();

            return false;
          }
        }
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  Geolocation.watchPosition(
    (position) => {
      // console.log(
      //   "-------coordinates inside drawer watchPosition",
      //   position?.coords
      // );
      setLatitude(position?.coords?.latitude);
      setLongitude(position.coords?.longitude);
    },
    (error) => {
      console.log("-------coordinates inside drawer error", error);
    },
    {
      enableHighAccuracy: false,
      timeout: 15000,
      distanceFilter: 1,
      fastestInterval: 3000,
    }
  );
  // useEffect(() => {
  //   const watchID = Geolocation.watchPosition(
  //     (position) => {
  //       setLatitude(position?.coords?.latitude);
  //       setLongitude(position?.coords?.longitude);
  //     },
  //     (error) => {
  //       console.log("Geolocation error", error);
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       timeout: 15000,
  //       distanceFilter: 5,
  //       fastestInterval: 1000,
  //     }
  //   );
  //   return () => Geolocation.clearWatch(watchID);
  // }, []);
  const rideSocket = useSocket();
  const getWalletDetails = async () => {
    try {
      const resp = await axios({
        method: "get",
        url: cashWallet,
        headers: {
          token: await AsyncStorage.getItem("TOKEN"),
        },
      });
      if (resp?.data?.responseCode === 200) {
        setWallet(resp?.data?.result);
        // console.log("getWalletDetails drawer success", resp?.data);
      }
    } catch (error) {
      console.log("getWalletDetails drawer error", error?.response);
    }
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    getWalletDetails();
  }, [isFocused, navigation]);

  useEffect(() => {
    rideSocket?.on("ongoingRideStatus", (response) => {
      // console.log("ongoingRideStatus response", response);
      if (
        response?.driverDetails?.driverId === Data?.userTokenAndId.userId &&
        Data?.userTokenAndId?.isVerifiedByAdmin &&
        response?.otpVerify
      ) {
        navigation?.navigate("HomeOnlineStartRide");
      }
    });

    rideSocket?.on("acceptedRideStatus", (response) => {
      if (response) {
        // console.log("acceptedRideStatusacceptedRideStatus response", response);
        if (
          response?.driverDetails?.driverId === Data?.userTokenAndId.userId &&
          response?.status === "accepted"
        ) {
          navigation?.navigate("HomeOnline");
          // props?.navigation?.dispatch(
          //   CommonActions.reset({
          //     index: 0,
          //     routes: [{ name: "MyDrawer" }],
          //   })
          // );
        }
      }
    });
  }, [isFocused, Data.userTokenAndId.userId]);

  const Logout = async () => {
    try {
      const deviceToken = await AsyncStorage.getItem("fcm");
      const response = await axios({
        method: "put",
        url: driverLogOut,
        headers: {
          token: await AsyncStorage.getItem("TOKEN"),
        },
        data: {
          deviceToken: deviceToken?.toString(),
        },
      });
      console.log("Logout response", response?.data);
      if (response?.data?.responseCode === 200) {
        setmodalVisible1(false);
        setTimeout(() => {
          dispatch(setClearState(false));
          dispatch(UserVisited(""));
          dispatch(setClearPersonalInfo(false));
          dispatch(setClearVehicle(false));
          navigation?.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Login" }],
            })
          );
        }, 500);
        showMessage({
          message: response?.data?.responseMessage,
          type: "success",
          icon: "success",
        });
      }
    } catch (error) {
      console.log("Logout error", error?.response);
      if (error?.response?.data?.responseCode === 400) {
        showMessage({
          message: error?.response?.data?.responseMessage,
          type: "warning",
          icon: "warning",
        });
      }
      if (error?.response?.data?.responseCode === 404) {
        showMessage({
          message: error?.response?.data?.responseMessage,
          type: "danger",
          icon: "danger",
        });
      }
    }
  };

  const driverDutyStatusHandler = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "put",
        url: driverDutyStatus,
        headers: {
          token: await AsyncStorage.getItem("TOKEN"),
        },
      });
      // console.log("driverDutyStatusHandler success", res?.data);
      if (
        res?.data?.responseCode === 200 &&
        res?.data?.responseMessage === "available"
      ) {
        setLoading(false);
        dispatch(setDriverDuty("available"));
        // setIsEnabled(true);
        // setIsEnabled((previousState) => !previousState);
      } else if (
        res?.data?.responseCode === 200 &&
        res?.data?.responseMessage === "offline"
      ) {
        setLoading(false);
        dispatch(setDriverDuty("offline"));
        // setIsEnabled(false);
        // setIsEnabled((previousState) => !previousState);
      }
    } catch (error) {
      setLoading(false);
      console.log("driverDutyStatusHandler error", error?.response);
      showMessage({
        message: error?.response?.responseMessage,
        type: "danger",
        icon: "danger",
      });
    }
  };

  const commissionBalance = useSelector(
    (state: RootState) => state.wallet.commissionBalance
  );
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeOnline"
      drawerContent={() => (
        <View style={{ flex: 1 }}>
          {/* <View style={{ flex: 1 }}> */}
          <ImageBackground
            style={{
              height: Platform.OS === "ios" ? HEIGHT * 0.33 : HEIGHT * 0.31,
            }}
            source={IMAGEPATH.BackImageDRAWER}
          >
            <Image
              style={{
                height: 100,
                width: 100,
                marginTop: Platform.OS === "ios" ? 60 : 20,
                marginLeft: 20,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: COLORS.WHITE,
              }}
              resizeMode="cover"
              source={
                UserData?.profileImage
                  ? { uri: UserData?.profileImage }
                  : IMAGEPATH.ProfilePic
              }
            />
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flex: 1,
                  paddingHorizontal: 25,
                }}
              >
                <View style={{ flexShrink: 1 }}>
                  <Text
                    allowFontScaling={false}
                    style={drawerElementsStyle.userNameTEXT}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {Data?.userData?.firstName?.length > 10
                      ? Data?.userData?.firstName?.slice(0, 10)
                      : Data?.userData?.firstName ?? "N/A"}
                  </Text>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      rowGap: 20,
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: COLORS.WHITE,
                        fontFamily: FONTS.bold,
                      }}
                    >
                      {isEnabled ? t("On Duty") : t("Off Duty")}
                    </Text>
                    <Switch
                      trackColor={{ false: COLORS.WHITE, true: COLORS.WHITE }}
                      thumbColor={isEnabled ? "green" : "red"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </View>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  props?.navigation?.navigate("DashboardHistory");
                }}
                style={{
                  ...drawerElementsStyle.cashBotton,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 13,
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={drawerElementsStyle.cash}
                  >
                    {t("Cash")}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={drawerElementsStyle.amount}
                  >
                    $
                    {commissionBalance
                      ? roundOff(commissionBalance, 2)
                      : wallet?.commissionBalance
                      ? roundOff(wallet?.commissionBalance, 2)
                      : `0.00`}
                  </Text>
                </View>
                <View>
                  <VECTOR_ICONS.MaterialIcons
                    name={"navigate-next"}
                    size={20}
                    color={COLORS.GRAY8}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
          {/* </View> */}

          <View style={{ flex: 1 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={Menu}
              style={{
                flex: 1,
                paddingTop: Platform.OS === "android" ? 6 : null,
              }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={drawerElementsStyle.menuBtn}
                    onPress={() => {
                      if (item.title === t("Home")) {
                        navigation.navigate("HomeOnline");
                      }
                      if (item.title === t("Logout")) {
                        setmodalVisible1(true);
                      } else if (item.title === t("Suggest Friends")) {
                        handleSuggestFriend();
                      } else {
                        navigation.navigate(item?.navigates, {
                          NAME: item.screen_,
                        });
                      }
                    }}
                  >
                    <View
                      style={{
                        width: 26,
                        height: 26,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        style={{
                          width: item.title === "Plan" ? 20 : 26,
                          height: item.title === "Plan" ? 24 : 26,
                        }}
                        tintColor={"#C1C0C9"}
                        resizeMode="contain"
                        source={item.icon}
                      />
                    </View>
                    <Text
                      allowFontScaling={false}
                      style={drawerElementsStyle.menuTitle}
                    >
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              contentContainerStyle={{
                paddingTop: Platform.OS === "ios" ? 10 : 5,
                paddingBottom: 40,
              }}
              keyExtractor={(item) => item.title}
            />
          </View>
          {loading && <SpinningLoader loader={loading} />}
          <LogOutComponent
            modalVisible={modalVisible1}
            head={t("Logout")}
            Message={t("Are you sure do you want to Logout ?")}
            btn1={t("No")}
            btn2={t("Yes")}
            OpenOnline={() => {
              setmodalVisible1(false);
            }}
            Action={() => {
              Logout();
            }}
          />
        </View>
      )}
    >
      <Drawer.Screen name="HomeOnline" component={MainHomeTest} />

      <Drawer.Screen
        name="HomeOnlineStartRide"
        component={MainHomeOnlineStart}
      />
      <Drawer.Screen name="EnterCode" component={EnterCode} />

      <Drawer.Screen name="DashboardHistory" component={DashboardHistory} />
      <Drawer.Screen name="Setting" component={Setting} />
      <Drawer.Screen name="AboutUs" component={AboutUs} />

      <Drawer.Screen name="Account" component={Account} />
      <Drawer.Screen name="EditProfile" component={EditProfile} />
      <Drawer.Screen name="EditDocumnets" component={EditDocumnets} />
      <Drawer.Screen name="AddBank" component={AddBank} />
      <Drawer.Screen name="Notification" component={Notification} />
      <Drawer.Screen name="ChatScreen" component={ChatScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigations;

const drawerElementsStyle = StyleSheet.create({
  cashBotton: {
    backgroundColor: COLORS.WHITE,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: HEIGHT * 0.05,
    borderRadius: 30,
    marginBottom: 20,
    marginHorizontal: 25,
    padding: 5,
  },

  cash: {
    fontSize: 15,
    fontFamily: FONTS.medium,
    color: COLORS.BLACK,
    paddingLeft: 5,
  },
  profilePic: {},
  amount: {
    fontSize: 16,
    color: COLORS.ORANGE,
    // fontFamily: FONTS.bold,
    paddingLeft: 5,
    fontWeight: "700",
  },
  userNameTEXT: {
    color: COLORS.WHITE,
    fontSize: 20,
    fontFamily: FONTS.bold,
    //paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: Platform.OS === "ios" ? "600" : "400",
    //backgroundColor: "red",
  },
  menuBtn: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
    columnGap: 10,
    paddingLeft: 25,
  },
  menuTitle: {
    fontSize: 17,
    color: COLORS.SuccessText,
    // fontFamily: FONTS.bold,
    fontWeight: "700",
  },
});
