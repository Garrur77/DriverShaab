import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import WholeButton from "./WholeButton";
import Modal from "react-native-modal";
import { COLORS, FONTS, IMAGEPATH, VECTOR_ICONS } from "../assets/Theme";
import { HEIGHT, WIDTH } from "../Helpers/Dimentions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { IOS } from "../Helpers/Platform";
import { useTranslation } from "react-i18next";
const CancelRiderRequestComponent: React.FC<{
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  onSubmit: (reason: string) => void;
  type: string;
  openRideRef: Function;
  cancel: object;
  setCancel: Function;
  setModalVisible1: Function;
}> = ({
  openModal,
  setOpenModal,
  onSubmit,
  type,
  openRideRef,
  setModalVisible1,
  cancel,
  setCancel,
}) => {
  const { t } = useTranslation();
  const handleSubmit = () => {
    // Additional logic related to cancel submit if needed
    console.log("Cancel Submit pressed");
  };
  const closedBack = () => {
    type == "RideRef"
      ? (setOpenModal(false), openRideRef())
      : setOpenModal(false);
  };

  const submit = () => {
    setOpenModal(false);
    setTimeout(() => {
      setModalVisible1(true);
    }, 1000);
  };
  return (
    <Modal
      isVisible={openModal}
      onSwipeComplete={closedBack}
      swipeDirection="down"
      backdropColor="rgba(0,0,0,0.4)"
      onBackdropPress={closedBack}
      onBackButtonPress={closedBack}
      style={[Style.container]}
    >
      <KeyboardAvoidingView
        style={{ ...Style.innercontainer, flexGrow: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        behavior={IOS ? "padding" : "height"}
      >
        {/* <KeyboardAwareScrollView style={{ ...Style.innercontainer, flexGrow: 1 }}> */}

        <View style={Style.CancelrideView}>
          <Text
            allowFontScaling={false}
            style={[
              Style.textStyle,
              { fontWeight: Platform.OS === "ios" ? "600" : "bold" },
            ]}
          >
            {t("Cancel Your Rider Request")}
          </Text>
          <TouchableOpacity
            onPress={closedBack}
            style={{
              alignSelf: "center",
              marginTop: "2.9%",
              alignItems: "center",
            }}
          >
            <Image source={IMAGEPATH.Cross} style={Style.CrossImage} />
          </TouchableOpacity>
        </View>

        <View style={Style.CancelrideLineView}></View>

        <View
          style={{ width: WIDTH * 0.9, alignSelf: "center", paddingBottom: 20 }}
        >
          <Text
            allowFontScaling={false}
            style={[
              Style.textStyle1,
              { fontWeight: Platform.OS === "ios" ? "500" : "400" },
            ]}
          >
            Select the reason for canceling.
          </Text>
          <View style={[Style.CheckView, { marginTop: "5%" }]}>
            <View style={{ paddingRight: "5%", rowGap: 15 }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 20,
                }}
                onPress={() =>
                  setCancel({ ...cancel, ["selectReson"]: "Change in plans" })
                }
              >
                {cancel?.selectReson === "Change in plans" ? (
                  <VECTOR_ICONS.Fontisto
                    name="radio-btn-active"
                    size={18}
                    color={COLORS.ORANGE}
                  />
                ) : (
                  <VECTOR_ICONS.Fontisto
                    name="radio-btn-passive"
                    size={18}
                    color={COLORS.GRAY3}
                  />
                )}

                <Text allowFontScaling={false} style={Style.textStyle1}>
                  {t("Change in Plans")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 20,
                }}
                onPress={() =>
                  setCancel({
                    ...cancel,
                    ["selectReson"]: "Emergent Circumstances",
                  })
                }
              >
                {cancel?.selectReson === "Emergent Circumstances" ? (
                  <VECTOR_ICONS.Fontisto
                    name="radio-btn-active"
                    size={18}
                    color={COLORS.ORANGE}
                  />
                ) : (
                  <VECTOR_ICONS.Fontisto
                    name="radio-btn-passive"
                    size={18}
                    color={COLORS.GRAY3}
                  />
                )}

                <Text allowFontScaling={false} style={Style.textStyle1}>
                  {t("Emergent Circumstances")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 20,
                }}
                onPress={() =>
                  setCancel({ ...cancel, ["selectReson"]: "Other" })
                }
              >
                {cancel?.selectReson === "Other" ? (
                  <VECTOR_ICONS.Fontisto
                    name="radio-btn-active"
                    size={18}
                    color={COLORS.ORANGE}
                  />
                ) : (
                  <VECTOR_ICONS.Fontisto
                    name="radio-btn-passive"
                    size={18}
                    color={COLORS.GRAY3}
                  />
                )}
                <Text allowFontScaling={false} style={Style.textStyle1}>
                  {t("Other")}
                </Text>
              </TouchableOpacity>
              {cancel?.selectReson === "Other" ? (
                <TextInput
                  allowFontScaling={false}
                  style={{
                    width: WIDTH * 0.9,
                    height: HEIGHT * 0.065,
                    borderWidth: 1,
                    borderColor: COLORS.GRAY3,
                    borderRadius: 10,
                    fontFamily: FONTS.medium,
                    color: COLORS.BLACK,
                    paddingHorizontal: 16,
                    fontSize: 15,
                  }}
                  value={cancel?.other}
                  onChangeText={(e) => setCancel({ ...cancel, ["other"]: e })}
                  maxLength={50}
                  placeholder={t("Enter your reason")}
                  placeholderTextColor={COLORS.PLACEHOLDERCOLOR2}
                />
              ) : null}
            </View>
          </View>

          <WholeButton
            Label={t("SUBMIT")}
            styles={{
              alignSelf: "center",
              marginTop: "5.5%",
              backgroundColor: COLORS.BuleText,
            }}
            Action={submit}
          />
        </View>
        {/* </View> */}
      </KeyboardAvoidingView>
    </Modal>
  );
};
export default CancelRiderRequestComponent;

const Style = StyleSheet.create({
  backImageStyle: {
    width: WIDTH,
    height: HEIGHT,
    resizeMode: "contain",
  },
  firstView1: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: COLORS.WHITE,
  },
  textStyle: {
    color: COLORS.BuleText,
    fontSize: 17,
    fontFamily: FONTS.light,
    textAlign: "center",
    paddingTop: "3.7%",
  },
  textStyle1: {
    color: COLORS.BuleText,
    fontSize: 16,
    fontFamily: FONTS.light,
  },
  Line: {
    backgroundColor: "#9B9B9B",
    width: WIDTH * 0.15,
    height: HEIGHT * 0.009,
    alignSelf: "center",
    marginTop: "3%",
    borderRadius: 8,
  },
  CancelrideView: {
    flexDirection: "row",
    width: WIDTH * 0.82,
    alignSelf: "flex-end",
    justifyContent: "space-around",
  },
  CancelrideLineView: {
    backgroundColor: "#B1B1B1",
    width: WIDTH,
    height: 0.6,
    marginVertical: "3%",
  },
  CheckView: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: "2.5%",
  },
  CrossImage: {
    width: WIDTH * 0.04,
    height: HEIGHT * 0.04,
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    position: "relative",
    margin: 0,
  },
  innercontainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 80,
  },
});
