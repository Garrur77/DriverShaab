import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  Platform,
} from "react-native";
import { useState } from "react";
import { HEIGHT, WIDTH } from "../Helpers/Dimentions";
import { COLORS, FONTS, IMAGEPATH } from "../assets/Theme";
import LogoutSvg from "./SVGComponents/LogoutSvg";
import BankSvg from "./SVGComponents/BankSvg";
import { ANDROID, IOS } from "../Helpers/Platform";

interface ModalComponentProps {
  modalVisible: boolean;
  Message: string;
  head: string;
  btn1?: string;
  btn2?: string;
  Action?: any;
  OpenOnline: any;
}

const LogOutComponent: React.FC<ModalComponentProps> = (props: any) => {
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
        <View style={[styles.modal]}>
          <View style={{ alignItems: "center" }}>
            <View style={{ marginTop: IOS ? "7%" : "6%" }}>
              <LogoutSvg />
            </View>
            <Text allowFontScaling={false} style={styles.head}>
              {props.head}
            </Text>
            <Text allowFontScaling={false} style={styles.Message_1}>
              {props.Message}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              borderTopColor: "rgba(239, 239, 244, 1)",
              borderTopWidth: 1,
            }}
          >
            <TouchableOpacity
              style={styles.NO_TWOBUTTON}
              onPress={props.OpenOnline}
            >
              <Text
                allowFontScaling={false}
                style={[
                  styles.btn,
                  { fontWeight: Platform.OS === "ios" ? "500" : "400" },
                ]}
              >
                {props.btn1}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.TWOBUTTON} onPress={props.Action}>
              <Text
                allowFontScaling={false}
                style={[
                  styles.btn,
                  {
                    color: COLORS.ORANGE,
                    fontWeight: Platform.OS === "ios" ? "500" : "400",
                  },
                ]}
              >
                {props.btn2}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogOutComponent;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: COLORS.WHITE,
    width: WIDTH * 0.8,
    // height: ANDROID ? HEIGHT * 0.25 : undefined,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 20,
  },
  head: {
    fontSize: 20,
    color: "#242E42",
    fontFamily: FONTS.bold,
    marginTop: "3%",
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  Message_1: {
    fontSize: 14,
    color: "#8A8A8F",
    fontFamily: FONTS.light,
    marginTop: "3%",
    paddingBottom: "8%",
  },
  btn: {
    fontSize: 17,
    color: "#C8C7CC",
    fontFamily: FONTS.bold,
  },
  TWOBUTTON: {
    //    backgroundColor:'blue',
    width: WIDTH * 0.4,
    paddingVertical: IOS ? "5%" : "4.5%",
    alignItems: "center",
    justifyContent: "center",
  },
  NO_TWOBUTTON: {
    width: WIDTH * 0.4,
    paddingVertical: IOS ? "5%" : "4.5%",
    alignItems: "center",
    justifyContent: "center",
    borderRightColor: "rgba(239, 239, 244, 1)",
    borderRightWidth: 1,
  },
});
