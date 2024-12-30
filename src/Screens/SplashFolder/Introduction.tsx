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
  Platform,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS, IMAGEPATH, VECTOR_ICONS } from "../../assets/Theme";
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
import WholeButton from "../../Components/WholeButton";
import SmsRetriever from "react-native-sms-retriever";
import { CommonActions } from "@react-navigation/native";
import VideoPlayer from "react-native-video-player";
import { useTranslation } from "react-i18next";

const Introduction = (props: any) => {
  const { t } = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      // setModalVisible(true);
      // _onPhoneNumberPressed()
    }, 500);
  }, []);

  // const _onPhoneNumberPressed = async () => {
  //   console.log('Yess');

  //   try {
  //     const phoneNumber = await SmsRetriever.requestPhoneNumber();

  //     console.log(phoneNumber, 'SELECTED>>');

  //   } catch (error) {
  //     console.log(JSON.stringify(error));
  //   }
  // };

  const OnStartedPress = () => {
    // props.navigation.navigate("Register");

    setModalVisible(false);
    setTimeout(() => {
      props?.navigation?.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    }, 500);
  };

  const openLink = () => {
    Linking.openURL("https://youtu.be/qeStdcy9mng?si=-eDZ6YKEu2nG3lLH");
  };

  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor:
            modalVisible == true ? "rgba(0,0,0,0.65)" : COLORS.WHITE,
        }}
      ></SafeAreaView>
      <StatusBar
        backgroundColor={
          modalVisible == true ? "rgba(0,0,0,0.65)" : COLORS.WHITE
        }
        barStyle={"dark-content"}
      />
      <SafeAreaView
        style={{
          backgroundColor:
            modalVisible == true ? "rgba(0,0,0,0.65)" : COLORS.WHITE,
          flex: 1,
        }}
      >
        <Text allowFontScaling={false} style={styles.Heading}>
          {t("Introduction")}
        </Text>
        <Text allowFontScaling={false} style={styles.HeadingText}>
          {t("Know your customer in advance and view their current")}
          {t("location on the map in real time.")}
        </Text>
        {modalVisible == false && (
          <View
            style={{
              width: WIDTH * 0.9,
              height: HEIGHT * 0.4,
              alignSelf: "center",
              marginTop: "10%",
            }}
          >
            {/* <TouchableOpacity
              onPress={() => openLink()}
              style={styles.VideoButton}
            >
              <Image style={styles.VideoImage} source={IMAGEPATH.IntroVidio} />
            </TouchableOpacity> */}
            <View
              style={{
                overflow: "hidden",
                borderRadius: 10,
              }}
            >
              {/* <VideoPlayer
                video={require("../../assets/Images/car.mp4")}
                videoWidth={45}
                videoHeight={40}
                thumbnail={IMAGEPATH.IntroVidio}
                pauseOnPress={true}
                // onPlayPress={() => onPause(videoData)}
                disableFullscreen={true}
                disableSeek={true}
                seekBarProgress={0.5}
                // showDuration={true}
                resizeMode={"cover"}
              /> */}
              <VideoPlayer
                video={require("../../assets/Images/car.mp4")}
                videoWidth={45}
                videoHeight={40}
                thumbnail={IMAGEPATH.IntroVidio}
                pauseOnPress={true}
                disableFullscreen={true}
                disableSeek={true}
                seekBarProgress={0.5}
                resizeMode={"cover"}
                autoplay={true} // This will make the video play automatically
              />
            </View>
          </View>
        )}
        {modalVisible == false && (
          <WholeButton
            // Label="GET STARTED!"
            Label={t("GET STARTED")}
            styles={[
              styles.StartButton,
              {
                marginTop: modalVisible == true ? "110%" : "8%",
                backgroundColor:
                  modalVisible == true ? "#f6b138" : COLORS.YELLOW,
              },
            ]}
            Action={() => OnStartedPress()}
          />
        )}
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              // Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text allowFontScaling={false} style={styles.modalText}>
                  {t("Continue With")}
                </Text>

                <TouchableOpacity
                  style={styles.CommonNumberStyle}
                  onPress={() => (setModalVisible(false), OnStartedPress())}
                >
                  <View style={styles.commonNumberstyle1}>
                    <VECTOR_ICONS.FontAwesome
                      name="phone"
                      size={25}
                      color={COLORS.BuleText}
                    />
                    <Text allowFontScaling={false} style={styles.modalText1}>
                      9934142144
                    </Text>
                  </View>
                  <Text allowFontScaling={false} style={styles.modalText2}>
                    SIM 1
                  </Text>
                </TouchableOpacity>
                <View style={styles.Line}></View>
                <TouchableOpacity
                  style={styles.CommonNumberStyle}
                  onPress={() => (setModalVisible(false), OnStartedPress())}
                >
                  <View style={styles.commonNumberstyle1}>
                    <VECTOR_ICONS.FontAwesome
                      name="phone"
                      size={25}
                      color={COLORS.BuleText}
                    />
                    <Text allowFontScaling={false} style={styles.modalText1}>
                      9934142144
                    </Text>
                  </View>
                  <Text allowFontScaling={false} style={styles.modalText2}>
                    SIM 1
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text allowFontScaling={false} style={styles.textStyle}>
                    {t("None of the above")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* <TouchableOpacity
          style={[styles.button, styles.buttonOpen]}
          onPress={() => _onPhoneNumberPressed()}>
          <Text allowFontScaling={false} style={styles.textStyle}>Show Modal</Text>
        </TouchableOpacity> */}
        </View>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default Introduction;

const styles = StyleSheet.create({
  Heading: {
    color: COLORS.BLACK2,
    fontSize: 30,
    fontFamily: FONTS.bold,
    textAlign: "center",
    paddingTop: "8%",
    fontWeight: Platform.OS === "ios" ? "600" : "400",
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
  },
  modalView: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 15,
    padding: 15,

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
    lineHeight: 15,
    paddingVertical: "4.5%",
    width: WIDTH * 0.42,
    fontFamily: FONTS.medium,
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
