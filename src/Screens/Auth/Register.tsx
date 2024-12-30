import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Linking,
  Platform,
  ScrollView,
  Alert,
  BackHandler,
  StatusBar,
} from "react-native";
import { COLORS, FONTS, IMAGEPATH, VECTOR_ICONS } from "../../assets/Theme";
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
import InputFiled from "../../Components/InputFiled";
import { useState, useEffect } from "react";
import { ValidateEmail, ValidateMobileNo } from "../../Components/Validations";
import Coutry from "../../Components/Country";
import WholeButton from "../../Components/WholeButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ANDROID, IOS } from "../../Helpers/Platform";
import {
  REGISTERPOST,
  socialLogin,
} from "../../Components/ApiConfig/EndPoints";
import { callPostApi } from "../../Components/ApiConfig/ApiCall";
import SpinningLoader from "../../assets/SpinningLoader";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";
import {
  saveCONTRYCODE,
  setClearPersonalInfo,
  setPhFlag,
  setUpdateDetail,
} from "../../ReduxConfig/PersonalDetailsSlice";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CommonActions,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import {
  setClearState,
  setIsisVerifiedByAdmin,
  setToken,
} from "../../ReduxConfig/TokenUserID";
import { SaveTOKEN } from "../../ReduxConfig/Slices";
import { setClearVehicle } from "../../ReduxConfig/VehicleDetailsSlice";
import { UserVisited } from "../../ReduxConfig/UserDetails/UserSlice";
import { RootState } from "../../ReduxConfig/Store";
import { useTranslation } from "react-i18next";
GoogleSignin.configure({
  webClientId:
    Platform.OS === "ios"
      ? "743187716713-b1iihc8s2l498nimd46j1987iibjn089.apps.googleusercontent.com"
      : "743187716713-mmgvqau0tjg9ih5boahvsplb52skkptn.apps.googleusercontent.com",
  offlineAccess: true,
  // forceCodeForRefreshToken: true,
  // scopes: ["profile", "email"],
});

