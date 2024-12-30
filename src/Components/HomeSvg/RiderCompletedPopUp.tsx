import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import HeaderComponent from "../../Components/HeaderComponent";
import { COLORS, FONTS, IMAGEPATH, VECTOR_ICONS } from "../../assets/Theme";
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
import WholeButton from "../WholeButton";
import CarSvg from "./CarSvg";
import { useTranslation } from "react-i18next";

const RiderCompletedPopUp = (props: any) => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Modal
      visible={props.modalVisible}
      transparent={true}
      animationType="slide"
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.65)",
          justifyContent: "center",
        }}
      >
        <View style={Style.MAINModalVIEW}>
          <View
            style={{
              width: WIDTH * 0.9,
              alignSelf: "center",
              padding: "3%",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          >
            <View style={Style.imgStyle1}>
              <VECTOR_ICONS.FontAwesome5
                name={"check"}
                size={40}
                color={COLORS.WHITE}
              />
            </View>
            <Text allowFontScaling={false} style={[Style.messagesgText12]}>
              {t("Ride Completed")}
            </Text>
            <Text allowFontScaling={false} style={[Style.messagesgText13]}>
              {t("Payment Received")} $24.89
            </Text>
            <View style={[Style.Line1]}></View>

            <TouchableOpacity
              style={[
                Style.CommonStyle,
                { width: WIDTH * 0.47, paddingLeft: "4%" },
              ]}
              onPress={() => props.Action}
            >
              <Image source={IMAGEPATH.User} style={Style.imgStyle} />
              <View>
                <Text
                  allowFontScaling={false}
                  style={[Style.text1, { fontFamily: FONTS.bold }]}
                >
                  Gregory Smith
                </Text>
                <View style={[Style.CommonStyle, { width: WIDTH * 0.13 }]}>
                  <VECTOR_ICONS.AntDesign
                    name="star"
                    color={COLORS.YELLOWPRIME}
                    size={23}
                  />
                  <Text allowFontScaling={false} style={Style.text2}>
                    4.9
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ width: WIDTH * 0.76, alignSelf: "center" }}>
            <Text
              allowFontScaling={false}
              style={[Style.text3, { paddingLeft: "13%", paddingTop: "2%" }]}
            >
              {t("Pick Up")}
            </Text>
            <View style={{ flexDirection: "row", width: WIDTH * 0.77 }}>
              <View style={{ paddingTop: "2%" }}>
                <VECTOR_ICONS.Fontisto
                  name="radio-btn-active"
                  size={22}
                  color={COLORS.ORANGE}
                />
                <View
                  style={{
                    height: 50,
                    borderLeftWidth: 2,
                    borderLeftColor: "#C8C7CC",
                    borderStyle: "dotted",
                    alignSelf: "center",
                  }}
                />
                <VECTOR_ICONS.FontAwesome6
                  name="location-dot"
                  size={27}
                  color={COLORS.ORANGE}
                />
              </View>
              <View style={{ paddingLeft: "5%" }}>
                <Text allowFontScaling={false} style={Style.text4}>
                  JK Bata chauk 3 , Govind Puri Delhi Metro , Delhi
                </Text>
                <View style={Style.Line3}></View>
                <Text
                  allowFontScaling={false}
                  style={[Style.text3, { paddingTop: "1.5%" }]}
                >
                  {t("Destination")}
                </Text>
                <Text allowFontScaling={false} style={Style.text4}>
                  JK Bata chauk 3 , Govind Puri Delhi Metro , Delhi
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RiderCompletedPopUp;
const Style = StyleSheet.create({
  mainContainer: {
    width: "80%",
    alignSelf: "center",
    backgroundColor: COLORS.BACKGROUNDBLACK,
    borderRadius: 7,
    alignItems: "center",
    paddingBottom: "5%",
  },
  closeStyle: {
    alignSelf: "flex-end",
    width: "9%",
    marginTop: "3%",
    padding: 4,
    marginRight: 4,
  },
  imgStyle: {
    width: WIDTH * 0.12,
    height: HEIGHT * 0.06,
    resizeMode: "contain",
  },
  messagesgText: {
    textAlign: "center",
    fontFamily: FONTS.bold,
    color: COLORS.WHITE2,
    alignSelf: "center",
    marginTop: "1.5%",
    paddingVertical: "3%",
    // paddingBottom:'15%'
  },
  messagesgText1: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.BuleText,
  },
  CommonStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text1: {
    fontSize: 17,
    fontFamily: FONTS.semiBold,
    color: COLORS.BuleText,
  },
  text2: {
    fontSize: 15,
    fontFamily: FONTS.light,
    color: "#C8C7CC",
  },
  text3: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    color: COLORS.BuleText,
  },
  text4: {
    fontSize: 12,
    fontFamily: FONTS.light,
    color: COLORS.BuleText,
    width: WIDTH * 0.5,
    paddingTop: "2%",
    //paddingLeft: 5,
    //backgroundColor: "red",
  },
  Line3: {
    backgroundColor: COLORS.UPLOADBorderCOLOR,
    width: WIDTH * 0.66,
    height: HEIGHT * 0.001,
    marginTop: "3%",
    borderRadius: 8,
  },
  Line1: {
    backgroundColor: COLORS.UPLOADBorderCOLOR,
    width: WIDTH * 0.75,
    height: HEIGHT * 0.001,
    marginTop: "3%",
    borderRadius: 8,
    alignSelf: "center",
    marginVertical: "4%",
    //backgroundColor: "red",
  },
  CarView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: WIDTH * 0.6,
    alignItems: "center",
    paddingLeft: "3%",
    paddingBottom: "3%",
  },
  imgStyle1: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: HEIGHT * 0.1,
    width: WIDTH * 0.2,
    backgroundColor: "rgba(76, 229, 177, 1)",
    borderRadius: 50,
  },
  messagesgText12: {
    textAlign: "center",
    fontFamily: FONTS.bold,
    color: COLORS.SuccessText,
    fontSize: 20,
    alignSelf: "center",
    marginTop: "5%",
  },
  messagesgText13: {
    textAlign: "center",
    fontFamily: FONTS.semibold,
    fontSize: 15,
    color: COLORS.BuleText,
    paddingTop: "1%",
  },

  MAINModalVIEW: {
    backgroundColor: COLORS.WHITE,
    width: WIDTH * 0.84,
    alignSelf: "center",
    borderRadius: 8,
    // paddingVertical: "4%",
    paddingTop: "2.5%",
    paddingBottom: "8%",
  },
});
