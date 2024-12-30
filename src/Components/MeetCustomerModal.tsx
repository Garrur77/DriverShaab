import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";
import WholeButton from "./WholeButton";
import { COLORS, FONTS, IMAGEPATH, VECTOR_ICONS } from "../assets/Theme";
import { HEIGHT, WIDTH } from "../Helpers/Dimentions";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
const MeetCustomerModal: React.FC<{
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}> = ({ openModal, setOpenModal }) => {
  const navigation = useNavigation();
  return (
    <Modal
      isVisible={openModal}
      backdropColor="transparent"
      animationOut="bounce"
      onBackdropPress={() => setOpenModal(false)}
      onSwipeComplete={() => setOpenModal(false)}
    >
      <View style={Style.centeredView}>
        <View style={Style.modalView}>
          <View
            style={{
              alignItems: "flex-end",
              width: WIDTH * 0.76,
              paddingTop: "2%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setOpenModal(false);
              }}
            >
              <Image source={IMAGEPATH.Cross} style={Style.CrossImage} />
            </TouchableOpacity>
          </View>
          <Text allowFontScaling={false} style={Style.modalText}>
            Were you able to meet the customer ?
          </Text>
          <WholeButton
            Label="Yes"
            styles={{
              alignSelf: "center",
              marginTop: "5.5%",
              backgroundColor: COLORS.ORANGE,
              width: WIDTH * 0.75,
            }}
            Action={() => {
              navigation.navigate("EnterCode"), setOpenModal(false);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};
export default MeetCustomerModal;

const Style = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    alignItems: "center",
    width: WIDTH * 0.85,
    paddingBottom: "6%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: COLORS.BuleText,
    fontFamily: FONTS.bold,
    width: WIDTH * 0.6,
    fontSize: 18,
    marginTop: "10%",
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  CrossImage: {
    width: WIDTH * 0.03,
    height: HEIGHT * 0.03,
    resizeMode: "contain",
  },
});