const Register = (props: any) => {
  const { t } = useTranslation();
  const [Email, setEmail] = useState("");

  const [EmailError, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [PhoneNumberError, setphoneError] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [flag1, setFlag1] = useState("🇦🇴");
  const [ShowError, setShowError] = useState({
    emailError: false,
    PhoneNumberError: false,
  });
  const dispatch = useDispatch();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [Loader, setLoader] = useState(false);
  const [states, setState] = useState("");
  const Register = () => {
    dispatch(setClearState(false));
    dispatch(setClearPersonalInfo(false));
    dispatch(setClearVehicle(false));
    let emailErr = ValidateEmail(Email);
    let phoneError = ValidateMobileNo(countryCode, `${phone}`);
    if (emailErr == "" && phoneError == "") {
      RegisterApi();
    } else {
      setEmailError(emailErr);
      setphoneError(phoneError);
      setShowError({
        emailError: true,
        PhoneNumberError: true,
      });
    }
  };
  const handleBackPress = () => {
    Alert.alert(
      "Exit App",
      "Are you sure you want to exit app?",
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
  const focused = useIsFocused();
  useEffect(() => {
    if (focused) {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress
      );
      return () => backHandler.remove();
    }
  }, [focused]);

  const navigation = useNavigation();
  const Location = useSelector((state: RootState) => state.INITIAL_LOCATION);
  const RegisterApi = async () => {
    const deviceToken = await AsyncStorage.getItem("fcm");
    setLoader(true);
    try {
      var postData = {
        mobile: phone,
        email: Email,
        countryCode: countryCode,
        phoneFlag: flag1,
        role: "driver",
        deviceToken: deviceToken?.toString(),
      };

      const SucessDisplay = true;
      const { response, error, loading } = await callPostApi(
        REGISTERPOST,
        postData,
        SucessDisplay
      );
      setLoader(loading);
      if (error) {
        setLoader(false);
        console.log("API Error:", error.response);
        if (error?.response?.data?.responseCode === 400) {
          showMessage({
            message: error?.response?.data?.responseMessage,
            type: "danger",
            icon: "danger",
          });
        }
      } else {
        if (response?.responseCode === 200) {
          setLoader(false);
          console.log("LOGIN_POSTResponse", response);
          dispatch(setPhFlag(flag1));
          dispatch(saveCONTRYCODE(countryCode));
          navigation.navigate("OTPVerificationScreen", {
            TYPE: "Login",
            value: phone,
            Country_: countryCode,
            EMAIL_: Email,
            Screen_: "Register",
            Heading: "Phone Verification",
          });
        }
      }
    } catch (error: any) {
      setLoader(false);
      console.log("Error during Register:", error.response);
    }
  };

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
  //     console.log("Facebook login error:", error);
  //   }
  // };

  // const checkGoogleAccount = async () => {
  //   let user = await GoogleSignin.getCurrentUser();
  //   if (user != null && user != undefined) {
  //     HandleGoogleSignIn(user);
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

  const getGoogleAccount = async () => {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    HandleGoogleSignIn(userInfo);
  };
  const HandleGoogleSignIn = async () => {
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
              message: "You are not compatible with given role",
              type: "danger",
              icon: "danger",
              duration: 1500,
            });
          }
        } else {
          showMessage({
            message: "You are not compatible with given role",
            type: "danger",
            icon: "danger",
            duration: 1500,
          });
        }
        handleGoogleSignOut();
      } else {
        console.log("Token is undefined");
        handleGoogleSignOut();
      }
    } catch (error) {
      showMessage({
        message: "Google Sign in cancelled.",
        type: "danger",
        icon: "danger",
      });
      handleGoogleSignOut();
      console.log("error google sign in", error.response);
    }
  };

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#F8F8F8", flex: 1 }}>
        <StatusBar backgroundColor={"#F8F8F8"} barStyle={"dark-content"} />

        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground
            source={IMAGEPATH.Background}
            //CommonImage
            style={style.ImageStyle}
            imageStyle={{
              resizeMode: "cover",
            }}
          >
            {/* <KeyboardAwareScrollView showsVerticalScrollIndicator={false}> */}
            <View style={style.mainView}>
              <Text allowFontScaling={false} style={style.CreateText}>
                {t("Create Your Account")}
              </Text>
              <View style={style.LINE}></View>
              <Text allowFontScaling={false} style={style.InputFiledText}>
                {t("Phone Number")}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: "3%",
                  borderWidth: 1,
                  borderColor: "#EFEFF4",
                  borderRadius: 8,
                  paddingVertical: "0.02%",
                  // backgroundColor: "red",
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
                  maxLength={16}
                  onChangeText={(text: string) => {
                    setPhone(text);
                    if (PhoneNumberError) {
                      setphoneError(ValidateMobileNo(countryCode, `${text}`));
                    }
                  }}
                  onBlur={() => {
                    setphoneError(ValidateMobileNo(countryCode, `${phone}`));
                  }}
                  // style={{
                  //   backgroundColor: COLORS.WHITE,
                  //   // width: WIDTH * 0.42,
                  //   paddingVertical: Platform.OS == "ios" ? "4.4%" : "4.4%",
                  //   borderRadius: 8,
                  //   paddingLeft: 5,
                  //   // paddingLeft: "1%",
                  //   // paddingVertical: 0,
                  //   color: COLORS.BLACK,

                  //   fontSize: 16.5,
                  //   // paddingBottom: 5,
                  //   fontFamily: FONTS.semibold,
                  //   // marginLeft:
                  //   //   countryCode?.length === 5
                  //   //     ? 10
                  //   //     : countryCode?.length === 4
                  //   //     ? 0
                  //   //     : -10,
                  // }}
                  style={{
                    backgroundColor: COLORS.WHITE,
                    width: WIDTH * 0.42,
                    paddingVertical: 15,
                    borderRadius: 8,
                    color: COLORS.BLACK,
                    paddingLeft: "1%",
                    fontFamily: FONTS.medium,
                    fontWeight: Platform.OS == "ios" ? null : "100",
                    fontSize: 17,
                    // marginLeft:
                    //   countryCode?.length === 5
                    //     ? 0
                    //     : countryCode?.length === 4
                    //       ? -2
                    //       : -17,
                  }}
                />
              </View>
              {PhoneNumberError && (
                <Text
                  allowFontScaling={false}
                  style={[style.Errorstyle, props.Errorstyle]}
                >
                  {PhoneNumberError}
                </Text>
              )}
              <Text
                allowFontScaling={false}
                style={{ ...style.InputFiledText, paddingTop: 5 }}
              >
                {t("Email Address")}
              </Text>
              <InputFiled
                placeholder={t("Email Address")}
                // ContainerStyle={{ height: "10%" }}
                MaxLength={256}
                EmailFiled
                Line
                value={Email}
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
              />
              <View style={{ marginTop: "5%" }}>
                <WholeButton
                  Label={t("Continue")}
                  styles={style.ButtonStyle}
                  Action={() => {
                    Register();
                  }}
                />
              </View>

              <View style={{ ...style.TextStyle }}>
                <Text allowFontScaling={false} style={style.HaveAccountText}>
                  {t("Already have an account?")}
                </Text>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("Login")}
                >
                  <Text allowFontScaling={false} style={style.SignText}>
                    {" "}
                    {t("Sign In")}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text allowFontScaling={false} style={style.HaveAccountText1}>
                {t("OR")}
              </Text>
              {/* <WholeButton
                Label="Connect with Facebook"
                styles={style.FacBookButtonStyle}
                buttonText={style.ButtonText}
                Facebook
                Action={() =>
                  showMessage({
                    message: "Something went wrong",
                    type: "danger",
                    icon: "danger",
                  })
                }
              /> */}
              <WholeButton
                Label={t("Connect With Google")}
                styles={style.GoogleButtonStyle}
                buttonText={[style.ButtonText, { color: COLORS.BLACK }]}
                Google
                Action={HandleGoogleSignIn}
              />
            </View>
          </ImageBackground>
          <SpinningLoader loader={Loader} />
        </KeyboardAwareScrollView>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: "#F8F8F8" }}></SafeAreaView>
    </>
  );
};
const style = StyleSheet.create({
  ImageStyle: {
    height: HEIGHT,
    width: WIDTH,
  },
  Errorstyle: {
    color: COLORS.ERRORCOLORRED,
    fontSize: 13,
    fontFamily: FONTS.regular,
    fontWeight: "400",
    // paddingLeft: 7,
    marginBottom: 5,
  },
  InputFiledText: {
    color: COLORS.BLACK,
    fontSize: 14,
    fontFamily: FONTS.medium,
    paddingBottom: 10,
  },
  mainView: {
    padding: "4%",
    width: WIDTH * 0.9,
    alignSelf: "center",
    borderRadius: 7,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: "5%",
    paddingTop: "8%",
    margin: Platform.OS == "android" ? HEIGHT * 0.28 : HEIGHT * 0.24,
  },
  ButtonStyle: {
    width: WIDTH * 0.8,
    alignSelf: "center",
    marginVertical: "5%",
  },
  TextStyle: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
  },
  HaveAccountText: {
    fontSize: 14,
    fontFamily: FONTS.light,
    color: COLORS.BLACK,
  },
  SignText: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.ORANGE,
  },
  HaveAccountText1: {
    // fontSize: 14,
    // fontFamily: FONTS.medium,
    // color: "rgba(74, 74, 74, 1)",
    // textAlign: "center",
    // paddingVertical: "3.5%",
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: "rgba(74, 74, 74, 1)",
    textAlign: "center",
    paddingVertical: "3.5%",
  },
  FacBookButtonStyle: {
    width: WIDTH * 0.8,
    alignSelf: "center",
    backgroundColor: COLORS.ButtonBLUE,
  },
  ButtonText: {
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  GoogleButtonStyle: {
    width: WIDTH * 0.8,
    alignSelf: "center",
    marginVertical: "4%",
    backgroundColor: COLORS.WHITEHome,
  },
  CreateText: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.BLACK,
    textAlign: "center",
    fontWeight: "600",
  },
  LINE: {
    backgroundColor: "rgba(239, 239, 244, 1)",
    width: WIDTH * 0.9,
    height: "0.1%",
    alignSelf: "center",
    marginBottom: "4%",
    marginTop: "7%",
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
export default Register;
