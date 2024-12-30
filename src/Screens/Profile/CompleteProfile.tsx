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
  Platform,
  Alert,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../Components/HeaderComponent";
import { COLORS, FONTS, IMAGEPATH } from "../../assets/Theme";
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
import ProfileEditIcon from "../../Components/ProfileSvg/ProfileEditIcon";
import InputFiled from "../../Components/InputFiled";
import {
  ValidateFirstname,
  ValidateLastname,
  ValidateMobileNo,
  ValidateEmail,
  ValidateAge,
  validateImage,
} from "../../Components/Validations";
import Coutry from "../../Components/Country";
import { IOS } from "../../Helpers/Platform";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import GenderDropDown from "../../Components/ProfileSvg/GenderDropDown";
import WholeButton from "../../Components/WholeButton";
import ImagePicker from "react-native-image-crop-picker";

import {
  UPDATEDETAILS_,
  UPDATE_Driver,
  UploadProfile,
  VIEW_PROFILEDATA,
} from "../../Components/ApiConfig/EndPoints";
import { callPostApi } from "../../Components/ApiConfig/ApiCall";

import EmergencyCountry from "../../Components/EmergencyCountry";
import { useDispatch, useSelector } from "react-redux";
import {
  saveAGE,
  saveCONTRYCODE,
  saveEMAIL,
  saveEMERGENCY_CONTRYCODE,
  saveEMERGENCY_NUMBER,
  saveFIRST_NAME,
  saveGENDER,
  saveIMAGEPATH,
  saveLAST_NAME,
  savePHONE_NUMBER,
  setClearPersonalInfo,
  setEmFlag,
  setPhFlag,
  setUpdateDetail,
} from "../../ReduxConfig/PersonalDetailsSlice";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "../../ReduxConfig/Store";
import SpinningLoader from "../../assets/SpinningLoader";
import { useTranslation } from "react-i18next";
import { CommonActions, useIsFocused } from "@react-navigation/native";
import { UserVisited } from "../../ReduxConfig/UserDetails/UserSlice";
import {
  setClearState,
  setIsisVerifiedByAdmin,
} from "../../ReduxConfig/TokenUserID";
import { showMessage } from "react-native-flash-message";
import { setClearVehicle } from "../../ReduxConfig/VehicleDetailsSlice";
import instance from "../../Components/ApiConfig/ApiIntercept";

