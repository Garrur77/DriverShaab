import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  StatusBar,
} from "react-native";
import React from "react";
import { COLORS, FONTS, IMAGEPATH, VECTOR_ICONS } from "../../assets/Theme";
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../ReduxConfig/Store";
import WholeButton from "../../Components/WholeButton";
import { UserVisited } from "../../ReduxConfig/UserDetails/UserSlice";
import { setClearPersonalInfo } from "../../ReduxConfig/PersonalDetailsSlice";
import { setClearVehicle } from "../../ReduxConfig/VehicleDetailsSlice";
import { setClearState } from "../../ReduxConfig/TokenUserID";
import { async } from "rxjs";

interface MyComponentProps {
  modalVisible: boolean;
  logout: Function;
}

const PendingModal: React.FC<MyComponentProps> = ({ modalVisible, logout }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const Data = useSelector(
    (state: RootState) => state.TokenUserID_DETAILS?.userData
  );

  const IconRender = () => {
    return !Data?.statusReason ? (
      <VECTOR_ICONS.AntDesign
        name="exclamationcircle"
        color={COLORS.YELLOWPRIME}
        size={40}
        style={{ paddingHorizontal: "1%" }}
      />
    ) : (
      <>
        <VECTOR_ICONS.Entypo
          name="block"
          color={COLORS.RED}
          size={40}
          style={{ paddingHorizontal: "1%" }}
        />
        <Text
          allowFontScaling={false}
          style={{
            ...styles.textStyle,
            textAlign: "center",
            fontSize: 20,
            color: "black",
            paddingBottom: 0,
          }}
        >
          You have been blocked.
        </Text>
      </>
    );
  };

  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor:
            modalVisible == true ? "rgba(0,0,0,0.65)" : COLORS.WHITE,
          flex: 1,
        }}
      >
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <IconRender />
              <Text allowFontScaling={false} style={styles.textStyle}>
                {Data?.statusReason
                  ? Data?.statusReason
                  : "Your request is currently pending approval. Please be patient while we process your request."}
              </Text>
              <WholeButton
                styles={{
                  alignSelf: "center",
                  marginTop: "5%",
                  marginBottom: "5%",
                  width: "70%",
                }}
                Label="Continue"
                Action={() => logout()}
              />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

export default PendingModal;

const styles = StyleSheet.create({
  Heading: {
    color: COLORS.BLACK2,
    fontSize: 30,
    fontFamily: FONTS.bold,
    textAlign: "center",
    paddingTop: "8%",
  },
  HeadingText: {
    color: COLORS.BLACK2,
    fontSize: 17,
    fontFamily: FONTS.medium,
    lineHeight: 20,
    textAlign: "center",
    width: WIDTH * 0.7,
    alignSelf: "center",
    paddingTop: "3%",
  },
  VideoImage: {
    width: WIDTH * 0.9,
    height: HEIGHT * 0.4,
    alignSelf: "center",
    borderRadius: 8,
  },
  VideoButton: {
    width: WIDTH * 0.9,
    alignSelf: "center",
    marginTop: "10%",
  },
  StartButton: {
    alignSelf: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "rgba(0,0,0,0.65)",
  },
  modalView: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 15,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: WIDTH * 0.8,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "rgba(0, 148, 255, 1)",
    fontSize: 17,
    paddingVertical: "4.5%",
    width: WIDTH * 0.7,
    fontFamily: FONTS.medium,
    textAlign: "center",
    lineHeight: 22,
  },
  modalText: {
    marginBottom: "8%",
    textAlign: "center",
    color: COLORS.BuleText,
    fontFamily: FONTS.bold,
  },
  modalText1: {
    marginBottom: 16,
    color: COLORS.BuleText,
    fontFamily: FONTS.medium,
  },
  modalText2: {
    marginBottom: 14,
    color: "rgba(0, 0, 0, 0.6)",
    fontFamily: FONTS.light,
  },
  Line: {
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    width: WIDTH * 0.7,
    height: HEIGHT * 0.001,
    marginVertical: "3%",
    borderRadius: 8,
    alignSelf: "center",
  },
  CommonNumberStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "2%",
  },
  commonNumberstyle1: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: WIDTH * 0.3,
  },
});
