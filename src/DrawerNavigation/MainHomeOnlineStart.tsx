/************************************************************* NOT IN USE ***********************************************************************/
/************************************************************* NOT IN USE ***********************************************************************/
/************************************************************* NOT IN USE ***********************************************************************/
/************************************************************* NOT IN USE ***********************************************************************/
/************************************************************* NOT IN USE ***********************************************************************/
/************************************************************* NOT IN USE ***********************************************************************/
/************************************************************* NOT IN USE ***********************************************************************/
/************************************************************* NOT IN USE ***********************************************************************/
/************************************************************* NOT IN USE ***********************************************************************/
/************************************************************* NOT IN USE ***********************************************************************/
// import {
//   View,
//   Text,
//   SafeAreaView,
//   StyleSheet,
//   TouchableOpacity,
//   Modal,
//   Image,
//   StatusBar,
//   ScrollView,
//   Platform,
//   Linking,
//   Pressable,
// } from "react-native";
// import React, { useRef } from "react";
// import HeaderComponent from "../../Components/HeaderComponent";
// import { COLORS, FONTS, IMAGEPATH, VECTOR_ICONS } from "../../assets/Theme";
// import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
// import { useEffect, useState } from "react";
// import WholeButton from "../../Components/WholeButton";
// import { ANDROID, IOS } from "../../Helpers/Platform";
// import { Line, Svg } from "react-native-svg";
// import {
//   CommonActions,
//   useIsFocused,
//   useNavigation,
//   useRoute,
// } from "@react-navigation/native";
// import { useSelector } from "react-redux";
// import { RootState } from "../../ReduxConfig/Store";
// import { useDispatch } from "react-redux";
// import { saveStartRide_State } from "../../ReduxConfig/Slices";
// import WebView from "react-native-webview";
// import MapView, { AnimatedRegion, Marker } from "react-native-maps";
// import MapViewDirections from "react-native-maps-directions";
// import {
//   BottomSheetModal,
//   BottomSheetModalProvider,
// } from "@gorhom/bottom-sheet";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import DepartureRBSheet from "../../Components/HomeSvg/DepartureRBSheet";
// import {
//   SOCKET_URL,
//   createSOS,
//   rateDriver,
//   rateRider,
// } from "../../Components/ApiConfig/EndPoints";
// import Geolocation from "@react-native-community/geolocation";
// import { PERMISSIONS, request } from "react-native-permissions";
// import { PermissionsAndroid } from "react-native";
// import { setLocation } from "../../ReduxConfig/DriverLocationSlice";
// import { UpdateLoactionDriver } from "../../Components/ApiConfig/ApiCall";
// import { io } from "socket.io-client";
// import axios from "axios";
// import { showMessage } from "react-native-flash-message";
// import StarRating from "react-native-star-rating-widget";
// import { clearRideDetailsAfterAccept } from "../../ReduxConfig/RIdeSlice";
// import { AppState } from "react-native";
// import BackgroundTimer from "react-native-background-timer";
// import SpinningLoader from "../../assets/SpinningLoader";
// import { current } from "@reduxjs/toolkit";
// import { clearRideDetails } from "../../ReduxConfig/RideDetailsSlice";
// import { useSocket } from "../../Context/SocketContext";

// const MainHomeOnlineStart = (props) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [startRide, setstartRide] = useState(true);
//   const [letStartRide, setLetStartRide] = useState(false);
//   const [Loader, setLoader] = useState(false);
//   const [rideFare, setRideFare] = useState("");
//   const navigation = useNavigation();
//   const bottomSheetRef = useRef(null);
//   const [SelectStar, setSelectStar] = useState(0);

//   const route = useRoute();
//   // const { rideSocket } = route.params;

//   const rideSocket = useSocket();
//   const mapRef = useRef();
//   const markerRef = useRef();
//   const dispatch = useDispatch();
//   const openBottomSheet = () => {
//     if (bottomSheetRef.current) {
//       bottomSheetRef.current.present();
//     }
//   };

//   const closeBottomSheet1 = () => {
//     if (bottomSheetRef.current) {
//       bottomSheetRef.current.dismiss();
//       setTimeout(() => {
//         setModalVisible(true);
//       }, 200);
//     }
//   };

//   const Ride_STATE = useSelector(
//     (state: RootState) => state.StartRide_State.StartRide_State
//   );
//   const RIDEAFTERACCEPT = useSelector(
//     (state: RootState) => state.INITIAL_RIDE.rideDetailsAfterAccept
//   );
//   const Location = useSelector((state: RootState) => state.INITIAL_LOCATION);
//   const Data = useSelector(
//     (state: RootState) => state.TokenUserID_DETAILS?.userTokenAndId
//   );
//   const Driver = useSelector((state: RootState) => state.TokenUserID_DETAILS);
//   const getToken = useSelector((state: RootState) => state.TOKEN_);