const CompleteProfile = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const Data = useSelector(
    (state: RootState) => state.TokenUserID_DETAILS?.userTokenAndId
  );

  const PERSONAL_DETAILS_ = useSelector(
    (state: RootState) => state.PERSONAL_DETAILS_
  );
  const UserData = useSelector((state: RootState) => state.TokenUserID_DETAILS);

  const [fName, setfName] = useState(PERSONAL_DETAILS_?.FIRST_NAME || "");
  const [fnameError, setfnameError] = useState("");

  const [LName, setLName] = useState(PERSONAL_DETAILS_?.LAST_NAME || "");
  const [LNameError, setLNameError] = useState("");

  const [phone, setPhone] = useState(PERSONAL_DETAILS_?.PHONE_NUMBER || "");
  const [PhoneNumberError, setphoneError] = useState("");

  const [Email, setEmail] = useState(PERSONAL_DETAILS_?.EMAIL || "");
  const [EmailError, setEmailError] = useState("");

  const [AGE, setAGE] = useState(PERSONAL_DETAILS_?.AGE?.toString() || "");

  const [AGEError, setAGEError] = useState("");

  const [Gender, setGender] = useState<string | null>(null);
  const [GenderError, setGenderError] = useState("");
  const [GenderVALUE, setGenderVALUE] = useState(
    PERSONAL_DETAILS_?.GENDER || ""
  );

  const [Emergencyphone, setEmergencyphone] = useState(
    PERSONAL_DETAILS_?.EMERGENCY_NUMBER || ""
  );
  const [EmergencyphoneError, setEmergencyphoneError] = useState("");

  const [countryCode, setCountryCode] = useState(
    PERSONAL_DETAILS_?.CONTRYCODE || "+91"
  );
  const [flag1, setFlag1] = useState(PERSONAL_DETAILS_?.PhoneFlag || "🇦🇴");

  const [E_countryCode, setE_countryCode] = useState(
    PERSONAL_DETAILS_?.EMERGENCY_CONTRYCODE || "+91"
  );
  const [flag2, setFlag2] = useState(PERSONAL_DETAILS_?.EmergencyFlag || "🇦🇴");

  const [ShowError, setShowError] = useState({
    FnameError: false,
    LNameError: false,
    EmailError: false,
    ageError: false,
    PhoneNumberError: false,
  });

  type ImageData = {
    path: string;
  };
  const [PickedImage, setPickedImage] = useState<ImageData | null | String>(
    PERSONAL_DETAILS_?.PROFILE_PATH ?? ""
  );
  const [imageError, setImageError] = useState<String>("");
  // console.log("imageErrorimageError", imageError);

  const [Loader, setLoader] = useState(false);
  let retries = 0;
  const maxRetries = 1;

  const onSelectImage = () => {
    if (Platform.OS === "ios" || Platform.OS === "android") {
      Alert.alert("Upload Image", "Choose an option", [
        {
          text: "Camera",
          onPress: () => {
            onCamera();
          },
        },
        {
          text: "Photo",
          onPress: () => {
            openGallery_();
          },
        },
        { text: "Cancel", onPress: () => {} },
      ]);
    }
  };

  const onCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: "photo",
      quality: "high",
    })
      .then((image) => {
        // setSelectedImage(image.path);
        UploadImageb(image);
      })
      .catch((error) => {
        setPickedImageError("Error selecting image");
      });
  };

  const openGallery_ = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: "photo",
      quality: "high",
    })
      .then((image: ImageData) => {
        UploadImageb(image);
      })
      .catch((error) => {
        console.log("error-->openGallery_", error);
      });
  };
  // let retries = 0;
  // const maxRetries = 1;

  const UploadImageb = async (Image: { path: any; mime?: any }) => {
    setLoader(true);
    const formData = new FormData();
    formData.append("docsUrl", {
      uri: Image.path,
      name: "image.jpg",
      type: Image.mime,
    });
    try {
      const response = await instance.post(UploadProfile, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const responseData = response.data;
      console.log("responseData:", response);
      if (responseData.responseCode === 200) {
        setImageError("");
        dispatch(saveIMAGEPATH(responseData?.result));
        setPickedImage(Image);
      } else {
        console.log("Error:", responseData.responseMessage);
      }
      setLoader(false);
    } catch (error) {
      if (retries < maxRetries) {
        retries++;
        // Retry the request after a delay
        await UploadImageb(Image); // Retry after 3 seconds (adjust as needed)
      } else {
        showMessage({
          message: t("Something went wrong pleas try again."),
          duration: 1000,
          type: "danger",
        });
        setLoader(false);
        // Handle max retries reached
      }
      setLoader(false);
      console.log("Errorerrorerror:", error);
    }
  };

  const onContinuePress = () => {
    let fnameError = ValidateFirstname(fName);
    let LNameError = ValidateLastname(LName);
    let EmailError = ValidateEmail(Email);
    let ageError = ValidateAge(AGE);
    let PhoneNumberError = ValidateMobileNo(countryCode, `${phone}`);
    let EmergencyphoneError = ValidateMobileNo(
      E_countryCode,
      `${Emergencyphone}`
    );
    let ImageUploadeError = validateImage(
      PERSONAL_DETAILS_?.PROFILE_PATH ?? ""
    );
    let samePhoneError = "";
    if (phone === Emergencyphone && countryCode === E_countryCode) {
      samePhoneError = t(
        t("Phone number and emergency contact number cannot be the same.")
      );
    }
    if (
      fnameError == "" &&
      LNameError == "" &&
      EmailError == "" &&
      ageError == "" &&
      PhoneNumberError == "" &&
      samePhoneError === "" &&
      EmergencyphoneError == "" &&
      GenderVALUE !== null &&
      ImageUploadeError === ""
    ) {
      if (Object.keys(UserData?.userData)?.length > 0) {
        UpdateProfile();
      } else {
        dispatch(saveFIRST_NAME(fName));
        dispatch(saveLAST_NAME(LName));
        dispatch(savePHONE_NUMBER(phone));
        dispatch(saveCONTRYCODE(countryCode));
        dispatch(saveEMAIL(Email));
        dispatch(saveAGE(AGE));
        dispatch(saveGENDER(GenderVALUE.toLowerCase()));
        dispatch(saveEMERGENCY_NUMBER(Emergencyphone));
        dispatch(saveEMERGENCY_CONTRYCODE(E_countryCode));
        dispatch(setPhFlag(flag1));
        dispatch(setEmFlag(flag2));
        props.navigation.navigate("VehicleDetails");
      }
    } else {
      setfnameError(fnameError);
      setLNameError(LNameError);
      setEmailError(EmailError);
      setAGEError(ageError);
      setGenderError(GenderVALUE ? "" : "Please select your gender.");
      setphoneError(PhoneNumberError);
      setEmergencyphoneError(EmergencyphoneError);
      setImageError(ImageUploadeError);
      if (samePhoneError) {
        setEmergencyphoneError(samePhoneError);
      }
      setShowError({
        FnameError: true,
        LNameError: true,
        EmailError: true,
        ageError: true,
        PhoneNumberError: true,
      });
    }
  };

  const UpdateProfile = async () => {
    setLoader(true);
    try {
      var postData = {
        userId: UserData?.userData?._id,
        firstName: fName,
        lastName: LName,
        mobile: phone,
        countryCode: countryCode,
        emergencyContact: Emergencyphone,
        emergencyCountryCode: E_countryCode,
        age: parseInt(AGE),
        gender: GenderVALUE.toLowerCase(),
        deviceType: Platform?.OS,
        profileImage: PERSONAL_DETAILS_?.PROFILE_PATH,
        vehicleType: "sedan" || UserData?.userData?.vehicleType?.toLowerCase(),
        vehicleOwner: UserData?.userData?.vehicleOwner,
        vehicleClass: UserData?.userData?.vehicleClass,
        licenceExpiration: UserData?.userData?.licenceExpiration,
        licenseExpirationDoc: UserData?.userData?.licenseExpirationDoc,
        insuranceExpiration: UserData?.userData?.insuranceExpiration,
        insuranceExpirationDoc: UserData?.userData?.insuranceExpirationDoc,
        logbookExpiration: UserData?.userData?.logbookExpiration,
        logbookExpirationDoc: UserData?.userData?.logbookExpirationDoc,
        pcoVehicleLicenseExpiration:
          UserData?.userData?.pcoVehicleLicenseExpiration,
        pcoVehicleLicenseExpirationDoc:
          UserData?.userData?.pcoVehicleLicenseExpirationDoc,
        motExpiration: UserData?.userData?.motExpiration,
        motExpirationDocs: UserData?.userData?.motExpirationDocs,
        // carLicenseNumber: UserData?.userData?.carLicenseNumber,
        // carLicenseNumberDocs: UserData?.userData?.carLicenseNumberDocs,
        bookletNumber: UserData?.userData?.bookletNumber,
        bookletNumberDocs: UserData?.userData?.bookletNumberDocs,
        others: UserData?.userData?.others,
        accountType: UserData?.userData?.bankAccount?.accountType,
        bankAccountHolderName:
          UserData?.userData?.bankAccount?.bankAccountHolderName,
        bankAccountNumber: UserData?.userData?.bankAccount?.bankAccountNumber,
        bankName: UserData?.userData?.bankAccount?.bankName,
        branchName: UserData?.userData?.bankAccount?.branchName,
        routingNumber: UserData?.userData?.bankAccount?.routingNumber,
        taxNumber: UserData?.userData?.bankAccount?.taxNumber,
        frontVehicle: UserData?.userData?.frontVehicle,
        leftVehicle: UserData?.userData?.leftVehicle,
        rightVehicle: UserData?.userData?.rightVehicle,
        backVehicle: UserData?.userData?.backVehicle,
        deviceToken: UserData?.userData?.devices?.deviceToken,
        emergencyContactFlag: flag2,
        phoneFlag: flag1,
      };
      console.log("PayLoad---->", postData);
      setLoader(false);
      const SucessDisplay = true;
      const { response, error, loading } = await callPostApi(
        UPDATE_Driver,
        postData,
        SucessDisplay
      );
      setLoader(loading);
      if (error) {
        setLoader(false);
        console.log("API Error:", error.message);
      } else {
        if (response?.responseCode === 200) {
          setLoader(false);
          props?.navigation?.navigate("MyDrawer");
          console.log("L__DETAILS__Response", response);
        }
      }
    } catch (error: any) {
      setLoader(false);
      console.log("Error during Login:", error, error.response);
    }
  };

  const handleBackPress = () => {
    Alert.alert(
      "Exit",
      "Are you sure you want to exit app?",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        // { text: 'OK', onPress: () => BackHandler.exitApp() },
        { text: "OK", onPress: () => exitHandler() },
      ],
      { cancelable: false }
    );
    return true; // Prevent default back button behavior
  };

  const exitHandler = () => {
    // dispatch(setClearState(false));
    // dispatch(setClearPersonalInfo(false));
    // dispatch(setClearVehicle(false));
    // dispatch(UserVisited(""));
    // props?.navigation?.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [{ name: "splash" }],
    //   })
    // );
    BackHandler.exitApp();
  };

  useEffect(() => {
    if (isFocused) {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress
      );

      return () => backHandler.remove();
    }
  }, []);

  const handleFirstNameChange = (text: string) => {
    const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);
    setfName(capitalizedText);
    setfnameError(ValidateFirstname(capitalizedText));

    if (capitalizedText != "" || capitalizedText != undefined) {
      setfName(capitalizedText);
      setfnameError(ValidateFirstname(capitalizedText));
    }
  };

  const handleLastNameChange = (text: string) => {
    const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);
    setLName(capitalizedText);
    setLNameError(ValidateLastname(capitalizedText));
    if (capitalizedText !== "" && capitalizedText !== undefined) {
      setLName(capitalizedText);
      setLNameError(ValidateLastname(capitalizedText));
    }
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
      <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} />
      <SafeAreaView style={styles.MainContainer}>
        <Header
          Heading={
            Object.keys(UserData?.userData)?.length > 0
              ? t("Edit Your Profile")
              : t("Complete Your Profile")
          }
          navigation={props?.navigation}
          reset={!Data?.isProfileUpdated ? true : false}
          ToScreen={!Data?.isProfileUpdated ? "Register" : false}
          exitApp={handleBackPress}
        />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: "5%" }}
        >
          <View style={{ justifyContent: "flex-end" }}>
            {PERSONAL_DETAILS_?.PROFILE_PATH ? (
              <Image
                source={{ uri: PERSONAL_DETAILS_?.PROFILE_PATH }}
                style={[
                  {
                    borderRadius: 100,
                    height: 140,
                    width: 140,
                    alignSelf: "center",
                    marginTop: "5%",
                  },
                ]}
                resizeMode="cover"
              />
            ) : (
              <Image source={IMAGEPATH.ProfilePic} style={styles.ImageStyle} />
            )}

            <TouchableOpacity
              onPress={() => onSelectImage()}
              style={[
                styles.EditIconStyle,
                { marginTop: PickedImage ? -20 : -34 },
              ]}
            >
              <ProfileEditIcon />
            </TouchableOpacity>
          </View>
          <View>
            {imageError && (
              <Text
                allowFontScaling={false}
                style={[{ ...styles.Errorstyle, marginTop: 20 }]}
              >
                {imageError}
              </Text>
            )}
          </View>

          <Text allowFontScaling={false} style={styles.TextONE}>
            {t("Basic Personal Details")}
          </Text>
          <Text allowFontScaling={false} style={[styles.LabelTEXT]}>
            {t("First Name")}
          </Text>
          <InputFiled
            // ContainerStyle={styles.InputViewStyle}
            InputFieldStyle={styles.InputStyle}
            placeholder={t("Enter first Name")}
            placeholderTextColor={COLORS.PLACEHOLDERCOLOR2}
            maxLength={30}
            value={fName}
            onBlur={() => {
              if (fName != "" || fName != undefined) {
                setShowError((prevState) => ({
                  ...prevState,
                  FnameError: true,
                }));
              }
            }}
            // onChangeText={(text: string) => {
            //   if (fName != "" || fName != undefined) {
            //     setfName(text);
            //     setfnameError(ValidateFirstname(text));
            //   }
            // }}
            onChangeText={(text: string) => handleFirstNameChange(text)}
            ShowError={ShowError.FnameError}
            Error={fnameError}
            Errorstyle={{ paddingLeft: 3 }}
          />
          <Text allowFontScaling={false} style={[styles.LabelTEXT]}>
            {t("Last Name")}
          </Text>
          <InputFiled
            InputFieldStyle={styles.InputStyle}
            placeholder={t("Enter Last Name")}
            placeholderTextColor={COLORS.PLACEHOLDERCOLOR2}
            maxLength={30}
            value={LName}
            onBlur={() => {
              if (LName != "" || LName != undefined) {
                setShowError((prevState) => ({
                  ...prevState,
                  LNameError: true,
                }));
              }
            }}
            onChangeText={(text: string) => handleLastNameChange(text)}
            // onChangeText={(text: string) => {
            //   if (LName != "" || LName != undefined) {
            //     setLName(text);
            //     setLNameError(ValidateLastname(text));
            //   }
            // }}
            ShowError={ShowError.LNameError}
            Error={LNameError}
            Errorstyle={{ paddingLeft: 3 }}
          />
          <Text allowFontScaling={false} style={[styles.LabelTEXT]}>
            {t("Phone Number")}
          </Text>

          <View style={styles.PhoneVIEW}>
            <TouchableOpacity disabled={true}>
              <Coutry
                setCountrycode={setCountryCode}
                countryCode={countryCode}
                style={{ color: COLORS.BLACK }}
                countryCode1={countryCode}
                flag1={flag1}
                field={"PhoneNumber"}
                setFlags={setFlag1}
                // disabled={true}
              />
            </TouchableOpacity>

            <TextInput
              allowFontScaling={false}
              value={phone}
              placeholder={t("Mobile Number")}
              placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
              keyboardType="number-pad"
              maxLength={16}
              // editable={false}
              onChangeText={(text: string) => {
                setPhone(text);
                setphoneError(ValidateMobileNo(countryCode, `${text}`));
              }}
              onBlur={() => {
                setphoneError(ValidateMobileNo(countryCode, `${phone}`));
              }}
              style={{
                // ...styles.PhoneTextInput,
                backgroundColor: COLORS.WHITE,
                width: WIDTH * 0.42,
                paddingVertical: 15,
                borderRadius: 8,
                color: COLORS.BLACK,
                paddingLeft: "1%",
                fontFamily: FONTS.light,
                fontWeight: Platform.OS == "ios" ? null : "100",
                fontSize: 17,

                // marginLeft:
                //   countryCode?.length === 5
                //     ? 10
                //     : countryCode?.length === 4
                //     ? 0
                //     : -10,
              }}
            />
          </View>
          {PhoneNumberError && (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              {PhoneNumberError}
            </Text>
          )}

          <Text allowFontScaling={false} style={[styles.LabelTEXT]}>
            {t("Email Address")}
          </Text>

          <InputFiled
            InputFieldStyle={styles.InputStyle}
            placeholder={t("Enter your email")}
            MaxLength={256}
            EmailFiled
            Line
            editable={false}
            value={Email}
            onBlur={() => {
              if (Email != "" || Email != undefined) {
                setShowError((prevState) => ({
                  ...prevState,
                  EmailError: true,
                }));
              }
            }}
            onChangeText={(text: string) => {
              if (Email != "" || Email != undefined) {
                setEmail(text.toLowerCase());
                setEmailError(ValidateEmail(text));
              }
            }}
            ShowError={ShowError.EmailError}
            Error={EmailError}
            Errorstyle={{ paddingLeft: 3 }}
          />
          <Text allowFontScaling={false} style={[styles.LabelTEXT]}>
            {t("Enter Your Age")}
          </Text>

          <InputFiled
            keyboardType="number-pad"
            InputFieldStyle={styles.InputStyle}
            placeholder={t("Enter Your Age")}
            placeholderTextColor={COLORS.PLACEHOLDERCOLOR2}
            MaxLength={2}
            value={AGE}
            onBlur={() => {
              if (AGE != "" || AGE != undefined) {
                setShowError((prevState) => ({
                  ...prevState,
                  ageError: true,
                }));
              }
            }}
            onChangeText={(text: string) => {
              if (AGE != "" || AGE != undefined) {
                setAGE(text);
                setAGEError(ValidateAge(text));
              }
            }}
            ShowError={ShowError.ageError}
            Error={AGEError}
            Errorstyle={{ paddingLeft: 3, marginTop: "1%" }}
          />

          <Text allowFontScaling={false} style={[styles.LabelTEXT]}>
            {t("Select Gender")}
          </Text>

          <GenderDropDown
            setGender={setGender}
            Gender={GenderVALUE}
            setGenderError={setGenderError}
            setGenderLABEL={setGenderVALUE}
          />
          {GenderError && Gender === null && (
            <Text
              allowFontScaling={false}
              style={[styles.PHONEErrorstyle, { marginTop: "1%" }]}
            >
              {GenderError}
            </Text>
          )}

          <Text allowFontScaling={false} style={[styles.LabelTEXT]}>
            {t("Emergency Contact Number")}
          </Text>

          <View style={[styles.PhoneVIEW]}>
            <TouchableOpacity>
              <EmergencyCountry
                setCountrycode={setE_countryCode}
                style={{ color: COLORS.BLACK }}
                countryCode1={E_countryCode}
                flag1={flag2}
                setFlags={setFlag2}
              />
            </TouchableOpacity>

            <TextInput
              allowFontScaling={false}
              value={Emergencyphone}
              placeholder={t("Emergency Contact Number")}
              placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
              keyboardType="number-pad"
              maxLength={16}
              onChangeText={(text: string) => {
                setEmergencyphone(text);
                if (EmergencyphoneError) {
                  setEmergencyphoneError(
                    ValidateMobileNo(E_countryCode, `${text}`)
                  );
                }
              }}
              onBlur={() => {
                setEmergencyphoneError(
                  ValidateMobileNo(E_countryCode, `${Emergencyphone}`)
                );
              }}
              style={{
                // ...styles.PhoneTextInput,
                // marginLeft:
                //   E_countryCode?.length === 5
                //     ? 10
                //     : E_countryCode?.length === 4
                //     ? 0
                //     : -10,
                width: WIDTH * 0.45,
                paddingVertical: 15,
                borderRadius: 8,
                color: COLORS.BLACK,
                paddingLeft: "1%",
                fontFamily: FONTS.light,
                fontWeight: Platform.OS == "ios" ? null : "100",
                fontSize: 17,
              }}
            />
          </View>
          {EmergencyphoneError && (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              {EmergencyphoneError}
            </Text>
          )}

          <WholeButton
            styles={styles.ContinueButton}
            Label={t("CONTINUE")}
            Action={() => onContinuePress()}
            //Action={() => props.navigation.navigate('MyDrawer')}
          />
        </KeyboardAwareScrollView>
        <SpinningLoader loader={Loader} />
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default CompleteProfile;

