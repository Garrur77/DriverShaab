import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
  Platform,
  Linking,
} from "react-native";
import React, { useRef } from "react";
import HeaderComponent from "../../Components/HeaderComponent";
import { COLORS, FONTS, IMAGEPATH, VECTOR_ICONS } from "../../assets/Theme";
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
import RBSheet from "react-native-raw-bottom-sheet";
import { useEffect, useState } from "react";
import WholeButton from "../../Components/WholeButton";
import CarSvg from "../../Components/HomeSvg/CarSvg";
import CommonModal from "../../Components/CommonModal";
import ChatSvg from "../SVGComponents/ChatSvg";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Line, Svg } from "react-native-svg";
import { ANDROID, IOS } from "../../Helpers/Platform";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../ReduxConfig/Store";
import LinearGradient from "react-native-linear-gradient";
import { DeviceEventEmitter } from "react-native";
import { setToggle } from "../../ReduxConfig/ToggleSlice";
// import {
//   incrementNotificationCount,
//   resetNotificationCount,
// } from "../../ReduxConfig/NotificationCountSlice";

const DepartureRBSheet = (props: any) => {
  const navigation = useNavigation();
  const [notificationCount, setNotificationCount] = useState(0);
  // console.log("notificationCount----->>>", notificationCount);
  const bottomSheetRef = useRef(null);
  const RIDEAFTERACCEPT = useSelector(
    (state: RootState) => state.INITIAL_RIDE?.rideDetailsAfterAccept
  );
  // console.log("RIDEAFTERACCEPT", RIDEAFTERACCEPT);

  useEffect(() => {
    if (props.shoesheet) {
      openBottomSheet();
    }
  }, [props]);
  console.log(props.shoesheet, "Online");
  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.open();
    }
  };

  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
      setTimeout(() => {
        setModalVisible(true);
      }, 200);
    }
  };
  const closeBottomSheet1 = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  };
  const [modalVisible, setModalVisible] = useState(false);
  console.log(modalVisible);
  const EnterCode = () => {
    // setModalVisible(false);
    props.navigation.navigate("EnterCode");
  };

  const OpenDirection = () => {
    const iniatialRoute = `https://maps.apple.com/?saddr=${RIDEAFTERACCEPT?.pickupLocation?.latitude},${RIDEAFTERACCEPT?.pickupLocation?.longitude}&daddr=${RIDEAFTERACCEPT?.destinationLocation?.latitude},${RIDEAFTERACCEPT?.destinationLocation?.longitude}`;

    Linking.openURL(iniatialRoute).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  const callRider = () => {
    Linking.openURL(`tel:${RIDEAFTERACCEPT?.riderDetails?.riderPhone}`);
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      "recived_new_message",
      (eventData) => {
        // Ensure eventData contains count and type fields
        if (
          eventData &&
          eventData.count &&
          eventData.type === "rider_message"
        ) {
          setNotificationCount(
            (prevCount) => prevCount + parseInt(eventData.count)
          );
        }
      }
    );

    return () => {
      subscription.remove(); // Clean up listener on unmount
    };
  }, [isFocused]);
  // const notificationCount = useSelector(
  //   (state: RootState) => state.notificationCountSlice.notificationCount
  // );
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const subscription = DeviceEventEmitter.addListener(
  //     "recived_new_message",
  //     (eventData) => {
  //       if (
  //         eventData &&
  //         eventData.count &&
  //         eventData.type === "driver_message"
  //       ) {
  //         const count = parseInt(eventData.count, 10);
  //         console.log("Parsed count:::", count);
  //         if (!isNaN(count)) {
  //           dispatch(incrementNotificationCount(count));
  //         }
  //       }
  //     }
  //   );

  //   return () => {
  //     subscription.remove();
  //   };
  // }, [dispatch, isFocused, notificationCount]);
  // const handleResetNotificationCount = () => {
  //   dispatch(resetNotificationCount());
  // };

  // console.log("notificationCount------>>>", notificationCount);
  return (
    <View>
      {/* <RBSheet
        ref={bottomSheetRef}
        height={ANDROID ? 350 : 355}
        closeOnDragDown={true}
        closeOnPressMask={true}
        // onClose={()=> setModalVisible(true)}
        customStyles={{
          container: Style.firstView1,
          draggableIcon: { opacity: 0 },
        }}
      > */}
      <View
        style={{
          backgroundColor: COLORS.WHITE,
          width: WIDTH * 0.9,
          alignSelf: "center",
          borderRadius: 8,
        }}
      >
        <View style={Style.CommonStyle}>
          <View
            style={[
              Style.CommonStyle,
              // { width: IOS ? WIDTH * 0.45 : WIDTH * 0.5 },
            ]}
          >
            <Image
              source={
                RIDEAFTERACCEPT?.riderDetails?.riderImage
                  ? { uri: RIDEAFTERACCEPT?.riderDetails?.riderImage }
                  : require("../../assets/Images/DrawerImages/DummyProfile.png")
              }
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                marginRight: 20,
              }}
              // source={IMAGEPATH.Man}
            />
            {/* <Image source={{uri:RIDEAFTERACCEPT?.riderDetails?.driverImage}} style={Style.imgStyle} /> */}
            <View>
              <Text allowFontScaling={false} style={Style.text1}>
                {RIDEAFTERACCEPT?.riderDetails?.riderDetailsName}
              </Text>
              <View
                style={[
                  Style.CommonStyle,
                  { marginTop: "2%", justifyContent: "flex-start" },
                ]}
              >
                <VECTOR_ICONS.AntDesign
                  name="star"
                  color={COLORS.YELLOWPRIME}
                  size={20}
                />
                <Text
                  allowFontScaling={false}
                  style={{ ...Style.text2, marginLeft: 10 }}
                >
                  {RIDEAFTERACCEPT?.riderDetails?.rating}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              columnGap: Platform.OS === "ios" ? 10 : 10,
            }}
          >
            <TouchableOpacity
              onPress={
                props?.type !== "StartRide"
                  ? props?.openDirection
                  : OpenDirection
              }
              style={[
                Style.CircleView,
                { backgroundColor: "lightgrey", borderRadius: 100 },
              ]}
            >
              <VECTOR_ICONS.MaterialCommunityIcons
                name="directions"
                size={25}
                color={"#000"}
                style={{}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                Style.CircleView,
                { backgroundColor: "rgba(66, 82, 255, 1)" },
              ]}
              onPress={() => {
                navigation.navigate("ChatDrivertoUser", {
                  rideSocket: props?.rideSocket,
                }),
                  dispatch(setToggle(false));
                // handleResetNotificationCount();
                setNotificationCount(0);
                closeBottomSheet1();
              }}
            >
              <ChatSvg />
              {notificationCount > 0 && (
                <View style={Style.notificationBadge}>
                  <Text allowFontScaling={false} style={Style.badgeText}>
                    {notificationCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => callRider()}
              style={Style.CircleView}
            >
              <VECTOR_ICONS.FontAwesome
                name="phone"
                size={25}
                color={COLORS.WHITE}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ padding: "3%", marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // overflow: "hidden",
            }}
          >
            <View
              style={{
                marginTop: IOS ? "1%" : "2%",
                overflow: "hidden",
                height: "100%",
              }}
            >
              <VECTOR_ICONS.Fontisto
                name="radio-btn-active"
                size={22}
                color={COLORS.ORANGE}
              />
              <Svg width="2" height="35%" style={Style.dashedLine}>
                <Line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="110%"
                  stroke="gray"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              </Svg>
              <VECTOR_ICONS.FontAwesome6
                name="location-dot"
                size={25}
                color={COLORS.ORANGE}
                style={{ left: 2 }}
              />
            </View>
            <View style={{ paddingLeft: "5%" }}>
              <Text
                allowFontScaling={false}
                style={[
                  Style.text3,
                  {
                    paddingTop: "1.5%",
                    fontWeight: Platform.OS === "ios" ? "600" : "400",
                  },
                ]}
              >
                Customer’s Current location
              </Text>
              {/* <Text allowFontScaling={false} style={Style.text4} numberOfLines={2}>
                {RIDEAFTERACCEPT?.pickupAddress}
              </Text> */}
              <Text
                allowFontScaling={false}
                style={Style.text4}
                numberOfLines={3}
              >
                {RIDEAFTERACCEPT?.pickupAddress}
              </Text>
              <View style={Style.Line}></View>
              <Text
                allowFontScaling={false}
                style={[
                  Style.text3,
                  {
                    marginTop: 8,
                    paddingTop: "1.5%",
                    fontWeight: Platform.OS === "ios" ? "600" : "400",
                  },
                ]}
              >
                Customer’s Destination location
              </Text>
              <Text
                allowFontScaling={false}
                style={Style.text4}
                numberOfLines={3}
              >
                {RIDEAFTERACCEPT?.destinationAddress}
              </Text>
              {/* <Text allowFontScaling={false} style={Style.text4} numberOfLines={2}>
                {RIDEAFTERACCEPT?.destinationAddress}
              </Text> */}
              <View style={[Style.Line1]}></View>
            </View>
          </View>
        </View>
        {props?.type !== "StartRide" ? (
          <>
            <WholeButton
              Label="Confirm Customer"
              styles={{
                alignSelf: "center",
                backgroundColor: COLORS.ORANGE,
                width: WIDTH * 0.85,
                marginTop: -20,
              }}
              Action={() => {
                props?.onPress();
              }}
            />
            <WholeButton
              Label="Cancle Ride"
              styles={{
                alignSelf: "center",
                backgroundColor: COLORS.BuleText,
                width: WIDTH * 0.85,
                marginTop: 20,
              }}
              Action={() => {
                props?.onCancle();
              }}
            />
          </>
        ) : (
          <WholeButton
            Label="Mark As Complete"
            styles={{
              alignSelf: "center",
              backgroundColor: COLORS.ORANGE,
              width: WIDTH * 0.85,
              marginTop: 20,
            }}
            Action={() => {
              props?.onPress();
            }}
          />
        )}
      </View>
    </View>
  );
};
export default DepartureRBSheet;
const Style = StyleSheet.create({
  messagesgText1: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.BuleText,
  },
  CommonStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor:'red'
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
  },
  text4: {
    textWrap: "wrap",
    fontSize: 13,
    fontFamily: FONTS.light,
    color: COLORS.BuleText,
    width: WIDTH * 0.8,
    paddingVertical: "2%",
    //backgroundColor: "red",
  },
  Line: {
    backgroundColor: "#EFEFF4",
    width: WIDTH * 0.78,
    height: HEIGHT * 0.001,
    marginTop: "3%",
    borderRadius: 8,
    //textAlign: 5,
  },
  Line1: {
    backgroundColor: "#EFEFF4",
    width: WIDTH * 0.8,
    height: HEIGHT * 0.001,
    alignSelf: "flex-end",
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
  },
  imgStyle: {
    width: WIDTH * 0.12,
    height: HEIGHT * 0.07,
    resizeMode: "contain",
  },
  firstView1: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: COLORS.WHITE,
  },
  CircleView: {
    backgroundColor: COLORS.ORANGE,
    borderRadius: 30,
    height: Platform.OS === "ios" ? 35 : 40,
    width: Platform.OS === "ios" ? 35 : 40,
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    alignItems: "center",
    width: WIDTH * 0.85,
    paddingBottom: "6%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: COLORS.BuleText,
    fontFamily: FONTS.bold,
    width: WIDTH * 0.6,
    fontSize: 18,
    marginTop: "10%",
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  dashedLine: {
    marginTop: 5,
    alignSelf: "center",
  },
  CrossImage: {
    width: WIDTH * 0.03,
    height: HEIGHT * 0.03,
    resizeMode: "contain",
  },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