//   const Socket = useSelector((state: RootState) => state.socketReducer);
//   useEffect(() => {
//     if (Ride_STATE == "STARTRIDE_") {
//       console.log("Call startride");
//       OpenOnlineRb();
//       setstartRide(true);
//     } else {
//       OpenOnlineRb();
//       setstartRide(true);
//       console.log("Not call strt ride");
//     }
//     console.log(route?.params?.screen_, "route?.params?.screen_");
//   }, [Ride_STATE]);

//   const bottomSheetRef1 = useRef(null);
//   const OpenOnlineRb = () => {
//     if (bottomSheetRef1.current) {
//       bottomSheetRef1.current.present();
//     }
//   };

//   const CloseOnlineRb = () => {
//     if (bottomSheetRef1.current) {
//       bottomSheetRef1.current.dismiss();
//       setTimeout(() => {
//         openBottomSheet();
//       }, 200);
//     }
//   };

//   const openDrawer = () => {
//     navigation.openDrawer();
//   };

//   const isFocused = useIsFocused();
//   const [initialUrl, setInitialUrl] = useState(
//     `https://maps.apple.com/?saddr=${Location?.latitude},${Location?.longitude}&daddr=${RIDEAFTERACCEPT?.destinationLocation?.latitude},${RIDEAFTERACCEPT?.destinationLocation?.longitude}`
//   );

//   const [intialLocation, setIntialLocation] = useState({
//     latitude: Location?.latitude,
//     longitude: Location?.longitude,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   });

//   //-----------------------Location Modal ------------------//
//   async function requestPermissionLocation() {
//     try {
//       if (Platform.OS === "android") {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: "Allow Ponttual to use your location?",
//             message:
//               "Pontual App needs access to your device's location to provide accurate information.",
//             buttonNeutral: "Ask Me Later",
//             buttonNegative: "Cancel",
//             buttonPositive: "OK",
//           }
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           return true;
//         } else {
//           return false;
//         }
//       } else if (Platform.OS === "ios") {
//         const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
//         console.log("result----location ggg MainHoemOnline", result);
//         if (result === "granted") {
//           return true;
//         } else if (result === "blocked") {
//           return false;
//         } else {
//           // ExitApp.exitApp();

//           return false;
//         }
//       }
//     } catch (err) {
//       console.log(err);
//       return false;
//     }
//   }

//   const getLocation = async () => {
//     const result = requestPermissionLocation();

//     result.then((res) => {
//       // console.log("res is:-------1698", res);
//       if (res) {
//         Geolocation.getCurrentPosition(
//           (position) => {
//             // console.log("position-------", position);
//             dispatch(setLocation(position?.coords));
//             getLiveLocation(
//               position?.coords?.latitude,
//               position?.coords?.longitude
//             );
//           },
//           (error) => {
//             console.log("enableHighAccuracy: false", error);
//           },
//           { enableHighAccuracy: false, timeout: 15000 }
//         );
//       } else {
//         console.log("location permission decline");
//       }
//     });
//     // console.log(location);
//   };

//   const getLiveLocation = async (latitude, longitude) => {
//     const locPermissionDenied = await requestPermissionLocation();
//     if (locPermissionDenied) {
//       // console.log("get live location after 4 second", heading);
//       animate(latitude, longitude);
//       dispatch(setLocation({ latitude, longitude }));
//     }
//   };
//   const animatedCoordinate = new AnimatedRegion({
//     latitude: Location?.latitude,
//     longitude: Location?.longitude,
//   });
//   const animate = (latitude, longitude) => {
//     const newCoordinate = { latitude, longitude };
//     if (Platform.OS == "android") {
//       if (markerRef.current) {
//         markerRef.current.animateMarkerToCoordinate(newCoordinate, 10000);
//       }
//     } else {
//       animatedCoordinate
//         .timing({
//           latitude: latitude,
//           longitude: longitude,
//           duration: 1000,
//           useNativeDriver: false,
//         })
//         .start();
//     }
//   };
//   //-----------------------END   Location     Modal ------------------//
//   // const rideSocket = useRef(io(SOCKET_URL));

//   //Logic for React Native
//   useEffect(() => {
//     if (isFocused) {
//       getLocation();
//       // rideSocket?.current?.connect();
//       rideSocket?.on("connect", () => {
//         console.log("Socket rideSocket connected");
//       });
//       rideSocket?.on("rideStarted", () => {
//         setLetStartRide(true);
//         // CloseOnlineRb(),
//         // setstartRide(false);
//         // dispatch(saveStartRide_State(""));
//         // Linking.openURL(initialUrl)
//         console.log("Socket rideStarted connected");
//       });
//       rideSocket?.on("rideEnded", () => {
//         setLetStartRide(false);
//         closeBottomSheet1();
//         console.log("Socket rideEnded connected");
//       });

