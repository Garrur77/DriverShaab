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
import { COLORS, FONTS, IMAGEPATH, VECTOR_ICONS } from "../assets/Theme";
import { HEIGHT, WIDTH } from "../Helpers/Dimentions";
import { ANDROID } from "../Helpers/Platform";
import CarSvg from "./HomeSvg/CarSvg";
import WholeButton from "./WholeButton";

interface ModalComponentProps {
  setModalVisible(arg0: boolean): unknown;
  modalVisible: boolean;
  Message: string;
  Congratulation: string | undefined;
  Action: Function;
  CongratulationColor?: string;
}
const ModalComponent: React.FC<ModalComponentProps> = (props) => {
  const [modalVisible1, setModalVisible1] = useState(false);

  const OnActionSet = () => {
    if (props?.Action) {
      props?.Action();
    }
    props.setModalVisible(false);
  };

  return (
    <Modal
      visible={props.modalVisible || modalVisible1}
      transparent={true}
      animationType="slide"
    >
      <View
        style={{
          backgroundColor: COLORS.WHITE,
          width: WIDTH * 0.9,
          marginTop: "40%",
          alignSelf: "center",
          borderRadius: 8,
        }}
      >
        <View
          style={{
            width: WIDTH * 0.9,
            alignSelf: "center",
            backgroundColor: "#F7F7F7",
            padding: "3%",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        >
          <View style={[styles.CommonStyle, { width: WIDTH * 0.4 }]}>
            <Image source={IMAGEPATH.DriverImage} style={styles.imgStyle} />
            <View>
              <Text style={styles.text1}>Gregory Smith</Text>
              <View style={[styles.CommonStyle, { width: WIDTH * 0.13 }]}>
                <VECTOR_ICONS.AntDesign
                  name="star"
                  color={COLORS.YELLOWPRIME}
                  size={23}
                />
                <Text style={styles.text2}>4.9</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ padding: "3%" }}>
          <Text style={[styles.text3, { paddingLeft: "11%" }]}>
            Customer’s Current location
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
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
              <Text style={styles.text4}>
                JK Bata chauk 3 , Govind Puri Delhi Metro , Delhi
              </Text>
              <View style={styles.Line}></View>
              <Text style={[styles.text3, { paddingTop: "1.5%" }]}>
                Customer’s Current location
              </Text>
              <Text style={styles.text4}>
                JK Bata chauk 3 , Govind Puri Delhi Metro , Delhi
              </Text>
              <View style={[styles.Line1]}></View>
            </View>
          </View>
        </View>
        <View style={styles.CarView}>
          <CarSvg />
          <View>
            <Text style={styles.text2}>Distance</Text>
            <Text style={styles.messagesgText1}>0.2 km</Text>
          </View>
          <View>
            <Text style={styles.text2}>Time</Text>
            <Text style={styles.messagesgText1}>2 min</Text>
          </View>
        </View>
        <WholeButton
          Label="Confirm"
          styles={{
            alignSelf: "center",
            marginTop: "5.5%",
            backgroundColor: COLORS.ORANGE,
            width: WIDTH * 0.85,
          }}
        />
        <WholeButton
          Label="Decline"
          styles={{
            alignSelf: "center",
            marginVertical: "3.3%",
            backgroundColor: COLORS.BuleText,
            width: WIDTH * 0.85,
          }}
          Action={() => setModalVisible1(false)}
        />
      </View>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
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
    width: WIDTH * 0.1,
    height: HEIGHT * 0.05,
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
    fontSize: 14,
    fontFamily: FONTS.light,
    color: COLORS.BuleText,
    width: WIDTH * 0.5,
    textWrap: "wrap",
  },
  Line: {
    backgroundColor: "#EFEFF4",
    width: WIDTH * 0.78,
    height: HEIGHT * 0.001,
    marginTop: "3%",
    borderRadius: 8,
  },
  Line1: {
    backgroundColor: "#EFEFF4",
    width: WIDTH * 0.9,
    height: HEIGHT * 0.001,
    marginTop: "3%",
    borderRadius: 8,
    marginLeft: -50,
  },
  CarView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: WIDTH * 0.6,
    alignItems: "center",
    paddingLeft: "3%",
    paddingBottom: "3%",
  },
});
