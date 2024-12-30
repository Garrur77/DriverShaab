import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { COLORS, VECTOR_ICONS, FONTS, IMAGEPATH } from "../../assets/Theme";
import { IOS } from "../../Helpers/Platform";
import { WIDTH } from "../../Helpers/Dimentions";

const GenderDropDown: React.FC = (props: any) => {
  const data = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];
  const renderItem = (item: { label: string; value: string }) => {
    return (
      <View style={styles.itemSTYLE}>
        <Text allowFontScaling={false} style={styles.textItem}>
          {item.label}
        </Text>
      </View>
    );
  };

  // const validateGender=()=>{
  //   if(Gender==''){
  //     setError('Please select your gender.')
  //     return false

  //   }else{
  //     setError('')
  //     return true
  //   }
  // }
  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      iconStyle={styles.iconStyle}
      iconColor={COLORS.BLACK}
      containerStyle={styles.containerStyle}
      data={data}
      activeColor={"rgba(255, 85, 0, 0.2)"}
      maxHeight={350}
      labelField="label"
      valueField="value"
      placeholder="Select Gender"
      value={props.Gender}
      onChange={(item) => {
        props.setGender(item.value);
        props.setGenderError("");
        props.setGenderLABEL(item.value);
      }}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    paddingVertical: IOS ? "3%" : "2.5%",
    borderRadius: 8,
    backgroundColor: COLORS.WHITE,
    width: WIDTH * 0.9,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "rgba(239, 239, 244, 1)",
    // marginTop: "2%",
  },
  itemSTYLE: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 85, 0, 0.2)",
    width: WIDTH * 0.8,
    alignSelf: "center",
    paddingVertical: "2%",
  },
  textItem: {
    flex: 1,
    fontSize: 15,
    fontFamily: FONTS.semibold,
    color: COLORS.BLACK2,
    paddingVertical: "2%",
  },
  placeholderStyle: {
    fontSize: 15,
    fontFamily: FONTS.semibold,
    color: COLORS.PLACEHOLDERCOLOR2,
    paddingLeft: "5.5%",
  },
  selectedTextStyle: {
    fontSize: 15,
    fontFamily: FONTS.medium,
    color: COLORS.BLACK,
    paddingLeft: "6%",
  },
  iconStyle: {
    width: 22,
    height: 22,
    marginRight: 13,
  },
  containerStyle: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
  },
  Errorstyle: {
    color: COLORS.ERRORCOLORRED,
    fontSize: 13,
    fontFamily: FONTS.regular,
  },
});

export default GenderDropDown;
