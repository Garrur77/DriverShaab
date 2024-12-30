import {
  Text,
  TouchableOpacity,
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { CountryPicker } from "react-native-country-codes-picker";
import { COLORS, FONTS, VECTOR_ICONS } from "../assets/Theme";
import { WIDTH } from "../Helpers/Dimentions";
import { setPhFlag } from "../ReduxConfig/PersonalDetailsSlice";
import { useDispatch } from "react-redux";

const Coutry = ({
  setCountrycode,
  countryCode1,
  code,
  flag1,
  disabled,
  setFlags,
  onValidations,
}: any) => {
  const dispatch = useDispatch();
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [see, SetSee] = useState(0);

  useEffect(() => {
    if (see != 1) {
      const timer = setTimeout(() => {
        setRefreshCounter((prevCounter) => prevCounter + 1);
      }, 10);
      // console.log(flag1, 'flagflag')
      setFlag(flag1);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [refreshCounter]);

  const [showCountryCodePicker, setShowCountryCodePicker] = useState(false);
  const [flag, setFlag] = useState(flag1 || "IN");
  const [countryCodes, setCountryCode] = useState("+91");

  return (
    <View style={{ width: "43%", flexDirection: "row" }}>
      <CountryPicker
        show={showCountryCodePicker}
        lang={"en"}
        style={{
          // Styles for whole modal [View]
          modal: {
            height: Platform.OS == "android" ? 400 : 500,
            backgroundColor: "#fff",
          },
          // Styles for modal backdrop [View]
          backdrop: { backgroundColor: "rgba(0,0,0,0.5)" },
          // Styles for bottom input line [View]
          line: {},
          // Styles for list of countries [FlatList]
          itemsList: {},
          // Styles for input [TextInput]
          textInput: {
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.15)",
            fontFamily: "Poppins-Regular",
            color: "black",
          },
          // Styles for country button [TouchableOpacity]
          countryButtonStyles: {
            height: 50,
          },
          // Styles for search message [Text]
          searchMessageText: {
            color: "black",
          },
          // Styles for search message container [View]
          countryMessageContainer: {},
          // Flag styles [Text]
          flag: { fontSize: 13, color: "black" },
          // Dial code styles [Text]
          dialCode: {
            fontFamily: "Poppins-Regular",
            fontSize: 13,
            color: "black",
          },
          // Country name styles [Text]
          countryName: {
            fontFamily: "Poppins-Regular",
            fontSize: 13,
            color: "black",
          },
        }}
        onBackdropPress={() => {
          console.log("asd");
          setShowCountryCodePicker(false);
        }}
        pickerButtonOnPress={(item) => {
          console.log("tstststststs", item);
          setCountrycode(item.dial_code);
          setFlag(item.flag);
          setFlags(item.flag);
          // onValidations(item.dial_code);
          setCountryCode(item.dial_code);
          setShowCountryCodePicker(false);
        }}
      />

      <TouchableOpacity
        onPress={() => {
          setShowCountryCodePicker(true), SetSee(1);
        }}
        activeOpacity={1}
        disabled={disabled}
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          paddingVertical: "11%",
          borderRadius: 10,
          // width: WIDTH * 0.32,
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: WIDTH * 0.18,
            justifyContent: "space-evenly",
            // backgroundColor:'red'
          }}
        >
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: FONTS.medium,
              fontSize: 17,
              color: "black",
              paddingLeft: "3%",
            }}
          >
            {flag}{" "}
          </Text>

          {!disabled && (
            <VECTOR_ICONS.AntDesign name="caretdown" color={COLORS.BLACK} />
          )}
        </View>
        <View
          style={{
            backgroundColor: "rgba(239, 239, 244, 1)",
            width: 1.5,
            height: "120%",
          }}
        ></View>
        <Text
          allowFontScaling={false}
          style={{
            color: COLORS.BLACK,
            fontFamily: FONTS.medium,
            fontSize: 17,
            marginLeft: "10%",
          }}
        >
          {countryCode1 ?? countryCodes}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Coutry;
