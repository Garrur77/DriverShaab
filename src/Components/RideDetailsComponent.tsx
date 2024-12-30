import { View, Text, StyleSheet, Image, Platform } from "react-native";
import React from "react";
import WholeButton from "./WholeButton";
import CarSvg from "./HomeSvg/CarSvg";
import { Line, Svg } from "react-native-svg";
import { COLORS, FONTS, IMAGEPATH, VECTOR_ICONS } from "../assets/Theme";
import { HEIGHT, WIDTH } from "../Helpers/Dimentions";
import { ANDROID, IOS } from "../Helpers/Platform";
import { useSelector } from "react-redux";
import { RootState } from "../ReduxConfig/Store";
import Modal from "react-native-modal";
import { roundOff } from "../Utils/RoundOff";
const RideDetailsComponent: React.FC<{
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  cancelHandler: Function;
  confimHadndler: Function;
}> = ({ openModal, setOpenModal, confimHadndler, cancelHandler }) => {
  const rideData = useSelector(
    (state: RootState) => state.INITIAL_RIDE_DETAILS?.rideDetails
  );
  // console.log("rideData---->>>rideData---->>>", rideData);

  return (
    // <Modal  isVisible={openModal}   backdropColor="transparent"  animationOut="bounce"  onBackdropPress={()=>closedHandler()}  onSwipeComplete={()=>closedHandler()}>
    <View style={Style.ConfirmOrDeclineMainView}>
      <View style={Style.confirmOrDeclineSecondView}>
        <View style={[Style.CommonStyle]}>
          <Image
            source={
              rideData?.profileImage
                ? { uri: rideData?.profileImage }
                : IMAGEPATH.DummyDriverImage
            }
            style={Style.imgStyle}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              alignItems: "center",
            }}
          >
            <View style={{ marginLeft: 15 }}>
              <Text
                allowFontScaling={false}
                style={[
                  Style.text1,
                  { fontWeight: Platform.OS === "ios" ? "bold" : "400" },
                ]}
              >
                {rideData?.name ?? "Rider's name"}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <VECTOR_ICONS.AntDesign
                  name="star"
                  color={COLORS.YELLOWPRIME}
                  size={19}
                />
                <Text allowFontScaling={false} style={Style.text2}>
                  4.9
                </Text>
              </View>
            </View>
            <View>
              <Text allowFontScaling={false} style={Style.text1}>
                {rideData?.fareAmount
                  ? `$${roundOff(parseFloat(rideData?.fareAmount), 2)}`
                  : "$0.00"}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          padding: "3%",
          // backgroundColor:'skyblue'
        }}
      >
        <Text
          allowFontScaling={false}
          style={[
            Style.text3,
            {
              paddingLeft: "11%",
              fontWeight: Platform.OS === "ios" ? "bold" : "400",
            },
          ]}
        >
          Customer’s Current Location
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ paddingTop: "2%" }}>
            <VECTOR_ICONS.Fontisto
              name="radio-btn-active"
              size={22}
              color={COLORS.ORANGE}
            />
            <Svg width="2" height="20%" style={Style.dashedLine}>
              <Line
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
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

          <View
            style={{
              paddingLeft: "5%",
              paddingTop: "1.5%",
            }}
          >
            <Text allowFontScaling={false} style={Style.text4}>
              {rideData?.pickupAddress}
            </Text>
            <View style={Style.Line3}></View>
            <Text
              allowFontScaling={false}
              style={[
                Style.text3,
                {
                  paddingTop: "1.5%",
                  fontWeight: Platform.OS === "ios" ? "bold" : "400",
                },
              ]}
            >
              Customer’s Destination Location
            </Text>
            <Text
              allowFontScaling={false}
              style={[Style.text4, { paddingTop: "1.5%" }]}
            >
              {rideData?.destinationAddress}
            </Text>
            <View style={[Style.Line1]}></View>
          </View>
        </View>
      </View>
      <View
        style={{
          ...Style.CarView,
          columnGap: 10,
          flex: 1,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <Image
            source={{ uri: rideData?.vehicleIcon }}
            style={{ height: 35, width: 35 }}
            resizeMode="contain"
          />
          <Text
            allowFontScaling={false}
            style={{
              ...Style.messagesgText1,
              textTransform: "capitalize",
              marginTop: -5,
            }}
          >
            {rideData?.vehicleType}
          </Text>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            allowFontScaling={false}
            style={[
              Style.text2,
              {
                // fontWeight: Platform.OS === "ios" ? "bold" : "600",
                fontFamily: FONTS.bold,
              },
            ]}
          >
            DISTANCE
          </Text>
          <Text
            allowFontScaling={false}
            style={[
              Style.messagesgText1,
              { fontWeight: Platform.OS === "ios" ? "bold" : "400" },
            ]}
          >
            {rideData?.distance}{" "}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            allowFontScaling={false}
            style={[
              Style.text2,
              {
                fontFamily: FONTS.bold,
              },
            ]}
          >
            TIME
          </Text>
          <Text
            allowFontScaling={false}
            style={[
              Style.messagesgText1,
              { fontWeight: Platform.OS === "ios" ? "bold" : "400" },
            ]}
          >
            {rideData?.estimatedTimeInMinutes}
          </Text>
        </View>
      </View>

      <WholeButton
        Label="Confirm"
        styles={{
          alignSelf: "center",
          marginTop: IOS ? "5.5%" : "3%",
          backgroundColor: COLORS.ORANGE,
          width: WIDTH * 0.85,
        }}
        Action={() => {
          confimHadndler();
        }}
      />
      <WholeButton
        Label="Decline"
        styles={{
          alignSelf: "center",
          marginTop: "3.3%",
          backgroundColor: COLORS.BuleText,
          width: WIDTH * 0.85,
        }}
        Action={() => cancelHandler()}
      />
    </View>
    // </Modal>
  );
};
export default RideDetailsComponent;

