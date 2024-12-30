import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useTranslation } from "react-i18next";
import HeaderComponent from "../../Components/HeaderComponent";
import { WIDTH } from "../../Helpers/Dimentions";
import { COLORS, FONTS, VECTOR_ICONS } from "../../assets/Theme";

const Languages = (props: any) => {
  const { i18n, t } = useTranslation();
  const { navigation } = props; // Extract navigation from props

  const handleLanguageChange = async (languageCode: string) => {
    await i18n.changeLanguage(languageCode); // Change the language
    navigation.navigate("MyDrawer"); // Replace 'MainScreen' with your actual screen name
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
      <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} />
      <SafeAreaView style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
        <HeaderComponent Heading={"Change Languages"} navigation={navigation} />
        <View
          style={{
            backgroundColor: COLORS.WHITE,
            alignSelf: "center",
            width: WIDTH,
          }}
        >
          <TouchableOpacity
            style={style.mainView}
            onPress={() => handleLanguageChange("pt")} // Change to Portuguese
          >
            <Text allowFontScaling={false} style={style.textStyle}>
              Portuguese 🇵🇹
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
            onPress={() => handleLanguageChange("en")} // Change to English
          >
            <Text allowFontScaling={false} style={style.textStyle}>
              English 🇺🇸
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

const style = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  textStyle: {
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
    color: COLORS.BLACK,
  },
  Line: {
    height: 1,
    backgroundColor: COLORS.GRAY,
  },
});

export default Languages;
