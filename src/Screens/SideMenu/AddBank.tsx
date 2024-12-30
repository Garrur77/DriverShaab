import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import DocumentPicker from "react-native-document-picker";
import { FONTS } from "../../assets/Fonts";
import { COLORS, VECTOR_ICONS } from "../../assets/Theme";
import { WIDTH } from "../../Helpers/Dimentions";
import Header from "../../Components/HeaderComponent";
import AccountTypeDropDoun from "../../Components/ProfileSvg/AccountTypeDropDoun";
import InputFiled from "../../Components/InputFiled";
import { Formik } from "formik";
import * as Yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import WholeButton from "../../Components/WholeButton";
import RegistationSuccessPopUp from "../../Components/RegistationSuccessPopUp";
import CommonModal from "../../Components/CommonModal";
import BankModal from "../../Components/HomeSvg/BankModal";
import { callPostApi } from "../../Components/ApiConfig/ApiCall";
import { ADD_BANK_ACCOUNT } from "../../Components/ApiConfig/EndPoints";
import { useSelector } from "react-redux";
import { RootState } from "../../ReduxConfig/Store";
import SpinningLoader from "../../assets/SpinningLoader";
import axios from "axios";
import UploadSvgImage from "../../Components/ProfileSvg/UploadSvgImage";
import { showMessage } from "react-native-flash-message";

const validationSchema = Yup.object().shape({
  accountName: Yup.string().required("Account holder name is required."),
  bankAccountNumber: Yup.string().required("Account number is required."),
  // .matches(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/, 'Invalid account number format'),
  confirmAccountNumber: Yup.string()
    .required("Confirm account number is required.")
    .oneOf([Yup.ref("bankAccountNumber"), null], "Account numbers must match"),
  bankName: Yup.string().required("Bank name is required."),
  branchName: Yup.string().required("Branch name is required."),
  routingNumber: Yup.string()
    .required("Routing number is required.")
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid routing number format"),
  document: Yup.mixed()
    .required("Document is required")
    .test("fileFormat", "Only PDF files are accepted", (value) => {
      if (!value) {
        console.log("dslkjaf", value);
        return false;
      }
      return value.type === "application/pdf";
    }),
});

