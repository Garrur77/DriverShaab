import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
  Alert,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FONTS } from "../../assets/Fonts";
import { COLORS } from "../../assets/Theme";
import { WIDTH } from "../../Helpers/Dimentions";
import Header from "../../Components/HeaderComponent";
import AccountTypeDropDoun from "../../Components/ProfileSvg/AccountTypeDropDoun";
import InputFiled from "../../Components/InputFiled";
import { useTranslation } from "react-i18next";
import {
  ValidateFullname,
  ValidateAccNumber,
  ValidateConfirmAccNumber,
  validateBankName,
  validateIFSC,
  validateTAXNumber,
  validateBranchName,
} from "../../Components/Validations";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import WholeButton from "../../Components/WholeButton";
import RegistationSuccessPopUp from "../../Components/RegistationSuccessPopUp";
import { UPDATE_Driver } from "../../Components/ApiConfig/EndPoints";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../ReduxConfig/Store";
import { callPostApi } from "../../Components/ApiConfig/ApiCall";
import SpinningLoader from "../../assets/SpinningLoader";
import { setClearState, setIsProfile } from "../../ReduxConfig/TokenUserID";
import { setClearPersonalInfo } from "../../ReduxConfig/PersonalDetailsSlice";
import { setClearVehicle } from "../../ReduxConfig/VehicleDetailsSlice";
import { UserVisited } from "../../ReduxConfig/UserDetails/UserSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UploadSvgImage from "../../Components/ProfileSvg/UploadSvgImage";
import DocumentPicker from "react-native-document-picker";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
const AccountDetails = (props: any) => {
  const VEHICAL_DETAILS_ = useSelector(
    (state: RootState) => state.VEHICAL_DETAILS_
  );

  const dispatch = useDispatch();
  console.log(
    "VEHICAL_DETAILS_VEHICAL_DETAILS_VEHICAL_DETAILS_",
    VEHICAL_DETAILS_
  );

  const [Gender, setGender] = useState<string | null>(null);
  const [GenderError, setGenderError] = useState("");

  const [AccHolderName, setAccHolderName] = useState("");
  const [AccHolderNameError, setAccHolderNameError] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [AccNumber, setAccNumber] = useState("");
  const [AccNumberError, setAccNumberError] = useState("");

  const [ConfirmAccNum, setConfirmAccNum] = useState("");
  const [ConfirmAccNumError, setConfirmAccNumError] = useState("");

  const [BankName, setBankName] = useState("");
  const [BankNameError, setBankNameError] = useState("");

  const [BranchName, setBranchName] = useState("");
  const [BranchNameError, setBranchNameError] = useState("");

  const [IFSC, setIFSC] = useState("");
  const [IFSCError, setIFSCError] = useState("");

  const [Tax, setTax] = useState("");
  const [TaxError, setTaxError] = useState("");

  const [Doc, setDoc] = useState("");
  console.log("Doc--->>>>", Doc);
  const [DocError, setDocError] = useState("");

  const [Loader, setLoader] = useState(false);

  const [ACC_TYPE, setACC_TYPE] = useState("");

  const [ShowError, setShowError] = useState({
    AccHolderNameError: false,
    AccNumberError: false,
    ConfirmAccNumError: false,
    BankNameError: false,
    IFSCError: false,
    // TaxError: false,
    BranchNameError: false,
    setDocError: false,
  });
  const { t } = useTranslation();

  const OnSubmitAction = () => {
    let AccHolderNameError = ValidateFullname(AccHolderName);
    let AccNumberError = ValidateAccNumber(AccNumber);
    let ConfirmAccNumError = ValidateConfirmAccNumber(ConfirmAccNum, AccNumber);
    let BankNameError = validateBankName(BankName);
    let IFSCError = validateIFSC(IFSC);
    // let TaxError = validateTAXNumber(Tax);
    let BranchNameError = validateBranchName(BranchName);
    // let DocError = validateDocument(Doc);
    if (
      AccHolderNameError == "" &&
      AccNumberError == "" &&
      ConfirmAccNumError == "" &&
      BankNameError == "" &&
      IFSCError == "" &&
      BranchNameError == ""
    ) {
      DRIVER_DETAILSApi();
    } else {
      setAccHolderNameError(AccHolderNameError);
      setAccNumberError(AccNumberError);
      setConfirmAccNumError(ConfirmAccNumError);
      setBankNameError(BankNameError);
      setIFSCError(IFSCError);
      // setTaxError(TaxError);
      setBranchNameError(BranchNameError);
      setGenderError("Account select account type");
      setDocError("Please upload bank detail document");
      setShowError({
        AccHolderNameError: true,
        AccNumberError: true,
        ConfirmAccNumError: true,
        BankNameError: true,
        BranchNameError: true,
        IFSCError: true,
      });
    }
  };

  const Data = useSelector(
    (state: RootState) => state.TokenUserID_DETAILS?.userTokenAndId
  );

  // console.log("DATAAA---->>>", Data?.userId);

  const UserData = useSelector((state: RootState) => state.PERSONAL_DETAILS_);
  // console.log(UserData, "UserData");

  const firstName_ = useSelector(
    (state: RootState) => state.PERSONAL_DETAILS_.FIRST_NAME
  );

  const LAST_NAME = useSelector(
    (state: RootState) => state.PERSONAL_DETAILS_.LAST_NAME
  );

  const PHONE_NUMBER = useSelector(
    (state: RootState) => state.PERSONAL_DETAILS_.PHONE_NUMBER
  );

  const CONTRYCODE = useSelector(
    (state: RootState) => state.PERSONAL_DETAILS_.CONTRYCODE
  );

  const EMAIL = useSelector(
    (state: RootState) => state.PERSONAL_DETAILS_.EMAIL
  );

  const AGE = useSelector((state: RootState) => state.PERSONAL_DETAILS_.AGE);

  const GENDER = useSelector(
    (state: RootState) => state.PERSONAL_DETAILS_.GENDER
  );

  const EMERGENCY_NUMBER = useSelector(
    (state: RootState) => state.PERSONAL_DETAILS_.EMERGENCY_NUMBER
  );

  const EMERGENCY_CONTRYCODE = useSelector(
    (state: RootState) => state.PERSONAL_DETAILS_.EMERGENCY_CONTRYCODE
  );

  const PROFILE_PATH_ = useSelector(
    (state: RootState) => state.PERSONAL_DETAILS_.PROFILE_PATH
  );

  //VEHICAL

  const VEHICAL_OWNER_ = useSelector(
    (state: RootState) => state.VEHICAL_DETAILS_.VEHICAL_OWNER
  );

  const VEHICLE_NAME = useSelector(
    (state: RootState) => state.VEHICAL_DETAILS_.VEHICAL_NAME
  );
  const VEHICLE_NUMBER = useSelector(
    (state: RootState) => state.VEHICAL_DETAILS_.VEHICAL_NUMBER
  );

  const VEHICAL_TYPE = useSelector(
    (state: RootState) => state.VEHICAL_DETAILS_.VEHICAL_TYPE
  );

  const VEHICAL_CLASS = useSelector(
    (state: RootState) => state.VEHICAL_DETAILS_.VEHICAL_CLASS
  );

  const PCO_VEHICAL_LICENSE = useSelector(
    (state: RootState) => state.VEHICAL_DETAILS_.PCO_VEHICAL_LICENSE
  );

  const PCO_VEHICAL_LICENSE_DOC = useSelector(
    (state: RootState) => state.VEHICAL_DETAILS_.PCO_VEHICAL_LICENSE_DOC
  );

  const DRIVER_LICENSE = useSelector(
    (state: RootState) => state.VEHICAL_DETAILS_.DRIVER_LICENSE
  );

  const DRIVER_LICENSE_DOC = useSelector(
    (state: RootState) => state.VEHICAL_DETAILS_.DRIVER_LICENSE_DOC
  );

  const INSURANCE = useSelector(
    (state: RootState) => state.VEHICAL_DETAILS_.INSURANCE
  );

  const INSURANCE_DOC = useSelector(
    (state: RootState) => state.VEHICAL_DETAILS_.INSURANCE_DOC
  );

  const VEHICAL_LOGBOOK = useSelector(
    (state: RootState) => state.VEHICAL_DETAILS_.VEHICAL_LOGBOOK
  );

  const VEHICAL_LOGBOOK_DOC = useSelector(
    (state: RootState) => state.VEHICAL_DETAILS_.VEHICAL_LOGBOOK_DOC
  );

  const MOT = useSelector((state: RootState) => state.VEHICAL_DETAILS_.MOT);

  const MOT_DOC = useSelector(
    (state: RootState) => state.VEHICAL_DETAILS_.MOT_DOC
  );

  const CAR_LICENSE = useSelector(
    (state: RootState) => state.VEHICAL_DETAILS_.CAR_LICENSE
  );

  const CAR_LICENSE_DOC = useSelector(
    (state: RootState) => state.VEHICAL_DETAILS_.CAR_LICENSE_DOC
  );

  const BOOKLET = useSelector(
    (state: RootState) => state.VEHICAL_DETAILS_.BOOKLET
  );

  const BOOKLET_DOC = useSelector(
    (state: RootState) => state.VEHICAL_DETAILS_.BOOKLET_DOC
  );

  const OTHER = useSelector((state: RootState) => state.VEHICAL_DETAILS_.OTHER);

  const FRONTAL_PATH = useSelector(
    (state: RootState) => state.VEHICAL_DETAILS_.FRONTAL_PATH
  );

  const DRIVER_DETAILSApi = async () => {
    const fcmToken = await AsyncStorage.getItem("fcm");
    try {
      setLoader(true);
      const formData = new FormData();
      formData.append("bankDetailsDoc", {
        uri: Doc.uri,
        type: Doc.type,
        name: Doc.name,
      });
      formData.append("userId", Data?.userId);
      formData.append("firstName", firstName_);
      formData.append("lastName", LAST_NAME);
      formData.append("deviceType", Platform?.OS);
      formData.append("age", parseInt(AGE));
      formData.append("mobile", PHONE_NUMBER);
      formData.append("countryCode", CONTRYCODE);
      formData.append("emergencyContact", EMERGENCY_NUMBER);
      formData.append("emergencyCountryCode", EMERGENCY_CONTRYCODE);
      formData.append("gender", GENDER);
      formData.append("profileImage", PROFILE_PATH_);
      formData.append("vehicleType", VEHICAL_TYPE?.toLowerCase());
      formData.append("vehicleOwner", VEHICAL_OWNER_);
      formData.append("vehicleClass", VEHICAL_CLASS);
      formData.append("licenceExpiration", DRIVER_LICENSE);
      formData.append("licenceExpirationDoc", DRIVER_LICENSE_DOC);
      formData.append("insuranceExpiration", INSURANCE);
      formData.append("insuranceExpirationDoc", INSURANCE_DOC);
      formData.append("logbookExpiration", VEHICAL_LOGBOOK);
      formData.append("logbookExpirationDoc", VEHICAL_LOGBOOK_DOC);
      formData.append("pcoVehiclelicenceExpiration", PCO_VEHICAL_LICENSE);
      formData.append(
        "pcoVehiclelicenceExpirationDoc",
        PCO_VEHICAL_LICENSE_DOC
      );
      formData.append("motExpiration", MOT);
      formData.append("motExpirationDocs", MOT_DOC);
      // formData.append("carlicenceNumber", CAR_LICENSE);
      // formData.append("carlicenceNumberDocs", CAR_LICENSE_DOC);
      formData.append("bookletNumber", BOOKLET);
      formData.append("bookletNumberDocs", BOOKLET_DOC);
      formData.append("others", OTHER);
      formData.append("accountType", ACC_TYPE);
      formData.append("bankAccountHolderName", AccHolderName);
      formData.append("bankAccountNumber", AccNumber);
      formData.append("bankName", BankName);
      formData.append("branchName", BranchName);
      formData.append("vehicleName", VEHICLE_NAME);
      formData.append("vehicleNumber", VEHICLE_NUMBER);
      formData.append("routingNumber", IFSC);
      formData.append("frontVehicle", FRONTAL_PATH);
      formData.append("backVehicle", VEHICAL_DETAILS_?.BACK_PATH);
      formData.append("leftVehicle", VEHICAL_DETAILS_?.LEFT_PATH);
      formData.append("rightVehicle", VEHICAL_DETAILS_?.RIGHT_PATH);
      formData.append("deviceToken", fcmToken);
      const res = await axios({
        method: "post",
        url: UPDATE_Driver,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res?.data?.responseCode === 200) {
        setLoader(false);
        console.log("Details response--->>>", res);
        dispatch(setIsProfile(res?.isProfileUpdated));
        setIsModalVisible(true);
        showMessage({
          message: res?.data?.responseMessage,
          type: "success",
          icon: "success",
        });
      }
      console.log("lkajsdkl", res);
    } catch (error) {
      console.log("docs error--->>>", error?.response);
      showMessage({
        message: error?.message,
        type: "danger",
        icon: "danger",
      });
      setLoader(false);
    }
  };

  const handleChoosePdf = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
      });
      setDoc(result);
    } catch (err) {
      console.log(err);
    }
  };

  const validateDocument = () => {
    if (Doc == "") {
      setDocError("Please upload bank detail document");
    } else {
      setDocError("");
    }
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
      <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} />
      <SafeAreaView style={styles.MainContainer}>
        {/* <Header
          Heading={"Complete Your Profile"}
          navigation={props?.navigation}
        /> */}
        <Header
          Heading={t("Complete Your Profile")}
          navigation={props?.navigation}
          hideleft={true}
          HeaderStyle={{
            width: WIDTH,
            justifyContent: "center",
          }}
        />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <Text allowFontScaling={false} style={styles.Heading}>
            {t("Account Details")}
          </Text>
          <Text allowFontScaling={false} style={[styles.InputHeading]}>
            {t("Account Type")}
          </Text>

          <AccountTypeDropDoun
            setGender={setGender}
            Gender={Gender}
            setGenderError={setGenderError}
            setACC_TYPE={setACC_TYPE}
          />
          {GenderError && Gender === null && (
            <Text
              allowFontScaling={false}
              style={[styles.PHONEErrorstyle, { marginTop: "1%" }]}
            >
              {GenderError}
            </Text>
          )}

          <Text allowFontScaling={false} style={[styles.InputHeading]}>
            {t("Account Holder Name")}
          </Text>
          <InputFiled
            InputFieldStyle={styles.InputStyle}
            placeholder={t("Account Holder Name")}
            placeholderTextColor={COLORS.PLACEHOLDERCOLOR2}
            MaxLength={60}
            keyboardType="default"
            value={AccHolderName}
            onBlur={() => {
              if (AccHolderName != "" || AccHolderName != undefined) {
                setShowError((prevState) => ({
                  ...prevState,
                  AccHolderNameError: true,
                }));
              }
            }}
            onChangeText={(text: string) => {
              if (AccHolderName != "" || AccHolderName != undefined) {
                setAccHolderName(text);
                setAccHolderNameError(ValidateFullname(text));
              }
            }}
            ShowError={ShowError.AccHolderNameError}
            Error={AccHolderNameError}
            Errorstyle={{ paddingLeft: 3 }}
          />

          <Text allowFontScaling={false} style={[styles.InputHeading]}>
            {t("Account Number")}
          </Text>
          <InputFiled
            InputFieldStyle={styles.InputStyle}
            placeholder={t("Enter Account Number")}
            keyboardType="number-pad"
            placeholderTextColor={COLORS.PLACEHOLDERCOLOR2}
            MaxLength={16}
            value={AccNumber}
            onBlur={() => {
              if (AccNumber != "" || AccNumber != undefined) {
                setShowError((prevState) => ({
                  ...prevState,
                  AccNumberError: true,
                }));
              }
            }}
            onChangeText={(text: string) => {
              if (AccNumber != "" || AccNumber != undefined) {
                setAccNumber(text);
                setAccNumberError(ValidateAccNumber(text));
              }
            }}
            ShowError={ShowError.AccNumberError}
            Error={AccNumberError}
            Errorstyle={{ paddingLeft: 3 }}
          />

          <Text allowFontScaling={false} style={[styles.InputHeading]}>
            {t("Confirm Account Number")}
          </Text>
          <InputFiled
            InputFieldStyle={styles.InputStyle}
            placeholder={"Enter Account Number"}
            keyboardType="number-pad"
            placeholderTextColor={COLORS.PLACEHOLDERCOLOR2}
            MaxLength={16}
            value={ConfirmAccNum}
            onBlur={() => {
              if (ConfirmAccNum != "" || ConfirmAccNum != undefined) {
                setShowError((prevState) => ({
                  ...prevState,
                  ConfirmAccNumError: true,
                }));
              }
            }}
            onChangeText={(text: string) => {
              if (ConfirmAccNum != "" || ConfirmAccNum != undefined) {
                setConfirmAccNum(text);
                setConfirmAccNumError(ValidateConfirmAccNumber(text, text));
              }
            }}
            ShowError={ShowError.ConfirmAccNumError}
            Error={ConfirmAccNumError}
            Errorstyle={{ paddingLeft: 3, marginTop: "1%" }}
          />

          <Text allowFontScaling={false} style={[styles.InputHeading]}>
            {t("Bank Name")}
          </Text>
          <InputFiled
            InputFieldStyle={styles.InputStyle}
            placeholder={"Enter Bank Name"}
            placeholderTextColor={COLORS.PLACEHOLDERCOLOR2}
            maxLength={60}
            value={BankName}
            onBlur={() => {
              if (BankName != "" || BankName != undefined) {
                setShowError((prevState) => ({
                  ...prevState,
                  BankNameError: true,
                }));
              }
            }}
            onChangeText={(text: string) => {
              if (BankName != "" || BankName != undefined) {
                setBankName(text);
                setBankNameError(validateBankName(text));
              }
            }}
            ShowError={ShowError.BankNameError}
            Error={BankNameError}
            Errorstyle={{ paddingLeft: 3 }}
          />

          <Text allowFontScaling={false} style={[styles.InputHeading]}>
            {t("Branch Name")}
          </Text>
          <InputFiled
            InputFieldStyle={styles.InputStyle}
            placeholder={"Enter Bank Name"}
            placeholderTextColor={COLORS.PLACEHOLDERCOLOR2}
            maxLength={60}
            value={BranchName}
            onBlur={() => {
              if (BranchName != "" || BranchName != undefined) {
                setShowError((prevState) => ({
                  ...prevState,
                  BranchName: true,
                }));
              }
            }}
            onChangeText={(text: string) => {
              if (BranchName != "" || BranchName != undefined) {
                setBranchName(text);
                setBranchNameError(validateBranchName(text));
              }
            }}
            ShowError={ShowError.BranchNameError}
            Error={BranchNameError}
            Errorstyle={{ paddingLeft: 3 }}
          />

          <Text allowFontScaling={false} style={[styles.InputHeading]}>
            {t("Routing Number")}
          </Text>
          <InputFiled
            InputFieldStyle={styles.InputStyle}
            placeholder={t("Enter routing number")}
            placeholderTextColor={COLORS.PLACEHOLDERCOLOR2}
            MaxLength={11}
            value={IFSC}
            onBlur={() => {
              if (IFSC != "" || IFSC != undefined) {
                setShowError((prevState) => ({
                  ...prevState,
                  IFSCError: true,
                }));
              }
            }}
            onChangeText={(text: any) => {
              if (IFSC != "" || IFSC != undefined) {
                setIFSC(text);
                setIFSCError(validateIFSC(text));
              }
            }}
            ShowError={ShowError.IFSCError}
            Error={IFSCError}
            Errorstyle={{ paddingLeft: 3 }}
          />

          {Doc == "" ? (
            <>
              <TouchableOpacity
                onPress={() => handleChoosePdf()}
                style={styles.UploadButton}
              >
                <UploadSvgImage />
                <Text allowFontScaling={false} style={styles.uploadTEXT}>
                  {t("Upload Bank Details Document")}
                </Text>
              </TouchableOpacity>
              <View style={{ width: WIDTH * 0.9, alignSelf: "center" }}>
                {DocError && (
                  <Text allowFontScaling={false} style={styles.Errorstyle}>
                    {DocError}
                  </Text>
                )}
              </View>
            </>
          ) : (
            <View
              style={{
                ...styles.UploadButton,
                justifyContent: "space-between",
              }}
            >
              <Text allowFontScaling={false} style={styles.uploadTEXT}>
                {Doc.name.length > 10
                  ? Doc.name.slice(0, 10) + "..."
                  : Doc.name}
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  ...styles.uploadTEXT,
                  color: COLORS.ERRORCOLORRED,
                }}
                onPress={() => setDoc("")}
              >
                {t("Remove")}
              </Text>
            </View>
          )}

          {/* <Text allowFontScaling={false}
            style={[
              styles.InputHeading,
              { paddingTop: "3%", paddingBottom: "2%" },
            ]}
          >
            Branch Name
          </Text>

          <InputFiled
            InputFieldStyle={styles.InputStyle}
            placeholder={"Enter branch name"}
            placeholderTextColor={COLORS.PLACEHOLDERCOLOR2}
            maxLength={30}
            value={Tax}
            onBlur={() => {
              if (Tax != "" || Tax != undefined) {
                setShowError((prevState) => ({
                  ...prevState,
                  TaxError: true,
                }));
              }
            }}
            onChangeText={(text: any) => {
              if (Tax != "" || Tax != undefined) {
                setTax(text);
                setTaxError(validateTAXNumber(text));
              }
            }}
            ShowError={ShowError.TaxError}
            Error={TaxError}
            Errorstyle={{ paddingLeft: 3 }}
          /> */}

          <WholeButton
            Label={t("SUBMIT")}
            styles={styles.SubmitButtonStyle}
            Action={() => OnSubmitAction()}
          />

          {/* <RegistationSuccessPopUp
            modalVisible={isModalVisible}
            Message={"Registration Confirmation"}
            Congratulation={`Thank you for choosing to join us. We're almost there—your paperwork has been received, and we will reach out to you as soon as your details have been verified.`}
            OK_Action={() => {
              dispatch(setClearState(false));
              dispatch(setClearPersonalInfo(false));
              dispatch(setClearVehicle(false));
              dispatch(UserVisited(""));
              setIsModalVisible(false);
              props.navigation.navigate("Login");
            }}
          /> */}
          <RegistationSuccessPopUp
            modalVisible={isModalVisible}
            Message={"Registration Confirmation"}
            Congratulation={t(
              `Thank you for choosing to join us. We're almost there—your paperwork has been received, and we will reach out to you as soon as your details have been verified.`
            )}
            OK_Action={async () => {
              dispatch(setClearState(false));
              dispatch(setClearPersonalInfo(false));
              dispatch(setClearVehicle(false));
              dispatch(UserVisited(""));
              setIsModalVisible(false);
              await AsyncStorage?.removeItem("TOKEN");
              props.navigation.navigate("Login");
            }}
          />
          <SpinningLoader loader={Loader} />
        </KeyboardAwareScrollView>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },
  Heading: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.BLACK3,
    width: WIDTH * 0.9,
    alignSelf: "center",
    paddingTop: "6%",
  },
  InputHeading: {
    fontSize: 13,
    fontFamily: FONTS.medium,
    color: COLORS.BLACK3,
    width: WIDTH * 0.89,
    alignSelf: "center",
    paddingTop: 20,
    paddingBottom: 10,
  },
  PHONEErrorstyle: {
    color: COLORS.ERRORCOLORRED,
    fontSize: 13,
    fontFamily: FONTS.regular,
    width: WIDTH * 0.9,
    alignSelf: "center",
  },
  InputStyle: {
    width: WIDTH * 0.9,
  },
  SubmitButtonStyle: {
    alignSelf: "center",
    marginTop: "5%",
    marginBottom: "5%",
  },
  uploadTEXT: {
    color: COLORS.BLUE2,
    fontSize: 14,
    fontFamily: FONTS.light,
  },
  UploadButton: {
    backgroundColor: COLORS.UPLOADBorderCOLOR,
    width: WIDTH * 0.9,
    alignSelf: "center",
    paddingVertical: "5%",
    paddingHorizontal: "5%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    flexDirection: "row",
    columnGap: 10,
    marginTop: "6%",
  },
  Errorstyle: {
    color: COLORS.ERRORCOLORRED,
    fontSize: 13,
    fontFamily: FONTS.regular,
    marginTop: Platform.OS === "ios" ? 4 : 2,
    fontWeight: "400",
    // paddingLeft: 25,
    paddingTop: 5,
  },
});