const styles = StyleSheet.create({
  ImageStyle: {
    height: 140,
    width: 140,
    alignSelf: "center",
    resizeMode: "cover",
    marginTop: "5%",
    borderRadius: 100,
  },
  MainContainer: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },
  EditIconStyle: {
    alignSelf: "center",
    marginLeft: "20%",
  },
  TextONE: {
    fontSize: 16,
    fontFamily: FONTS.semibold,
    color: COLORS.BLACK3,
    width: WIDTH * 0.9,
    alignSelf: "center",
    paddingTop: "7%",
    fontWeight: "700",
  },
  LabelTEXT: {
    fontSize: 13,
    fontFamily: FONTS.medium,
    color: COLORS.BLACK3,
    width: WIDTH * 0.9,
    alignSelf: "center",
    lineHeight: 14,
    paddingTop: 20,
    paddingBottom: 10,
  },
  InputStyle: {
    width: WIDTH * 0.9,
  },
  PhoneVIEW: {
    flexDirection: "row",
    alignItems: "center",
    // marginVertical: "1.5%",
    borderWidth: 1,
    borderColor: "rgba(239, 239, 244, 1)",
    borderRadius: 8,
    width: WIDTH * 0.9,
    alignSelf: "center",
  },
  //ios cheak
  PhoneTextInput: {
    backgroundColor: COLORS.WHITE,
    // width: WIDTH * 0.5,
    paddingVertical: IOS ? "5.4%" : "4.4%",
    borderRadius: 8,
    // paddingLeft: "2%",
    color: COLORS.BLACK,
    // marginLeft: "8.5%",
    fontSize: 16.5,
    fontFamily: FONTS.semibold,
  },
  PHONEErrorstyle: {
    color: COLORS.ERRORCOLORRED,
    fontSize: 13,
    fontFamily: FONTS.regular,
    width: WIDTH * 0.9,
    alignSelf: "center",
    fontWeight: "400",
    // backgroundColor:'red'
  },
  ContinueButton: {
    width: WIDTH * 0.9,
    alignSelf: "center",
    marginTop: "8%",
    paddingVertical: "3.5%",
    marginBottom: "5%",
  },
  Errorstyle: {
    color: COLORS.ERRORCOLORRED,
    fontSize: 13,
    fontFamily: FONTS.regular,
    marginTop: Platform.OS === "ios" ? 4 : 16,
    fontWeight: "400",

    textAlign: "center",
  },
  header: {
    width: WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
});
