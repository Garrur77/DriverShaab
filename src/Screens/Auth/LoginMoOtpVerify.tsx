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
} from "react-native";
import React, { useContext, useState, useEffect, useRef } from "react";
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
import {
  RESEND_OTP,
  VERIFY_OTP,
  VIEW_PROFILEDATA,
  updateUser,
} from "../../Components/ApiConfig/EndPoints";
import { callPostApi } from "../../Components/ApiConfig/ApiCall";
import SpinningLoader from "../../assets/SpinningLoader";
import { SaveTOKEN } from "../../ReduxConfig/Slices";
import {
  setIsisVerifiedByAdmin,
  setTokenAndUserId,
} from "../../ReduxConfig/TokenUserID";
import { CommonActions } from "@react-navigation/native";
import { setUpdateDetail } from "../../ReduxConfig/PersonalDetailsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackgroundTimer from "react-native-background-timer";
import { setDriverDuty } from "../../ReduxConfig/DriverDutySlice";
import { useTranslation } from "react-i18next";

const LoginMoOtpVerify = (props: any) => {
  const { t } = useTranslation();
  const visitType = useSelector(
    (state: RootState) => state.userDetails.visitType
  );
  const dispatch = useDispatch();
  // console.log("props?..---->hiddenPhoneNumber", props?.route?.params?.value);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const otpInput = useRef(null);
  const [time, setTime] = useState<number>(180);
  const [visible, setvisible] = useState(false);
  const [see, setsee] = useState(true);

  const [Loader, setLoader] = useState(false);

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

  const TYPE__ = props?.route?.params?.Heading;

  const MO_NUMBER = props.route.params?.value1?.slice(4) || "";
  // const Coutry_Code = props.route.params?.value1?.slice(1, 3) || "";
  const Coutry_Code = props.route.params?.Country_ || "";
  const email_ = props.route.params.value1;
  const switchtext = props.route.params.switchtext;
  // console.log("*********************");
  // console.log(TYPE__, "TYPE__");
  // console.log(switchtext, "switchtext");
  // console.log(email_, "email_");
  // console.log(Coutry_Code, "Country_Code");
  // console.log(MO_NUMBER, "MO_NUMBER / EMAIL");
  // // console.log(GET_LOGIN_MAIL, "GET_LOGIN_MAIL");
  // console.log("*********************");

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

  const formattedNumber = formatPhoneNumber(
    props.route.params?.value1?.slice(4)
  );
  const submit = () => {
    if (OTPvalidate(otp)) {
      LOGIN_VERIFYApi();
    }
  };

  const resetTimer = () => {
    setTime(180);
  };

  const LOGIN_VERIFYApi = async () => {
    setLoader(true);
    try {
      var postData = {
        otp: otp,
        role: "driver",
      };
      if (switchtext == 2) {
        postData["email"] = email_;
      } else {
        (postData["mobile"] = props?.route?.params?.value),
          (postData["countryCode"] = Coutry_Code);
      }
      const SucessDisplay = true;
      const { response, error, loading } = await callPostApi(
        VERIFY_OTP,
        postData,
        SucessDisplay
      );
      setLoader(loading);
      if (error) {
        console.log("API Error:", error?.response);
        if (error?.response?.data?.responseCode === 400) {
          showMessage({
            message: error?.response?.data?.responseMessage,
            type: "danger",
            icon: "danger",
          });
        }
      } else {
        if (response?.responseCode === 200) {
          console.log("verify response--->>>1333333444", response);
          await updateUserHanlder(response?.userId);
          await VIEW_PROFILEAPI(response?.token);
          await AsyncStorage.setItem("TOKEN", response?.token);
          const AUTH_TOKEN = response.token;
          dispatch(SaveTOKEN(AUTH_TOKEN));
          dispatch(UserVisited("VISITED"));
          dispatch(
            setTokenAndUserId({
              token: response?.token,
              userId: response?.userId,
              isProfileUpdated: response?.isProfileUpdated || false,
              isVerified: response?.isVerified || false,
              isVerifiedByAdmin: response?.isVerifiedByAdmin || false,
            })
          );
          dispatch(setDriverDuty(response?.driverDutyStatus));

          setLoader(false);
          // if (response?.isProfileUpdated) {
          //   props?.navigation?.dispatch(
          //     CommonActions.reset({
          //       index: 0,
          //       routes: [{ name: "CompleteProfile" }],
          //     })
          //   );
          // }
          if (response?.isVerifiedByAdmin && response?.isProfileUpdated) {
            props?.navigation?.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "MyDrawer" }],
              })
            );
          } else if (!response?.isProfileUpdated) {
            props?.navigation?.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "CompleteProfile" }],
              })
            );
          } else {
            props?.navigation?.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "MyDrawer" }],
              })
            );
          }
        }
        setLoader(false);
      }
    } catch (error: any) {
      setLoader(false);
      console.log("Error during MO_verify:", error, error.response);
    }
  };

  const updateUserHanlder = async (id) => {
    try {
      const deviceToken = await AsyncStorage.getItem("fcm");
      const data = {
        _id: id,
        obj: {},
      };
      if (deviceToken) data.obj.deviceToken = deviceToken;
      // console.log("Updater Driver Token--->", data);
      const response = await callPostApi(updateUser, data, false);
      // console.log("updateUserHanlder--->", response);
    } catch (error) {
      console.log("updateUserHanldererror", error);
    }
  };

  const RESEND_MOBILE_VERIFY = async () => {
    setLoader(true);
    try {
      var postData = {
        role: "driver",
      };

      if (switchtext == 2) {
        postData["email"] = email_;
      } else {
        (postData["mobile"] = props?.route?.params?.value),
          (postData["countryCode"] = Coutry_Code);
      }
      console.log("postData-->", postData);
      const SucessDisplay = false;
      const { response, error, loading } = await callPostApi(
        RESEND_OTP,
        postData,
        SucessDisplay
      );
      setLoader(loading);
      console.log("RESEND_MOBILE_VERIFY-->response", response);
      if (error) {
        console.log("API Error:", error);
      } else {
        if (response?.responseCode === 200) {
          setLoader(false);
          setOtp("");
          showMessage({
            message: "OTP Resend successfully!",
            type: "success",
            statusBarHeight: 10,
            duration: 3000,
          });
          console.log("RESEND_MOBILE_NO_Resp", response);
        }
      }
    } catch (error: any) {
      console.log("Error during MO_verify:", error, error.response);
    }
  };

  const VIEW_PROFILEAPI = async (token) => {
    try {
      var postData = {
        token: token,
      };
      const { response, error, loading } = await callPostApi(
        VIEW_PROFILEDATA,
        postData,
        false
      );

      if (!error && response?.responseCode === 200) {
        setLoader(false);

        dispatch(setUpdateDetail(response?.data));
        dispatch(setIsisVerifiedByAdmin(response?.data?.isVerifiedByAdmin));

        const responseData = response?.data;
      } else {
        setLoader(false);
        console.log("API Error:", error);
      }
    } catch (error: any) {
      setLoader(false);
      console.log("Error during MO_verify:", error, error.response);
    }
  };

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

  // const formattedNumber = props?.route?.params?.value
  //   .toString()
  //   .replace(/\d/g, "X");

  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
      <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} />
      <HeaderComponent
        navigation={props?.navigation}
        Heading={props?.route?.params?.Heading}
      />
      <KeyboardAwareScrollView
        style={{ backgroundColor: COLORS.WHITE }}
        showsVerticalScrollIndicator={false}
      >
        <View>
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
                  {TYPE__ === "Email Verification"
                    ? email_
                    : `${Coutry_Code} ${formattedNumber}`}
                  . {t("The code is valid for 3 minutes.")}
                </Text>
              </View>
              <View style={{ marginTop: "10%", alignSelf: "center" }}>
                <OTPInputView
                  style={{ width: WIDTH * 0.8, height: 80 }}
                  pinCount={4}
                  ref={otpInput}
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
                      resetTimer();
                    }}
                  >
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: COLORS.WHITE,
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
                    I did’t receive code ({Math.floor(time / 60)}:
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
                    visible == false ? "rgba(36, 46, 66, 0.1)" : COLORS.ORANGE,
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
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default LoginMoOtpVerify;

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
