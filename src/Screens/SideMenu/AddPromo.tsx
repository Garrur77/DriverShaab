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
import { useTranslation } from "react-i18next";
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

const validationSchema = Yup.object().shape({
  promocode: Yup.string().required("Promocode is required.").length(12),
});

const AddPromo = (props: any) => {
  const { t } = useTranslation();

  // get saved token
  const { Token } = useSelector((state: RootState) => state.value);
  const [Loader, setLoader] = useState(false);

  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
      <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} />
      <SafeAreaView style={styles.MainContainer}>
        <Header Heading={t("Add Promo Code")} navigation={props.navigation} />
        <Formik
          initialValues={{
            promocode: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
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
          }) => (
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <Text
                allowFontScaling={false}
                style={[styles.InputHeading, { marginTop: "6%" }]}
              >
                {t("Promo Code")}
              </Text>
              <InputFiled
                InputFieldStyle={styles.InputStyle}
                placeholder={t("Enter promo code")}
                placeholderTextColor={COLORS.PLACEHOLDERCOLOR2}
                maxLength={12}
                value={values.promocode}
                onChangeText={handleChange("promocode")}
                onBlur={() => setFieldTouched("promocode")}
                ShowError={errors.promocode}
                Error={
                  errors.promocode && touched.promocode && errors.promocode
                }
                Errorstyle={{ paddingLeft: 3 }}
              />

              <Text
                allowFontScaling={false}
                style={[
                  styles.InputHeading,
                  { paddingTop: "2%", fontSize: 12 },
                ]}
              >
                {t("Enter the code in order to claim and use your voucher.")}
              </Text>

              <WholeButton
                Label={t("Apply")}
                styles={styles.SubmitButtonStyle}
                Action={handleSubmit}
              />
            </KeyboardAwareScrollView>
          )}
        </Formik>
      </SafeAreaView>
      <SpinningLoader loader={Loader} />
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default AddPromo;

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
