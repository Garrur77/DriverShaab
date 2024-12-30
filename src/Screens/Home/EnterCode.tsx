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
import React, { useContext, useState, useEffect } from "react";
import WholeButton from "../../Components/WholeButton";
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import HeaderComponent from "../../Components/HeaderComponent";
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
import { COLORS, FONTS, VECTOR_ICONS } from "../../assets/Theme";
import { useDispatch, useSelector } from "react-redux";
import { saveStartRide_State } from "../../ReduxConfig/Slices";
import { meetRiderDriver } from "../../Components/ApiConfig/EndPoints";
import axios from "axios";
import { RootState } from "../../ReduxConfig/Store";
import {
  clearRideDetails,
  clearRideDetailsAfterAccept,
} from "../../ReduxConfig/RideDetailsSlice";
import {
  CommonActions,
  useIsFocused,
  useRoute,
} from "@react-navigation/native";
import SpinningLoader from "../../assets/SpinningLoader";
import { useSocket } from "../../Context/SocketContext";
import { setToggle } from "../../ReduxConfig/ToggleSlice";
import { useTranslation } from "react-i18next";

const EnterCode = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const route = useRoute();
  const rideSocket = useSocket();
  // const rideSocket = route?.params?.rideSocket
  // console.log("rideSocketrideSocketrideSocket",rideSocket)
  const getToken = useSelector((state: RootState) => state.TOKEN_);
  const UserData = useSelector((state: RootState) => state.userDetails);
  const rideData = useSelector(
    (state: RootState) => state.INITIAL_RIDE?.rideDetailsAfterAccept
  );
  const Socket = useSelector((state: RootState) => state.socketReducer);
  console.log("rideDatarideDatarideDatarideData", rideData);
  console.log({ UserData });
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [see, setsee] = useState(true);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState<number>(180);
  const [visible, setvisible] = useState(false);
  const focused = useIsFocused();
  useEffect(() => {
    if (focused) {
      setOtp("");
    }
  }, [focused]);

  const OTPvalidate = (Code: any) => {
    if (Code == "" || Code == null || Code == undefined) {
      setOtpError("Invalid Code");
      return false;
    } else if (Code.length != 4) {
      setOtpError("Invalid Code");
      return false;
    } else {
      setOtpError("");
      return true;
    }
  };
  const submit = () => {
    if (OTPvalidate(otp) == true) {
      props.navigation.navigate("HomeOnlineStartRide", {
        screen_: "StartRide",
      });
      setOtp("");
      dispatch(saveStartRide_State("STARTRIDE_"));
    }
  };

  const resetTimer = () => {
    setTime(180);
    showMessage({
      message: "OTP Resend successfully!",
      type: "success",
    });
  };

  const meetupCustomer = async () => {
    if (OTPvalidate(otp)) {
      try {
        setLoading(true);
        const res = await axios({
          method: "post",
          url: meetRiderDriver,
          headers: {
            token: getToken.Token,
          },
          data: {
            rideId: rideData?.rideId,
            otp: Number(otp),
          },
        });

        console.log("response--response", res);
        console.log("response--res?.data", res?.data);
        if (res?.data?.responseCode === 200) {
          setLoading(false);
          showMessage({
            type: "success",
            message: res?.data?.responseMessage,
            duration: 1000,
          });
          rideSocket?.emit("rideStartedDriver", {
            rideId: rideData?.rideId,
            status: "rideStart",
          });

          setTimeout(() => {
            props?.navigation?.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: "HomeOnlineStartRide",
                    params: {
                      rideSocket: rideSocket,
                    },
                  },
                ],
              })
            );
          }, 100);

          // props?.navigation?.navigate("HomeOnlineStartRide", {
          //   rideSocket: rideSocket,
          // });
        }
      } catch (error) {
        if (error?.response?.data?.responseCode == 404) {
          setLoading(false);
          setOtp("");
          showMessage({
            type: "danger",
            message: error?.response?.data?.responseMessage,
            icon: "danger",
          });
        }
        setLoading(false);
        // console.log("error", error);
        // console.log("error?.response", error?.response);
        // console.log("invalidddd otppp", error?.response?.responseCode);
      }
    }
  };

  const backHandler = () => {
    props?.navigation?.goBack();
    dispatch(clearRideDetailsAfterAccept());
    dispatch(clearRideDetails());
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
      <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} />
      <KeyboardAwareScrollView
        style={{ backgroundColor: COLORS.WHITE, flex: 1 }}
      >
        <View>
          {/* <HeaderComponent
            navigation={props?.navigation}
            Heading={"Enter Code"}
          /> */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                dispatch(setToggle(true));
                // Ensure state update is processed before navigation
                setTimeout(() => {
                  props.navigation.navigate("MyDrawer", {
                    screen: "HomeOnline", // Ensure 'HomeOnline' is the correct drawer screen name
                  });
                }, 0);
              }}
            >
              <VECTOR_ICONS.Ionicons
                name="chevron-back"
                size={26}
                color={"#fff"}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>{t("Enter Code")}</Text>
            <View />
          </View>

          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View style={{ width: WIDTH * 0.9, alignSelf: "center" }}>
              <View style={{ alignSelf: "center" }}>
                <Text
                  allowFontScaling={false}
                  style={[styles.subText, { marginTop: "6%" }]}
                >
                  {t(
                    "Please enter the 4 digit verification code that was sent to customer's account."
                  )}
                </Text>
              </View>
              <View style={{ marginTop: "10%", alignSelf: "center" }}>
                <OTPInputView
                  style={{ width: WIDTH * 0.8, height: 80 }}
                  pinCount={4}
                  onCodeChanged={(code) => {
                    // console.log("Code changed:", code);
                    setOtp(code);
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
                {otpError && (
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: COLORS.ERRORCOLORRED,
                      // marginTop: -2,
                      fontSize: 13,
                      fontFamily: FONTS.semibold,
                    }}
                  >
                    {otpError}
                  </Text>
                )}
              </View>
            </View>

            <View style={{ marginBottom: "20%", alignSelf: "center" }}>
              <WholeButton
                disabled={see}
                styles={{
                  marginTop: HEIGHT * 0.03,
                  backgroundColor:
                    visible == false ? "rgba(36, 46, 66, 0.1)" : COLORS.ORANGE,
                  // color: visible == false ? 'rgba(36, 46, 66, 0.6)' : COLORS.WHITE
                }}
                Label={"CONTINUE"}
                Action={() => meetupCustomer()}
                // Action={() => backHandler()}
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
      </KeyboardAwareScrollView>
      {loading && <SpinningLoader loader={loading} />}
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default EnterCode;

const styles = StyleSheet.create({
  underlineStyleBase: {
    width: 40,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 5,
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
    width: WIDTH * 0.72,
    lineHeight: 22,
  },
  subText1: {
    fontSize: 14,
    color: "rgba(36, 46, 66, 0.4)",
    fontFamily: FONTS.light,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  timerview: {
    marginTop: "5%",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 30,
    paddingVertical: 8,
  },
  header: {
    backgroundColor: COLORS.ORANGE,
    flexDirection: "row",
    width: WIDTH,
    paddingHorizontal: 16,
    height: HEIGHT * 0.072,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.bold,
    fontSize: 18,
  },
});