//       // return () => {
//       //   rideSocket.current.disconnect();
//       // };
//     }
//   }, [isFocused, AppState]);

//   useEffect(() => {
//     AppState.addEventListener("change", (nextAppState) => {
//       console.log("DATA---->addEven tListener", nextAppState);
//     });
//     // Request location permission

//     // Start fetching location every 10 seconds
//     const intervalId = BackgroundTimer.setInterval(() => {
//       // console.log("BackgroundTimerBackgroundTimer--->");
//       getLocation();
//     }, 5000);

//     const intervalId1 = BackgroundTimer.setInterval(() => {
//       // console.log("BackgroundTimerBackgroundTimer--->");
//       if (
//         Location?.latitude &&
//         Location?.longitude &&
//         RIDEAFTERACCEPT?.rideId
//       ) {
//         const data = {
//           rideId: RIDEAFTERACCEPT?.rideId,
//           lat: Location?.latitude,
//           lng: Location?.longitude,
//         };
//         rideSocket?.emit("updateDriverLocation", data);
//       }
//     }, 1000);

//     rideSocket?.on("rideCancelled", (response) => {
//       if (Data?.userId === response?.driverId) {
//         showMessage({
//           message: "This ride has been cancle by user.",
//           type: "danger",
//         });
//         dispatch(clearRideDetailsAfterAccept());
//         dispatch(clearRideDetails());
//         bottomSheetRef.current.dismiss();
//         bottomSheetRef1.current.dismiss();
//         // rideSocket?.emit("availableDriver", { driverId: Data?.userId });
//         props?.navigation?.navigate("HomeOnline");
//       }
//     });

//     // Clean up timer when component unmounts
//     return () => {
//       BackgroundTimer.clearInterval(intervalId);
//       BackgroundTimer.clearInterval(intervalId1);
//     };
//   }, []);

//   const StartRide = async () => {
//     const rideId = RIDEAFTERACCEPT?.rideId;
//     const lat = Location?.latitude;
//     const lng = Location?.longitude;
//     rideSocket?.emit("startRide", rideId, lat, lng);

//     ///For Test Perpose
//     CloseOnlineRb(), setstartRide(false);
//     dispatch(saveStartRide_State(""));
//     Linking.openURL(initialUrl);
//   };

//   const endRide = () => {
//     const rideId = RIDEAFTERACCEPT?.rideId;
//     rideSocket?.emit("endRide", rideId);
//     rideSocket?.on("rideEnded", (endData) => {
//       console.log("ride end data ride end data ride end data", endData);
//       setRideFare(endData?.fareAmount);
//     });
//     // rideSocket?.emit("availableDriver", Driver.userTokenAndId.userId);
//     console.log("dfsdfdsfdsfdsfds", rideId);
//     closeBottomSheet1();
//   };

//   const RateRiderForRide = async () => {
//     // console.log("RIDEAFTERACCEPT?.riderId---", RIDEAFTERACCEPT?.rideId);
//     // console.log("Data?.userId", Data?.userId);
//     // console.log("calling rate api handler", SelectStar);
//     console.log("calling rate api handler");

//     setLoader(true);
//     axios({
//       method: "POST",
//       url: rateRider,
//       headers: {
//         token: getToken.Token,
//       },
//       data: {
//         userId: RIDEAFTERACCEPT?.riderDetails?.riderId,
//         rating: SelectStar,
//         review: "String",
//       },
//     })
//       .then((response) => {
//         console.log("RateforDriver----hanlder", response);
//         if (response.data.responseStatus === 200) {
//           setIsModalVisible(false);
//           setLoader(false);
//           dispatch(clearRideDetailsAfterAccept());
//           dispatch(clearRideDetails());
//           showMessage({
//             message: response?.data?.message,
//             type: "success",
//             icon: "success",
//             duration: 2000,
//           });
//           setTimeout(() => {
//             props?.navigation?.dispatch(
//               CommonActions.reset({
//                 index: 0,
//                 routes: [{ name: "MyDrawer" }],
//               })
//             );
//           }, 500);
//         } else {
//           // console.log("first--------->", error);
//         }
//       })
//       .catch((error) => {
//         console.log("=============RATE=======================", error.response);
//         setLoader(false);
//       });
//   };

//   const SOSHandler = async () => {
//     try {
//       setLoader(true);

