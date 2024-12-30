import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS, VECTOR_ICONS } from "../assets/Theme";
import { WIDTH } from "../Helpers/Dimentions";
import LinearGradient from "react-native-linear-gradient";
import GoogleSvg from "../Components/SVGComponents/GoogleSvg";
import { ANDROID } from "../Helpers/Platform";
const WholeButton = (props: any) => {
  return (
    <TouchableOpacity
      style={[styles.mainView, styles.ButtonView, props.styles]}
      disabled={props.disabled}
      onPress={props.Action}
    >
      {props?.Facebook && (
        <VECTOR_ICONS.EvilIcons
          name={"sc-facebook"}
          size={30}
          color={"white"}
          style={{ marginBottom: "1%" }}
        />
      )}
      {props?.Google && (
        <View>
          <GoogleSvg />
        </View>
      )}

      {/* // disabled={props.disabled}
        onPress={props.Action} */}

      <Text
        allowFontScaling={false}
        style={[styles.buttonText, props.buttonText]}
      >
        {props.Label}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  ButtonView: {
    backgroundColor: COLORS.ORANGE,
    width: WIDTH * 0.9,
    paddingVertical: "4.5%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 17,
    fontFamily: FONTS.bold,
    lineHeight: 20,
    color: COLORS.WHITE,

    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  mainView: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
export default WholeButton;
