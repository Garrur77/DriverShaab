import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderComponent from "../../Components/HeaderComponent";
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
import { COLORS, FONTS, VECTOR_ICONS } from "../../assets/Theme";
import { RootState } from "../../ReduxConfig/Store";
import { useSelector } from "react-redux";
import { Line, Svg } from "react-native-svg";
import { AirbnbRating } from "react-native-ratings";
import axios from "axios";
import { ViewRating } from "../../Components/ApiConfig/EndPoints";
import SpinningLoader from "../../assets/SpinningLoader";
import moment from "moment";
import { roundOff } from "../../Utils/RoundOff";
import { useTranslation } from "react-i18next";

const MyRatings = (props: any) => {
  const { t } = useTranslation();
  const { token } = useSelector(
    (state: RootState) => state?.TokenUserID_DETAILS?.userTokenAndId
  );
  const [Loader, setLoader] = useState(false);
  const [driverRatings, setDriverRatings] = useState([]);
  const getDriverRating = async () => {
    try {
      setLoader(true);
      const response = await axios({
        method: "GET",
        url: ViewRating,
        headers: {
          token: token,
        },
      });
      if (response?.status === 200) {
        setLoader(false);
        setDriverRatings(response?.data?.rateArray);
      }
    } catch (error: any) {
      setLoader(false);
      console.log("Error get ratings:", error, error.response);
    }
  };
  console.log(driverRatings, "asdkjashdjashdjhasjdhasdjasdlkjas");
  useEffect(() => {
    getDriverRating();
  }, [props?.navigation]);

  const RenderNotification = ({ item }) => {
    return (
      <View>
        <View style={{}}>
          <View style={[style.CreatedAtVIEW]}>
            <View style={style.CreatedAtVIEW2}>
              <Text allowFontScaling={false} style={style.CreatedAtTEXT}>
                {moment(item.createdAt).format("DD-MM-YYYY : hh:mm A")}
              </Text>
              <AirbnbRating
                count={5}
                defaultRating={item?.riderRating}
                reviews={false}
                selectedColor={COLORS.ORANGE}
                unSelectedColor={"#E8E8E8"}
                size={16}
                isDisabled={true}
                showRating={false}
                ratingContainerStyle={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: -10,
                }}
              />
            </View>
          </View>
          <View style={style.MainView_}>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                marginRight: 10,
                justifyContent: "space-around",
              }}
            >
              <View>
                <VECTOR_ICONS.Fontisto
                  name="radio-btn-active"
                  size={15}
                  color={COLORS.ORANGE}
                />
                <View style={{ maxHeight: 30 }}>
                  <Svg width={2} height="100%" style={style.dashedLine}>
                    <Line
                      x1="1"
                      y1="0"
                      x2="1"
                      y2="110%"
                      stroke="gray"
                      strokeWidth={1}
                      strokeDasharray="5 4"
                    />
                  </Svg>
                </View>

                <VECTOR_ICONS.FontAwesome6
                  name="location-dot"
                  size={15}
                  color={COLORS.ORANGE}
                />
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  marginLeft: 10,
                  flex: 1,
                }}
              >
                <Text
                  numberOfLines={3}
                  allowFontScaling={false}
                  style={style.LocationTEXT}
                >
                  {item.pickupAddress}
                </Text>
                <Text
                  allowFontScaling={false}
                  numberOfLines={2}
                  style={{ ...style.LocationTEXT, marginTop: "1%" }}
                >
                  {item.destinationAddress}
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text allowFontScaling={false} style={style.AmountTEXT}>
                $ {roundOff(parseFloat(item.fareAmount), 2)}
              </Text>
            </View>
          </View>

          <View style={style.NameID_View}>
            <Text allowFontScaling={false} style={style.NameTEXT}>
              {item.CustomerName}
            </Text>
            <Text allowFontScaling={false} style={style.NameTEXT}>
              {item.riderId}
            </Text>
          </View>

          <View
            style={{
              borderBottomColor: "rgba(236, 236, 236, 1)",
              borderBottomWidth: 3,
            }}
          >
            {item.riderReview}
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
      <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} />
      <SafeAreaView style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
        <HeaderComponent
          Heading={t("My Ratings")}
          navigation={props.navigation}
        />

        <FlatList
          showsVerticalScrollIndicator={false}
          data={driverRatings}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={(item) => RenderNotification(item)}
          ListEmptyComponent={() => (
            <View
              style={{
                height: HEIGHT * 0.7,
                // flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  color: "#BEBEBE",
                  fontSize: 14,
                  fontFamily: FONTS.medium,
                  // marginTop: 20,
                }}
              >
                {t("No Ratings Received Yet!")}
              </Text>
            </View>
          )}
        />

        <SpinningLoader loader={Loader} />
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default MyRatings;

const style = StyleSheet.create({
  mainView: {
    backgroundColor: COLORS.WHITE,
    width: WIDTH * 0.9,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: "4.5%",
  },
  textStyle: {
    fontSize: 18,
    fontFamily: FONTS.medium,
    color: COLORS.BuleText,
  },
  Line: {
    backgroundColor: "#ECECEC",
    paddingVertical: "0.7%",
  },

  dashedLine: {
    marginTop: 5,
    alignSelf: "center",
  },
  mainComponent: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingBottom: "3%",
  },

  DateTEXT: {
    color: COLORS.DARK_BLACK,
    fontFamily: FONTS.bold,
    fontSize: 14,
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },

  CreatedAtTEXT: {
    color: COLORS.WHITE,
    fontSize: 14,
    fontFamily: FONTS.light,
    paddingVertical: "2.5%",
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  CreatedAtVIEW: {
    backgroundColor: COLORS.GRAY4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  CreatedAtVIEW2: {
    width: WIDTH * 0.9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    paddingVertical: 3,
    paddingHorizontal: 5,
  },

  LocationTEXT: {
    color: COLORS.SuccessText,
    fontSize: 12,
    fontFamily: FONTS.medium,
  },
  ConfirmButton: {
    backgroundColor: COLORS.GREEN1,
    paddingVertical: "2.5%",
    width: WIDTH * 0.22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  ButtonTEXT: {
    color: COLORS.WHITE,
    fontSize: 13,
    fontFamily: FONTS.medium,
  },

  RegectButton: {
    backgroundColor: COLORS.SuccessText,
    paddingVertical: "2.5%",
    width: WIDTH * 0.22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  MainView_: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopColor: COLORS.UPLOADBorderCOLOR,
    borderTopWidth: 1,
    paddingTop: "2.9%",
    borderBottomColor: COLORS.UPLOADBorderCOLOR,
    borderBottomWidth: 1,
    paddingBottom: "4%",
    width: WIDTH * 0.92,
    alignSelf: "center",
  },
  NameTEXT: {
    color: COLORS.SuccessText,
    fontSize: 14,
    fontFamily: FONTS.light,
  },
  AmountTEXT: {
    color: COLORS.GRAY4,
    fontSize: 16,
    fontFamily: FONTS.bold,
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  NameID_View: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: "2%",
    width: WIDTH * 0.9,
    alignSelf: "center",
  },
  UnfortunatelyTEXT: {
    color: COLORS.SuccessText,
    fontSize: 14,
    fontFamily: FONTS.medium,
    lineHeight: 17,
    width: WIDTH * 0.9,
    alignSelf: "center",
    paddingVertical: "4%",
  },
});
