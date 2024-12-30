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
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import DocumentPicker from "react-native-document-picker";
import { FONTS } from "../../assets/Fonts";
import { COLORS, VECTOR_ICONS } from "../../assets/Theme";
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
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
import {
  ADD_BANK_ACCOUNT,
  UploadProfile,
  payCommissionToAdmin,
} from "../../Components/ApiConfig/EndPoints";
import { useSelector } from "react-redux";
import { RootState } from "../../ReduxConfig/Store";
import SpinningLoader from "../../assets/SpinningLoader";
import axios from "axios";
import UploadSvgImage from "../../Components/ProfileSvg/UploadSvgImage";
import { showMessage } from "react-native-flash-message";
import ImagePicker from "react-native-image-crop-picker";
import instance from "../../Components/ApiConfig/ApiIntercept";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  bankAccountNumber: Yup.string().required("Amount is required."),
});

const SendRecipt = (props: any) => {
  const { t } = useTranslation();
  // get saved token
  const { Token } = useSelector((state: RootState) => state.value);
  const [modalVisible, setmodalVisibl1] = useState(false);
  const [Loader, setLoader] = useState(false);
  type ImageData = {
    path: string;
  };
  const [PickedImage, setPickedImage] = useState("");
  const [imageError, setImageError] = useState("");
  const handleSubmit = (values) => {
    if (!PickedImage) {
      setImageError("Please Upload Bank Details Documents Only");
      return;
    }
    SendReciption(values);
  };

  let retries = 0;
  const maxRetries = 1;

  const onSelectImage = () => {
    if (Platform.OS === "ios" || Platform.OS === "android") {
      Alert.alert("Upload Image", "Choose an option", [
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

  const UploadImageb = async (Image: { path: any; mime?: any }) => {
    let retries = 0;
    const maxRetries = 1;
    setLoader(true);
    setImageError("");
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
      console.log("responseData:-----", response);
      if (responseData.responseCode === 200) {
        setPickedImage(responseData?.result);
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
          message: "Something went wrong pleas try again.",
          duration: 1000,
          type: "danger",
        });
        setLoader(false);
        // Handle max retries reached
      }
      setLoader(false);
      console.log("Errorerrorerror:", error?.response);
    }
  };

  const SendReciption = async (values) => {
    console.log("valueeeee", values);
    try {
      setLoader(true);
      const response = await axios({
        url: payCommissionToAdmin,
        method: "POST",
        headers: {
          token: Token,
        },
        data: {
          amount: values?.bankAccountNumber,
          image: PickedImage,
        },
      });
      console.log("rrrrrrrrr********------54", response);

      if (response?.status === 200) {
        setLoader(false);
        // console.log("addfffffffff", response);
        showMessage({
          message: "Request raised To admin.",
          type: "success",
          icon: "success",
        });
        props?.navigation?.navigate("DashboardHistory");
      }
    } catch (error: any) {
      setLoader(false);
      console.log("Error add bank:", error, error.response);
      showMessage({
        message: "Problem occurred while send reciept bank.",
        type: "danger",
        icon: "danger",
      });
    }
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
      <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} />
      <SafeAreaView style={styles.MainContainer}>
        <Header Heading={t("Send Receipt")} navigation={props.navigation} />
        <Formik
          initialValues={{
            bankAccountNumber: "",
          }}
          validationSchema={validationSchema}
          // onSubmit={(values, { resetForm }) => {
          //   SendReciption(values);
          //   resetForm();
          // }}

          onSubmit={(values, { resetForm }) => handleSubmit(values)}
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
                style={[styles.InputHeading, { paddingTop: "3%" }]}
              >
                {t("Amount")}
              </Text>
              <InputFiled
                InputFieldStyle={styles.InputStyle}
                placeholder={t("Enter Amount")}
                keyboardType="number-pad"
                placeholderTextColor={COLORS.PLACEHOLDERCOLOR2}
                maxLength={50}
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

              {PickedImage === "" ? (
                <TouchableOpacity
                  onPress={() => onSelectImage()}
                  style={styles.UploadButton}
                >
                  <UploadSvgImage />
                  <Text allowFontScaling={false} style={styles.uploadTEXT}>
                    {t("Upload Bank Details Document")}
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
                    {PickedImage?.length > 37
                      ? PickedImage?.slice(0, 37) + "..."
                      : PickedImage}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={{
                      ...styles.uploadTEXT,
                      color: COLORS.ERRORCOLORRED,
                    }}
                    onPress={() => setPickedImage("")}
                  >
                    {t("Remove")}
                  </Text>
                </View>
              )}
              {imageError ? (
                <View style={{ marginLeft: "6%", paddingVertical: "1%" }}>
                  <Text
                    allowFontScaling={false}
                    style={{ color: COLORS.ERRORCOLORRED }}
                  >
                    {imageError}
                  </Text>
                </View>
              ) : null}

              {/* {errors.document && touched.document && (
                <View style={{ marginLeft: "5%" }}>
                  <Text allowFontScaling={false} style={styles.Errorstyle}>
                    {errors.document}
                  </Text>
                </View>
              )} */}
              <WholeButton
                Label={t("Submit")}
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
export default SendRecipt;

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
