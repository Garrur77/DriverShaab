import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
  StatusBar,
  BackHandler,
  Alert,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import WholeButton from "../../Components/WholeButton";
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import HeaderComponent from "../../Components/HeaderComponent";
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
import { COLORS, FONTS } from "../../assets/Theme";
import { UserVisited } from "../../ReduxConfig/UserDetails/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../ReduxConfig/Store";
import { RESEND_OTP, VERIFY_OTP } from "../../Components/ApiConfig/EndPoints";
import { callPostApi } from "../../Components/ApiConfig/ApiCall";
import SpinningLoader from "../../assets/SpinningLoader";
import { CommonActions } from "@react-navigation/native";
import BackgroundTimer from "react-native-background-timer";
import { useTranslation } from "react-i18next";
const OTPVerificationScreen = (props: any) => {
  const { t } = useTranslation();
  const visitType = useSelector(
    (state: RootState) => state.userDetails.visitType
  );
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const [time, setTime] = useState<number>(180);
  const [visible, setvisible] = useState(false);
  const [see, setsee] = useState(true);

  const [Loader, setLoader] = useState(false);

  const PATH_SCREEN = props?.route?.params?.Screen_;
  // console.log(PATH_SCREEN,'YOU_ARE_FROM');

  useEffect(() => {
    if (props?.route?.params?.screen_ === "Login") {
      setOtp("");
    }
  }, [props?.route?.params?.screen_]);

  const OTPvalidate = (Code: any) => {
    if (Code == "" || Code == null || Code == undefined) {
      setOtpError("Please enter a valid OTP!");
      return false;
    } else if (Code.length != 4) {
      setOtpError("Please enter a valid OTP!");
      return false;
    } else {
      setOtpError("");

      return true;
    }
  };

  const submit = () => {
    if (OTPvalidate(otp)) {
      MOBILE_VERIFYApi();

      if (PATH_SCREEN == "Login") {
        dispatch(UserVisited("VISITED"));
      }
    }
  };

  // useEffect(() => {
  //   if (time > 0) {
  //     const timerInterval = setTimeout(() => {
  //       setTime(time - 1);
  //     }, 1000);
  //     return () => clearTimeout(timerInterval);
  //   }
  // }, [time, props.navigation]);
  // const resetTimer = () => {
  //   setTime(180);
  // };

  useEffect(() => {
    let timerInterval: number;

    const startBackgroundTimer = () => {
      timerInterval = BackgroundTimer.setInterval(() => {
        if (time > 0) {
          setTime(time - 1);
        }
      }, 1000); // 1000 milliseconds = 1 second
    };

    const stopBackgroundTimer = () => {
      BackgroundTimer.clearInterval(timerInterval);
    };

    startBackgroundTimer();

    return () => {
      stopBackgroundTimer();
    };
  }, [time]);

  const MO_NUMBER = props?.route?.params?.value;

  const Country_Code = props?.route?.params?.Country_;

  const TYPE__ = props?.route?.params?.Heading;

  const GET_REGISTER_MAIL = props?.route?.params?.EMAIL_;

  const SCREEN_TYPE = props?.route?.params?.Screen_;

  // console.log(Country_Code, "Country_Code");
  // console.log(TYPE__, "TYPE__");
  // console.log(SCREEN_TYPE, "SCREEN_TYPE");
  // console.log(GET_REGISTER_MAIL, "GET_REGISTER_MAIL");

  const MOBILE_VERIFYApi = async () => {
    setLoader(true);
    try {
      var postData = {
        mobile: MO_NUMBER,
        otp: otp,
        role: "driver",
        countryCode: Country_Code,
      };
      const SucessDisplay = true;
      const { response, error, loading } = await callPostApi(
        VERIFY_OTP,
        postData,
        SucessDisplay
      );
      setLoader(loading);
      if (error) {
        console.log("API Error:", error);
      } else {
        if (response?.responseCode === 200) {
          setLoader(false);
          console.log("_MOBILE_NO_Response", response);
          props.navigation.navigate("EmailOtpVerify", {
            Email_: GET_REGISTER_MAIL,
            Mobile: MO_NUMBER,
          });
        }
      }
    } catch (error: any) {
      console.log("Error during MO_verify:", error, error.response);
    }
  };

  const RESEND_MOBILE_VERIFY = async () => {
    setLoader(true);
    try {
      var postData = {
        mobile: MO_NUMBER,
        countryCode: Country_Code,
        role: "driver",
      };
      const SucessDisplay = true;
      const { response, error, loading } = await callPostApi(
        RESEND_OTP,
        postData,
        SucessDisplay
      );
      setLoader(loading);
      if (error) {
        console.log("RESEND_MOBILE_VERIFY API Error:", error?.response);
      } else {
        if (response?.responseCode === 200) {
          setOtp("");
          setLoader(false);
          showMessage({
            message: "OTP Resend successfully!",
            type: "success",
            duration: 3000,
            statusBarHeight: 10,
          });
          setTime(180);
          console.log("RESEND_MOBILE_NO_Resp", response);
        }
      }
    } catch (error: any) {
      console.log("Error during MO_verify:", error.response);
    }
  };
  const formatPhoneNumber = (number: number) => {
    const str = number.toString();
    const length = str.length;
    if (length <= 4) {
      return str;
    }
    const hiddenPart = "X".repeat(length - 4);
    const visiblePart = str.slice(length - 4);
    return hiddenPart + visiblePart;
  };

  const formattedNumber = formatPhoneNumber(props?.route?.params?.value);
  // const formattedNumber = props?.route?.params?.value
  //   .toString()
  //   .replace(/\d/g, "X");
  // console.log(props?.route?.params?.value, "formattedNumber");
  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
      <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} />
      <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
        <KeyboardAwareScrollView
          style={{ backgroundColor: COLORS.WHITE }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <HeaderComponent
              navigation={props?.navigation}
              Heading={props?.route?.params?.Heading}
            />
            <View style={{ flex: 1, justifyContent: "space-between" }}>
              <View
                style={{
                  width: WIDTH * 0.8,
                  alignSelf: "center",
                  justifyContent: "center",
                }}
              >
                <View style={{ alignSelf: "center" }}>
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.subText,
                      { marginTop: "6%", width: WIDTH * 0.77 },
                    ]}
                  >
                    {t(
                      "Please enter the 4 digit verification code that was sent to"
                    )}{" "}
                    {props?.route?.params?.Heading === "Email Verification"
                      ? undefined
                      : props?.route?.params?.Country_}{" "}
                    {formattedNumber}. {t("The code is valid for 3 minutes.")}
                  </Text>
                </View>
                <View style={{ marginTop: "10%", alignSelf: "center" }}>
                  <OTPInputView
                    style={{ width: WIDTH * 0.8, height: 80 }}
                    pinCount={4}
                    onCodeChanged={(code) => {
                      // console.log("Code changed:", code);
                      setOtp(code);
                      // OTPvalidate(code);
                    }}
                    code={otp}
                    onCodeFilled={() => {
                      console.log("Code filled");
                      //  setvisible(true)
                      setOtpError("");
                      setvisible(true);
                      setsee(false);
                    }}
                    autoFocusOnLoad={false}
                    // codeInputFieldStyle={
                    //   styles.underlineStyleBase}
                    //   {
                    //     width: Platform.OS == 'ios' ? 75 : 60,
                    //     height: Platform.OS == 'ios' ? 66 : 57,
                    //     borderColor: otpError ? 'red' : '#F6F6F633',
                    //   },
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  />
                </View>
                <View
                  style={{
                    alignSelf: "center",
                    width: WIDTH * 0.8,
                    height: "8%",
                  }}
                >
                  {time === 0 && otp ? (
                    <>
                      <Text
                        allowFontScaling={false}
                        style={{
                          color: COLORS.ERRORCOLORRED,
                          // marginTop: -2,
                          fontSize: 13,
                          fontFamily: FONTS.semibold,
                          alignSelf: "center",
                          alignItems: "center",
                        }}
                      >
                        {t("OTP expired")}
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text
                        allowFontScaling={false}
                        style={{
                          color: COLORS.ERRORCOLORRED,
                          // marginTop: -2,
                          fontSize: 13,
                          fontFamily: FONTS.semibold,
                          alignSelf: "center",
                          alignItems: "center",
                        }}
                      >
                        {otpError}
                      </Text>
                    </>
                  )}
                </View>
                <View
                  style={[
                    styles.timerview,
                    {
                      backgroundColor:
                        time == 0 ? COLORS.ORANGE : "rgba(36, 46, 66, 0.1)",
                      width: time == 0 ? WIDTH * 0.28 : WIDTH * 0.51,
                    },
                  ]}
                >
                  {time === 0 ? (
                    <TouchableOpacity
                      onPress={() => {
                        RESEND_MOBILE_VERIFY();
                        // resetTimer();
                      }}
                    >
                      <Text
                        allowFontScaling={false}
                        style={{
                          color: COLORS.WHITE,
                          // marginTop: -2,
                          fontSize: 14,
                          fontFamily: FONTS.semibold,
                          padding: "1%",
                        }}
                      >
                        {t("Resend Code")}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <Text allowFontScaling={false} style={styles.subText1}>
                      {t("I did’t receive code")} ({Math.floor(time / 60)}:
                      {(time % 60).toString().padStart(2, "0")})
                    </Text>
                  )}
                </View>
              </View>

              <View style={{ marginBottom: "20%", alignSelf: "center" }}>
                <WholeButton
                  disabled={see}
                  styles={{
                    marginTop: HEIGHT * 0.05,
                    backgroundColor:
                      visible == false
                        ? "rgba(36, 46, 66, 0.1)"
                        : COLORS.ORANGE,
                    color:
                      visible == false ? "rgba(36, 46, 66, 0.6)" : COLORS.WHITE,
                  }}
                  Label={t("CONTINUE")}
                  Action={() => submit()}
                  buttonText={{
                    color:
                      visible == false ? "rgba(36, 46, 66, 0.6)" : COLORS.WHITE,
                  }}
                />
              </View>
            </View>
            {/* {/ <WholeButton Label={'submit'}/ > /} */}
            <FlashMessage
              position="top"
              titleStyle={{
                textAlign: "center",
                fontFamily: FONTS.bold,
                fontSize: 18,
                color: COLORS.WHITE,
              }}
            />
          </View>

          <SpinningLoader loader={Loader} />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default OTPVerificationScreen;

const styles = StyleSheet.create({
  underlineStyleBase: {
    width: 60,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 4,
    color: "rgba(36, 46, 66, 0.6)",
    borderColor: "#D8D8D8",
    fontSize: 20,
    fontFamily: FONTS.bold,
    // borderColor: otpError ? 'red' : '#F6F6F633',
  },
  underlineStyleHighLighted: {
    borderColor: "#242E42",
    borderBottomWidth: 4,
  },
  subText: {
    fontSize: 14,
    color: "#242E42",
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  subText1: {
    fontSize: 14,
    color: "rgba(36, 46, 66, 0.4)",
    fontFamily: FONTS.light,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: "1%",
  },
  timerview: {
    marginTop: "5%",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 30,
    paddingVertical: 8,
  },
});
