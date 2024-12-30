import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import React from "react";
import HeaderComponent from "../../Components/HeaderComponent";
import { WIDTH } from "../../Helpers/Dimentions";
import { useTranslation } from "react-i18next";
import { COLORS, FONTS, VECTOR_ICONS } from "../../assets/Theme";

const Setting = (props: any) => {
  const { t } = useTranslation();

  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
      <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} />
      <SafeAreaView style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
        <HeaderComponent
          Heading={t("Settings")}
          navigation={props.navigation}
        />
        <View
          style={{
            backgroundColor: COLORS.WHITE,
            alignSelf: "center",
            width: WIDTH,
          }}
        >
          <TouchableOpacity
            style={style.mainView}
            onPress={() => {
              props?.navigation?.navigate("Notification", {
                ScreenHeder_: t("About Us"),
              });
            }}
          >
            <Text allowFontScaling={false} style={style.textStyle}>
              {t("About Us")}
            </Text>
            <VECTOR_ICONS.AntDesign
              name="right"
              size={20}
              color={COLORS.BLACK}
            />
          </TouchableOpacity>
          <View style={style.Line}></View>
          <TouchableOpacity
            style={style.mainView}
            onPress={() => {
              props?.navigation.navigate("AboutUs", {
                ScreenHeder_: t("Terms & Conditions"),
              });
            }}
          >
            <Text allowFontScaling={false} style={style.textStyle}>
              {t("Terms & Conditions")}
            </Text>
            <VECTOR_ICONS.AntDesign
              name="right"
              size={20}
              color={COLORS.BLACK}
            />
          </TouchableOpacity>
          <View style={style.Line}></View>

          <TouchableOpacity
            style={style.mainView}
            onPress={() => {
              props?.navigation.navigate("AboutUs", {
                ScreenHeder_: t("Legal"),
              });
            }}
          >
            <Text allowFontScaling={false} style={style.textStyle}>
              {t("Legal")}
            </Text>
            <VECTOR_ICONS.AntDesign
              name="right"
              size={20}
              color={COLORS.BLACK}
            />
          </TouchableOpacity>
          <View style={style.Line}></View>
        </View>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default Setting;

const style = StyleSheet.create({
  mainView: {
    backgroundColor: COLORS.WHITE,
    width: WIDTH * 0.9,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: "4.5%",
  },
  textStyle: {
    fontSize: 18,
    fontFamily: FONTS.medium,
    color: COLORS.BuleText,
  },
  Line: {
    backgroundColor: "#ECECEC",
    paddingVertical: "0.7%",
  },
});
