import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

import { HEIGHT, WIDTH } from "../Helpers/Dimentions";
import { FONTS } from "../assets/Fonts";
import { COLORS, IMAGEPATH, VECTOR_ICONS } from "../assets/Theme";
import WholeButton from "./WholeButton";
import { ANDROID } from "../Helpers/Platform";
import { rateRider } from "./ApiConfig/EndPoints";
import axios from "axios";

interface ModalComponentProps {
  // setModalVisible(arg0: boolean): unknown;
  modalVisible: boolean;
  Message: string;
  Pay_Status: string;

  OK_Action: Function;
}

const RideFinished: React.FC<ModalComponentProps> = (props: any) => {
  const [SelectStar, setSelectStar] = useState(0);
  const [SelectStar1, setSelectStar1] = useState(0);
  const [SelectStar2, setSelectStar2] = useState(0);
  const [SelectStar3, setSelectStar3] = useState(0);
  const [SelectStar4, setSelectStar4] = useState(0);
  // const OnActionSet = () => {

  //   if (props?.Action) {
  //     props?.Action();
  //   }
  //   props.setModalVisible(false);
  // }
  const riderRating = async () => {
    try {
      const res = await axios({
        method: "post",
        url: rateRider,
        data: {
          rideId: "string",
          userId: "string",
          driverRating: 0,
          driverReview: "string",
        },
      });
      console.log("rating success--->>>", res);
    } catch (error) {
      console.log("rating error--->>>", error);
    }
  };

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
        <View style={styles.mainContainer}>
          <View style={styles.imgStyle}>
            <VECTOR_ICONS.FontAwesome5
              name={"check"}
              size={32}
              color={COLORS.WHITE}
            />
          </View>
          <Text allowFontScaling={false} style={[styles.messagesgText]}>
            {props.Message}
          </Text>
          <Text allowFontScaling={false} style={[styles.PAYText]}>
            {props.Pay_Status}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: 40,
              width: WIDTH * 0.7,
            }}
          >
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: "rgba(239, 239, 244, 1)",
              }}
            />
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: "rgba(239, 239, 244, 1)",
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: WIDTH * 0.4,
              justifyContent: "space-between",
            }}
          >
            <Image
              source={IMAGEPATH.DriverImage}
              style={{
                width: WIDTH * 0.1,
                height: HEIGHT * 0.06,
                resizeMode: "contain",
              }}
            />
            <View>
              <Text allowFontScaling={false} style={styles.NameTEXT}>
                Gregory Smith
              </Text>
              <View style={styles.CommonStyle}>
                <VECTOR_ICONS.AntDesign
                  name="star"
                  color={COLORS.YELLOWPRIME}
                  size={23}
                />
                <Text allowFontScaling={false} style={styles.text2}>
                  4.9
                </Text>
              </View>
            </View>
          </View>

          <Text allowFontScaling={false} style={styles.RATEText}>
            Rate Your Rider
          </Text>

          <View style={styles.StarView}>
            <TouchableOpacity
              onPress={() => {
                setSelectStar(1);
              }}
            >
              {SelectStar == 1 ? (
                <>
                  <VECTOR_ICONS.AntDesign
                    name="star"
                    color={COLORS.YELLOWPRIME}
                    size={23}
                    style={{ paddingHorizontal: "1%" }}
                  />
                </>
              ) : (
                <>
                  <VECTOR_ICONS.AntDesign
                    name="staro"
                    color={COLORS.BLACK}
                    size={23}
                    style={{ paddingHorizontal: "1%" }}
                  />
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSelectStar1(1);
              }}
            >
              {SelectStar1 == 1 ? (
                <>
                  <VECTOR_ICONS.AntDesign
                    name="star"
                    color={COLORS.YELLOWPRIME}
                    size={23}
                    style={{ paddingHorizontal: "1%" }}
                  />
                </>
              ) : (
                <>
                  <VECTOR_ICONS.AntDesign
                    name="staro"
                    color={COLORS.BLACK}
                    size={23}
                    style={{ paddingHorizontal: "1%" }}
                  />
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSelectStar2(1);
              }}
            >
              {SelectStar2 == 1 ? (
                <>
                  <VECTOR_ICONS.AntDesign
                    name="star"
                    color={COLORS.YELLOWPRIME}
                    size={23}
                    style={{ paddingHorizontal: "1%" }}
                  />
                </>
              ) : (
                <>
                  <VECTOR_ICONS.AntDesign
                    name="staro"
                    color={COLORS.BLACK}
                    size={23}
                    style={{ paddingHorizontal: "1%" }}
                  />
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSelectStar3(1);
              }}
            >
              {SelectStar3 == 1 ? (
                <>
                  <VECTOR_ICONS.AntDesign
                    name="star"
                    color={COLORS.YELLOWPRIME}
                    size={23}
                    style={{ paddingHorizontal: "1%" }}
                  />
                </>
              ) : (
                <>
                  <VECTOR_ICONS.AntDesign
                    name="staro"
                    color={COLORS.BLACK}
                    size={23}
                    style={{ paddingHorizontal: "1%" }}
                  />
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSelectStar4(1);
              }}
            >
              {SelectStar4 == 1 ? (
                <>
                  <VECTOR_ICONS.AntDesign
                    name="star"
                    color={COLORS.YELLOWPRIME}
                    size={23}
                    style={{ paddingHorizontal: "1%" }}
                  />
                </>
              ) : (
                <>
                  <VECTOR_ICONS.AntDesign
                    name="staro"
                    color={COLORS.BLACK}
                    size={23}
                    style={{ paddingHorizontal: "1%" }}
                  />
                </>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              props.OK_Action();
            }}
            style={styles.ButtonView}
          >
            <Text
              allowFontScaling={false}
              style={{
                color: COLORS.WHITE,
                fontSize: 17,
                fontFamily: FONTS.semibold,
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default RideFinished;

const styles = StyleSheet.create({
  mainContainer: {
    width: WIDTH * 0.75,
    height: HEIGHT * 0.5,
    alignSelf: "center",
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  imgStyle: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: HEIGHT * 0.07,
    width: WIDTH * 0.13,
    backgroundColor: "rgba(76, 229, 177, 1)",
    borderRadius: 50,
  },
  messagesgText: {
    textAlign: "center",
    fontFamily: FONTS.bold,
    color: COLORS.SuccessText,
    fontSize: 20,
    alignSelf: "center",
    paddingTop: "3%",
  },
  messagesgText1: {
    width: WIDTH * 0.7,
    textAlign: "center",
    fontFamily: FONTS.semibold,
    fontSize: 15,
    color: "rgba(138, 138, 143, 1)",
  },
  ButtonView: {
    backgroundColor: COLORS.ORANGE,
    width: WIDTH * 0.6,
    marginTop: "10%",
    paddingVertical: ANDROID ? "3.5%" : "4%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  PAYText: {
    fontFamily: FONTS.regular,
    color: COLORS.SuccessText,
    fontSize: 16,
    alignSelf: "center",
    paddingTop: "2%",
  },
  NameTEXT: {
    fontFamily: FONTS.regular,
    color: COLORS.SuccessText,
    fontSize: 16,
  },
  text2: {
    fontSize: 15,
    fontFamily: FONTS.light,
    color: "#C8C7CC",
  },
  CommonStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  RATEText: {
    fontFamily: FONTS.regular,
    color: COLORS.SuccessText,
    fontSize: 14,
    width: WIDTH * 0.56,
    marginTop: "5%",
  },
  StarView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "3%",
  },
});