//       const DriverManagement = {
//         rideId: RIDEAFTERACCEPT?.rideId,
//         lastLat: Location?.latitude,
//         lastLng: Location?.longitude,
//       };
//       const response = await axios({
//         method: "POST",
//         url: createSOS,
//         headers: {
//           token: getToken?.Token,
//         },
//         data: {
//           rideId: RIDEAFTERACCEPT?.rideId,
//           lastLat: Location?.latitude?.toString(),
//           lastLng: Location?.longitude?.toString(),
//         },
//       });
//       if (response?.data?.responseCode === 200) {
//         setLoader(false);
//         showMessage({
//           message: response?.data?.responseMessage,
//           type: "success",
//           icon: "success",
//           duration: 2000,
//         });
//       }
//     } catch (error) {
//       setLoader(false);
//       console.log("error SOSHandler,", error);
//       // showMessage({
//       //   message: error?.message,
//       //   type: "danger",
//       //   icon: "danger",
//       //   duration: 2000,
//       // });
//     }
//   };
//   const rideData = useSelector(
//     (state: RootState) => state.INITIAL_RIDE?.rideDetailsAfterAccept
//   );

//   // console.log("rideDatarideDatarideDatarideData rideData", rideData);

//   return (
//     <>
//       <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
//       <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} />
//       <View style={{ flex: 1 }}>
//         <HeaderComponent
//           Drawer
//           hideleft
//           HomeHeader
//           Bell
//           onDrawerPress={openDrawer}
//         />

//         <GestureHandlerRootView style={{ flex: 1, position: "relative" }}>
//           <MapView
//             ref={mapRef}
//             style={{
//               // height: HEIGHT,
//               zIndex: 2,
//               flex: 1,
//               // position: "absolute",
//             }}
//             initialRegion={intialLocation}
//             zoomTapEnabled={true}
//             zoomEnabled={true}
//             scrollEnabled={true}
//             showsScale={true}
//           >
//             <Marker.Animated
//               ref={markerRef}
//               coordinate={animatedCoordinate}
//               title="Current Location"
//               // pinColor="red"
//               // image={require("../../assets/Images/Home/origin1.png")}
//             >
//               <Image
//                 style={{ width: 30, height: 30 }}
//                 resizeMode="contain"
//                 source={require("../../assets/Images/Home/origin1.png")}
//               />
//             </Marker.Animated>

//             {RIDEAFTERACCEPT && (
//               <Marker
//                 coordinate={{
//                   latitude: RIDEAFTERACCEPT?.destinationLocation?.latitude,
//                   longitude: RIDEAFTERACCEPT?.destinationLocation?.longitude,
//                 }}
//                 // coordinate={{
//                 //   latitude: 28.5355,
//                 //   longitude: 77.391,
//                 // }}
//                 // title="Desitnation Location"
//                 // pinColor="orange"
//                 // image={require("../../assets/Images/Home/destination1.png")}
//               >
//                 <Image
//                   style={{ width: 30, height: 30 }}
//                   resizeMode="contain"
//                   source={require("../../assets/Images/Home/destination1.png")}
//                 />
//               </Marker>
//             )}

//             {Location && RIDEAFTERACCEPT && (
//               <MapViewDirections
//                 origin={{
//                   latitude: RIDEAFTERACCEPT?.pickupLocation?.latitude,
//                   longitude: RIDEAFTERACCEPT?.pickupLocation?.longitude,
//                 }}
//                 destination={{
//                   latitude: RIDEAFTERACCEPT?.destinationLocation?.latitude,
//                   longitude: RIDEAFTERACCEPT?.destinationLocation?.longitude,
//                 }}
//                 // destination={{
//                 //   latitude: 28.5355,
//                 //   longitude: 77.391,
//                 // }}
//                 optimizeWaypoints={true}
//                 apikey="AIzaSyCzU4XQ6D43-mEnHWZ5l3vobePxE6p2GRw"
//                 strokeWidth={5}
//                 strokeColor="rgba(255, 85, 0, 1)"
//               />
//             )}
//           </MapView>
//         </GestureHandlerRootView>

