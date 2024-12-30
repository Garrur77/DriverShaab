import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { COLORS, FONTS, IMAGEPATH, VECTOR_ICONS } from "../../assets/Theme";
import Header from "../../Components/HeaderComponent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
import { ANDROID, IOS } from "../../Helpers/Platform";

const ChatScreen = (props: any) => {
  const { t } = useTranslation();

  const [msg, setmsg] = useState("");

  const ToScreenNavigation = () => {
    props.navigation.navigate("HomeOnline");
  };
  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
      <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} />
      <SafeAreaView style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
        <Header navigation={props?.navigation} />
        <View style={styles.viewStyle}>
          <View style={styles.HeadinVIEW}>
            <Text style={styles.textStyle}>Gregory Smith</Text>
            <Image
              style={styles.Profile_Heading}
              source={IMAGEPATH.DriverImage}
            />
          </View>
        </View>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.Botth_VIEW}>
            <View
              style={{
                alignSelf: "center",
                width: WIDTH * 0.92,
                //backGroundColor:'red'
              }}
            >
              <Image style={styles.Chat1STYLE} source={IMAGEPATH.Chat1} />
              <Image style={styles.Chat2STYLE} source={IMAGEPATH.Chat2} />
              <Image style={styles.Chat3STYLE} source={IMAGEPATH.Chat3} />
              <Image style={styles.Chat4STYLE} source={IMAGEPATH.Chat4} />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: "1%",
                backgroundColor: "rgba(239, 239, 244, 0.4)",
                paddingVertical: "2%",
                borderWidth: 1,
                borderColor: "rgba(239, 239, 244, 1)",
              }}
            >
              <View style={styles.inputStyle}>
                <TextInput
                  placeholder={t("Type a message...")}
                  placeholderTextColor={"#C8C7CC"}
                  style={{
                    width: WIDTH * 0.8,
                    alignSelf: "center",
                    borderRadius: 8,
                    borderColor: "#EFEFF4",
                    borderWidth: 1,
                    paddingLeft: "5%",
                    paddingRight: "5%",
                    height: 40,
                    color: "#000",
                    backgroundColor: "#FFFFFF",
                  }}
                  value={msg}
                  onChangeText={(text) => setmsg(text)}
                />

                <TouchableOpacity style={{}}>
                  <VECTOR_ICONS.MaterialIcons
                    name="send"
                    size={30}
                    color={COLORS.ORANGE}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: FONTS.bold,
    fontSize: 34,
    color: COLORS.WHITE,
  },
  viewStyle: {
    backgroundColor: COLORS.ORANGE,
    paddingBottom: "5%",
  },
  inputStyle: {
    color: "rgba(0, 0, 0, 1)",
    fontSize: 17,
    fontFamily: FONTS.medium,
    marginLeft: "2%",
    width: WIDTH * 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  Profile_Heading: {
    width: WIDTH * 0.15,
    height: HEIGHT * 0.075,
    resizeMode: "contain",
    // backgroundColor:'blue'
  },
  HeadinVIEW: {
    alignItems: "center",
    width: WIDTH * 0.92,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: IOS ? -15 : -10,
    // backgroundColor:'red',
    paddingVertical: 10,
  },
  Chat1STYLE: {
    width: WIDTH * 0.55,
    height: HEIGHT * 0.2,
    resizeMode: "contain",
    alignSelf: "flex-end",
  },
  Chat2STYLE: {
    width: WIDTH * 0.55,
    height: HEIGHT * 0.2,
    resizeMode: "contain",
    alignSelf: "flex-start",
    position: "absolute",
    marginTop: "18%",
  },
  Chat3STYLE: {
    width: WIDTH * 0.6,
    height: HEIGHT * 0.18,
    resizeMode: "contain",
    alignSelf: "flex-end",
    position: "absolute",
    marginTop: "40%",
  },
  Chat4STYLE: {
    width: WIDTH * 0.6,
    height: HEIGHT * 0.18,
    resizeMode: "contain",
    alignSelf: "flex-start",
    position: "absolute",
    marginTop: "68%",
  },
  Botth_VIEW: {
    justifyContent: "space-between",
    height: ANDROID ? HEIGHT * 0.8 : HEIGHT * 0.75,
    marginBottom: "3%",
  },
});
