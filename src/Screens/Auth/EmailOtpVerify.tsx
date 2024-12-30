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
import { ANDROID } from "../../Helpers/Platform";
import {
  RESEND_OTP,
  VERIFY_OTP,
  VIEW_PROFILEDATA,
} from "../../Components/ApiConfig/EndPoints";
import { callPostApi } from "../../Components/ApiConfig/ApiCall";
import SpinningLoader from "../../assets/SpinningLoader";
import { saveUSERID } from "../../ReduxConfig/Slices";
import { useDispatch } from "react-redux";
import {
  setIsisVerifiedByAdmin,
  setTokenAndUserId,
} from "../../ReduxConfig/TokenUserID";
import {
  saveEMAIL,
  saveFIRST_NAME,
  savePHONE_NUMBER,
  setUpdateDetail,
} from "../../ReduxConfig/PersonalDetailsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { useTranslation } from "react-i18next";
const EmailOtpVerify = (props: any) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [see, setsee] = useState(true);
  const [time, setTime] = useState<number>(180);
  const [visible, setvisible] = useState(false);

  const [Loader, setLoader] = useState(false);

  useEffect(() => {
    setOtp("");
  }, [props]);

  const [showToast, setShowToast] = useState(false);

  const showToastMessage = (message, duration = 3000) => {
    setShowToast(message);
    setTimeout(() => {
      setShowToast(false);
    }, duration);
  };

  // const resetTimer = () => {
  //   setOtp('');
  //   setTime(10);
  // };

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

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;

    // Start the timer when the component is mounted
    timerInterval = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      }
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(timerInterval);
    };
  }, [time]);

  const resetTimer = () => {
    setTime(180);
    // showMessage({
    //   message: "OTP Resend successfully!",
    //   type: "success",
    //   statusBarHeight: 10
    // });

    showToastMessage("OTP Resend successfully!");
  };

  const submit = () => {
    if (OTPvalidate(otp) == true) {
      EMAIL_VERIFYApi();
      setOtp("");
    }
  };

  const GET_REGISTER_MAIL = props.route.params.Email_;
  const Mobile = props.route.params.Mobile;
  const GET_SCREEN = props.route.params.Screen_;
  const navigation = useNavigation();
  // console.log(GET_SCREEN, "GET_SCREEN");
  // console.log(GET_REGISTER_MAIL, "GET_REGISTER_MAIL");
  const isLoginScreenFocused = props?.navigation.isFocused();

  const handleBackPress = () => {
    Alert.alert(
      "Exit OTP",
      "Are you sure you want to back?",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () =>
            props?.navigation?.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Register" }],
              })
            ),
        },
      ],
      { cancelable: false }
    );
    return true; // Prevent default back button behavior
  };

  useEffect(() => {
    if (isLoginScreenFocused) {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress
      );

      return () => backHandler.remove();
    }
  }, [isLoginScreenFocused]);

  const EMAIL_VERIFYApi = async () => {
    setLoader(true);
    try {
      var postData = {
        email: GET_REGISTER_MAIL,
        otp: otp,
        role: "driver",
      };
      const SucessDisplay = true;
      const { response, error, loading } = await callPostApi(
        VERIFY_OTP,
        postData,
        SucessDisplay
      );

      if (error) {
        setLoader(loading);
        console.log("API Error:", error, error.response);
      } else {
        console.log("verify response", response);
        if (response?.responseCode === 200) {
          await VIEW_PROFILEAPI(response?.token);
          await AsyncStorage.setItem("TOKEN", response?.token);
          console.log("_EMAIL__Response", response);
          dispatch(saveEMAIL(GET_REGISTER_MAIL));
          dispatch(savePHONE_NUMBER(Mobile));

          dispatch(
            setTokenAndUserId({
              token: response?.token,
              userId: response?.userId,
              isProfileUpdated: response?.isProfileUpdated || false,
              isVerified: response?.isVerified || false,
              isVerifiedByAdmin: response?.isVerifiedByAdmin || false,
            })
          );
          console.log("imchekcing", response?.isVerifiedByAdmin);
          setLoader(false);
          navigation?.navigate("CompleteProfile");
        }
        setLoader(loading);
      }
    } catch (error: any) {
      setLoader(false);
      console.log("Error during EMAIL_verify:", error, error.response);
    }
  };

  const RESEND_EMAIL_VERIFY = async () => {
    setLoader(true);
    try {
      var postData = {
        email: GET_REGISTER_MAIL,
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
        console.log("API Error:", error);
      } else {
        if (response?.responseCode === 200) {
          setOtp("");
          setLoader(false);
          console.log("RESEND_EMAIl__Resp", response);
        }
      }
    } catch (error: any) {
      console.log("Error during MO_verify:", error, error.response);
    }
  };

  const VIEW_PROFILEAPI = async (token: String) => {
    try {
      var postData = {
        token: token,
      };
      console.log("token-->", token);
      const { response, error, loading } = await callPostApi(
        VIEW_PROFILEDATA,
        postData,
        false
      );

      if (!error && response?.responseCode === 200) {
        dispatch(setUpdateDetail(response?.data));
        dispatch(setIsisVerifiedByAdmin(response?.data?.isVerifiedByAdmin));
        const responseData = response?.data;
      } else {
        console.log("API Error:", error);
      }
    } catch (error: any) {
      setLoader(false);
      console.log("Error during MO_verify:", error, error.response);
    }
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
      <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} />
      <KeyboardAwareScrollView
        style={{ backgroundColor: COLORS.WHITE }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <HeaderComponent
            navigation={props?.navigation}
            Heading={t("Email Verification")}
            ToScreen={"Register"}
            reset={true}
          />

          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View style={{ width: WIDTH * 0.9, alignSelf: "center" }}>
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
                  {props?.route?.params?.Email_}.
                  {t("The code is valid for 3 minutes.")}
                </Text>
              </View>

              <View style={{ marginTop: "10%", alignSelf: "center" }}>
                <OTPInputView
                  style={{ width: WIDTH * 0.8, height: 80 }}
                  pinCount={4}
                  onCodeChanged={(code) => {
                    // console.log("Code changed:", code);
                    setOtp(code);
                    OTPvalidate(code);
                  }}
                  code={otp}
                  onCodeFilled={() => {
                    console.log("filled___");
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
                {time === 0 ? (
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
                    width: time == 0 ? WIDTH * 0.28 : WIDTH * 0.48,
                  },
                ]}
              >
                {time === 0 ? (
                  <TouchableOpacity
                    onPress={() => {
                      RESEND_EMAIL_VERIFY();
                      resetTimer();
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
                    {t("I did’t receive code")}({Math.floor(time / 60)}:
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
          {/* <FlashMessage
          position="top"
          titleStyle={{
            textAlign: "center",
            fontFamily: FONTS.bold,
            fontSize: 18,
            color: COLORS.WHITE,
          }}
        /> */}
        </View>

        <SpinningLoader loader={Loader} />
      </KeyboardAwareScrollView>
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default EmailOtpVerify;

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
  //
  toastContainer: {
    position: "absolute",
    backgroundColor: "#0DBA7F",
    paddingVertical: ANDROID ? "4.5%" : "5%",
    alignItems: "center",
    width: WIDTH,
    justifyContent: "center",
  },
  toastText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.bold,
    fontSize: 18,
  },
});