//         <Modal visible={modalVisible} transparent={true} animationType="slide">
//           <View
//             style={{
//               flex: 1,
//               alignItems: "center",
//               backgroundColor: "rgba(0,0,0,0.65)",
//               justifyContent: "center",
//             }}
//           >
//             <View
//               style={
//                 ANDROID
//                   ? {
//                       backgroundColor: COLORS.WHITE,
//                       width: WIDTH * 0.9,
//                       // marginHorizontal: 16,
//                       // backgroundColor: "yellow",
//                       // paddingHorizontal: 16,
//                       // height: HEIGHT * 0.55,
//                       alignSelf: "center",
//                       borderRadius: 15,
//                       padding: 16,
//                       // paddingVertical: "3%",
//                       // paddingBottom: 30,
//                     }
//                   : {
//                       backgroundColor: COLORS.WHITE,
//                       height: HEIGHT * 0.52,
//                       width: WIDTH * 0.85,
//                       paddingHorizontal: 16,
//                       alignSelf: "center",
//                       borderRadius: 15,
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }
//               }
//             >
//               <View
//               // style={{
//               //   // width: WIDTH * 0.9,
//               //   alignSelf: "center",
//               //   // backgroundColor: "red",
//               //   // paddingHorizontal: "3%",
//               //   borderTopLeftRadius: 8,
//               //   borderTopRightRadius: 8,
//               // }}
//               >
//                 <TouchableOpacity
//                   onPress={() => {
//                     dispatch(clearRideDetailsAfterAccept());
//                     dispatch(clearRideDetails());
//                     setModalVisible(false);
//                     setTimeout(() => {
//                       props?.navigation?.dispatch(
//                         CommonActions.reset({
//                           index: 0,
//                           routes: [{ name: "MyDrawer" }],
//                         })
//                       );
//                     }, 500);
//                   }}
//                 >
//                   <Image
//                     style={{
//                       height: 20,
//                       width: 25,
//                       marginRight: 10,
//                       marginTop: 10,
//                       resizeMode: "contain",
//                       alignSelf: "flex-end",
//                     }}
//                     source={require("../../assets/Icons/cross.png")}
//                   />
//                 </TouchableOpacity>
//                 <Image
//                   source={IMAGEPATH.Success}
//                   style={{
//                     width: WIDTH * 0.21,
//                     height: HEIGHT * 0.09,
//                     resizeMode: "contain",
//                     alignSelf: "center",
//                   }}
//                 />

//                 <Text style={[Style.messagesgText12]}>Ride Completed</Text>
//                 <Text style={[Style.messagesgText13]}>
//                   Payment Received $
//                   {RIDEAFTERACCEPT?.fareAmount
//                     ? parseFloat(RIDEAFTERACCEPT?.fareAmount)?.toFixed(2)
//                     : "0.00"}
//                   {/* {rideFare ? rideFare?.toFixed(2) : 0.0} */}
//                 </Text>
//                 <View
//                   style={{
//                     backgroundColor: "#EFEFF4",
//                     width: WIDTH * 0.85,
//                     // height: HEIGHT * 0.002,
//                     marginVertical: "3%",
//                     borderRadius: 8,
//                   }}
//                 />
//                 <TouchableOpacity
//                   style={{
//                     flexDirection: "row",
//                     paddingLeft: Platform.OS === "ios" ? "3.8%" : "2.8%",
//                     width: WIDTH * 0.48,
//                     // justifyContent: "space-between",
//                     alignItems: "center",
//                   }}
//                   onPress={() => {
//                     setModalVisible(false), setIsModalVisible(true);
//                   }}
//                 >
//                   <Image
//                     source={
//                       RIDEAFTERACCEPT?.riderDetails?.riderImage
//                         ? {
//                             uri: RIDEAFTERACCEPT?.riderDetails?.riderImage,
//                           }
//                         : IMAGEPATH.DriverImage
//                     }
//                     style={Style.imgStyle}
//                   />
//                   <View style={{ paddingLeft: ANDROID ? "6%" : "8%" }}>
//                     <Text style={Style.text1}>
//                       {RIDEAFTERACCEPT?.riderDetails?.riderDetailsName}
//                     </Text>
//                     <View style={[Style.CommonStyle, { width: WIDTH * 0.08 }]}>
//                       <VECTOR_ICONS.AntDesign
//                         name="star"
//                         color={COLORS.YELLOWPRIME}
//                         size={20}
//                       />
//                       <Text style={Style.text2}>
//                         {RIDEAFTERACCEPT?.riderDetails?.rating}
//                       </Text>
//                     </View>
//                   </View>
//                 </TouchableOpacity>
//                 <ScrollView
//                   contentContainerStyle={{ paddingTop: 10 }}
//                   showsVerticalScrollIndicator={false}
//                 >
//                   <View
//                     style={{
//                       paddingHorizontal: "3%",
//                       paddingTop: "2%",
//                     }}
//                   >
//                     <View
//                       style={{
//                         flexDirection: "row",
//                         justifyContent: "space-between",
//                         paddingLeft: Platform.OS === "ios" ? 15 : 0,
//                       }}
//                     >
//                       <View
//                         style={{
//                           // marginTop: Platform.OS === "ios" ? "8%" : "10%",
//                           paddingVertical: Platform.OS === "ios" ? "8%" : "6%",
//                         }}
//                       >
//                         <VECTOR_ICONS.Fontisto
//                           name="radio-btn-active"
//                           size={22}
//                           color={COLORS.ORANGE}
//                         />
//                         <Svg width="2" height="40%" style={Style.dashedLine}>
//                           <Line
//                             x1="1"
//                             y1="0"
//                             x2="1"
//                             y2="100%"
//                             stroke="gray"
//                             strokeWidth="1"
//                             strokeDasharray="5 5"
//                           />
//                         </Svg>
//                         <VECTOR_ICONS.FontAwesome6
//                           name="location-dot"
//                           size={22}
//                           color={COLORS.ORANGE}
//                           style={{ left: 2 }}
//                         />
//                       </View>
//                       <View style={{ paddingLeft: "5%" }}>
//                         <Text style={[Style.text3]}>Pick Up</Text>
//                         <Text
//                           style={{
//                             fontSize: 14,
//                             fontFamily: FONTS.light,
//                             color: COLORS.BuleText,
//                             width: WIDTH * 0.7,
//                             paddingTop: "2%",
//                             paddingRight: "2%",
//                           }}
//                           numberOfLines={3}
//                         >
//                           {RIDEAFTERACCEPT?.pickupAddress}
//                         </Text>
//                         <View style={Style.Line3} />
//                         <Text style={[Style.text3, { paddingTop: "1.5%" }]}>
//                           Destination
//                         </Text>
//                         <Text
//                           style={{
//                             fontSize: 14,
//                             fontFamily: FONTS.light,
//                             color: COLORS.BuleText,
//                             width: WIDTH * 0.7,
//                             paddingTop: "2%",
//                             paddingRight: "2%",
//                           }}
//                           numberOfLines={3}
//                         >
//                           {RIDEAFTERACCEPT?.destinationAddress}
//                         </Text>
//                       </View>
//                     </View>
//                   </View>
//                 </ScrollView>
//               </View>
//               {/* <TouchableOpacity
//                   onPress={() => {
//                     navigation.navigate("HomeOnline"), setIsModalVisible(false);
//                   }}
//                   style={Style.ButtonView}
//                 >
//                   <Text
//                     style={{
//                       color: COLORS.WHITE,
//                       fontSize: 17,
//                       fontFamily: FONTS.semibold,
//                       fontWeight: Platform.OS === "ios" ? "600" : "400",
//                     }}
//                   >
//                     Submit
//                   </Text>
//                 </TouchableOpacity> */}
//             </View>
//           </View>
//         </Modal>
//         <Modal
//           visible={isModalVisible}
//           transparent={true}
//           animationType="slide"
//         >
//           <View
//             style={{
//               flex: 1,
//               alignItems: "center",
//               backgroundColor: "rgba(0,0,0,0.65)",
//               justifyContent: "center",
//             }}
//           >
//             <View style={Style.mainContainer}>
//               <View style={{ paddingHorizontal: 20 }}>
//                 <Image
//                   source={IMAGEPATH.Success}
//                   style={{
//                     width: Platform.OS === "ios" ? WIDTH * 0.12 : WIDTH * 0.2,
//                     height: HEIGHT * 0.08,
//                     resizeMode: "contain",
//                     alignSelf: "center",
//                   }}
//                 />
//                 <Text style={[Style.messagesgText]}>Ride Finished</Text>
//                 <Text
//                   style={{
//                     fontFamily: FONTS.semibold,
//                     color: "#242E42",
//                     fontSize: 16,
//                     alignSelf: "center",
//                     marginTop: 5,
//                   }}
//                 >
//                   Cash Paid - ${" "}
//                   {RIDEAFTERACCEPT?.fareAmount
//                     ? parseFloat(RIDEAFTERACCEPT?.fareAmount)?.toFixed(2)
//                     : "0.00"}
//                 </Text>
//               </View>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   height: 25,
//                   width: WIDTH * 0.7,
//                 }}
//               >
//                 <View
//                   style={{
//                     flex: 1,
//                     height: 1,
//                     backgroundColor: "rgba(239, 239, 244, 1)",
//                   }}
//                 />
//               </View>

