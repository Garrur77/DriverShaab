import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { COLORS, VECTOR_ICONS, FONTS } from "../../assets/Theme";
import { IOS } from "../../Helpers/Platform";
import { WIDTH } from "../../Helpers/Dimentions";

const VehicleType: React.FC<{
  vehicleTypes: { vehicleType: string }[];
  selectedValue: string;
  Gender: string;
  onValueChange: (value: string) => void;
  setGender: Function;
  setGenderError: string;
}> = ({
  vehicleTypes,
  selectedValue,
  onValueChange,
  Gender,
  setGender,
  setGenderError,
}) => {
  // console.log(props.Vehicles);

  // const allData = props?.Vehicles.map((item, index) => {
  //   return item.vehicleType;
  // });

  const filteredData = Array.isArray(vehicleTypes) ? vehicleTypes : [];
  const renderItem = (item: { label: string; value: string }) => {
    return (
      <View style={styles.itemSTYLE}>
        <Text
          allowFontScaling={false}
          style={{ ...styles.textItem, textTransform: "capitalize" }}
        >
          {item?.vehicleType}
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
      // data={props.Vehicles}
      data={filteredData}
      activeColor={"rgba(255, 85, 0, 0.2)"}
      maxHeight={350}
      labelField="vehicleType"
      valueField="vehicleType"
      placeholder="Select Vehicle Type"
      value={Gender}
      // value={props.Gender}
      // onChange={(item) => {
      //
      //   props.setGenderError("");
      //   props.onValueChange(item?.label);
      // }}
      onChange={(item) => {
        setGender(item.vehicleType);
        setGenderError("");
        // onValueChange(item.label);
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
    marginTop: "4%",
  },
  itemSTYLE: {
    // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(255, 85, 0, 0.2)',
    paddingVertical: "3%",
    paddingHorizontal: 20,
    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor:'red',
    // width:WIDTH*0.4
  },
  textItem: {
    fontSize: 14,
    fontFamily: FONTS.semibold,
    color: COLORS.BLACK3,
    paddingVertical: "2%",
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: FONTS.semibold,
    color: COLORS.BLACK3,
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
    width: WIDTH * 0.36,
    alignSelf: "flex-start",
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  Errorstyle: {
    color: COLORS.ERRORCOLORRED,
    fontSize: 13,
    fontFamily: FONTS.regular,
  },
});

export default VehicleType;
