import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  StatusBar,
  ScrollView,
  Platform,
  Linking,
  Pressable,
} from "react-native";
import React, { useRef } from "react";
import HeaderComponent from "../../Components/HeaderComponent";
import { COLORS, FONTS, IMAGEPATH, VECTOR_ICONS } from "../../assets/Theme";
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
import { useEffect, useState } from "react";
import { ANDROID, IOS } from "../../Helpers/Platform";
import { Line, Svg } from "react-native-svg";
import {
  CommonActions,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../ReduxConfig/Store";
import { useDispatch } from "react-redux";
import { saveStartRide_State } from "../../ReduxConfig/Slices";
import MapView, { AnimatedRegion, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DepartureRBSheet from "../../Components/HomeSvg/DepartureRBSheet";
import {
  MAP_KEY,
  createSOS,
  rateRider,
} from "../../Components/ApiConfig/EndPoints";
import Geolocation from "@react-native-community/geolocation";
import { PERMISSIONS, request } from "react-native-permissions";
import { PermissionsAndroid } from "react-native";
import { setLocation } from "../../ReduxConfig/DriverLocationSlice";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import StarRating from "react-native-star-rating-widget";
import { clearRideDetailsAfterAccept } from "../../ReduxConfig/RIdeSlice";
import { AppState } from "react-native";
import BackgroundTimer from "react-native-background-timer";
import SpinningLoader from "../../assets/SpinningLoader";
import { clearRideDetails } from "../../ReduxConfig/RideDetailsSlice";
import { useSocket } from "../../Context/SocketContext";
import { TextInput } from "react-native";
import { roundOff } from "../../Utils/RoundOff";
import { useLocation } from "../../Context/LocationContext";

const MainHomeOnlineStart = (props) => {
  const { latitude, longitude } = useLocation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [startRide, setstartRide] = useState(true);
  const [letStartRide, setLetStartRide] = useState(false);
  const [Loader, setLoader] = useState(false);
  const [rideFare, setRideFare] = useState("");
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const [SelectStar, setSelectStar] = useState(5);
  const [review, setReview] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [endRideAddress, setEndRideAddress] = useState("");
  const route = useRoute();

  const rideSocket = useSocket();
  const mapRef = useRef();
  const markerRef = useRef();
  const dispatch = useDispatch();

  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.present();
    }
  };

  const closeBottomSheet1 = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.dismiss();
      setTimeout(() => {
        setModalVisible(true);
      }, 200);
    }
  };

  const Ride_STATE = useSelector(
    (state: RootState) => state.StartRide_State.StartRide_State
  );
  const RIDEAFTERACCEPT = useSelector(
    (state: RootState) => state.INITIAL_RIDE.rideDetailsAfterAccept
  );
  const Data = useSelector(
    (state: RootState) => state.TokenUserID_DETAILS?.userTokenAndId
  );

  const getToken = useSelector((state: RootState) => state.TOKEN_);

  useEffect(() => {
    if (Ride_STATE == "STARTRIDE_") {
      openBottomSheet();
      setstartRide(true);
    } else {
      openBottomSheet();
      setstartRide(true);
    }
  }, [Ride_STATE]);

  // const bottomSheetRef1 = useRef(null);

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const isFocused = useIsFocused();
  const [initialUrl, setInitialUrl] = useState(
    `https://maps.apple.com/?saddr=${latitude},${longitude}&daddr=${RIDEAFTERACCEPT?.destinationLocation?.latitude},${RIDEAFTERACCEPT?.destinationLocation?.longitude}`
  );

  const [intialLocation, setIntialLocation] = useState({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  //-----------------------Location Modal ------------------//
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
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     } else if (Platform.OS === "ios") {
  //       const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  //       console.log("result----location ggg MainHoemOnline", result);
  //       if (result === "granted") {
  //         return true;
  //       } else if (result === "blocked") {
  //         return false;
  //       } else {
  //         // ExitApp.exitApp();

  //         return false;
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     return false;
  //   }
  // }

  // const getLocation = async () => {
  //   const result = requestPermissionLocation();

  //   result.then((res) => {
  //     if (res) {
  //       Geolocation.getCurrentPosition(
  //         (position) => {
  //           getLiveLocation(
  //             position?.coords?.latitude,
  //             position?.coords?.longitude
  //           );
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
  // };

  // const getLiveLocation = async (latitude, longitude) => {
  //   const locPermissionDenied = await requestPermissionLocation();
  //   if (locPermissionDenied) {
  //     animate(latitude, longitude);
  //     dispatch(setLocation({ latitude, longitude }));
  //   }
  // };

  useEffect(() => {
    animate(latitude, longitude);
  }, [latitude, latitude]);

  const animatedCoordinate = new AnimatedRegion({
    latitude: latitude,
    longitude: longitude,
  });

  const animate = (lat, long) => {
    const newCoordinate = { lat, long };
    if (Platform.OS == "android") {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 10000);
      }
    } else {
      animatedCoordinate
        .timing({
          latitude: lat,
          longitude: long,
          duration: 1000,
          useNativeDriver: false,
        })
        .start();
    }
  };

  //-----------------------END   Location     Modal ------------------//
  useEffect(() => {
    if (isFocused) {
      rideSocket?.on("rideStarted", () => {
        setLetStartRide(true);
      });
      rideSocket?.on("rideEnded", (res) => {
        setEndRideAddress(res?.ride?.endRideAddress);
        setLetStartRide(false);
        closeBottomSheet1();
      });
    }
  }, [isFocused, AppState]);

  useEffect(() => {
    if (latitude && longitude && RIDEAFTERACCEPT?.rideId) {
      const data = {
        rideId: RIDEAFTERACCEPT?.rideId,
        lat: latitude,
        lng: longitude,
      };
      console.log("longitude: after otp verify  ", longitude);
      console.log("latitude: after otp verify", latitude);

      rideSocket?.emit("updateDriverLocation", data);
    }
  }, [latitude, longitude, AppState, RIDEAFTERACCEPT]);

  useEffect(() => {
    rideSocket?.on("rideCancelled", (response) => {
      if (Data?.userId === response?.driverId) {
        showMessage({
          message: "This ride has been cancle by user.",
          type: "danger",
        });
        dispatch(clearRideDetailsAfterAccept());
        dispatch(clearRideDetails());
        bottomSheetRef.current.dismiss();
        // bottomSheetRef1.current.dismiss();
        props?.navigation?.navigate("HomeOnline");
      }
    });
  }, []);

  const StartRide = async () => {
    const rideId = RIDEAFTERACCEPT?.rideId;
    const lat = Location?.latitude;
    const lng = Location?.longitude;
    // console.log("asdasdasd", rideId, lat, lng);
    rideSocket?.emit("startRide", rideId, lat, lng);

    ///For Test Perpose
    CloseOnlineRb(), setstartRide(false);
    dispatch(saveStartRide_State(""));
    Linking.openURL(initialUrl);
  };
  const getFormattedAddress = async () => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAP_KEY}`;

    try {
      const response = await axios.get(url);
      const results = response?.data?.results;
      if (results.length > 0) {
        return response?.data?.results[0]?.formatted_address;
      } else {
        return "";
      }
    } catch (error) {
      console.log("Error fetching address:", error);
    }
  };
  const endRide = async () => {
    const address = await getFormattedAddress();
    console.log("responseresponse:::11address", address);
    rideSocket?.emit("endRide", {
      rideId: RIDEAFTERACCEPT?.rideId,
      destinationAddress: address,
    });
    rideSocket?.on("rideEnded", (endData) => {
      console.log("rideEnded endData----->>>", endRide);
      setRideFare(endData?.ride?.fareAmount);
    });
    // rideSocket?.emit("availableDriver", { driverId: Data?.userId });
    closeBottomSheet1();
  };

  const RateRiderForRide = async () => {
    setReviewError("");
    if (SelectStar < 5 && !review) {
      setReviewError("Please provide review for rider.");
      setLoader(false);
      return;
    }
    setLoader(true);
    axios({
      method: "POST",
      url: rateRider,
      headers: {
        token: getToken.Token,
      },
      data: {
        userId: RIDEAFTERACCEPT?.riderDetails?.riderId,
        rating: SelectStar,
        review: SelectStar < 5 ? review : "Excellent",
        rideId: RIDEAFTERACCEPT?.rideId,
      },
    })
      .then((response) => {
        console.log("RateforDriver----hanlder", response);
        if (response.data.responseCode === 200) {
          setIsModalVisible(false);
          setLoader(false);
          dispatch(clearRideDetailsAfterAccept());
          dispatch(clearRideDetails());
          showMessage({
            message: response?.data?.responseMessage,
            type: "success",
            icon: "success",
            duration: 2000,
          });
          // rideSocket?.emit("availableDriver", { driverId: Data?.userId });
          setTimeout(() => {
            props?.navigation?.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "MyDrawer" }],
              })
            );
          }, 0);

          // setTimeout(() => {
          //   props?.navigation?.dispatch(
          //     CommonActions.reset({
          //       index: 0,
          //       routes: [{ name: "MyDrawer" }],
          //     })
          //   );
          // }, 500);
        } else {
          // console.log("first--------->", error);
        }
      })
      .catch((error) => {
        console.log("RateRiderForRide error", error?.response);
        setLoader(false);
      });
  };

  const SOSHandler = async () => {
    try {
      setLoader(true);

      const DriverManagement = {
        rideId: RIDEAFTERACCEPT?.rideId,
        lastLat: latitude,
        lastLng: longitude,
      };
      const response = await axios({
        method: "POST",
        url: createSOS,
        headers: {
          token: getToken?.Token,
        },
        data: {
          rideId: RIDEAFTERACCEPT?.rideId,
          lastLat: latitude?.toString(),
          lastLng: longitude?.toString(),
        },
      });
      if (response?.data?.responseCode === 200) {
        setLoader(false);
        showMessage({
          message: response?.data?.responseMessage,
          type: "success",
          icon: "success",
          duration: 2000,
        });
      }
    } catch (error) {
      setLoader(false);
      console.log("error SOSHandler,", error);
      // showMessage({
      //   message: error?.message,
      //   type: "danger",
      //   icon: "danger",
      //   duration: 2000,
      // });
    }
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
      <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} />
      <View style={{ flex: 1 }}>
        <HeaderComponent
          Drawer
          hideleft
          HomeHeader
          Bell
          onDrawerPress={openDrawer}
        />

        <GestureHandlerRootView style={{ flex: 1, position: "relative" }}>
          <MapView
            ref={mapRef}
            style={{
              // height: HEIGHT,
              zIndex: 2,
              flex: 1,
              // position: "absolute",
            }}
            initialRegion={intialLocation}
            zoomTapEnabled={true}
            zoomEnabled={true}
            scrollEnabled={true}
            showsScale={true}
          >
            <Marker.Animated
              ref={markerRef}
              coordinate={animatedCoordinate}
              title="Current Location"
              // pinColor="red"
              // image={require("../../assets/Images/Home/origin1.png")}
            >
              <Image
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
                source={require("../../assets/Images/Home/origin1.png")}
              />
            </Marker.Animated>

            {RIDEAFTERACCEPT && (
              <Marker
                coordinate={{
                  latitude: RIDEAFTERACCEPT?.destinationLocation?.latitude,
                  longitude: RIDEAFTERACCEPT?.destinationLocation?.longitude,
                }}
                // coordinate={{
                //   latitude: 28.5355,
                //   longitude: 77.391,
                // }}
                // title="Desitnation Location"
                // pinColor="orange"
                // image={require("../../assets/Images/Home/destination1.png")}
              >
                <Image
                  style={{ width: 30, height: 30 }}
                  resizeMode="contain"
                  source={require("../../assets/Images/Home/destination1.png")}
                />
              </Marker>
            )}

            {latitude && longitude && RIDEAFTERACCEPT && (
              <MapViewDirections
                origin={{
                  latitude: latitude,
                  longitude: longitude,
                }}
                destination={{
                  latitude: RIDEAFTERACCEPT?.destinationLocation?.latitude,
                  longitude: RIDEAFTERACCEPT?.destinationLocation?.longitude,
                }}
                // destination={{
                //   latitude: 28.5355,
                //   longitude: 77.391,
                // }}
                optimizeWaypoints={true}
                apikey={MAP_KEY}
                strokeWidth={5}
                strokeColor="rgba(255, 85, 0, 1)"
              />
            )}
          </MapView>
        </GestureHandlerRootView>

        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View
            style={{
              flex: 1,
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.65)",
              justifyContent: "center",
            }}
          >
            <View
              style={
                ANDROID
                  ? {
                      backgroundColor: COLORS.WHITE,
                      width: WIDTH * 0.85,
                      alignSelf: "center",
                      borderRadius: 15,
                      padding: 16,
                    }
                  : {
                      backgroundColor: COLORS.WHITE,
                      height: HEIGHT * 0.52,
                      width: WIDTH * 0.85,
                      paddingHorizontal: 16,
                      alignSelf: "center",
                      borderRadius: 15,
                      alignItems: "center",
                      justifyContent: "center",
                    }
              }
            >
              <View>
                <TouchableOpacity
                  onPress={() => {
                    // dispatch(clearRideDetailsAfterAccept());
                    // dispatch(clearRideDetails());
                    setModalVisible(false);
                    setTimeout(() => {
                      // props?.navigation?.dispatch(
                      //   CommonActions.reset({
                      //     index: 0,
                      //     routes: [{ name: "MyDrawer" }],
                      //   })
                      // );
                      setIsModalVisible(true);
                    }, 500);
                  }}
                >
                  <Image
                    style={{
                      height: 20,
                      width: 25,
                      // marginRight: 10,
                      // marginTop: 10,
                      resizeMode: "contain",
                      alignSelf: "flex-end",
                    }}
                    source={require("../../assets/Icons/cross.png")}
                  />
                </TouchableOpacity>
                <Image
                  source={IMAGEPATH.Success}
                  style={{
                    width: WIDTH * 0.21,
                    height: HEIGHT * 0.09,
                    resizeMode: "contain",
                    alignSelf: "center",
                  }}
                />

                <Text allowFontScaling={false} style={[Style.messagesgText12]}>
                  Ride Completed
                </Text>
                <Text allowFontScaling={false} style={[Style.messagesgText13]}>
                  Payment Received : $
                  {rideFare ? roundOff(parseFloat(rideFare), 2) : "0.00"}
                </Text>
                <View
                  style={{
                    backgroundColor: "#EFEFF4",
                    width: WIDTH * 0.85,
                    // height: HEIGHT * 0.002,
                    marginVertical: "3%",
                    borderRadius: 8,
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    paddingLeft: Platform.OS === "ios" ? "3.8%" : "2.8%",
                    width: WIDTH * 0.48,
                    // justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  // onPress={() => {
                  //   setModalVisible(false), setIsModalVisible(true);
                  // }}
                >
                  <Image
                    source={
                      RIDEAFTERACCEPT?.riderDetails?.riderImage
                        ? {
                            uri: RIDEAFTERACCEPT?.riderDetails?.riderImage,
                          }
                        : IMAGEPATH.DriverImage
                    }
                    style={Style.imgStyle}
                  />
                  <View style={{ paddingLeft: ANDROID ? "6%" : "8%" }}>
                    <Text allowFontScaling={false} style={Style.text1}>
                      {RIDEAFTERACCEPT?.riderDetails?.riderDetailsName}
                    </Text>
                    <View style={[Style.CommonStyle, { width: WIDTH * 0.13 }]}>
                      <VECTOR_ICONS.AntDesign
                        name="star"
                        color={COLORS.YELLOWPRIME}
                        size={20}
                      />
                      <Text allowFontScaling={false} style={Style.text2}>
                        {RIDEAFTERACCEPT?.riderDetails?.rating}
                      </Text>
                    </View>
                  </View>
                </View>
                <ScrollView
                  contentContainerStyle={{ paddingTop: 10 }}
                  showsVerticalScrollIndicator={false}
                >
                  <View
                    style={{
                      paddingHorizontal: "3%",
                      paddingTop: "2%",
                      flex: 1,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: Platform.OS === "ios" ? 15 : 0,
                        flex: 1,
                      }}
                    >
                      <View
                        style={{
                          paddingVertical: Platform.OS === "ios" ? "8%" : "1%",
                        }}
                      >
                        <VECTOR_ICONS.Fontisto
                          name="radio-btn-active"
                          size={22}
                          color={COLORS.ORANGE}
                        />
                        <Svg width="2" height="40%" style={Style.dashedLine}>
                          <Line
                            x1="1"
                            y1="0"
                            x2="1"
                            y2="110%"
                            stroke="gray"
                            strokeWidth="1"
                            strokeDasharray="5 5"
                          />
                        </Svg>
                        <VECTOR_ICONS.FontAwesome6
                          name="location-dot"
                          size={22}
                          color={COLORS.ORANGE}
                          style={{ left: 2 }}
                        />
                      </View>
                      <View style={{ paddingLeft: "5%" }}>
                        <Text allowFontScaling={false} style={[Style.text3]}>
                          Pick Up
                        </Text>
                        <Text
                          allowFontScaling={false}
                          style={{
                            fontSize: 14,
                            fontFamily: FONTS.light,
                            color: COLORS.BuleText,
                            width: WIDTH * 0.7,
                            paddingTop: "2%",
                            paddingRight: "2%",
                          }}
                          numberOfLines={3}
                        >
                          {RIDEAFTERACCEPT?.pickupAddress}
                        </Text>
                        <View style={Style.Line3} />
                        <Text
                          allowFontScaling={false}
                          style={[Style.text3, { paddingTop: "1.5%" }]}
                        >
                          Destination
                        </Text>
                        <Text
                          allowFontScaling={false}
                          style={{
                            fontSize: 14,
                            fontFamily: FONTS.light,
                            color: COLORS.BuleText,
                            width: WIDTH * 0.7,
                            paddingTop: "2%",
                            paddingRight: "2%",
                            paddingBottom: 10,
                          }}
                          numberOfLines={3}
                        >
                          {endRideAddress}
                        </Text>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </View>
              {/* <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("HomeOnline"), setIsModalVisible(false);
                  }}
                  style={Style.ButtonView}
                >
                  <Text allowFontScaling={false}
                    style={{
                      color: COLORS.WHITE,
                      fontSize: 17,
                      fontFamily: FONTS.semibold,
                      fontWeight: Platform.OS === "ios" ? "600" : "400",
                    }}
                  >
                    Submit
                  </Text>
                </TouchableOpacity> */}
            </View>
          </View>
        </Modal>
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.65)",
              justifyContent: "center",
            }}
          >
            <View style={Style.mainContainer}>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 30,
                  width: 30,
                  alignSelf: "flex-end",
                }}
                onPress={() => {
                  dispatch(clearRideDetailsAfterAccept());
                  dispatch(clearRideDetails());
                  setIsModalVisible(false);
                  setTimeout(() => {
                    props?.navigation?.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [{ name: "MyDrawer" }],
                      })
                    );
                  }, 500);
                }}
              >
                <Image
                  source={require("../../assets/Images/DrawerImages/cross.png")}
                  style={{ height: 30, width: 30, resizeMode: "contain" }}
                />
              </TouchableOpacity>
              <View style={{ paddingHorizontal: 20 }}>
                <Image
                  source={IMAGEPATH.Success}
                  style={{
                    width: WIDTH * 0.21,
                    height: HEIGHT * 0.09,
                    resizeMode: "contain",
                    alignSelf: "center",
                  }}
                />
                <Text allowFontScaling={false} style={[Style.messagesgText]}>
                  Ride Finished
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: FONTS.semibold,
                    color: "#242E42",
                    fontSize: 16,
                    alignSelf: "center",
                    marginTop: 5,
                  }}
                >
                  Cash Paid : ${" "}
                  {rideFare ? roundOff(parseFloat(rideFare), 2) : "0.00"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 25,
                  width: WIDTH * 0.7,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: "rgba(239, 239, 244, 1)",
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: WIDTH * 0.6,
                  alignSelf: "center",
                  columnGap: 15,
                }}
              >
                <Image
                  source={
                    RIDEAFTERACCEPT?.riderDetails?.riderImage
                      ? {
                          uri: RIDEAFTERACCEPT?.riderDetails?.riderImage,
                        }
                      : IMAGEPATH.DriverImage
                  }
                  style={Style.imgStyle}
                />

                <View style={{}}>
                  <Text allowFontScaling={false} style={Style.NameTEXT}>
                    {RIDEAFTERACCEPT?.riderDetails?.riderDetailsName}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-end",
                      width: WIDTH * 0.14,
                      columnGap: 8,
                    }}
                  >
                    <VECTOR_ICONS.AntDesign
                      name="star"
                      color={COLORS.YELLOWPRIME}
                      size={20}
                    />
                    <Text allowFontScaling={false} style={Style.text2}>
                      {RIDEAFTERACCEPT?.riderDetails?.rating}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  paddingTop: "4%",
                  width: WIDTH * 0.6,
                  alignSelf: "center",
                }}
              >
                <Text allowFontScaling={false} style={Style.RATEText}>
                  Rate Your Rider
                </Text>

                <View style={Style.StarView}>
                  <StarRating
                    rating={SelectStar}
                    onChange={setSelectStar}
                    enableSwiping={true}
                    emptyColor="#000"
                  />
                </View>
              </View>
              {SelectStar < 5 && (
                <TextInput
                  allowFontScaling={false}
                  value={review}
                  onChangeText={(text) => setReview(text)}
                  style={Style.inputBox}
                  placeholder={"Please write a review..."}
                  placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
                />
              )}
              {reviewError && (
                <Text allowFontScaling={false} style={Style.erroText}>
                  {reviewError}
                </Text>
              )}
              <TouchableOpacity
                onPress={() => RateRiderForRide()}
                style={Style.ButtonView}
              >
                <Text
                  allowFontScaling={false}
                  style={{
                    color: COLORS.WHITE,
                    fontSize: 17,
                    fontFamily: FONTS.bold,
                  }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      {startRide == true && (
        <>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ width: 100, height: 100 }}
            onPress={SOSHandler}
          >
            <Image
              source={require("../../assets/Images/Home/DengerIocn.png")}
              style={{
                width: 100,
                height: 100,
                position: "absolute",
                resizeMode: "contain",
                bottom: HEIGHT * 0.75,
                right: 15,
              }}
            />
          </TouchableOpacity>
        </>
      )}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={[HEIGHT * 0.13, bottomSheetRef !== null ? "48%" : "60"]}
          enableOverDrag={false}
          enablePanDownToClose={false}
          backgroundStyle={{
            backgroundColor: "#fff",
          }}
        >
          <DepartureRBSheet onPress={endRide} type={"StartRide"} />
        </BottomSheetModal>
      </BottomSheetModalProvider>
      {Loader && <SpinningLoader loader={Loader} />}
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
      {/* <WebView source={{uri:initialUrl}} style={{flex:1}}/> */}
    </>
  );
};

export default MainHomeOnlineStart;
const Style = StyleSheet.create({
  Line2: {
    backgroundColor: "#EFEFF4",
    width: WIDTH * 0.9,
    height: HEIGHT * 0.001,
    marginTop: "3%",
    borderRadius: 8,
    alignSelf: "center",
    marginVertical: "2%",
  },
  backImageStyle: {
    width: WIDTH,
    height: HEIGHT,
    resizeMode: "contain",
  },
  firstView1: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    // backgroundColor: 'red',
  },
  Line: {
    backgroundColor: "#9B9B9B",
    width: WIDTH * 0.15,
    height: HEIGHT * 0.009,
    alignSelf: "center",
    marginTop: "3%",
    borderRadius: 8,
  },
  messagesgText1: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.BuleText,
  },
  CommonStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "ios" ? 5 : 0,
  },
  text1: {
    fontSize: 17,
    fontFamily: FONTS.bold,
    color: COLORS.BuleText,
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  text2: {
    fontSize: 15,
    fontFamily: FONTS.light,
    color: "#C8C7CC",
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  text3: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    color: COLORS.BuleText,
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  text4: {
    fontSize: 14,
    fontFamily: FONTS.light,
    color: COLORS.BuleText,
    width: WIDTH * 0.5,
    paddingTop: "2%",
  },
  Line3: {
    backgroundColor: "#EFEFF4",
    width: WIDTH * 0.78,
    height: HEIGHT * 0.001,
    marginTop: "3%",
    borderRadius: 8,
  },
  Line1: {
    backgroundColor: "#EFEFF4",
    width: WIDTH * 0.9,
    height: HEIGHT * 0.001,
    marginTop: "3%",
    borderRadius: 8,
    marginLeft: -50,
  },
  CarView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: WIDTH * 0.6,
    alignItems: "center",
    paddingLeft: "3%",
    paddingBottom: "3%",
    // backgroundColor:'red',
    paddingTop: 15,
  },
  imgStyle: {
    width: 45,
    height: 45,
    borderRadius: 500,
    resizeMode: "cover",
  },
  CircleView: {
    backgroundColor: COLORS.ORANGE,
    borderRadius: 30,
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  dashedLine: {
    marginTop: 5,
    alignSelf: "center",
  },
  imgStyle1: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: HEIGHT * 0.1,
    width: WIDTH * 0.2,
    backgroundColor: "rgba(76, 229, 177, 1)",
    borderRadius: 50,
  },
  messagesgText12: {
    textAlign: "center",
    fontFamily: FONTS.bold,
    color: COLORS.SuccessText,
    fontSize: 20,
    alignSelf: "center",
    marginTop: "4%",
    marginBottom: "1%",
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  messagesgText13: {
    textAlign: "center",
    fontFamily: FONTS.semibold,
    fontSize: 15,
    color: COLORS.BuleText,
    marginVertical: "2%",
  },

  mainContainer: {
    // width: WIDTH * 0.76,
    padding: 10,
    paddingBottom: 25,
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    justifyContent: "center",
  },
  messagesgText: {
    textAlign: "center",
    fontFamily: FONTS.bold,
    color: COLORS.SuccessText,
    fontSize: 20,
    alignSelf: "center",
    paddingTop: Platform.OS === "ios" ? "0%" : "3%",
    fontWeight: Platform.OS === "ios" ? "600" : "400",
    // backgroundColor:'red'
  },
  CAR_messagesgText1: {
    textAlign: "center",
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: "#242E42",
    // fontWeight:'bold'
  },
  ButtonView: {
    backgroundColor: COLORS.ORANGE,
    width: WIDTH * 0.6,
    marginTop: "6%",
    paddingVertical: ANDROID ? "3.5%" : "4%",
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  NameTEXT: {
    fontFamily: FONTS.medium,
    color: COLORS.SuccessText,
    fontSize: 16,
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  RATEText: {
    fontFamily: FONTS.medium,
    color: COLORS.SuccessText,
    fontSize: 14,
    width: WIDTH * 0.56,
    marginTop: "5%",
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  StarView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: WIDTH * 0.6,
    alignSelf: "center",
    marginTop: "5%",
  },

  Line3_RIDECOMPLETE: {
    backgroundColor: "#EFEFF4",
    width: WIDTH * 0.713,
    height: HEIGHT * 0.001,
    marginTop: "3%",
    borderRadius: 8,
  },
  SuccsessImageStyle: {
    width: WIDTH * 0.2,
    height: HEIGHT * 0.08,
    resizeMode: "contain",
    alignSelf: "center",
  },
  inputBox: {
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.BLACK,
    borderWidth: 1,
    width: WIDTH * 0.6,
    marginTop: "6%",
    alignSelf: "center",
    borderRadius: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    height: HEIGHT * 0.05,
    fontFamily: FONTS.medium,
    color: COLORS.BLACK,
  },
  erroText: {
    width: WIDTH * 0.6,
    color: COLORS.ERRORCOLORRED,
    fontSize: 14,
    fontFamily: FONTS.medium,
    alignSelf: "center",
  },
});
