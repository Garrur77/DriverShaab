import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
  SafeAreaView,
  Linking,
  ImageBackground,
  Alert,
  BackHandler,
  StatusBar,
  Dimensions,
} from "react-native";
import { COLORS, FONTS, IMAGEPATH, VECTOR_ICONS } from "../../assets/Theme";
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
import WholeButton from "../../Components/WholeButton";
import InputFiled from "../../Components/InputFiled";
import Coutry from "../../Components/Country";
import { ValidateEmail, ValidateMobileNo } from "../../Components/Validations";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HistoryFilterComponent from "../../Components/HistoryFilterComponent";
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from "react-native-fbsdk";
import {
  LOGINPOST,
  RESEND_OTP,
  VIEW_PROFILEDATA,
  googleGet,
  socialLogin,
} from "../../Components/ApiConfig/EndPoints";
import { callGetApi, callPostApi } from "../../Components/ApiConfig/ApiCall";
import SpinningLoader from "../../assets/SpinningLoader";
import { useDispatch, useSelector } from "react-redux";
import { SaveTOKEN } from "../../ReduxConfig/Slices";
import { IOS } from "../../Helpers/Platform";
import FlashMessage, { showMessage } from "react-native-flash-message";
import axios from "axios";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import {
  CommonActions,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import {
  setIsisVerifiedByAdmin,
  setToken,
} from "../../ReduxConfig/TokenUserID";
import { setUpdateDetail } from "../../ReduxConfig/PersonalDetailsSlice";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { window } from "rxjs";
import { RootState } from "../../ReduxConfig/Store";
import { useLocation } from "../../Context/LocationContext";
import { useTranslation } from "react-i18next";

GoogleSignin.configure({
  webClientId:
    Platform.OS === "ios"
      ? "743187716713-b1iihc8s2l498nimd46j1987iibjn089.apps.googleusercontent.com"
      : "743187716713-mmgvqau0tjg9ih5boahvsplb52skkptn.apps.googleusercontent.com",
  offlineAccess: true,
  // offlineAccess: true,
  // forceCodeForRefreshToken: true,
  scopes: ["profile", "email"],
});
const { height, width } = Dimensions.get("screen");

const Login = (props: any) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { latitude, longitude } = useLocation();
  const [Email, setEmail] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [ShowError, setShowError] = useState({
    emailError: false,
    PhoneNumberError: false,
  });
  const [phone, setPhone] = useState("");
  const [PhoneNumberError, setphoneError] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [flag1, setFlag1] = useState("🇦🇴");
  const [switchtext, setswitchtext] = useState(1);
  const [Loader, setLoader] = useState(false);

  let DATA = switchtext == 1 ? `${countryCode} ${hiddenPhoneNumber} ` : Email;
  let DATA1 = switchtext == 1 ? `${countryCode} ${phone}` : Email;
  let TYPE = switchtext == 1 ? "Phone Verification" : "Email Verification";

  const hidePhoneNumber = (phone: string): string => {
    if (!phone) return "";

    // Replace all digits with *
    const hiddenNumber = phone.replace(/\d/g, "x");
    return hiddenNumber;
  };

  // let DATA = switchtext == 1 ? phone : Email;

  const hiddenPhoneNumber = hidePhoneNumber(phone);
  // console.log(hiddenPhoneNumber);
  const LoginButtonClicked = async () => {
    let emailErr = ValidateEmail(Email);
    let phoneError = ValidateMobileNo(countryCode, `${phone}`);

    if (emailErr == "" || phoneError == "") {
      LoginApi();
    } else {
      setEmailError(emailErr);
      setphoneError(phoneError);
      setShowError({
        emailError: true,
        PhoneNumberError: true,
      });
    }
  };
  const focused = useIsFocused();
  const handleBackPress = () => {
    Alert.alert(
      t("Exit App"),
      t("Are you sure you want to exit app?"),
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "OK", onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false }
    );
    return true; // Prevent default back button behavior
  };

  useEffect(() => {
    if (focused) {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress
      );
      return () => backHandler.remove();
    }
  }, [focused]);
  const Location = useSelector((state: RootState) => state.INITIAL_LOCATION);

  const LoginApi = async () => {
    const deviceToken = await AsyncStorage.getItem("fcm");

    setLoader(true);
    try {
      var postData = {
        role: "driver",
        lat: Number(latitude) || Number(0),
        lng: Number(longitude) || Number(0),
        deviceToken: deviceToken?.toString(),
      };

      if (switchtext == 2) {
        postData["email"] = Email;
      } else {
        (postData["mobile"] = phone), (postData["countryCode"] = countryCode);
      }

      // if (deviceToken) {
      //   postData["deviceToken"] = deviceToken;
      // }

      console.log("data--->postData", postData);
      const SucessDisplay = true;
      const { response, error, loading } = await callPostApi(
        LOGINPOST,
        postData,
        SucessDisplay
      );
      setLoader(loading);
      if (error) {
        console.log("API Error:", error);
      } else {
        console.log("responseresponseresponse", response);
        if (response?.responseCode === 200) {
          setLoader(false);

          props.navigation.navigate("LoginMoOtpVerify", {
            value: phone,
            value1: DATA1,
            Heading: TYPE,
            switchtext: switchtext,
            Country_: countryCode,
            Screen_: "Login",
          });
        } else if (response?.responseCode === 201) {
          await RESEND_EMAIL_VERIFY();
          setLoader(false);
          props.navigation.navigate("LoginMoOtpVerify", {
            value: phone,
            value1: DATA1,
            Heading: TYPE,
            switchtext: switchtext,
            Country_: countryCode,
            Screen_: "Login",
          });
        }
      }
    } catch (error: any) {
      console.log("Error during Login:", error);
    }
  };

  // const checkGoogleAccount = async () => {
  //   let user = await GoogleSignin.getCurrentUser();
  //   console.log("user:::::::::::", user);
  //   if (user != null && user != undefined) {
  //     Handlegoogle(user);
  //   } else {
  //     getGoogleAccount();
  //   }
  // };
  const handleGoogleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error("Goggle sign out error", error);
    }
  };

  // const getGoogleAccount = async () => {
  //   await GoogleSignin.hasPlayServices();
  //   const userInfo = await GoogleSignin.signIn();
  //   console.log("userInfo::::::::", userInfo);
  //   Handlegoogle(userInfo);
  // };

  const Handlegoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("userInfouserInfo---->", userInfo);

      const response = await axios({
        method: "post",
        url: socialLogin,
        data: {
          socialId: userInfo?.user?.id,
          socialType: "GOOGLE",
          deviceType: Platform.OS,
          firstName: userInfo?.user?.givenName,
          lastName: userInfo?.user?.familyName,
          email: userInfo?.user?.email,
          role: "driver",
        },
      });

      console.log("google login response---->", response);

      if (response?.data?.responseCode === 200) {
        showMessage({
          message: response?.data?.responseMessage,
          type: "success",
        });
        if (response?.data?.token !== undefined) {
          console.log("response?.dataresponse?.data", response?.data);
          await AsyncStorage.setItem("TOKEN", response?.data?.token);
          dispatch(setUpdateDetail(response?.data?.result));
          dispatch(
            setIsisVerifiedByAdmin(response?.data?.result?.isVerifiedByAdmin)
          );
          // dispatch(save_USER_ID(response?.data?.token));
          dispatch(SaveTOKEN(response?.data?.token));

          if (response?.data?.result?.role[0] === "driver") {
            if (response?.data?.result?.isProfileUpdated) {
              props?.navigation?.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "MyDrawer" }],
                })
              );
            } else {
              navigation.navigate("CompleteProfile");
            }
          } else {
            showMessage({
              message: "You are not compatible with given role.",
              type: "danger",
              icon: "danger",
              duration: 1500,
            });
          }
          handleGoogleSignOut();
        } else {
          showMessage({
            message: "You are not compatible with given role.",
            type: "danger",
            icon: "danger",
            duration: 1500,
          });
          handleGoogleSignOut();
        }
      } else {
        console.log("Token is undefined");
      }
    } catch (error) {
      showMessage({
        message: "Google Sign in cancelled.",
        type: "danger",
        icon: "danger",
      });
      console.log("error google sign in", error.response);
      handleGoogleSignOut();
    }
  };

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  // const handleFacebookLogin = async () => {
  //   try {
  //     const result = await LoginManager.logInWithPermissions([
  //       "public_profile",
  //       "email",
  //     ]);

  //     if (result.isCancelled) {
  //       console.log("Facebook login cancelled.");
  //     } else {
  //       const data = await AccessToken.getCurrentAccessToken();
  //       if (data) {
  //         console.log("Facebook login success:", data.accessToken.toString());
  //         // You can now use the access token to authenticate the user with your server
  //       }
  //     }
  //   } catch (error) {
  //     cconsole.log("Facebook login error:", error);
  //   }
  // };

  const RESEND_EMAIL_VERIFY = async () => {
    setLoader(true);
    var postData = {
      role: "driver",
    };
    if (switchtext == 2) {
      postData["email"] = Email;
    } else {
      (postData["mobile"] = phone), (postData["countryCode"] = countryCode);
    }
    try {
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
          setLoader(false);
          console.log("RESEND_EMAIl__Resp", response);
        }
      }
    } catch (error: any) {
      console.log("Error during MO_verify:", error, error.response);
    }
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#F8F8F8", flex: 1 }}>
        <FlashMessage position="bottom" />
        <StatusBar backgroundColor={"#F8F8F8"} barStyle={"dark-content"} />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground
            source={IMAGEPATH.Background}
            //CommonImage
            style={styles.ImageStyle}
            imageStyle={{
              resizeMode: "cover",
            }}
          >
            <View style={styles.mainView}>
              {/* {/ <ScrollView showsVerticalScrollIndicator={false}> /} */}
              <Text allowFontScaling={false} style={styles.mainheading}>
                {t("Sign In To Your Account")}
              </Text>
              <View style={styles.firstView}>
                <TouchableOpacity
                  onPress={() => {
                    setswitchtext(1), setphoneError("");
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.switchingtext,
                      { color: switchtext == 1 ? COLORS.BLACK : "#C8C7CC" },
                      { fontWeight: Platform.OS === "ios" ? "600" : "400" },
                    ]}
                  >
                    {t("Phone")}
                  </Text>
                  {switchtext == 1 && <View style={styles.switchLine}></View>}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setswitchtext(2), setEmailError("");
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.switchingtext,
                      { color: switchtext == 2 ? COLORS.BLACK : "#C8C7CC" },
                      { fontWeight: Platform.OS === "ios" ? "600" : "400" },
                    ]}
                  >
                    {t("Email")}
                  </Text>
                  {switchtext == 2 && <View style={styles.switchLine}></View>}
                </TouchableOpacity>
              </View>
              <View style={styles.lineview}></View>
              {switchtext == 1 && (
                <>
                  <View style={{ marginVertical: height * 0.02 }}>
                    <Text allowFontScaling={false} style={styles.phonenotext}>
                      {t("Enter Your Phone Number")}
                    </Text>
                    <View
                      style={{
                        // flexDirection: "row",
                        // alignItems: "center",
                        // // marginVertical: "1.5%",
                        // borderWidth: 1,
                        // borderColor: "#EFEFF4",
                        // borderRadius: 8,
                        // marginTop: 3,
                        // paddingVertical: "0.1%",

                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: "3%",
                        borderWidth: 1,
                        borderColor: "#a5a5a5",
                        borderRadius: 8,
                        paddingVertical: "0.02%",
                      }}
                    >
                      <TouchableOpacity>
                        <Coutry
                          setCountrycode={setCountryCode}
                          style={{ color: COLORS.BLACK }}
                          countryCode1={countryCode}
                          flag1={flag1}
                          setFlags={setFlag1}
                          onValidations={(e) =>
                            phone && setphoneError(ValidateMobileNo(e, phone))
                          }
                        />
                      </TouchableOpacity>

                      <TextInput
                        allowFontScaling={false}
                        value={phone}
                        placeholder={t("Mobile Number")}
                        placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
                        keyboardType="number-pad"
                        maxLength={13}
                        onChangeText={(text: string) => {
                          setPhone(text);
                          if (PhoneNumberError) {
                            setphoneError(ValidateMobileNo(countryCode, text));
                          }
                        }}
                        onBlur={() => {
                          setphoneError(
                            ValidateMobileNo(
                              countryCode,
                              `${countryCode}${phone}`
                            )
                          );
                        }}
                        style={{
                          // backgroundColor: "#fff",
                          // width: WIDTH * 0.42,
                          // paddingVertical:
                          //   Platform.OS == "ios" ? "5.4%" : "4.4%",
                          // borderRadius: 8,
                          // // paddingLeft: "5%",
                          // color: COLORS.BLACK,
                          // marginLeft: "2%",
                          // fontSize: 17,
                          // fontFamily: FONTS.semibold,

                          backgroundColor: COLORS.WHITE,
                          width: WIDTH * 0.42,
                          paddingVertical: 15,
                          borderRadius: 8,
                          color: COLORS.BLACK,
                          paddingLeft: "1%",
                          fontFamily: FONTS.medium,
                          fontWeight: Platform.OS == "ios" ? null : "100",
                          fontSize: 17,
                        }}
                      />
                    </View>
                    {PhoneNumberError && (
                      <Text
                        allowFontScaling={false}
                        style={[
                          [
                            styles.Errorstyle,
                            props.Errorstyle,
                            { marginTop: "1%" },
                          ],
                        ]}
                      >
                        {PhoneNumberError}
                      </Text>
                    )}
                  </View>
                  <View style={{ bottom: 15 }}>
                    <WholeButton
                      Label={t("Continue")}
                      styles={styles.continuebtn}
                      Action={() => {
                        LoginButtonClicked();
                      }}
                    />
                  </View>
                  <View style={{ bottom: 2 }}>
                    <View style={styles.account}>
                      <Text allowFontScaling={false} style={styles.dontAccText}>
                        {t("Don’t have an account?")}
                      </Text>
                      <TouchableOpacity
                        onPress={() => props.navigation.navigate("Register")}
                      >
                        <Text
                          allowFontScaling={false}
                          style={[styles.dontAccText, { color: COLORS.ORANGE }]}
                        >
                          {" "}
                          {t("Create an account")}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Text allowFontScaling={false} style={styles.orText}>
                      OR
                    </Text>
                    {/* openFacebook() */}
                    {/* <WholeButton
                      Facebook
                      Label={"Connect with Facebook"}
                      styles={styles.facebookbtn}
                      buttonText={styles.ButtonText}
                      Action={() => {
                        handleFacebookLogin();
                      }}
                    /> */}
                    <WholeButton
                      Google
                      Label={t("Continue With Google")}
                      styles={styles.googlebtn}
                      Action={() => {
                        Handlegoogle();
                      }}
                      buttonText={[styles.ButtonText, { color: COLORS.BLACK }]}
                    />
                  </View>
                </>
              )}
              {switchtext == 2 && (
                <>
                  <View
                    style={{
                      marginVertical:
                        Platform.OS === "ios" ? height * 0.022 : height * 0.021,
                    }}
                  >
                    <Text allowFontScaling={false} style={styles.phonenotext}>
                      {t("Enter Your Email Address")}
                    </Text>
                    <InputFiled
                      placeholder={t("Enter Your Email Address")}
                      MaxLength={256}
                      EmailFiled
                      value={Email}
                      Line
                      // ContainerStyle={{ paddingTop: 2 }}
                      onBlur={() => {
                        if (Email != "" || Email != undefined) {
                          setShowError((prevState) => ({
                            ...prevState,
                            emailError: true,
                          }));
                        }
                      }}
                      onChangeText={(text: string) => {
                        if (Email != "" || Email != undefined) {
                          setEmail(text.toLowerCase());
                          setEmailError(ValidateEmail(text));
                        }
                      }}
                      ShowError={ShowError.emailError}
                      Error={EmailError}
                      Errorstyle={{ marginTop: "1.2%" }}
                    />
                  </View>
                  <View style={{ bottom: 13 }}>
                    <WholeButton
                      Label={t("Continue")}
                      styles={styles.continuebtn}
                      Action={() => {
                        LoginButtonClicked();
                      }}
                    />
                  </View>
                  <View>
                    <View style={styles.account}>
                      <Text allowFontScaling={false} style={styles.dontAccText}>
                        {t("Don’t have an account?")}
                      </Text>
                      <TouchableOpacity
                        onPress={() => props.navigation.navigate("Register")}
                      >
                        <Text
                          allowFontScaling={false}
                          style={[styles.dontAccText, { color: COLORS.OGREEN }]}
                        >
                          {" "}
                          {t("Create an account")}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Text allowFontScaling={false} style={styles.orText}>
                      {t("OR")}
                    </Text>
                    {/* openFacebook() */}
                    {/* <WholeButton
                      Facebook
                      Label={"Connect with Facebook"}
                      styles={styles.facebookbtn}
                      buttonText={styles.ButtonText}
                      Action={() =>
                        showMessage({
                          message: "Something went wrong",
                          type: "danger",
                          icon: "danger",
                        })
                      }
                    /> */}
                    <WholeButton
                      Google
                      Label={t("Continue With Google")}
                      styles={styles.googlebtn}
                      Action={() => {
                        Handlegoogle();
                      }}
                      buttonText={[styles.ButtonText, { color: COLORS.BLACK }]}
                    />
                  </View>
                </>
              )}
            </View>
          </ImageBackground>

          <SpinningLoader loader={Loader} />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default Login;
