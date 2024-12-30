import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";

import HeaderComponent from "../../Components/HeaderComponent";
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
import { COLORS, FONTS, IMAGEPATH, VECTOR_ICONS } from "../../assets/Theme";
import { RootState } from "../../ReduxConfig/Store";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import SpinningLoader from "../../assets/SpinningLoader";

const Plans = (props: any) => {
  const { t } = useTranslation();
  const { userData, userTokenAndId } = useSelector(
    (state: RootState) => state?.TokenUserID_DETAILS
  );
  // const { userId } = useSelector(
  //   (state: RootState) => state?.TokenUserID_DETAILS?.userTokenAndId
  // );
  // console.log({ userData, userTokenAndId });
  const [Loader, setLoader] = useState(false);
  const [driverData, setDriverData] = useState([]);
  const [showImage, setShowImage] = useState("");
  const [plan, setPlan] = useState("Prepaid");

  const subscriptionData = [
    {
      id: 1,
      distance: "Distance :",
      priceTitle: "Plan Price :",
      value: "200 KM",
      price: "$2000",
      btn: "Subscribe",
    },
    {
      id: 2,
      distance: "Distance :",
      priceTitle: "Plan Price :",
      value: "200 KM",
      price: "$2000",
      btn: "Subscribe",
    },
    {
      id: 3,
      distance: "Distance :",
      priceTitle: "Plan Price :",
      value: "200 KM",
      price: "$2000",
      btn: "Subscribe",
    },
    {
      id: 4,
      distance: "Distance :",
      priceTitle: "Plan Price :",
      value: "200 KM",
      price: "$2000",
      btn: "Subscribe",
    },
    {
      id: 5,
      distance: "Distance :",
      priceTitle: "Plan Price :",
      value: "200 KM",
      price: "$2000",
      btn: "Subscribe",
    },
  ];
  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
      <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} />
      <SafeAreaView style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
        <HeaderComponent
          Heading={t("Plan Detail")}
          navigation={props.navigation}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.mainView}
        >
          <Text
            allowFontScaling={false}
            style={{ ...styles.heading, paddingBottom: 10 }}
          >
            {t("Current Plan:")}
          </Text>
          <View style={styles.mainContainer}>
            <View>
              <View style={styles.subContainer}>
                <Image
                  style={{ width: 15, height: 15 }}
                  source={IMAGEPATH.LocationMarker}
                  resizeMode="contain"
                />
                <Text allowFontScaling={false} style={styles.whiteText}>
                  {t("Distance : 200 km")}
                </Text>
              </View>
              <View style={styles.btnView}>
                <Text allowFontScaling={false} style={styles.blackText}>
                  {t("Price Plan: $2000")}
                </Text>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("PaymentOptions")}
                  style={styles.Btn}
                >
                  <Text allowFontScaling={false} style={styles.btnText}>
                    {t("Renew")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <Text
              allowFontScaling={false}
              style={{ ...styles.heading, paddingTop: 15 }}
            >
              {t("Available Plan")}:
            </Text>

            <View
              style={{ flexDirection: "row", columnGap: 10, marginTop: 20 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  columnGap: 8,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setPlan("Prepaid");
                  }}
                  style={{}}
                >
                  {plan == "Prepaid" ? (
                    <>
                      <VECTOR_ICONS.Fontisto
                        name="radio-btn-active"
                        size={20}
                        color={plan == "Prepaid" ? COLORS.ORANGE : COLORS.GRAY}
                      />
                    </>
                  ) : (
                    <>
                      <VECTOR_ICONS.Fontisto
                        name="radio-btn-passive"
                        size={20}
                        color={COLORS.GRAY}
                      />
                    </>
                  )}
                </TouchableOpacity>
                <Text allowFontScaling={false}>Prepaid</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  columnGap: 8,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setPlan("Postpaid");
                  }}
                >
                  {plan == "Postpaid" ? (
                    <>
                      <VECTOR_ICONS.Fontisto
                        name="radio-btn-active"
                        size={20}
                        color={plan == "Postpaid" ? COLORS.ORANGE : COLORS.GRAY}
                      />
                    </>
                  ) : (
                    <>
                      <VECTOR_ICONS.Fontisto
                        name="radio-btn-passive"
                        size={20}
                        color={COLORS.GRAY}
                      />
                    </>
                  )}
                </TouchableOpacity>
                <Text allowFontScaling={false}>Postpaid</Text>
              </View>
            </View>

            <View>
              <FlatList
                data={subscriptionData}
                contentContainerStyle={{ paddingBottom: 80 }}
                renderItem={({ item }) => (
                  <View style={{ ...styles.mainContainer, marginTop: 20 }}>
                    <View>
                      <View
                        style={{
                          ...styles.subContainer,
                          backgroundColor: COLORS.ORANGE,
                        }}
                      >
                        <Image
                          style={{ width: 15, height: 15 }}
                          source={IMAGEPATH.LocationMarker}
                          resizeMode="contain"
                        />
                        <Text allowFontScaling={false} style={styles.whiteText}>
                          {item.distance} : {item.value}
                        </Text>
                      </View>
                      <View style={styles.btnView}>
                        <Text allowFontScaling={false} style={styles.blackText}>
                          {item.priceTitle} {item.price}
                        </Text>
                        <TouchableOpacity style={styles.Btn}>
                          <Text allowFontScaling={false} style={styles.btnText}>
                            {item.btn}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <SpinningLoader loader={Loader} />

      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default Plans;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignSelf: "center",
    width: WIDTH,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.BLACK,
    fontWeight: "500",
  },
  mainContainer: {
    backgroundColor: COLORS.WHITE,
    width: "100%",
    height: 80,
    shadowColor: "##EFEFF4",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
    // padding: 10,
  },
  subContainer: {
    backgroundColor: COLORS.GREEN2,
    width: "100%",
    height: 35,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    paddingHorizontal: 10,
    // justifyContent: "center",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  btnView: {
    width: "100%",
    alignItems: "center",
    height: 45,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Btn: {
    backgroundColor: COLORS.BLUE1,
    // paddingHorizontal: 30,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 7,
    borderRadius: 8,
  },
  btnText: {
    color: COLORS.WHITE,
    fontSize: 14,
    fontFamily: FONTS.medium,
    fontWeight: "600",
  },
  whiteText: {
    color: COLORS.WHITE,
    fontSize: 14,
    fontFamily: FONTS.medium,
    fontWeight: "600",
  },
  blackText: {
    fontSize: 14,
    color: COLORS.BLACK3,
    fontFamily: FONTS.medium,
    paddingLeft: 10,
  },
});
