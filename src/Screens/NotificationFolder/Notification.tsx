import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS, VECTOR_ICONS } from "../../assets/Theme";
import Header from "../../Components/HeaderComponent";
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
import { useTranslation } from "react-i18next";
import Swipeout from "react-native-swipeout";
import DeleteImage from "../../Components/SVGComponents/DeleteImage";
import { Line, Svg } from "react-native-svg";
import { IOS } from "../../Helpers/Platform";
import { useSelector } from "react-redux";
import axios from "axios";
import { fetchNotification } from "../../Components/ApiConfig/EndPoints";
import { RootState } from "../../ReduxConfig/Store";
 

const Notification = (props: any) => {
  const { t } = useTranslation();
  const getToken = useSelector((state: RootState) => state.TOKEN_);
  // const UserData = useSelector((state: RootState) => state.userDetails);
  // console.log({ UserData });
  const RideDetails = useSelector(
    (state: RootState) => state.INITIAL_RIDE_DETAILS?.rideDetails
  );

  const rideData = [];

  const [notifcationsData, setNotifcationsData] = useState([]);

  const [loader, setLoader] = useState(false);

  const getNotifcationData = async () => {
    setLoader(true);
    try {
      const res = await axios({
        method: "post",
        url: fetchNotification,
        headers: {
          token: getToken.Token,
        },
      });

      if (res?.data?.responseCode === 200) {
        setNotifcationsData(res?.data?.notification);
        setLoader(false);
      }
    } catch (error) {
      // if (error?.data?.responseCode === 404){
      //   showMessage({
      //     type:'success',
      //     icon:'success',
      //     message:error?.data?.responseMessage
      //   })
      //   console.log('announcements response---<<<<>>>>',res)

      // }
      console.log("announcements error--->>", error);
      setLoader(false);
    }
  };

  useEffect(() => {
    const notifeee = props.navigation.addListener("focus", () => {
      getNotifcationData();
    });
    return notifeee;
  }, [props.navigation]);

  const RenderNotification = ({ item }) => {
    const swipeoutBtns = [
      {
        text: <DeleteImage />,
        type: "delete",
        backgroundColor: "#FFFFFF",
        onPress: () => handleDeleteNotification(item.id),
      },
    ];

    return (
      <Swipeout right={swipeoutBtns} backgroundColor={COLORS.WHITE}>
        <View>
          {item.id == 3 ? (
            <>
              <Text allowFontScaling={false} style={styles.CreatedAtTEXT}>
                21-09-2023 : 10:23 AM
              </Text>
              <Text allowFontScaling={false} style={styles.UnfortunatelyTEXT}>
                {t("Unfortunately, your rider had cancel the trip. Please accept another new ride and we'll get you moving shortly")}.
              </Text>
              <View
                style={{
                  borderBottomColor: "rgba(236, 236, 236, 1)",
                  borderBottomWidth: 3,
                }}
              />
            </>
          ) : (
            <View>
              <Text allowFontScaling={false} style={styles.CreatedAtTEXT}>
                {item.CREATED_AT}
              </Text>
              <View style={styles.MainView_}>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    columnGap: 10,
                  }}
                >
                  <View style={{ marginTop: Platform.OS === "ios" ? 15 : 18 }}>
                    <VECTOR_ICONS.FontAwesome6
                      name="location-dot"
                      size={15}
                      color={COLORS.ORANGE}
                    />
                    <View style={{ height: IOS ? 20 : 20 }}>
                      <Svg width={2} height="100%" style={styles.dashedLine}>
                        <Line
                          x1="1"
                          y1="0"
                          x2="1"
                          y2="100%"
                          stroke="gray"
                          strokeWidth={1}
                          strokeDasharray="4 4"
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
                      paddingVertical: 15,
                    }}
                  >
                    <Text allowFontScaling={false} style={styles.LocationTEXT}>
                      {item?.pickupAddress?.length > 30
                        ? item?.pickupAddress?.slice(0, 30) + "..."
                        : item?.pickupAddress}
                      {/* {item?.pickupAddress} */}
                    </Text>
                    <Text allowFontScaling={false} style={styles.LocationTEXT}>
                      {item?.destinationAddress?.length > 30
                        ? item?.destinationAddress?.slice(0, 30) + "..."
                        : item?.destinationAddress}
                      {/* {item?.destinationAddress} */}
                    </Text>
                  </View>
                </View>
                <View style={{ justifyContent: "space-between" }}>
                  <TouchableOpacity
                    onPress={() => {
                      //  props.navigation.navigate('')
                    }}
                    style={styles.ConfirmButton}
                  >
                    <Text allowFontScaling={false} style={styles.ButtonTEXT}>
                      {t("Confirm")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.RegectButton}>
                    <Text allowFontScaling={false} style={styles.ButtonTEXT}>
                      {t("Reject")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.NameID_View}>
                <Text allowFontScaling={false} style={styles.NameTEXT}>
                  {item?.driverDetails?.driverName}
                </Text>
                <Text allowFontScaling={false} style={styles.NameTEXT}>
                  {item.rideId}
                </Text>
              </View>

              <View
                style={{
                  borderBottomColor: "rgba(236, 236, 236, 1)",
                  borderBottomWidth: 3,
                }}
              ></View>
            </View>
          )}
        </View>
      </Swipeout>
    );
  };

  // const [data, setData] = useState(DATA);

  const handleDeleteNotification = (notificationId: any) => {
    console.log("Deleting notification with ID:", notificationId);
    const updatedData = data.filter((item) => item.id !== notificationId);
    console.log("Updated data:", updatedData);
    setData(updatedData);
  };
  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
      <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} />
      <SafeAreaView style={styles.MainContainer}>
        <Header Heading={t("Notification")} navigation={props?.navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.FlatListView}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={rideData}
              renderItem={({ item }) => <RenderNotification item={item} />}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={() => (
                <View
                  style={{
                    height: HEIGHT * 0.7,
                    backgroundColor: "#ffff",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{ height: 170, width: 200 }}
                    resizeMode="contain"
                    source={require("../../assets/Images/Home/nontifee.png")}
                  />
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: "#BEBEBE",
                      fontSize: 14,
                      fontFamily: FONTS.medium,
                      marginTop: 20,
                    }}
                  >
                    {t("No Notification Received Yet!")}
                  </Text>
                </View>
              )}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default Notification;

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
    paddingBottom: "3%",
  },
  FlatListView: {
    flex: 1,
    width: WIDTH * 0.9,
    alignSelf: "center",
  },
  CreatedAtTEXT: {
    color: "#8D8E92",
    fontSize: 13,
    fontFamily: FONTS.regular,
    paddingVertical: "2%",
    fontWeight: "500",
  },
  LocationTEXT: {
    color: COLORS.SuccessText,
    fontSize: 14,
    fontFamily: FONTS.medium,
    // paddingLeft: 10,
  },
  ConfirmButton: {
    backgroundColor: COLORS.GREEN1,
    paddingVertical: "2.5%",
    width: WIDTH * 0.22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: "7%",
  },
  ButtonTEXT: {
    color: COLORS.WHITE,
    fontSize: 13,
    fontFamily: FONTS.medium,
    fontWeight: Platform.OS === "ios" ? "600" : "400",
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
    paddingTop: "2%",
    borderBottomColor: COLORS.UPLOADBorderCOLOR,
    borderBottomWidth: 1,
    paddingBottom: "2%",
  },
  NameTEXT: {
    color: "#242E42",
    fontSize: 14,
    fontFamily: FONTS.light,
    fontWeight: "400",
  },
  NameID_View: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: "2%",
  },
  UnfortunatelyTEXT: {
    color: COLORS.SuccessText,
    fontSize: 14,
    fontFamily: FONTS.medium,
    lineHeight: 17,
    width: WIDTH * 0.9,
    alignSelf: "center",
    paddingVertical: "2.5%",
  },
  dashedLine: {
    marginTop: 5,
    alignSelf: "center",
  },
});
