import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  TextInput,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
//   import {
//     moderateScale,
//     moderateScaleVertical,
//     textScale,
//     width,
//   } from "../../screens/LinkedDomain/responsiveui";
//   import { TextInput } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import { WIDTH } from "../Helpers/Dimentions";
import { FONTS } from "../assets/Fonts";
import WholeButton from "./WholeButton";
import { COLORS, VECTOR_ICONS } from "../assets/Theme";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import { useTranslation } from "react-i18next";

const HistoryFilterComponent = ({
  setFilterData,
  filterData,
  historyFilterHandler,
}) => {
  const { t } = useTranslation();
  const [status, setstatus] = useState("All");
  const [transactionType, settransactionType] = useState("All");
  const data = [
    { label: "All", value: "All" },
    { label: "Completed", value: "Completed" },
    { label: "Cancel", value: "Cancel" },
  ];
  const data1 = [
    { label: "All", value: "All" },
    { label: "Cash", value: "Cash" },
    { label: "Online", value: "Online" },
  ];
  const ResetValue = () => {
    setstatus("All"), settransactionType("All");
    setFilterData((prevState) => ({
      ...prevState,
      fromDate: null,
      toDate: null,
      status: "All",
      transactionType: "All",
    }));
  };

  const [openDAte1, setopenDAte1] = useState(false);
  const [openDAte, setopenDAte] = useState(false);
  return (
    <>
      <SafeAreaView>
        <View>
          <View style={{ width: WIDTH * 0.9, alignSelf: "center" }}>
            <Text allowFontScaling={false} style={Style.headText}>
              {" "}
              {t("Filter")}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: WIDTH * 0.5,
              }}
            >
              <Text
                allowFontScaling={false}
                style={[Style.optionsLabelText, { marginBottom: "2.5%" }]}
              >
                {t("From")}
              </Text>
              <Text
                allowFontScaling={false}
                style={[Style.optionsLabelText, { marginBottom: "2.5%" }]}
              >
                {t("To")}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  backgroundColor: "white",
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#EFEFF4",
                  width: WIDTH * 0.43,
                  padding: "3%",
                }}
              >
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 14,
                    fontFamily: FONTS.medium,
                    color: "#C8C7CC",
                  }}
                >
                  {filterData?.fromDate
                    ? moment(filterData?.fromDate).format("DD-MM-YYYY")
                    : "DD/MM/YYYY"}
                </Text>
                <TouchableOpacity
                  onPress={() => setopenDAte(true)}
                  style={{ alignSelf: "center" }}
                >
                  <VECTOR_ICONS.Ionicons
                    name={"calendar-clear-sharp"}
                    size={20}
                    color={COLORS.GRAY3}
                  />
                </TouchableOpacity>
              </View>
              <DatePicker
                modal
                open={openDAte}
                date={new Date()}
                mode="date"
                onConfirm={(date) => {
                  setFilterData({
                    ...filterData,
                    ["fromDate"]: date,
                  });
                  setopenDAte(!openDAte);
                  // setDateSelected(true)
                }}
                onCancel={() => {
                  setopenDAte(false);
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  backgroundColor: "white",
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#EFEFF4",
                  width: WIDTH * 0.43,
                  padding: "3%",
                }}
              >
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 14,
                    fontFamily: FONTS.medium,
                    color: "#C8C7CC",
                  }}
                >
                  {filterData?.toDate
                    ? moment(filterData?.toDate).format("DD-MM-YYYY")
                    : "DD/MM/YYYY"}
                </Text>
                <TouchableOpacity
                  onPress={() => setopenDAte1(true)}
                  style={{ alignSelf: "center" }}
                >
                  <VECTOR_ICONS.Ionicons
                    name={"calendar-clear-sharp"}
                    size={20}
                    color={COLORS.GRAY3}
                  />
                </TouchableOpacity>
              </View>
              <DatePicker
                modal
                open={openDAte1}
                date={new Date()}
                mode="date"
                // maximumDate={moment().add(1, "year").toDate()}
                onConfirm={(date) => {
                  setFilterData({
                    ...filterData,
                    ["toDate"]: date,
                  });
                  // setDateSelected1(true)
                  setopenDAte1(!openDAte1);
                }}
                onCancel={() => {
                  setopenDAte1(false);
                }}
              />
            </View>
            <View style={{ marginTop: "2%" }}>
              <Text allowFontScaling={false} style={Style.optionsLabelText}>
                Status
              </Text>
              <Dropdown
                style={[Style.dropdown]}
                placeholderStyle={{
                  color: "#262626",
                  fontFamily: "Gilroy-Light",
                  fontWeight: "600",
                  marginLeft: 20,
                }}
                data={data}
                value={filterData?.status}
                maxHeight={350}
                iconStyle={Style.iconStyle}
                selectedTextStyle={Style.selectedTextStyle}
                iconColor={COLORS.BLACK}
                containerStyle={Style.containerStyle}
                labelField="label"
                valueField="value"
                placeholder={t("All")}
                onChange={(item) => {
                  setFilterData({ ...filterData, ["status"]: item.label });
                  setstatus(filterData?.status);
                }}
              />
            </View>
            <View style={{ marginTop: "2%" }}>
              <Text allowFontScaling={false} style={Style.optionsLabelText}>
                {t("Transaction Type")}
              </Text>
              <Dropdown
                style={[Style.dropdown]}
                placeholderStyle={{
                  color: "#262626",
                  fontFamily: "Gilroy-Light",
                  marginLeft: 20,
                  fontWeight: "700",
                }}
                data={data1}
                maxHeight={350}
                selectedTextStyle={Style.selectedTextStyle}
                iconStyle={Style.iconStyle}
                iconColor={COLORS.BLACK}
                containerStyle={Style.containerStyle}
                value={filterData?.transactionType}
                labelField="label"
                valueField="value"
                placeholder={t("All")}
                onChange={(item) => {
                  setFilterData({
                    ...filterData,
                    ["transactionType"]: item.label,
                  });
                }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: WIDTH * 0.9,
                alignSelf: "center",
              }}
            >
              <WholeButton
                Label={t("Reset")}
                styles={{
                  marginTop: "5.5%",
                  backgroundColor: COLORS.BuleText,
                  width: WIDTH * 0.4,
                }}
                Action={() => {
                  ResetValue();
                }}
              />
              <WholeButton
                Label={t("Apply")}
                styles={{
                  marginTop: "5.5%",
                  backgroundColor: COLORS.ORANGE,
                  width: WIDTH * 0.4,
                }}
                Action={() => {
                  historyFilterHandler();
                }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
export default HistoryFilterComponent;
const Style = StyleSheet.create({
  // Button Container
  containerStyle: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 0,
    borderColor: "transparent",
  },
  commonBtn: {
    borderWidth: 1,
    flex: 0.485,
    // paddingVertical: moderateScaleVertical(14),
    // borderRadius: moderateScale(30),
  },
  btnText: {
    fontFamily: "Gilroy-SemiBold",
    fontSize: 16,
    textAlign: "center",
  },
  optionsContainer: {
    marginVertical: 10,
    rowGap: 20,
  },
  optionsLabelText: {
    color: "#242E42",
    fontSize: 13,
    fontFamily: FONTS.medium,
  },
  dropdown: {
    borderColor: "rgba(0, 0, 0, 0.15)",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 6,
    paddingVertical: 6,
  },
  ViewStyle: {
    backgroundColor: "red",
  },
  iconStyle: {
    width: 25,
    height: 25,
    marginRight: 13,
  },
  headText: {
    // fontFamily: 'Gilroy-SemiBold',
    color: COLORS.BuleText,
    fontSize: 17,
    textAlign: "center",
    fontFamily: FONTS.medium,
    marginBottom: "3%",
  },
  // modal container
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    position: "relative",
  },
  selectedTextStyle: {
    color: "#262626",
    fontFamily: "Gilroy-Light",
    marginLeft: 20,
    fontWeight: "700",
  },
  firstView1: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // backgroundColor:'red'
  },
});
