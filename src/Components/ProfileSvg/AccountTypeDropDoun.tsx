import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { COLORS, VECTOR_ICONS, FONTS } from "../../assets/Theme";
import { IOS } from "../../Helpers/Platform";
import { WIDTH } from "../../Helpers/Dimentions";

const AccountTypeDropDoun: React.FC = (props: any) => {
  const data = [
    { label: "Saving Account", value: "1" },
    { label: "Current Account", value: "2" },
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
      placeholder="Select account type"
      value={props.Gender}
      onChange={(item) => {
        props.setGender(item?.value);
        props.setGenderError("");
        props.setACC_TYPE(item?.label);
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
    marginTop: "2%",
  },
  itemSTYLE: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 85, 0, 0.2)",
    paddingVertical: "3%",
    alignItems: "center",
    // backgroundColor:'red',
    justifyContent: "center",
  },
  textItem: {
    fontSize: 14,
    fontFamily: FONTS.light,
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
    width: 20,
    height: 20,
    marginRight: 13,
  },
  containerStyle: {
    backgroundColor: COLORS.WHITE,
    width: WIDTH * 0.34,
    // alignSelf: "flex-end",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
  },
  Errorstyle: {
    color: COLORS.ERRORCOLORRED,
    fontSize: 13,
    fontFamily: FONTS.regular,
  },
});

export default AccountTypeDropDoun;
