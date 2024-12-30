import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, FONTS, VECTOR_ICONS } from "../assets/Theme";
import { WIDTH } from "../Helpers/Dimentions";
import EmailSvg from "./SVGComponents/EmailSvg";
import { ANDROID } from "../Helpers/Platform";
const InputFiled = (props: any) => {
  const { LabelStyle, ContainerStyle } = styles;

  return (
    <View style={[ContainerStyle, props.ContainerStyle]}>
      {/* <View >
                <Text style={[LabelStyle, props.CustomLabelStyle]}>
                    {props.label}
                    {props.RequiredField && (
                        <Text style={[{ color: COLORS.ERRORCOLORRED }, props.requirecolor]}>*</Text>
                    )}
                </Text>
            </View> */}

      <View
        style={
          props.Replace
            ? styles.Replace
            : props.SearchField
            ? styles.SearchField
            : [styles.InputFieldStyle, props.InputFieldStyle]
        }
      >
        {props.SearchField ||
          (props.Replace && (
            <TouchableOpacity>
              <VECTOR_ICONS.Feather
                name={"search"}
                color={COLORS.GRAYCOLORMEDIUM}
                size={28}
              />
            </TouchableOpacity>
          ))}

        {/* 
                {
                    props.PhoneField &&
  
  
                    <View style={{ width: '20%', backgroundColor: 'white', flexDirection: 'row', height: 50, alignItems: 'center', borderRadius: 10, }} >
  
  
                        <Country setCountrycode={setCountrycode} style={{ backgroundColor: "red" }} />
  
  
                    </View>
                } */}
        {/* {
                    props.PhoneField &&
  
                    <View
                        style={{
                            height: 30,
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0.15)',
                            marginTop: '1%',
                            marginRight: '2%',
                            backgroundColor: 'red'
  
                        }}
                    />
  
                } */}
        {props?.EmailFiled && (
          <View style={{ paddingLeft: "3%", paddingRight: "5.5%" }}>
            <EmailSvg />
          </View>
        )}
        {props?.Line && (
          <View
            style={{
              backgroundColor: "rgba(239, 239, 244, 1)",
              width: "0.4%",
              height: "100%",
            }}
          ></View>
        )}
        <TextInput
          allowFontScaling={false}
          editable={props.edit}
          placeholder={props.placeholder}
          placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
          autoCapitalize="none"
          style={[
            styles.PlaceholderStyle,
            styles.InputFieldStyle,
            {
              width: props.EmailFiled || props.CorrectEmailTrue ? "82%" : "99%",
              backgroundColor: props.backgroundColor,
              paddingVertical: Platform.OS == "ios" ? "4%" : "4.2%",
              paddingLeft: "3.2%",
              color: COLORS.BLACK,
            },
            {
              borderWidth: 1,
              borderColor: "transparent",
            },
          ]}
          {...props}
          selectionColor={COLORS.INPUTLABELDARKGRAY}
          secureTextEntry={props.ShowPassword ? true : false}
          maxLength={props?.MaxLength}
        />

        {/* {props.CorrectEmailTrue && (
            <View style={{marginRight:-8}}>
            <ForgotCheckIcon/>
            </View>
          )} */}
        {props.PasswordField ? (
          <TouchableOpacity
            style={[props.passwordIconStyle]}
            onPress={props.PasswordPress}
          >
            <VECTOR_ICONS.Ionicons
              name={props.ShowPassword ? "eye-off-outline" : "eye"}
              color={COLORS.WHITE}
              size={24}
            />
          </TouchableOpacity>
        ) : props.SearchField ? (
          <TouchableOpacity
            style={[props.passwordIconStyle]}
            onPress={props.PasswordPress}
          >
            <VECTOR_ICONS.Entypo
              name={"cross"}
              color={COLORS.GRAYCOLORMEDIUM}
              size={20}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {props.Error && props.ShowError && (
        <Text
          allowFontScaling={false}
          style={[styles.Errorstyle, props.Errorstyle]}
        >
          {props.Error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  SearchField: {
    backgroundColor: COLORS.FIELDBACKGROUND,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: "4%",
    paddingVertical: "2%",
    justifyContent: "space-between",
  },
  ContainerStyle: {
    alignSelf: "center",

    // marginVertical: '1.5%',
    // marginVertical: "0.3%",

    // backgroundColor: 'red'
  },
  LabelStyle: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.INPUTLABELDARKGRAY,
    fontWeight: "400",
  },
  PlaceholderStyle: {
    color: COLORS.WHITE,
    fontSize: ANDROID ? 17 : 14,
    width: "90%",
    fontFamily: FONTS.semibold,
  },
  InputFieldStyle: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: 'space-between',
    // backgroundColor:'red',
    borderRadius: 8,
    paddingHorizontal: 8,
    fontSize: 15,
    fontFamily: FONTS.semibold,
    color: COLORS.WHITE1,
    borderWidth: 1,
    borderColor: "#EFEFF4",
    // width: WIDTH * 0.8,
    alignSelf: "center",
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
  Replacemovember: {
    backgroundColor: COLORS.FIELDBACKGROUND,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: "4%",
    paddingVertical: "2%",
    marginVertical: "-3%",
  },
  Replace: {},
});
export default InputFiled;