const styles = StyleSheet.create({
  mainView: {
    width: WIDTH * 0.9,
    alignSelf: "center",
    borderRadius: 7,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: "5%",
    paddingTop: "8%",
    margin: Platform.OS == "android" ? HEIGHT * 0.28 : HEIGHT * 0.24,
    // alignItems:"center"
  },
  mainheading: {
    // fontFamily: FONTS.semibold,
    // fontSize: 14,
    // color: "#242E42",
    // alignSelf: "center",
    // fontWeight: "500",
    // letterSpacing: 0.2,
    // lineHeight: 14,
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.BLACK,
    textAlign: "center",
    // fontWeight: "600",
  },
  firstView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: WIDTH * 0.7,
    alignSelf: "center",
    marginVertical: "5%",
  },
  switchingtext: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    // color: "#262628"
  },
  phonenotext: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: "#242E42",
    paddingBottom: 10,
  },
  phoneIn: {
    // paddingHorizontal: "5%",
    color: "#242E42",
    fontSize: 15,
    fontFamily: FONTS.semibold,
  },
  Errorstyle: {
    color: "#FC281A",
    fontSize: 13,
    fontFamily: FONTS.regular,
    fontWeight: "400",

    paddingLeft: 7,
    marginTop: -5,
    marginBottom: 5,
  },
  phoneView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "3%",
    width: WIDTH * 0.8,
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#EFEFF4",
    backgroundColor: COLORS.WHITE,
  },
  account: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    // backgroundColor:'red',
    bottom: 5,
    // marginVertical: "2.5%",
  },
  dontAccText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: "#262626",
  },
  orText: {
    // fontFamily: FONTS.medium,
    // color: "#4A4A4A",
    // alignSelf: "center",
    // marginVertical: "3%",
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: "rgba(74, 74, 74, 1)",
    textAlign: "center",
    paddingVertical: "3.5%",
  },
  lineview: {
    borderBottomWidth: 1.5,
    borderBottomColor: "rgba(239, 239, 244, 1)",
    width: WIDTH * 0.9,
    alignSelf: "center",
    // marginBottom: "7%",
  },
  switchLine: {
    width: WIDTH * 0.1,
    alignSelf: "center",
    borderRadius: 8,
    marginVertical: "7%",
    backgroundColor: COLORS.ORANGE,
    paddingVertical: "1%",
  },
  facebookbtn: {
    marginVertical: "3%",
    backgroundColor: "#2672CB",
    width: WIDTH * 0.8,
    alignSelf: "center",
  },
  googlebtn: {
    marginVertical: "1%",
    backgroundColor: "#EDEDED",
    width: WIDTH * 0.8,
    alignSelf: "center",
    marginBottom: "5%",
  },
  continuebtn: {
    marginVertical: "3%",
    width: WIDTH * 0.8,
    alignSelf: "center",
    marginTop: "5%",
  },
  ImageStyle: {
    height: HEIGHT,
    width: WIDTH,
  },
  ButtonText: {
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  //
  toastContainer1: {
    position: "absolute",
    backgroundColor: "#d9534f",
    paddingVertical: IOS ? "6%" : "4%",
    alignItems: "center",
    width: WIDTH,
    //  justifyContent:'space-between',
    flexDirection: "row",
  },
  toastText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.bold,
    fontSize: 18,
    marginTop: IOS ? "11.5%" : "0%",
    textAlign: "center",
    justifyContent: "center",
    width: WIDTH * 0.78,
  },

  toastContainer: {
    position: "absolute",
    backgroundColor: "#0DBA7F", // Choose your desired background color d9534f
    paddingVertical: IOS ? "6.5%" : "4%",
    alignItems: "center",
    width: WIDTH,
    justifyContent: "center",
    // backgroundcolor:"red"
  },
});
