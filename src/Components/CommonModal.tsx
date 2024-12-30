import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { useState } from "react";
import { HEIGHT, WIDTH } from "../Helpers/Dimentions";
import { COLORS, FONTS, IMAGEPATH } from "../assets/Theme";
import LogoutSvg from "./SVGComponents/LogoutSvg";
import BankSvg from "./SVGComponents/BankSvg";
import { ANDROID, IOS } from "../Helpers/Platform";

interface ModalComponentProps {
  setModalVisible(arg0: boolean): unknown;
  modalVisible: boolean;
  Message: string;
  Message1?: string;
  head: string;
  btn1?: string;
  btn2?: string;
  Action?: any;
  Action2?: any;
  source: any;
  Button?: string;
  imgstyle?: any;
  Button12?: any;
  OpenOnline: any;
  LogoutModal: any;
  CancelModal: any;
  BankModal: any;
}

const CommonModal: React.FC<ModalComponentProps> = (props: any) => {
  const [modalVisible, setmodalVisible] = useState(false);
  return (
    <Modal visible={props.modalVisible} transparent={true}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.65)",
          justifyContent: "center",
        }}
      >
        <View style={[styles.modal, props.modalstyle]}>
          {props?.CancelModal && (
            <Image
              source={IMAGEPATH.CancelImage}
              style={[styles.img, props.imgstyle]}
            />
          )}
          {props?.LogoutModal && (
            <View style={{ marginTop: IOS ? "7%" : "4.3%" }}>
              <LogoutSvg />
            </View>
          )}
          <Text allowFontScaling={false} style={styles.head}>
            {props.head}
          </Text>
          <Text allowFontScaling={false} style={styles.text1}>
            {props.Message}
          </Text>
          {props.cancelBooking && (
            <Text allowFontScaling={false} style={styles.text2}>
              rider request?
            </Text>
          )}
          {props?.Button12 && (
            <View>
              <View style={styles.line}></View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: WIDTH * 0.8,
                  alignSelf: "center",
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                }}
              >
                <TouchableOpacity
                  style={styles.TWOBUTTON}
                  onPress={props.OpenOnline}
                >
                  <Text allowFontScaling={false} style={styles.btn}>
                    {props.btn1}
                  </Text>
                </TouchableOpacity>

                <View style={styles.line2}></View>

                <TouchableOpacity
                  style={styles.TWOBUTTON}
                  onPress={props.Action}
                >
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.btn,
                      { color: COLORS.ORANGE, fontWeight: "600" },
                    ]}
                  >
                    {props.btn2}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {props?.Button && (
            <TouchableOpacity
              onPress={props.Action2}
              style={[styles.WholeButtonStyle, props.btnstyle]}
            >
              <Text allowFontScaling={false} style={styles.buttonText}>
                {props?.Button}
              </Text>
            </TouchableOpacity>
          )}
          {props?.BankModal && (
            <View>
              <View style={{ alignSelf: "center" }}>
                <BankSvg />
              </View>
              <Text
                allowFontScaling={false}
                style={[styles.head, { marginTop: "8%" }]}
              >
                Bank Added Successfully!
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CommonModal;

const styles = StyleSheet.create({
  img: {
    marginTop: "6%",
    width: WIDTH * 0.22,
    // height:HEIGHT*0.1,
    resizeMode: "contain",
  },
  WholeButtonStyle: {
    width: "80%",
    alignSelf: "center",
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: COLORS.BACKGROUNDBTNCOLOR,
    marginTop: "8%",
  },
  buttonText: {
    fontSize: 17,
    color: COLORS.WHITE,
    textAlign: "center",
    fontFamily: FONTS.bold,
    margin: "2%",
  },
  modal: {
    backgroundColor: COLORS.WHITE,
    width: WIDTH * 0.8,
    // height: ANDROID ? HEIGHT * 0.358 : undefined,
    // justifyContent:'center',
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 20,
    padding: 10,
  },
  head: {
    fontSize: 20,
    color: "#242E42",
    fontFamily: FONTS.bold,
    marginTop: "5%",
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
  },
  text1: {
    fontSize: 14,
    color: "#8A8A8F",
    fontFamily: FONTS.light,
    marginTop: "3%",
  },
  text2: {
    fontSize: 14,
    color: "#8A8A8F",
    fontFamily: FONTS.light,
  },
  line: {
    backgroundColor: "#ECECEC",
    width: WIDTH * 0.8,
    height: 1,
    marginTop: "8%",
  },
  line2: {
    backgroundColor: "rgba(239, 239, 244, 1)",
    width: "0.3%",
    height: IOS ? HEIGHT * 0.06 : HEIGHT * 0.072,
  },
  btn: {
    fontSize: 17,
    color: "#C8C7CC",
    fontFamily: FONTS.bold,
  },

  TWOBUTTON: {
    // backgroundColor:'red',
    width: WIDTH * 0.4,
    paddingVertical: IOS ? "4%" : "2%",
    alignItems: "center",
    justifyContent: "center",
  },
});
