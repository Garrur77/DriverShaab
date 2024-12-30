import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { WIDTH, HEIGHT } from "../Helpers/Dimentions";
import { COLORS, VECTOR_ICONS, FONTS, IMAGEPATH } from "../assets/Theme";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { ANDROID, IOS } from "../Helpers/Platform";
import { useDispatch } from "react-redux";
import { setClearState } from "../ReduxConfig/TokenUserID";
import { setClearPersonalInfo } from "../ReduxConfig/PersonalDetailsSlice";
import { setClearVehicle } from "../ReduxConfig/VehicleDetailsSlice";
import { UserVisited } from "../ReduxConfig/UserDetails/UserSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "../ReduxConfig/Store";

const Header = (props: any) => {
  const [selectedMeditationType1, setSelectedMeditationType1] = useState(false);

  const [value, setValue] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const Action = () => {
    props?.reset
      ? clearHandler()
      : // props?.exitApp()
      props?.ToScreen
      ? props?.navigation?.navigate(props?.ToScreen)
      : props?.navigation?.goBack();
  };

  const clearHandler = async () => {
    dispatch(setClearState(false));
    dispatch(setClearPersonalInfo(false));
    dispatch(setClearVehicle(false));
    dispatch(UserVisited(""));
    await AsyncStorage?.removeItem("TOKEN");
    props?.navigation?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: props?.ToScreen }],
      })
    );
  };

  const onDrawerPress = () => {
    if (props.onDrawerPress) {
      props.onDrawerPress();
    }
  };

  return (
    <View
      style={[
        styles.MainContainer,
        { backgroundColor: props.backgroundColor || COLORS.ORANGE },
        props?.Hederstyles,
      ]}
    >
      <View
        style={[
          styles.MainContainer,
          { backgroundColor: props.backgroundColorMain || COLORS.ORANGE },
          { width: WIDTH * 0.9, alignSelf: "center", alignItems: "center" },
        ]}
      >
        {props?.hideleft == undefined && (
          <TouchableOpacity
            style={[styles.BackHeader]}
            onPress={() => Action()}
          >
            <VECTOR_ICONS.Ionicons
              name="chevron-back"
              size={26}
              color={"#fff"}
            />
          </TouchableOpacity>
        )}

        {props?.Heading && (
          // <View style={{ width: props?.hideleft == undefined ? WIDTH * 0.7 : WIDTH * 0.9, alignSelf: 'center' }}>
          <Text
            allowFontScaling={false}
            numberOfLines={1}
            style={[styles.HeaderText, props.HeaderStyle]}
          >
            {props?.Heading}
          </Text>
          // </View>
        )}
        {props?.Drawer && (
          <TouchableOpacity
            onPress={onDrawerPress}
            style={[
              styles.BackHeader,
              { backgroundColor: props.backgroundColorDrawer || COLORS.ORANGE },
            ]}
          >
            <VECTOR_ICONS.Octicons
              name="three-bars"
              size={19}
              color={COLORS.WHITE}
            />
          </TouchableOpacity>
        )}
        {props?.HomeHeader && (
          <Image
            source={IMAGEPATH.HomeHeder}
            style={{
              width: WIDTH * 0.29,
              height: HEIGHT * 0.047,
              alignSelf: "center",
              resizeMode: "contain",
            }}
          />
        )}
        {props?.Bell && (
          <TouchableOpacity
            style={{
              marginRight: -23,
              height: 50,
              width: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              navigation.navigate("Notification");
            }}
          >
            <VECTOR_ICONS.FontAwesome
              name="bell"
              size={20}
              color={COLORS.WHITE}
            />
          </TouchableOpacity>
        )}
        {props?.filter && (
          <TouchableOpacity
            style={[styles.BackHeader, { transform: [{ scaleX: -1 }] }]}
            onPress={() => {
              props.navigation.navigate("AddCategory");
            }}
          >
            <VECTOR_ICONS.AntDesign name="filter" size={27} color={"#FFC002"} />
          </TouchableOpacity>
        )}
        {props?.filter1 && (
          <TouchableOpacity
            style={[styles.BackHeader, { transform: [{ scaleX: -1 }] }]}
            onPress={() => {
              setSelectedMeditationType1(true);
            }}
          >
            <VECTOR_ICONS.AntDesign name="filter" size={27} color={"#FFC002"} />
          </TouchableOpacity>
        )}
        {props?.Heading1 && (
          <TouchableOpacity onPress={() => props?.Action}>
            <Text
              allowFontScaling={false}
              numberOfLines={1}
              style={[styles.HeaderText1, props.HeaderStyle]}
            >
              {props?.Heading1}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  MainContainer: {
    flexDirection: "row",
    width: WIDTH,
    alignSelf: "center",
    height: HEIGHT * 0.072,
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 11,
    backgroundColor: COLORS.ORANGE,
  },
  BackHeader: {
    alignItems: "center",
    justifyContent: "center",
    height: 41,
    width: 50,
  },
  HeaderText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.bold,
    fontSize: 18,
    width: WIDTH * 0.78,
    // width:'85%',
    alignSelf: "center",
    textAlign: "center",
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  HeaderText1: {
    textAlign: "center",
    color: COLORS.WHITE,
    fontFamily: FONTS.bold,
    fontSize: 14,
    marginLeft: "0%",
    alignSelf: "flex-end",
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
});
