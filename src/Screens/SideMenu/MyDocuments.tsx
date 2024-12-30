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
import {
  VIEW_PROFILEDATA,
  ViewDocumentsByDriver,
  View_DetailsOfDriver,
} from "../../Components/ApiConfig/EndPoints";
import { callPostApi } from "../../Components/ApiConfig/ApiCall";
import SpinningLoader from "../../assets/SpinningLoader";
import axios from "axios";
import { useTranslation } from "react-i18next";

const MyDocuments = (props: any) => {
  const { t } = useTranslation();
  const { userData, userTokenAndId } = useSelector(
    (state: RootState) => state?.TokenUserID_DETAILS
  );
  console.log("userDatauserData", userData);
  const [Loader, setLoader] = useState(false);
  const [driverData, setDriverData] = useState([]);
  const [showImage, setShowImage] = useState("");
  const getDriverData = async () => {
    try {
      setLoader(true);
      const response = await axios({
        method: "GET",
        url: ViewDocumentsByDriver,
        headers: { token: userTokenAndId?.token },
      });
      if (response?.status === 200) {
        setLoader(false);
        setDriverData(response?.data?.driverDetail);
      }
    } catch (error: any) {
      setLoader(false);
      console.log("Error vehicle details:", error, error.response);
    }
  };
  useEffect(() => {
    getDriverData();
  }, [props?.navigation]);
  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
      <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} />
      <SafeAreaView style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
        <HeaderComponent
          Heading={t("My Documents")}
          navigation={props.navigation}
        />
        <ScrollView showsVerticalScrollIndicator={false} style={style.mainView}>
          <View
            style={{
              ...style.lineRow,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={style.profileImgContainer}>
              {userData?.profileImage ? (
                <Image
                  source={{ uri: userData?.profileImage }}
                  resizeMode="cover"
                  style={{ width: "100%", height: "100%", borderRadius: 999 }}
                />
              ) : (
                <Text allowFontScaling={false} style={style.textStyle}>
                  No Photo
                </Text>
              )}
            </View>
          </View>

          <View style={style.headTitleContainer}>
            <Text allowFontScaling={false} style={style.headTitleText}>
              {"Vehicle Details"}
            </Text>
          </View>
          <View style={{ ...style.lineRow, flex: 1 }}>
            <View
              style={{
                ...style.directionRow,
                flex: 0.5,
              }}
            >
              <Text allowFontScaling={false} style={style.textStyle}>
                License Number
              </Text>
              <Text allowFontScaling={false} style={style.textStyle}>
                :
              </Text>
            </View>
            <View style={style.detailTextView}>
              <Text allowFontScaling={false} style={{ ...style.textStyle }}>
                {userData?.licenceExpiration}
              </Text>
            </View>
          </View>
          <View style={style.lineRow}>
            <View style={{ ...style.directionRow, flex: 0.5 }}>
              <Text allowFontScaling={false} style={style.textStyle}>
                Vehicle Type
              </Text>
              <Text allowFontScaling={false} style={style.textStyle}>
                :
              </Text>
            </View>
            <View style={style.detailTextView}>
              <Text
                allowFontScaling={false}
                style={{
                  ...style.textStyle,
                  textTransform: "capitalize",
                }}
              >
                {userData?.vehicleType}
              </Text>
            </View>
          </View>
          <View style={style.lineRow}>
            <View style={{ ...style.directionRow, flex: 0.5 }}>
              <Text allowFontScaling={false} style={style.textStyle}>
                Vehicle Name
              </Text>
              <Text allowFontScaling={false} style={style.textStyle}>
                :
              </Text>
            </View>
            <View style={style.detailTextView}>
              <Text
                allowFontScaling={false}
                style={{
                  ...style.textStyle,
                }}
              >
                {userData?.vehicleName}
              </Text>
            </View>
          </View>
          <View style={style.lineRow}>
            <View style={{ ...style.directionRow, flex: 0.5 }}>
              <Text allowFontScaling={false} style={style.textStyle}>
                Vehicle Number
              </Text>
              <Text allowFontScaling={false} style={style.textStyle}>
                :
              </Text>
            </View>
            <View style={style.detailTextView}>
              <Text
                allowFontScaling={false}
                style={{
                  ...style.textStyle,
                }}
              >
                {userData?.vehicleNumber}
              </Text>
            </View>
          </View>
          <View style={style.lineRow}>
            <View style={{ ...style.directionRow, flex: 0.5 }}>
              <Text allowFontScaling={false} style={style.textStyle}>
                Vehicle Owner
              </Text>
              <Text allowFontScaling={false} style={style.textStyle}>
                :
              </Text>
            </View>
            <View style={style.detailTextView}>
              <Text
                allowFontScaling={false}
                style={{
                  ...style.textStyle,
                  flex: 0.5,
                  textTransform: "capitalize",
                }}
              >
                {userData?.vehicleOwner}
              </Text>
            </View>
          </View>
          <View style={style.lineRow}>
            <View style={{ ...style.directionRow, flex: 0.5 }}>
              <Text allowFontScaling={false} style={style.textStyle}>
                Class
              </Text>
              <Text allowFontScaling={false} style={style.textStyle}>
                :
              </Text>
            </View>
            <View style={style.detailTextView}>
              <Text
                allowFontScaling={false}
                style={{
                  ...style.textStyle,
                  textTransform: "capitalize",
                }}
              >
                {userData?.vehicleClass}
              </Text>
            </View>
          </View>
          <View style={style.lineRow}>
            <View style={{ ...style.directionRow, flex: 0.5 }}>
              <Text allowFontScaling={false} style={style.textStyle}>
                Booklet Number
              </Text>
              <Text allowFontScaling={false} style={style.textStyle}>
                :
              </Text>
            </View>
            <View style={style.detailTextView}>
              <Text
                allowFontScaling={false}
                style={{
                  ...style.textStyle,
                  flex: 0.5,
                  textTransform: "capitalize",
                }}
              >
                {userData?.bookletNumber}
              </Text>
            </View>
          </View>
          <View style={style.lineRow}>
            <View style={{ ...style.directionRow, flex: 0.5 }}>
              <Text allowFontScaling={false} style={style.textStyle}>
                Insurance Expiration
              </Text>
              <Text allowFontScaling={false} style={style.textStyle}>
                :
              </Text>
            </View>
            <View style={style.detailTextView}>
              <Text
                allowFontScaling={false}
                style={{
                  ...style.textStyle,
                  textTransform: "capitalize",
                }}
              >
                {userData?.insuranceExpiration}
              </Text>
            </View>
          </View>
          <View style={style.lineRow}>
            <View style={{ ...style.directionRow, flex: 0.5 }}>
              <Text allowFontScaling={false} style={style.textStyle}>
                Logbook Expiration
              </Text>
              <Text allowFontScaling={false} style={style.textStyle}>
                :
              </Text>
            </View>
            <View style={style.detailTextView}>
              <Text
                allowFontScaling={false}
                style={{
                  ...style.textStyle,
                  textTransform: "capitalize",
                }}
              >
                {userData?.logbookExpiration}
              </Text>
            </View>
          </View>
          <View style={style.lineRow}>
            <View style={{ ...style.directionRow, flex: 0.5 }}>
              <Text allowFontScaling={false} style={style.textStyle}>
                PCO Vehicle License Expiration
              </Text>
              <Text allowFontScaling={false} style={style.textStyle}>
                :
              </Text>
            </View>
            <View style={style.detailTextView}>
              <Text
                allowFontScaling={false}
                style={{
                  ...style.textStyle,
                  textTransform: "capitalize",
                }}
              >
                {userData?.pcoVehiclelicenceExpiration}
              </Text>
            </View>
          </View>
          <View style={style.lineRow}>
            <View style={{ ...style.directionRow, flex: 0.5 }}>
              <Text allowFontScaling={false} style={style.textStyle}>
                MOT Expiration
              </Text>
              <Text allowFontScaling={false} style={style.textStyle}>
                :
              </Text>
            </View>
            <View style={style.detailTextView}>
              <Text
                allowFontScaling={false}
                style={{
                  ...style.textStyle,
                  textTransform: "capitalize",
                }}
              >
                {userData?.motExpiration}
              </Text>
            </View>
          </View>
          <View style={style.lineRow}>
            <View style={{ ...style.directionRow, flex: 0.5 }}>
              <Text allowFontScaling={false} style={style.textStyle}>
                Description
              </Text>
              <Text allowFontScaling={false} style={style.textStyle}>
                :
              </Text>
            </View>
            <View style={style.detailTextView}>
              <Text
                allowFontScaling={false}
                style={{
                  ...style.textStyle,
                  textTransform: "capitalize",
                }}
              >
                {userData?.others}
              </Text>
            </View>
          </View>

          <View style={{ ...style.lineRow, marginTop: "5%" }}>
            <View style={{ flex: 0.5 }}>
              <Text allowFontScaling={false} style={style.textStyle}>
                License Card
              </Text>
              <TouchableOpacity
                onPress={() => setShowImage(userData?.licenceExpirationDoc)}
                style={style.docImageContainer}
              >
                {userData?.licenceExpirationDoc ? (
                  <Image
                    source={{ uri: userData?.licenceExpirationDoc }}
                    resizeMode="cover"
                    style={{ width: "100%", height: "100%", borderRadius: 10 }}
                  />
                ) : (
                  <Text allowFontScaling={false} style={style.textStyle}>
                    No document.
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.5 }}>
              <Text allowFontScaling={false} style={style.textStyle}>
                Booklet Card
              </Text>
              <TouchableOpacity
                onPress={() => setShowImage(driverData?.bookletNumberDocs)}
                style={style.docImageContainer}
              >
                {driverData?.bookletNumberDocs ? (
                  <Image
                    source={{ uri: driverData?.bookletNumberDocs }}
                    resizeMode="cover"
                    style={{ width: "100%", height: "100%", borderRadius: 10 }}
                  />
                ) : (
                  <Text allowFontScaling={false} style={style.textStyle}>
                    No document.
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.lineRow}>
            <View style={{ flex: 0.5 }}>
              <Text allowFontScaling={false} style={style.textStyle}>
                Vehicle Front
              </Text>
              <TouchableOpacity
                onPress={() => setShowImage(driverData?.frontVehicle)}
                style={style.docImageContainer}
              >
                {driverData?.frontVehicle ? (
                  <Image
                    source={{ uri: driverData?.frontVehicle }}
                    resizeMode="cover"
                    style={{ width: "100%", height: "100%", borderRadius: 10 }}
                  />
                ) : (
                  <Text allowFontScaling={false} style={style.textStyle}>
                    No document.
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.5 }}>
              <Text allowFontScaling={false} style={style.textStyle}>
                Vehicle Back
              </Text>
              <TouchableOpacity
                onPress={() => setShowImage(driverData?.backVehicle)}
                style={style.docImageContainer}
              >
                {driverData?.backVehicle ? (
                  <Image
                    source={{ uri: driverData?.backVehicle }}
                    resizeMode="cover"
                    style={{ width: "100%", height: "100%", borderRadius: 10 }}
                  />
                ) : (
                  <Text allowFontScaling={false} style={style.textStyle}>
                    No document.
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.lineRow}>
            <View style={{ flex: 0.5 }}>
              <Text allowFontScaling={false} style={style.textStyle}>
                Vehicle Left
              </Text>
              <TouchableOpacity
                onPress={() => setShowImage(driverData?.leftVehicle)}
                style={style.docImageContainer}
              >
                {driverData?.leftVehicle ? (
                  <Image
                    source={{ uri: driverData?.leftVehicle }}
                    resizeMode="cover"
                    style={{ width: "100%", height: "100%", borderRadius: 10 }}
                  />
                ) : (
                  <Text allowFontScaling={false} style={style.textStyle}>
                    No document.
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.5 }}>
              <Text allowFontScaling={false} style={style.textStyle}>
                Vehicle Right
              </Text>
              <TouchableOpacity
                onPress={() => setShowImage(driverData?.rightVehicle)}
                style={style.docImageContainer}
              >
                {driverData?.rightVehicle ? (
                  <Image
                    source={{ uri: driverData?.rightVehicle }}
                    resizeMode="cover"
                    style={{ width: "100%", height: "100%", borderRadius: 10 }}
                  />
                ) : (
                  <Text allowFontScaling={false} style={style.textStyle}>
                    No document.
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.lineRow}>
            <View style={{ flex: 0.5 }}>
              <Text allowFontScaling={false} style={style.textStyle}>
                Insurance Expire Doc
              </Text>
              <TouchableOpacity
                onPress={() => setShowImage(driverData?.insuranceExpirationDoc)}
                style={style.docImageContainer}
              >
                {driverData?.insuranceExpirationDoc ? (
                  <Image
                    source={{ uri: driverData?.insuranceExpirationDoc }}
                    resizeMode="cover"
                    style={{ width: "100%", height: "100%", borderRadius: 10 }}
                  />
                ) : (
                  <Text allowFontScaling={false} style={style.textStyle}>
                    No document.
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.5 }}>
              <Text allowFontScaling={false} style={style.textStyle}>
                Logbook Expire Doc
              </Text>
              <TouchableOpacity
                onPress={() => setShowImage(driverData?.logbookExpirationDoc)}
                style={style.docImageContainer}
              >
                {driverData?.logbookExpirationDoc ? (
                  <Image
                    source={{ uri: driverData?.logbookExpirationDoc }}
                    resizeMode="cover"
                    style={{ width: "100%", height: "100%", borderRadius: 10 }}
                  />
                ) : (
                  <Text allowFontScaling={false} style={style.textStyle}>
                    No document.
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.lineRow}>
            <View style={{ flex: 0.5 }}>
              <Text allowFontScaling={false} style={style.textStyle}>
                PCO Expire Doc
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setShowImage(userData?.pcoVehiclelicenceExpirationDoc)
                }
                style={style.docImageContainer}
              >
                {userData?.pcoVehiclelicenceExpirationDoc ? (
                  <Image
                    source={{ uri: userData?.pcoVehiclelicenceExpirationDoc }}
                    resizeMode="cover"
                    style={{ width: "100%", height: "100%", borderRadius: 10 }}
                  />
                ) : (
                  <Text allowFontScaling={false} style={style.textStyle}>
                    No document.
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.5 }}>
              <Text allowFontScaling={false} style={style.textStyle}>
                MOT Expire Docs
              </Text>
              <TouchableOpacity
                onPress={() => setShowImage(driverData?.motExpirationDocs)}
                style={style.docImageContainer}
              >
                {driverData?.motExpirationDocs ? (
                  <Image
                    source={{ uri: driverData?.motExpirationDocs }}
                    resizeMode="cover"
                    style={{ width: "100%", height: "100%", borderRadius: 10 }}
                  />
                ) : (
                  <Text allowFontScaling={false} style={style.textStyle}>
                    No document.
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ paddingBottom: 40 }} />
        </ScrollView>
      </SafeAreaView>
      <SpinningLoader loader={Loader} />

      <Modal
        isVisible={showImage ? true : false}
        onSwipeComplete={() => setShowImage("")}
        coverScreen={false}
        backdropColor="rgba(0,0,0,0.4)"
        onBackdropPress={() => setShowImage("")}
        onBackButtonPress={() => setShowImage("")}
        style={{
          flex: 1,
          margin: 0,
        }}
      >
        <TouchableOpacity
          onPress={() => setShowImage("")}
          style={{
            height: HEIGHT * 0.7,
            width: WIDTH * 0.9,
            alignSelf: "center",
          }}
        >
          {showImage ? (
            <Image
              source={{ uri: showImage }}
              resizeMode="cover"
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
            />
          ) : (
            <Text allowFontScaling={false} style={style.textStyle}>
              No document.
            </Text>
          )}
        </TouchableOpacity>
      </Modal>
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default MyDocuments;

const style = StyleSheet.create({
  docImageContainer: {
    width: "100%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
    borderRadius: 10,
    marginTop: 5,
  },
  headTitleText: {
    color: "#000",
    fontFamily: FONTS.bold,
    fontSize: 18,
    borderBottomColor: "gray",
    borderBottomWidth: 2,
  },
  headTitleContainer: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 10,
    paddingBottom: 4,
  },
  profileImgContainer: {
    width: 100,
    height: 100,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
  },
  mainView: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignSelf: "center",
    width: WIDTH,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  textStyle: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.BuleText,
    paddingTop: 10,
  },
  Line: {
    backgroundColor: "#ECECEC",
    paddingVertical: "0.7%",
  },
  directionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
    flex: 1,
    columnGap: 10,
    rowGap: 10,
  },
  detailTextView: {
    flex: 0.5,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