const Style = StyleSheet.create({
  backImageStyle: {
    width: WIDTH,
    height: HEIGHT,
    resizeMode: "contain",
  },
  firstView1: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    // backgroundColor: COLORS.WHITE,
  },
  textStyle: {
    color: COLORS.BuleText,
    fontSize: 17,
    fontFamily: FONTS.light,
    textAlign: "center",
    paddingTop: "3.7%",
  },
  textStyle1: {
    color: COLORS.BuleText,
    fontSize: 16,
    fontFamily: FONTS.light,
  },
  Line: {
    backgroundColor: "#9B9B9B",
    width: WIDTH * 0.15,
    height: HEIGHT * 0.009,
    alignSelf: "center",
    marginTop: "3%",
    borderRadius: 8,
  },
  CancelrideView: {
    flexDirection: "row",
    width: WIDTH * 0.82,
    alignSelf: "flex-end",
    justifyContent: "space-around",
    marginTop: -20,
    // backgroundColor:'red'
  },
  CancelrideLineView: {
    backgroundColor: "#B1B1B1",
    width: WIDTH,
    height: 0.6,
    marginVertical: "3%",
  },
  CheckView: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    paddingVertical: "2.5%",
  },

  mainContainer: {
    width: "80%",
    alignSelf: "center",
    backgroundColor: COLORS.BACKGROUNDBLACK,
    borderRadius: 7,
    alignItems: "center",
    paddingBottom: "5%",
  },
  closeStyle: {
    alignSelf: "flex-end",
    width: "9%",
    marginTop: "3%",
    padding: 4,
    marginRight: 4,
  },
  imgStyle: {
    width: WIDTH * 0.15,
    height: HEIGHT * 0.07,
    borderRadius: 999,
    resizeMode: "contain",
  },
  messagesgText: {
    textAlign: "center",
    fontFamily: FONTS.bold,
    color: COLORS.WHITE2,
    alignSelf: "center",
    marginTop: "1.5%",
    paddingVertical: "3%",
  },
  messagesgText1: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.BuleText,
  },
  CommonStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  text1: {
    fontSize: 17,
    color: COLORS.BuleText,
    lineHeight: 20,
    fontFamily: FONTS.bold,
  },
  text2: {
    fontSize: 15,
    fontFamily: FONTS.semibold,
    marginLeft: 5,
    color: "#C8C7CC",
  },
  text3: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    color: COLORS.BuleText,
  },
  text4: {
    fontSize: 14,
    fontFamily: FONTS.light,
    color: COLORS.BuleText,
    width: WIDTH * 0.7,
  },
  Line3: {
    backgroundColor: "#EFEFF4",
    width: WIDTH * 0.7,
    height: HEIGHT * 0.001,
    marginTop: "3%",
    borderRadius: 8,
  },
  Line1: {
    backgroundColor: "#EFEFF4",
    // backgroundColor: "red",
    width: WIDTH * 0.7,
    height: HEIGHT * 0.001,
    marginTop: "5%",
    borderRadius: 8,
    // marginLeft: -60,
    paddingHorizontal: 20,
  },
  CarView: {
    height: "100px",
    flexDirection: "row",
    justifyContent: "space-between",
    // width: WIDTH * 0.8,
    paddingHorizontal: 20,
    paddingBottom: 12,
    paddingTop: 10,
    alignItems: "center",
    // paddingLeft: IOS ? "3%" : "4%",
    // paddingBottom: ANDROID ? "3%" : "1%",
    // marginTop: IOS ? -25 : -22,
    // backgroundColor:'red'
  },
  dashedLine: {
    marginTop: 5,
    alignSelf: "center",
  },
  CrossImage: {
    width: WIDTH * 0.04,
    height: HEIGHT * 0.04,
    resizeMode: "contain",
  },
  ConfirmOrDeclineMainView: {
    backgroundColor: COLORS.WHITE,
    width: WIDTH * 0.9,
    marginTop: IOS ? "60%" : "40%",
    paddingBottom: 20,
    paddingHorizontal: 10,
    alignSelf: "center",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  confirmOrDeclineSecondView: {
    width: WIDTH * 0.9,
    alignSelf: "center",
    backgroundColor: COLORS.WHITE2,
    padding: "3%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});
