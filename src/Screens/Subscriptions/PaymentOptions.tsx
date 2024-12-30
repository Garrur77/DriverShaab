import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  FlatList,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";

import HeaderComponent from "../../Components/HeaderComponent";
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
import { COLORS, FONTS, IMAGEPATH, VECTOR_ICONS } from "../../assets/Theme";
import { RootState } from "../../ReduxConfig/Store";
import { useSelector } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
import SpinningLoader from "../../assets/SpinningLoader";

import WholeButton from "../../Components/WholeButton";
import UploadSvgImage from "../../Components/ProfileSvg/UploadSvgImage";

const PaymentOptions = (props: any) => {
  const { userData, userTokenAndId } = useSelector(
    (state: RootState) => state?.TokenUserID_DETAILS
  );
  // const { userId } = useSelector(
  //   (state: RootState) => state?.TokenUserID_DETAILS?.userTokenAndId
  // );
  // console.log({ userData, userTokenAndId });
  const [Loader, setLoader] = useState(false);
  const [driverData, setDriverData] = useState([]);
  const [showImage, setShowImage] = useState(true);
  const [method, setMethod] = useState("Online");
  const [TextSecure, setTextSecure] = useState(true);

  const onSelectImage = (type: String) => {
    if (Platform.OS === "ios" || Platform.OS === "android") {
      Alert.alert("Upload Image", "Choose an option", [
        {
          text: "Camera",
          onPress: () => {
            onCamera(type);
          },
        },
        {
          text: "Photo",
          onPress: () => {
            openGallery(type);
          },
        },
        { text: "Cancel", onPress: () => {} },
      ]);
    }
  };
  const openGallery = (title: any) => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: "photo",
      includeBase64: true,
      quality: "high",
    })
      .then((image: ImageData) => {
        // setFlatListImageError(undefined);
        // UploadImageFLATLIST(image, title);
      })
      .catch((error) => {
        console.log("Error selecting image:", error);
        // setFlatListImageError("Error selecting image");
      });
  };

  const onCamera = (type: String) => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: "photo",
      includeBase64: true,
      quality: "high",
    })
      .then((image) => {
        // setSelectedImage(image.path);
        // UploadImagePCOLicens(image, type);
      })
      .catch((error) => {
        console.log("onCamera---->", error);
      });
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
      <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} />
      <SafeAreaView style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
        <HeaderComponent Heading="Plan Detail" navigation={props.navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.mainView}
        >
          <Text
            allowFontScaling={false}
            style={{ ...styles.heading, paddingBottom: 10 }}
          >
            Payment Method:
          </Text>

          <View style={{ flexDirection: "row", columnGap: 10, marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                columnGap: 8,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setMethod("Online");
                }}
                style={{}}
              >
                {method == "Online" ? (
                  <>
                    <VECTOR_ICONS.Fontisto
                      name="radio-btn-active"
                      size={20}
                      color={method == "Online" ? COLORS.ORANGE : COLORS.GRAY}
                    />
                  </>
                ) : (
                  <>
                    <VECTOR_ICONS.Fontisto
                      name="radio-btn-passive"
                      size={20}
                      color={COLORS.GRAY}
                    />
                  </>
                )}
              </TouchableOpacity>
              <Text allowFontScaling={false}>Online</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                columnGap: 8,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setMethod("Offline");
                }}
              >
                {method == "Offline" ? (
                  <>
                    <VECTOR_ICONS.Fontisto
                      name="radio-btn-active"
                      size={20}
                      color={method == "Offline" ? COLORS.ORANGE : COLORS.GRAY}
                    />
                  </>
                ) : (
                  <>
                    <VECTOR_ICONS.Fontisto
                      name="radio-btn-passive"
                      size={20}
                      color={COLORS.GRAY}
                    />
                  </>
                )}
              </TouchableOpacity>
              <Text allowFontScaling={false}>Offline</Text>
            </View>
          </View>
          <Text
            allowFontScaling={false}
            style={{ ...styles.LabelTEXT, paddingTop: 20 }}
          >
            Upload the receipt
          </Text>
          <View style={styles.UploadViewSTYLE}>
            <TextInput
              allowFontScaling={false}
              placeholder="Upload the receipt"
              placeholderTextColor={COLORS.PLACEHOLDERCOLOR}
              keyboardType="number-pad"
              maxLength={16}
              editable={false}
              secureTextEntry={TextSecure}
              style={styles.PhoneTextInput}
            />
            <View style={{ flexDirection: "row" }}>
              {/* baad me */}

              {showImage == false ? (
                <>
                  <TouchableOpacity
                    onPress={() => setTextSecure(!TextSecure)}
                    // style={styles.UploadButton}
                  >
                    <VECTOR_ICONS.Feather
                      name={TextSecure == true ? "eye-off" : "eye"}
                      color={COLORS.BLUE2}
                      size={18}
                    />
                    <Text allowFontScaling={false} style={styles.uploadTEXT}>
                      View
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => onSelectImage("PCO_VEHICAL_LICENSE_DOC")}
                    style={styles.UploadButton}
                  >
                    <UploadSvgImage />
                    <Text allowFontScaling={false} style={styles.uploadTEXT}>
                      Upload
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
          <WholeButton
            Label="SEND"
            styles={{ alignSelf: "center", marginTop: 30 }}
            Action={() => props.navigation.navigate("Plans")}
          />
        </ScrollView>
      </SafeAreaView>
      <SpinningLoader loader={Loader} />

      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default PaymentOptions;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignSelf: "center",
    width: WIDTH,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.BLACK,
    fontWeight: "500",
  },
  mainContainer: {
    backgroundColor: COLORS.WHITE,
    width: "100%",
    height: 80,
    shadowColor: "##EFEFF4",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
  },
  subContainer: {
    backgroundColor: COLORS.GREEN2,
    width: "100%",
    height: 35,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    paddingHorizontal: 10,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  btnView: {
    width: "100%",
    alignItems: "center",
    height: 45,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Btn: {
    backgroundColor: COLORS.BLUE1,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 7,
    borderRadius: 8,
  },
  btnText: {
    color: COLORS.WHITE,
    fontSize: 14,
    fontFamily: FONTS.medium,
    fontWeight: "600",
  },
  whiteText: {
    color: COLORS.WHITE,
    fontSize: 14,
    fontFamily: FONTS.medium,
    fontWeight: "600",
  },
  blackText: {
    fontSize: 14,
    color: COLORS.BLACK3,
    fontFamily: FONTS.medium,
    paddingLeft: 10,
  },
  UploadViewSTYLE: {
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.UPLOADBorderCOLOR,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  LabelTEXT: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.BLACK3,
    paddingVertical: "2.5%",
  },
  PhoneTextInput: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    paddingLeft: 10,
    color: COLORS.BLACK,
    fontSize: 15,
    fontFamily: FONTS.semibold,
  },
  UploadButton: {
    backgroundColor: COLORS.UPLOADBorderCOLOR,
    width: WIDTH * 0.2,
    paddingVertical: "3%",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  uploadTEXT: {
    color: COLORS.BLUE2,
    fontSize: 11,
    fontFamily: FONTS.light,
  },
});
