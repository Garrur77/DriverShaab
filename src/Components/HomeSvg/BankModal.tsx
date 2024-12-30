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
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
import { COLORS, FONTS, IMAGEPATH } from "../../assets/Theme";
import BankSvg from "../SVGComponents/BankSvg";
import { ANDROID, IOS } from "../../Helpers/Platform";

interface ModalComponentProps {
  setModalVisible(arg0: boolean): unknown;
  modalVisible: boolean;
}

const BankModal: React.FC<ModalComponentProps> = (props: any) => {
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
        <View style={styles.modal}>
          <View style={{ alignSelf: "center" }}>
            <BankSvg />
          </View>
          <Text
            allowFontScaling={false}
            style={[
              styles.head,
              {
                marginTop: "8%",
                fontWeight: Platform.OS === "ios" ? "600" : "400",
              },
            ]}
          >
            Bank Added Successfully!
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default BankModal;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: COLORS.WHITE,
    width: WIDTH * 0.8,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 20,
    paddingVertical: "20%",
  },
  head: {
    fontSize: 20,
    color: "#242E42",
    fontFamily: FONTS.bold,
    marginTop: "5%",
  },
});