const AddBank = (props: any) => {
  // get saved token
  const { Token } = useSelector((state: RootState) => state.value);
  const [modalVisible, setmodalVisibl1] = useState(false);
  const [Loader, setLoader] = useState(false);

  const closeAndNavigate = () => {
    setmodalVisibl1(true);
    setTimeout(() => {
      setmodalVisibl1(false);
      props.navigation.navigate("HomeOnline");
    }, 3000);
  };

  const addNewBank = async (values) => {
    const formData = new FormData();
    formData.append("file", {
      uri: values.document.uri,
      type: values.document.type,
      name: values.document.name,
    });
    formData.append("bankAccountHolderName", values.accountName);
    formData.append("bankAccountNumber", values.confirmAccountNumber);
    formData.append("bankName", values.bankName);
    formData.append("branchName", values.branchName);
    formData.append("routingNumber", values.routingNumber);

    try {
      setLoader(true);
      console.log("formData", formData);
      const response = await axios({
        url: ADD_BANK_ACCOUNT,
        method: "POST",
        headers: {
          token: Token,
        },
        data: formData,
      });
      console.log("rrrrrrrrr", response);

      if (response?.status === 200) {
        setLoader(false);
        // console.log("addfffffffff", response);
        showMessage({
          message: "Bank added successfully.",
          type: "success",
          icon: "success",
        });
        closeAndNavigate();
      }
    } catch (error: any) {
      setLoader(false);
      console.log("Error add bank:", error, error.response);
      showMessage({
        message: "Problem occurred while adding bank.",
        type: "danger",
        icon: "danger",
      });
    }
  };

  const handleChoosePdf = async (setFieldValue) => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
      });
      setFieldValue("document", result);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
      <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} />
      <SafeAreaView style={styles.MainContainer}>
        <Header Heading={"Add Bank"} navigation={props.navigation} />
        <Formik
          initialValues={{
            accountName: "",
            bankAccountNumber: "",
            confirmAccountNumber: "",
            bankName: "",
            branchName: "",
            routingNumber: "",
            document: {},
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            addNewBank(values);
            resetForm();
          }}
        >
          {({
            values,
            touched,
            errors,
            setFieldTouched,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <Text
                allowFontScaling={false}
                style={[styles.InputHeading, { marginTop: "6%" }]}
              >
                Account Holder Name
              </Text>
              <InputFiled
                InputFieldStyle={styles.InputStyle}
                placeholder={"Enter account holder name"}
                placeholderTextColor={COLORS.PLACEHOLDERCOLOR2}
                maxLength={256}
                value={values.accountName}
                onChangeText={handleChange("accountName")}
                onBlur={() => setFieldTouched("accountName")}
                ShowError={errors.accountName}
                Error={
                  errors.accountName &&
                  touched.accountName &&
                  errors.accountName
                }
                Errorstyle={{ paddingLeft: 3 }}
              />

              <Text
                allowFontScaling={false}
                style={[styles.InputHeading, { paddingTop: "3%" }]}
              >
                Account Number
              </Text>
              <InputFiled
                InputFieldStyle={styles.InputStyle}
                placeholder={"Enter account number"}
                keyboardType="number-pad"
                placeholderTextColor={COLORS.PLACEHOLDERCOLOR2}
                maxLength={256}
                value={values.bankAccountNumber}
                onChangeText={handleChange("bankAccountNumber")}
                onBlur={() => setFieldTouched("bankAccountNumber")}
                ShowError={errors.bankAccountNumber}
                Error={
                  errors.bankAccountNumber &&
                  touched.bankAccountNumber &&
                  errors.bankAccountNumber
                }
                Errorstyle={{ paddingLeft: 3 }}
              />

              <Text
                allowFontScaling={false}
                style={[styles.InputHeading, { paddingTop: "3%" }]}
              >
                Confirm Account Number
              </Text>
              <InputFiled
                InputFieldStyle={styles.InputStyle}
                placeholder={"Re-enter account number"}
                keyboardType="number-pad"
                placeholderTextColor={COLORS.PLACEHOLDERCOLOR2}
                maxLength={256}
                value={values.confirmAccountNumber}
                onChangeText={handleChange("confirmAccountNumber")}
                onBlur={() => setFieldTouched("confirmAccountNumber")}
                ShowError={errors.confirmAccountNumber}
                Error={
                  errors.confirmAccountNumber &&
                  touched.confirmAccountNumber &&
                  errors.confirmAccountNumber
                }
                Errorstyle={{ paddingLeft: 3 }}
              />

              <Text
                allowFontScaling={false}
                style={[styles.InputHeading, { paddingTop: "3%" }]}
              >
                Bank Name
              </Text>
              <InputFiled
                InputFieldStyle={styles.InputStyle}
                placeholder={"Enter bank name"}
                placeholderTextColor={COLORS.PLACEHOLDERCOLOR2}
                maxLength={256}
                value={values.bankName}
                onChangeText={handleChange("bankName")}
                onBlur={() => setFieldTouched("bankName")}
                ShowError={errors.bankName}
                Error={errors.bankName && touched.bankName && errors.bankName}
                Errorstyle={{ paddingLeft: 3 }}
              />

              <Text
                allowFontScaling={false}
                style={[styles.InputHeading, { paddingTop: "3%" }]}
              >
                Branch Name
              </Text>
              <InputFiled
                InputFieldStyle={styles.InputStyle}
                placeholder={"Enter branch name"}
                placeholderTextColor={COLORS.PLACEHOLDERCOLOR2}
                maxLength={256}
                value={values.branchName}
                onChangeText={handleChange("branchName")}
                onBlur={() => setFieldTouched("branchName")}
                ShowError={errors.branchName}
                Error={
                  errors.branchName && touched.branchName && errors.branchName
                }
                Errorstyle={{ paddingLeft: 3 }}
              />

              <Text
                allowFontScaling={false}
                style={[styles.InputHeading, { paddingTop: "3%" }]}
              >
                Routing Number
              </Text>
              <InputFiled
                InputFieldStyle={styles.InputStyle}
                placeholder={"Enter routing number"}
                keyboardType="number-pad"
                placeholderTextColor={COLORS.PLACEHOLDERCOLOR2}
                maxLength={256}
                value={values.routingNumber}
                onChangeText={handleChange("routingNumber")}
                onBlur={() => setFieldTouched("routingNumber")}
                ShowError={errors.routingNumber}
                Error={
                  errors.routingNumber &&
                  touched.routingNumber &&
                  errors.routingNumber
                }
                Errorstyle={{ paddingLeft: 3 }}
              />

              {values.document && Object.keys(values.document).length === 0 ? (
                <TouchableOpacity
                  onPress={() => handleChoosePdf(setFieldValue)}
                  style={styles.UploadButton}
                >
                  <UploadSvgImage />
                  <Text allowFontScaling={false} style={styles.uploadTEXT}>
                    Upload Bank Details Document
                  </Text>
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    ...styles.UploadButton,
                    justifyContent: "space-between",
                  }}
                >
                  <Text allowFontScaling={false} style={styles.uploadTEXT}>
                    {values.document.name}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={{
                      ...styles.uploadTEXT,
                      color: COLORS.ERRORCOLORRED,
                    }}
                    onPress={() => setFieldValue("document", {})}
                  >
                    Remove
                  </Text>
                </View>
              )}
              {errors.document && touched.document && (
                <View style={{ marginLeft: "5%" }}>
                  <Text allowFontScaling={false} style={styles.Errorstyle}>
                    {errors.document}
                  </Text>
                </View>
              )}
              <WholeButton
                Label={"Submit"}
                styles={styles.SubmitButtonStyle}
                Action={handleSubmit}
              />
            </KeyboardAwareScrollView>
          )}
        </Formik>
        <BankModal modalVisible={modalVisible} />
      </SafeAreaView>
      <SpinningLoader loader={Loader} />
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default AddBank;

const styles = StyleSheet.create({
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
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.BLACK3,
    width: WIDTH * 0.89,
    alignSelf: "center",
  },
  PHONEErrorstyle: {
    color: COLORS.ERRORCOLORRED,
    fontSize: 13,
    fontFamily: FONTS.regular,
    width: WIDTH * 0.9,
    alignSelf: "center",
    fontWeight: "400",
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
  InputStyle: {
    width: WIDTH * 0.9,
    marginTop: 6,
    backgroundColor: "#F7F8F9",
  },
  SubmitButtonStyle: {
    alignSelf: "center",
    marginTop: "5%",
    marginBottom: "5%",
  },
});
