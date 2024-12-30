import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";

import { HEIGHT, WIDTH } from "../Helpers/Dimentions";
import { FONTS } from "../assets/Fonts";
import { COLORS, IMAGEPATH, VECTOR_ICONS } from "../assets/Theme";
import WholeButton from "./WholeButton";
import { ANDROID } from "../Helpers/Platform";

interface ModalComponentProps {
  // setModalVisible(arg0: boolean): unknown;
  modalVisible: boolean;
  Message: string;
  Congratulation: string | undefined;
  OK_Action: Function;
}

const RegistationSuccessPopUp: React.FC<ModalComponentProps> = (props) => {
  // const OnActionSet = () => {

  //   if (props?.Action) {
  //     props?.Action();
  //   }
  //   props.setModalVisible(false);
  // }

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
          <Image
            source={IMAGEPATH.Success}
            style={{
              width: WIDTH * 0.22,
              height: HEIGHT * 0.1,
              resizeMode: "contain",
            }}
          />
          {/* <View style={styles.imgStyle}>
            <VECTOR_ICONS.FontAwesome5
              name={"check"}
              size={40}
              color={COLORS.WHITE}
            />
          </View> */}
          <Text allowFontScaling={false} style={[styles.messagesgText]}>
            {props.Message}
          </Text>
          {props?.Congratulation && (
            <Text allowFontScaling={false} style={[styles.messagesgText1]}>
              {props.Congratulation}
            </Text>
          )}

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
              Okay
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default RegistationSuccessPopUp;

const styles = StyleSheet.create({
  mainContainer: {
    width: "85%",
    height: HEIGHT * 0.48,
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
    height: HEIGHT * 0.1,
    width: WIDTH * 0.2,
    backgroundColor: "rgba(76, 229, 177, 1)",
    borderRadius: 50,
  },
  messagesgText: {
    textAlign: "center",
    fontFamily: FONTS.bold,
    color: COLORS.SuccessText,
    fontSize: 20,
    alignSelf: "center",
    marginTop: "2%",
    paddingVertical: "3%",
  },
  messagesgText1: {
    width: WIDTH * 0.79,
    textAlign: "center",
    fontFamily: FONTS.semibold,
    fontSize: 15,
    color: "rgba(138, 138, 143, 1)",
    lineHeight: 17,
    // backgroundColor:'red'
  },
  ButtonView: {
    backgroundColor: COLORS.ORANGE,
    width: WIDTH * 0.7,
    marginTop: "10%",
    paddingVertical: ANDROID ? "3.5%" : "4%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