//               <View
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   width: IOS ? WIDTH * 0.4 : WIDTH * 0.45,
//                   columnGap: 15,
//                 }}
//               >
//                 <Image
//                   source={
//                     RIDEAFTERACCEPT?.riderDetails?.riderImage
//                       ? {
//                           uri: RIDEAFTERACCEPT?.riderDetails?.riderImage,
//                         }
//                       : IMAGEPATH.DriverImage
//                   }
//                   style={Style.imgStyle}
//                 />

//                 <View style={{}}>
//                   <Text style={Style.NameTEXT}>
//                     {RIDEAFTERACCEPT?.riderDetails?.riderDetailsName}
//                   </Text>
//                   <View
//                     style={{
//                       flexDirection: "row",
//                       alignItems: "flex-end",
//                       width: WIDTH * 0.14,
//                       columnGap: 8,
//                     }}
//                   >
//                     <VECTOR_ICONS.AntDesign
//                       name="star"
//                       color={COLORS.YELLOWPRIME}
//                       size={20}
//                     />
//                     <Text style={Style.text2}>
//                       {RIDEAFTERACCEPT?.riderDetails?.rating}
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//               <View style={{ paddingTop: "4%" }}>
//                 <Text style={Style.RATEText}>Rate Your Rider</Text>

//                 <View style={Style.StarView}>
//                   <StarRating
//                     rating={SelectStar}
//                     onChange={setSelectStar}
//                     enableSwiping={true}
//                     emptyColor="#000"
//                   />
//                 </View>
//               </View>
//               <TouchableOpacity
//                 onPress={() => RateRiderForRide()}
//                 style={Style.ButtonView}
//               >
//                 <Text
//                   style={{
//                     color: COLORS.WHITE,
//                     fontSize: 17,
//                     fontFamily: FONTS.semibold,
//                     fontWeight: Platform.OS === "ios" ? "600" : "400",
//                   }}
//                 >
//                   Submit
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//       </View>
//       {/* <GestureHandlerRootView> */}
//       <BottomSheetModalProvider>
//         {startRide == true && (
//           <>
//             {/* <View
//                 style={{
//                   // height: ANDROID ? HEIGHT * 0.4 : HEIGHT * 0.21,
//                   // alignSelf: "flex-end",
//                   // backgroundColor: "red",
//                   // marginLeft: 20,
//                   width: WIDTH * 0.3,
//                   height: HEIGHT * 0.12,
//                   position: "relative",
//                 }}
//               >
//                 <Pressable
//                   // style={{ alignSelf: "flex-start" }}
//                   onPress={OSOHandlerAPI}
//                 >
//                   <Image
//                     source={require("../../assets/Images/Home/DengerIocn.png")}
//                     style={{
//                       width: 100,
//                       height: 100,
//                       position: "absolute",
//                       resizeMode: "contain",
//                       top: 0,
//                       bottom: 20,
//                       right: 10,
//                       // marginTop: -10,
//                       // marginRight: -10,
//                     }}
//                   />
//                 </Pressable>
//               </View> */}
//             <TouchableOpacity
//               activeOpacity={0.8}
//               style={{ width: 100, height: 100 }}
//               onPress={SOSHandler}
//             >
//               <Image
//                 source={require("../../assets/Images/Home/DengerIocn.png")}
//                 style={{
//                   width: 100,
//                   height: 100,
//                   position: "absolute",
//                   resizeMode: "contain",
//                   bottom: HEIGHT * 0.15,
//                   right: 0,
//                 }}
//               />
//             </TouchableOpacity>
//           </>
//         )}
//         <BottomSheetModal
//           ref={bottomSheetRef1}
//           index={0}
//           backgroundStyle={{
//             backgroundColor: "#fff",
//           }}
//           enableOverDrag={false}
//           enablePanDownToClose={false}
//           snapPoints={["15%"]}
//         >
//           <View style={Style.firstView1}>
//             <View style={{ paddingBottom: "4%" }}>
//               <WholeButton
//                 Label="Navigate to Maps"
//                 styles={{
//                   alignSelf: "center",
//                   marginTop: "2%",
//                   backgroundColor: COLORS.ORANGE,
//                 }}
//                 Action={StartRide}
//               />
//             </View>
//           </View>
//         </BottomSheetModal>
//         <BottomSheetModal
//           ref={bottomSheetRef}
//           snapPoints={[HEIGHT * 0.13, bottomSheetRef !== null ? "48%" : "60"]}
//           enableOverDrag={false}
//           enablePanDownToClose={false}
//           backgroundStyle={{
//             backgroundColor: "#fff",
//           }}
//         >
//           <DepartureRBSheet onPress={endRide} type={"StartRide"} />
//         </BottomSheetModal>
//       </BottomSheetModalProvider>
//       {Loader && <SpinningLoader loader={Loader} />}
//       <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
//       {/* <WebView source={{uri:initialUrl}} style={{flex:1}}/> */}
//     </>
//   );
// };

