import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../../Components/HeaderComponent";
import { COLORS, FONTS, IMAGEPATH } from "../../assets/Theme";
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
import WholeButton from "../../Components/WholeButton";
import { IOS } from "../../Helpers/Platform";

import { VIEW_PROFILEDATA } from "../../Components/ApiConfig/EndPoints";
import { callPostApi } from "../../Components/ApiConfig/ApiCall";
import SpinningLoader from "../../assets/SpinningLoader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../ReduxConfig/Store";
import {
  setIsisVerifiedByAdmin,
  setUserData,
} from "../../ReduxConfig/TokenUserID";
import { setUpdateDetail } from "../../ReduxConfig/PersonalDetailsSlice";
import { useTranslation } from "react-i18next";
import { useIsFocused } from "@react-navigation/native";

const Account = (props: any, { navigation }) => {
  const { t } = useTranslation();
  const focused = useIsFocused();
  const Data = useSelector(
    (state: RootState) => state.TokenUserID_DETAILS?.userTokenAndId
  );
  const dispatch = useDispatch();
  const [Loader, setLoader] = useState(false);
  const UserData = useSelector(
    (state: RootState) => state.TokenUserID_DETAILS?.userData
  );

  type ImageData = {
    path: string;
  };

  const VIEW_PROFILEAPI = async () => {
    setLoader(true);
    try {
      var postData = {
        token: Data?.token,
      };
      const SucessDisplay = true;
      const { response, error, loading } = await callPostApi(
        VIEW_PROFILEDATA,
        postData,
        false
      );
      setLoader(loading);
      if (!error && response?.responseCode === 200) {
        setLoader(false);
        dispatch(setUserData(response?.data));
        dispatch(setUpdateDetail(response?.data));
        dispatch(setIsisVerifiedByAdmin(response?.data?.isVerifiedByAdmin));
      } else {
        console.log("API Error:", error);
      }
    } catch (error: any) {
      console.log("Error during MO_verify:", error, error.response);
    }
  };

  useEffect(() => {
    if (focused) {
      VIEW_PROFILEAPI();
    }
  }, [focused]);

  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
      <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} />
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
        <Header Heading={t("Account")} navigation={props.navigation} />
        <View>
          {UserData?.profileImage ? (
            <Image
              source={{ uri: UserData.profileImage }}
              style={{
                borderRadius: 100,
                height: 140,
                width: 140,
                alignSelf: "center",
                marginTop: "5%",
                resizeMode: "cover",
              }}
            />
          ) : (
            <Image source={IMAGEPATH.ProfilePic} style={styles.ImageStyle} />
          )}
          {/* <TouchableOpacity
            onPress={() => openGallery_()}
            style={[
              styles.EditIconStyle,
              { marginTop: PickedImage ? -20 : -34 },
            ]}
          >
            <ProfileEditIcon />
          </TouchableOpacity> */}
        </View>
        <View style={styles.DataView}>
          <Text
            allowFontScaling={false}
            numberOfLines={1}
            style={styles.textStyle}
          >
            {UserData?.firstName} {UserData?.lastName}
          </Text>
          <Text allowFontScaling={false} style={styles.textStyle1}>
            {t("Full Name")}
          </Text>
          <Text
            allowFontScaling={false}
            numberOfLines={1}
            style={styles.textStyle}
          >
            {UserData.email}
          </Text>
          <Text allowFontScaling={false} style={styles.textStyle1}>
            {t("Email")}
          </Text>
          <Text
            allowFontScaling={false}
            numberOfLines={1}
            style={styles.textStyle}
          >
            {UserData?.countryCode}-{UserData?.mobile}
          </Text>
          <Text allowFontScaling={false} style={styles.textStyle1}>
            {t("Mobile Number")}
          </Text>
          {/* <Text allowFontScaling={false} numberOfLines={1} style={styles.textStyle}>Govindpuri, Okhla Phase-1</Text>
                    <Text allowFontScaling={false} style={styles.textStyle1}>Address</Text> */}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: "10%",
            alignSelf: "center",
            width: WIDTH * 0.9,
            columnGap: 20,
          }}
        >
          <WholeButton
            Label={t("Edit Profile")}
            styles={{
              backgroundColor: COLORS.BuleText,
              // width: WIDTH * 0.9,
              flex: 1,
            }}
            Action={() => props.navigation.navigate("CompleteProfile")}
          />
          <WholeButton
            Label={t("Edit Documents")}
            styles={{
              backgroundColor: COLORS.ORANGE,
              // width: WIDTH * 0.9,
              flex: 1,
            }}
            // Action={() => props.navigation.navigate("VehicleDetails")}
            Action={() => props.navigation.navigate("EditDocumnets")}
          />
        </View>
        <SpinningLoader loader={Loader} />
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default Account;
const styles = StyleSheet.create({
  ImageStyle: {
    height: HEIGHT * 0.2,
    width: WIDTH * 0.4,
    alignSelf: "center",
    marginTop: "5%",
    resizeMode: "contain",
  },
  MainContainer: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },
  EditIconStyle: {
    alignSelf: "center",
    marginLeft: "20%",
  },
  DataView: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(239, 239, 244, 1)",
    marginTop: "10%",
    width: WIDTH * 0.9,
    alignSelf: "center",
    padding: "3%",
  },
  textStyle: {
    color: "rgba(38, 38, 38, 1)",
    fontFamily: FONTS.medium,
    fontSize: 14,
    width: WIDTH * 0.7,
    paddingVertical: "1%",
  },
  textStyle1: {
    color: "rgba(38, 38, 38, 0.6)",
    fontFamily: FONTS.medium,
    fontSize: 11,
    width: WIDTH * 0.7,
    paddingBottom: "3.5%",
  },
});
