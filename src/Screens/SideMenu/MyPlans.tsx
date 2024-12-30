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
import Modal from "react-native-modal";
import HeaderComponent from "../../Components/HeaderComponent";
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
import { COLORS, FONTS, VECTOR_ICONS } from "../../assets/Theme";
import { RootState } from "../../ReduxConfig/Store";
import { useSelector } from "react-redux";

import SpinningLoader from "../../assets/SpinningLoader";

import WholeButton from "../../Components/WholeButton";

const MyPlans = (props: any) => {
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
  const subscriptionData = [
    {
      title: "Plan Type :",
      value: "Postpaid",
    },

    {
      title: "For Distance :",
      value: "200 KM",
    },
    {
      title: "Plan Price :",
      value: "$2000",
    },
    {
      title: "Payment Mode :",
      value: "Offline",
    },
    {
      title: "Subscribed Date :",
      value: "03rd November,2023",
    },
    {
      title: "Due Date :",
      value: "03rd November,2023",
    },
    {
      title: "Status :",
      value: "OVERDUE",
    },
    {
      title: "Last Receipt :",
      value: "View Receipt",
    },
  ];
  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
      <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} />
      <SafeAreaView style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
        <HeaderComponent Heading="Plan Detail" navigation={props.navigation} />
        <ScrollView showsVerticalScrollIndicator={false} style={style.mainView}>
          <View>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 18,
                fontFamily: FONTS.bold,
                color: COLORS.BLACK,
                fontWeight: "500",
                paddingBottom: 10,
              }}
            >
              Subscribed Plan:
            </Text>
            <View>
              {subscriptionData.map((item) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{ flex: 0.4, fontSize: 14, color: COLORS.BLACK }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={{
                      flex: 0.6,
                      color:
                        item.value === "OVERDUE"
                          ? COLORS.OVERDUERED
                          : item.value === "View Receipt"
                          ? COLORS.BLUE2
                          : COLORS.BLACK,
                      fontWeight: item.value === "OVERDUE" ? "500" : "400",
                      fontSize: 14,
                      textDecorationLine:
                        item.value === "View Receipt" ? "underline" : "none",
                    }}
                  >
                    {item.value}
                  </Text>
                </View>
              ))}
              <WholeButton
                Label="Renew Your Plan"
                styles={{ alignSelf: "center", marginTop: 30 }}
                Action={() => props.navigation.navigate("Plans")}
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

export default MyPlans;

const style = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignSelf: "center",
    width: WIDTH,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});