// export default MainHomeOnlineStart;
// const Style = StyleSheet.create({
//   Line2: {
//     backgroundColor: "#EFEFF4",
//     width: WIDTH * 0.9,
//     height: HEIGHT * 0.001,
//     marginTop: "3%",
//     borderRadius: 8,
//     alignSelf: "center",
//     marginVertical: "2%",
//   },
//   backImageStyle: {
//     width: WIDTH,
//     height: HEIGHT,
//     resizeMode: "contain",
//   },
//   firstView1: {
//     borderTopLeftRadius: 15,
//     borderTopRightRadius: 15,
//     // backgroundColor: 'red',
//   },
//   Line: {
//     backgroundColor: "#9B9B9B",
//     width: WIDTH * 0.15,
//     height: HEIGHT * 0.009,
//     alignSelf: "center",
//     marginTop: "3%",
//     borderRadius: 8,
//   },
//   messagesgText1: {
//     fontFamily: FONTS.bold,
//     fontSize: 15,
//     color: COLORS.BuleText,
//   },
//   CommonStyle: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingTop: Platform.OS === "ios" ? 5 : 0,
//   },
//   text1: {
//     fontSize: 17,
//     fontFamily: FONTS.bold,
//     color: COLORS.BuleText,
//     fontWeight: Platform.OS === "ios" ? "600" : "400",
//   },
//   text2: {
//     fontSize: 15,
//     fontFamily: FONTS.light,
//     color: "#C8C7CC",
//     fontWeight: Platform.OS === "ios" ? "600" : "400",
//   },
//   text3: {
//     fontSize: 14,
//     fontFamily: FONTS.bold,
//     color: COLORS.BuleText,
//     fontWeight: Platform.OS === "ios" ? "600" : "400",
//   },
//   text4: {
//     fontSize: 14,
//     fontFamily: FONTS.light,
//     color: COLORS.BuleText,
//     width: WIDTH * 0.5,
//     paddingTop: "2%",
//   },
//   Line3: {
//     backgroundColor: "#EFEFF4",
//     width: WIDTH * 0.78,
//     height: HEIGHT * 0.001,
//     marginTop: "3%",
//     borderRadius: 8,
//   },
//   Line1: {
//     backgroundColor: "#EFEFF4",
//     width: WIDTH * 0.9,
//     height: HEIGHT * 0.001,
//     marginTop: "3%",
//     borderRadius: 8,
//     marginLeft: -50,
//   },
//   CarView: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: WIDTH * 0.6,
//     alignItems: "center",
//     paddingLeft: "3%",
//     paddingBottom: "3%",
//     // backgroundColor:'red',
//     paddingTop: 15,
//   },
//   imgStyle: {
//     width: 45,
//     height: 45,
//     borderRadius: 500,
//     resizeMode: "cover",
//   },
//   CircleView: {
//     backgroundColor: COLORS.ORANGE,
//     borderRadius: 30,
//     height: 35,
//     width: 35,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   dashedLine: {
//     marginTop: 5,
//     alignSelf: "center",
//   },
//   imgStyle1: {
//     alignSelf: "center",
//     alignItems: "center",
//     justifyContent: "center",
//     height: HEIGHT * 0.1,
//     width: WIDTH * 0.2,
//     backgroundColor: "rgba(76, 229, 177, 1)",
//     borderRadius: 50,
//   },
//   messagesgText12: {
//     textAlign: "center",
//     fontFamily: FONTS.bold,
//     color: COLORS.SuccessText,
//     fontSize: 20,
//     alignSelf: "center",
//     marginTop: "4%",
//     marginBottom: "1%",
//     fontWeight: Platform.OS === "ios" ? "600" : "400",
//   },
//   messagesgText13: {
//     textAlign: "center",
//     fontFamily: FONTS.semibold,
//     fontSize: 15,
//     color: COLORS.BuleText,
//     marginVertical: "2%",
//   },

