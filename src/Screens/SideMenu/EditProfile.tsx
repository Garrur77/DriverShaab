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
import React, { useState } from "react";
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
} from "../../Components/Validations";
import Coutry from "../../Components/Country";
import { IOS } from "../../Helpers/Platform";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import GenderDropDown from "../../Components/ProfileSvg/GenderDropDown";
import WholeButton from "../../Components/WholeButton";
import ImagePicker from "react-native-image-crop-picker";
import { useSelector } from "react-redux";
import { RootState } from "../../ReduxConfig/Store";

const EditProfile = (props: any) => {
  const UserData = useSelector((state: RootState) => state.PERSONAL_DETAILS_);
  const [fName, setfName] = useState("");
  const [fnameError, setfnameError] = useState("");

  const [LName, setLName] = useState("");
  const [LNameError, setLNameError] = useState("");

  const [phone, setPhone] = useState("");
  const [PhoneNumberError, setphoneError] = useState("");

  const [countryCode, setCountryCode] = useState("+91");
  const [flag1, setFlag1] = useState("🇮🇳");

  const [Email, setEmail] = useState("");
  const [EmailError, setEmailError] = useState("");

  const [AGE, setAGE] = useState("");
  const [AGEError, setAGEError] = useState("");

  const [Gender, setGender] = useState<string | null>(null);
  const [GenderError, setGenderError] = useState("");

  const [Emergencyphone, setEmergencyphone] = useState("");
  const [EmergencyphoneError, setEmergencyphoneError] = useState("");

  const [EcountryCode, setCountryCode1] = useState("+91");
  const [Eflag1, setEFlag1] = useState("🇮🇳");

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
  const [PickedImage, setPickedImage] = useState<ImageData | null>(null);

  const [PickedImageError, setPickedImageError] = useState<string | undefined>(
    undefined
  );

  const openGallery_ = () => {
    ImagePicker.openPicker({
      height: HEIGHT * 0.2,
      width: WIDTH * 0.4,
      cropping: true,
      mediaType: "photo",
      includeBase64: true,
    })
      .then((image: ImageData) => {
        console.log(image, "PATH__");
        setPickedImage(image);
      })
      .catch((error) => {
        console.log("Error selecting image:", error);
        setPickedImageError("Error selecting image");
      });
  };

  const onContinuePress = () => {
    let fnameError = ValidateFirstname(fName);
    let LNameError = ValidateLastname(LName);
    let EmailError = ValidateEmail(Email);
    let ageError = ValidateAge(AGE);
    let PhoneNumberError = ValidateMobileNo(phone);
    let EmergencyphoneError = ValidateMobileNo(Emergencyphone);

    if (
      fnameError == "" &&
      LNameError == "" &&
      EmailError == "" &&
      ageError == "" &&
      PhoneNumberError == "" &&
      EmergencyphoneError == "" &&
      Gender !== null
    ) {
      props.navigation.navigate("Account");
    } else {
      setfnameError(fnameError);
      setLNameError(LNameError);
      setEmailError(EmailError);
      setAGEError(ageError);
      setGenderError("Please select a gender");
      setphoneError(PhoneNumberError);
      setEmergencyphoneError(EmergencyphoneError);

      setShowError({
        FnameError: true,
        LNameError: true,
        EmailError: true,
        ageError: true,
        PhoneNumberError: true,
      });
    }
  };

  //

  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
      <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} />
      <SafeAreaView style={styles.MainContainer}>
        <Header
          Heading={"Edit Profile"}
          navigation={props?.navigation}
          ToScreen={null}
        />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={{ justifyContent: "flex-end" }}>
            {PickedImage ? (
              <Image
                source={{ uri: PickedImage.path }}
                style={[
                  {
                    borderRadius: 100,
                    height: HEIGHT * 0.18,
                    width: WIDTH * 0.35,
                    alignSelf: "center",
                    marginTop: "5%",
                  },
                ]}
              />
            ) : (
              <Image source={IMAGEPATH.ProfilePic} style={styles.ImageStyle} />
            )}

            <TouchableOpacity
              onPress={() => openGallery_()}
              style={[
                styles.EditIconStyle,
                { marginTop: PickedImage ? -20 : -34 },
              ]}
            >
              <ProfileEditIcon />
            </TouchableOpacity>
          </View>

          {/* <Text allowFontScaling={false}  style={styles.TextONE}>Basic Personal Details</Text> */}
          <Text
            allowFontScaling={false}
            style={[styles.LabelTEXT, { paddingTop: "6%" }]}
          >
            First Name
          </Text>
          <InputFiled
            // ContainerStyle={styles.InputViewStyle}
            InputFieldStyle={styles.InputStyle}
            placeholder={"Enter first Name"}
            placeholderTextColor={COLORS.PLACEHOLDERCOLOR2}
            maxLength={256}
            value={fName}
            onBlur={() => {
              if (fName != "" || fName != undefined) {
                setShowError((prevState) => ({
                  ...prevState,
                  FnameError: true,
                }));
              }
            }}
            onChangeText={(text: string) => {
              if (fName != "" || fName != undefined) {
                setfName(text);
                setfnameError(ValidateFirstname(text));
              }
            }}
            ShowError={ShowError.FnameError}
            Error={fnameError}
            Errorstyle={{ paddingLeft: 3, marginTop: "1%" }}
          />
          <Text
            allowFontScaling={false}
            style={[styles.LabelTEXT, { paddingTop: "2%" }]}
          >
            Last Name
          </Text>
          <InputFiled
            // ContainerStyle={styles.InputViewStyle}
            InputFieldStyle={styles.InputStyle}
            placeholder={"Enter Last Name"}
            placeholderTextColor={COLORS.PLACEHOLDERCOLOR2}
            maxLength={256}
            value={LName}
            onBlur={() => {
              if (LName != "" || LName != undefined) {
                setShowError((prevState) => ({
                  ...prevState,
                  LNameError: true,
                }));
              }
            }}
            onChangeText={(text: string) => {
              if (LName != "" || LName != undefined) {
                setLName(text);
                setLNameError(ValidateLastname(text));
              }
            }}
            ShowError={ShowError.LNameError}
            Error={LNameError}
            Errorstyle={{ paddingLeft: 3, marginTop: "1%" }}
          />
          <Text
            allowFontScaling={false}
            style={[styles.LabelTEXT, { paddingTop: "2%" }]}
          >
            Phone Number
          </Text>

          <View style={styles.PhoneVIEW}>
            <TouchableOpacity>
              <Coutry
                setCountrycode={setCountryCode}
                style={{ color: COLORS.BLACK }}
                countryCode1={countryCode}
                flag1={flag1}
              />
            </TouchableOpacity>

            <TextInput
              allowFontScaling={false}
              value={phone}
              placeholder="Mobile Number"
              placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
              keyboardType="number-pad"
              maxLength={16}
              onChangeText={(text: string) => {
                setPhone(text);
                if (PhoneNumberError) {
                  setphoneError(ValidateMobileNo(text));
                }
              }}
              onBlur={() => {
                setphoneError(ValidateMobileNo(phone));
              }}
              style={{
                ...styles.PhoneTextInput,
                marginLeft:
                  countryCode?.length === 5
                    ? 0
                    : countryCode?.length === 4
                    ? -2
                    : -17,
              }}
            />
          </View>
          {PhoneNumberError && (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              {PhoneNumberError}
            </Text>
          )}

          <Text
            allowFontScaling={false}
            style={[styles.LabelTEXT, { paddingTop: "2%" }]}
          >
            Email address
          </Text>

          <InputFiled
            InputFieldStyle={styles.InputStyle}
            placeholder={"Enter your email"}
            MaxLength={256}
            EmailFiled
            Line
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
            Errorstyle={{ paddingLeft: 3, marginTop: "1%" }}
          />

          <Text
            allowFontScaling={false}
            style={[styles.LabelTEXT, { paddingTop: "2%" }]}
          >
            Enter Your Age
          </Text>

          <InputFiled
            keyboardType="number-pad"
            InputFieldStyle={styles.InputStyle}
            placeholder={"Enter Your Age"}
            placeholderTextColor={COLORS.PLACEHOLDERCOLOR2}
            maxLength={3}
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

          <Text
            allowFontScaling={false}
            style={[styles.LabelTEXT, { paddingTop: "2%" }]}
          >
            Select Gender
          </Text>
          <GenderDropDown
            setGender={setGender}
            Gender={Gender}
            setGenderError={setGenderError}
          />
          {GenderError && Gender === null && (
            <Text
              allowFontScaling={false}
              style={[styles.PHONEErrorstyle, { marginTop: "1%" }]}
            >
              {GenderError}
            </Text>
          )}

          <Text
            allowFontScaling={false}
            style={[styles.LabelTEXT, { paddingTop: "3%" }]}
          >
            Emergency Contact Number
          </Text>

          <View style={[styles.PhoneVIEW, { marginTop: "2%" }]}>
            <TouchableOpacity>
              <Coutry
                setCountrycode1={setCountryCode1}
                style={{ color: COLORS.BLACK }}
                countryCode1={countryCode}
                flag1={flag1}
              />
            </TouchableOpacity>

            <TextInput
              allowFontScaling={false}
              value={Emergencyphone}
              placeholder="Emergency Contact"
              placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
              keyboardType="number-pad"
              maxLength={16}
              onChangeText={(text: string) => {
                setEmergencyphone(text);
                if (EmergencyphoneError) {
                  setEmergencyphoneError(ValidateMobileNo(text));
                }
              }}
              onBlur={() => {
                setEmergencyphoneError(ValidateMobileNo(Emergencyphone));
              }}
              style={styles.PhoneTextInput}
            />
          </View>
          {EmergencyphoneError && (
            <Text allowFontScaling={false} style={styles.PHONEErrorstyle}>
              {EmergencyphoneError}
            </Text>
          )}

          <WholeButton
            styles={styles.ContinueButton}
            Label={"UPDATE"}
            Action={() => onContinuePress()}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  ImageStyle: {
    height: HEIGHT * 0.2,
    width: WIDTH * 0.4,
    alignSelf: "center",
    marginTop: "5%",
  },
  MainContainer: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },
  EditIconStyle: {
    alignSelf: "center",
  },
  TextONE: {
    fontSize: 16,
    fontFamily: FONTS.semibold,
    color: COLORS.BLACK3,
    width: WIDTH * 0.9,
    alignSelf: "center",
    paddingTop: "7%",
  },
  LabelTEXT: {
    fontSize: 13,
    fontFamily: FONTS.medium,
    color: COLORS.BLACK3,
    width: WIDTH * 0.9,
    alignSelf: "center",
    lineHeight: 14,
  },
  InputStyle: {
    width: WIDTH * 0.9,
  },
  PhoneVIEW: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "1.5%",
    borderWidth: 1,
    borderColor: "rgba(239, 239, 244, 1)",
    borderRadius: 8,
    width: WIDTH * 0.9,
    alignSelf: "center",
  },
  //ios cheak
  PhoneTextInput: {
    backgroundColor: COLORS.WHITE,
    width: WIDTH * 0.5,
    paddingVertical: IOS ? "5.4%" : "4.4%",
    borderRadius: 8,
    paddingLeft: "2%",
    color: COLORS.BLACK,
    fontSize: 17,
    fontFamily: FONTS.semibold,
  },
  PHONEErrorstyle: {
    color: COLORS.ERRORCOLORRED,
    fontSize: 13,
    fontFamily: FONTS.regular,
    width: WIDTH * 0.9,
    alignSelf: "center",
  },
  ContinueButton: {
    width: WIDTH * 0.9,
    alignSelf: "center",
    marginTop: "8%",
    paddingVertical: "3.5%",
    marginBottom: "5%",
  },
});
