import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import { HEIGHT, WIDTH } from "../Helpers/Dimentions";
import { COLORS, FONTS } from "../assets/Theme";
import MapImage from "./SVGComponents/SplashComponents/MapImage";

const PermitionPopUp = ({ showPopup, setShowPopup, props }) => {
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <Modal
      visible={showPopup}
      transparent={true}
      animationType="fade"
      onRequestClose={() => {
        closePopup();
      }}
    >
      <View style={styles.MainView}>
        <Text style={styles.popupTextOne}>
          Allow “Pnottual” to use you location?
        </Text>
        <Text style={styles.popupTextTwo}>
          For a reliable ride, Ponttual collects Location data form the time you
          open the app until a trip ends. this improves pikups, support, and
          more.
        </Text>
        <TouchableOpacity>
          <MapImage />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Introduction");
            setShowPopup(false);
          }}
          style={styles.AllowButton}
        >
          <Text style={styles.AllowText}>Allow</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.AllowButton}>
          <Text style={styles.AllowText}>Don’t Allow</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => closePopup()}
          style={styles.AllowButton}
        >
          <Text style={styles.AllowText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default PermitionPopUp;

const styles = StyleSheet.create({
  MainView: {
    alignItems: "center",
    height: HEIGHT * 0.6,
    width: WIDTH * 0.7,
    alignSelf: "center",
    marginTop: "35%",
    backgroundColor: COLORS.WHITE,
    borderRadius: 15,
  },
  popupTextOne: {
    color: COLORS.BLACK,
    fontSize: 17,
    fontFamily: FONTS.bold,
    textAlign: "center",
    lineHeight: 22,
    paddingTop: "4%",
  },
  popupTextTwo: {
    color: COLORS.BLACK,
    fontSize: 13,
    fontFamily: FONTS.bold,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: "4%",
    paddingVertical: "2.5%",
  },
  AllowText: {
    color: COLORS.BLUE,
    fontSize: 16,
  },
  AllowButton: {
    borderBottomWidth: 0.5,
    borderBlockColor: "rgba(0, 0, 0, 0.24)",
    width: WIDTH * 0.7,
    paddingVertical: "3%",
    alignItems: "center",
  },
});