//   mainContainer: {
//     width: WIDTH * 0.76,
//     // height: HEIGHT * 0.52,
//     padding: 16,
//     paddingVertical: 25,
//     alignSelf: "center",
//     backgroundColor: COLORS.WHITE,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   messagesgText: {
//     textAlign: "center",
//     fontFamily: FONTS.bold,
//     color: COLORS.SuccessText,
//     fontSize: 20,
//     alignSelf: "center",
//     paddingTop: Platform.OS === "ios" ? "0%" : "3%",
//     fontWeight: Platform.OS === "ios" ? "600" : "400",
//     // backgroundColor:'red'
//   },
//   CAR_messagesgText1: {
//     textAlign: "center",
//     fontFamily: FONTS.bold,
//     fontSize: 15,
//     color: "#242E42",
//     // fontWeight:'bold'
//   },
//   ButtonView: {
//     backgroundColor: COLORS.ORANGE,
//     width: WIDTH * 0.6,
//     marginTop: "6%",
//     paddingVertical: ANDROID ? "3.5%" : "4%",
//     borderRadius: 8,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   NameTEXT: {
//     fontFamily: FONTS.regular,
//     color: COLORS.SuccessText,
//     fontSize: 16,
//     fontWeight: Platform.OS === "ios" ? "600" : "400",
//   },
//   RATEText: {
//     fontFamily: FONTS.regular,
//     color: COLORS.SuccessText,
//     fontSize: 14,
//     width: WIDTH * 0.56,
//     marginTop: "5%",
//     fontWeight: Platform.OS === "ios" ? "600" : "400",
//   },
//   StarView: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: "5%",
//     paddingLeft: 25,
//   },

//   Line3_RIDECOMPLETE: {
//     backgroundColor: "#EFEFF4",
//     width: WIDTH * 0.713,
//     height: HEIGHT * 0.001,
//     marginTop: "3%",
//     borderRadius: 8,
//   },
//   SuccsessImageStyle: {
//     width: WIDTH * 0.2,
//     height: HEIGHT * 0.08,
//     resizeMode: "contain",
//     alignSelf: "center",
//   },
// });
