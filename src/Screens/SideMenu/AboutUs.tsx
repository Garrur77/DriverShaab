import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  StatusBar,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderComponent from "../../Components/HeaderComponent";
import { COLORS, FONTS, VECTOR_ICONS } from "../../assets/Theme";
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
import { callGetApi } from "../../Components/ApiConfig/ApiCall";
import { STATIC_CONTENT } from "../../Components/ApiConfig/EndPoints";
import SpinningLoader from "../../assets/SpinningLoader";
import HTMLView from "react-native-htmlview";
import { useIsFocused } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
const AboutUs = (props: any) => {
  const [Loader, setLoader] = useState(false);
  const [staticData, setStaticData] = useState([]);
  const AboutUsDATA = [
    {
      id: 1,
      heder: "In publishing and graphic design?",
      text: "In publishing and graphic design, Lorem ipsum is a pla ce holder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
      text1:
        "In publishing and graphic design, Lorem ipsum is a pla ce holder text commonly used to demonstrate.",
    },
    {
      id: 2,
      heder: "In publishing and graphic design?",
      text: "In publishing and graphic design, or a typeface with out relying on meaningful content.",
      text1:
        "Various versions have evolved over the years, sometimes by accident,Various versions have evolved over the years, sometimes by accident,",
      text2:
        "In publishing and graphic design, or a typeface with out relying on meaningful content.",
      num: "1. ",
      num2: "2. ",
      num3: "3. ",
    },
    {
      id: 3,
      heder: "In publishing and graphic design?",
      text: "In publishing and graphic design, Lorem ipsum is a pla ce holder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.In publishing and graphic design.",
      text1:
        "In publishing and graphic design, Lorem ipsum is a pla ce holder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.In publishing holder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.In publishing and graphic design.",
    },
  ];
  let screenName = props?.route?.params?.ScreenHeder_;
  const isFocused = useIsFocused();
  const getStaticData = async () => {
    setLoader(true);
    try {
      const { response, error, loading } = await callGetApi(STATIC_CONTENT);
      if (!error && response?.responseCode === 200) {
        console.log("getStaticData responseresponse", response);
        setLoader(false);
        // console.log("resss", response);

        if (screenName == "About Us") {
          setStaticData(
            response?.data?.filter((item) => item.type === "About Us")
          );
        } else if (screenName == "Legal") {
          setStaticData(
            response?.data?.filter((item) => item.type === "privacy And Policy")
          );
        } else {
          setStaticData(
            response?.data?.filter((item) => item.type === "Terms & conditions")
          );
        }
      } else {
        setLoader(false);
        console.log("API Error:", error);
      }
      setLoader(false);
    } catch (error: any) {
      setLoader(false);
      console.log("Error during aboutus data fetch:", error, error.response);
    }
  };
  console.log({ staticData });
  useEffect(() => {
    const nav = props.navigation.addListener("focus", () => {
      return nav;
    });
    getStaticData();
  }, [props.navigation, isFocused]);
  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
      <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} />
      <SafeAreaView style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
        {/* <HeaderComponent
          Heading={props?.route?.params?.ScreenHeder_}
          navigation={props.navigation}
        /> */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              setTimeout(() => {
                props.navigation.navigate("MyDrawer", {
                  screen: "Setting",
                });
              }, 0);
            }}
          >
            <VECTOR_ICONS.Ionicons
              name="chevron-back"
              size={26}
              color={"#fff"}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>
            {props?.route?.params?.ScreenHeder_}
          </Text>
          <View />
        </View>

        <FlatList
          data={staticData}
          showsVerticalScrollIndicator={false}
          bounces={false}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                height: HEIGHT * 0.4,
                justifyContent: "flex-end",
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  textAlign: "center",
                  color: "rgba(0, 0, 0, 0.6)",
                  fontSize: 14,
                  fontFamily: FONTS.light,
                }}
              >
                No data found
              </Text>
            </View>
          }
          renderItem={(item: any) => {
            return (
              <View key={item?.title} style={style.mainView}>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <HTMLView
                    value={item?.item?.description}
                    stylesheet={styles}
                  />
                </View>
              </View>
            );
          }}
        />
      </SafeAreaView>
      <SpinningLoader loader={Loader} />
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default AboutUs;
const style = StyleSheet.create({
  mainView: {
    width: WIDTH * 0.9,
    alignSelf: "center",
    // paddingVertical: Platform.OS === "ios" ? "1.0%" : "3.5%",
    paddingVertical: 15,
  },
  // textStyle: {
  //   fontSize: 16,
  //   fontFamily: FONTS.bold,
  //   color: COLORS.BuleText,
  //   paddingVertical: "3.5%",
  //   fontWeight: Platform.OS === "ios" ? "600" : "400",
  // },
  // textStyle1: {
  //   fontSize: 14,
  //   fontFamily: FONTS.light,
  //   color: "rgba(0, 0, 0, 0.6)",
  //   paddingVertical: Platform.OS === "ios" ? "1%" : "2%",
  //   lineHeight: 20,
  // },
});

const styles = StyleSheet.create({
  mainView: {
    width: WIDTH * 0.9,
    alignSelf: "center",
    paddingVertical: "3.5%",
  },
  text: {
    fontSize: 14,
    color: "#242E42",
    marginTop: Platform.OS === "ios" ? 0 : 10,
    // fontFamily: "AirbnbCerealMedium",
  },
  textStyle: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.BuleText,
    paddingVertical: "3.5%",
  },
  p: {
    color: "#242E42", // make links coloured pink
    lineHeight: 20,
    fontSize: 15,
  },
  textStyle1: {
    fontSize: 12,
    fontFamily: FONTS.light,
    color: "rgba(0, 0, 0, 0.6)",
    paddingVertical: "2%",
    lineHeight: 20,
  },
  emptyListComponent: {
    flex: 1,
    backgroundColor: "#ffff",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 20,
  },
  emptyListText: {
    fontSize: 16,
    color: "#555", // Customize the color
  },
  header: {
    backgroundColor: COLORS.ORANGE,
    flexDirection: "row",
    width: WIDTH,
    paddingHorizontal: 16,
    height: HEIGHT * 0.072,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.bold,
    fontSize: 18,
  },
});
