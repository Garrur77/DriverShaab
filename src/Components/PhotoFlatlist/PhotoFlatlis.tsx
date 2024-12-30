import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import UploadSvgImage from "../ProfileSvg/UploadSvgImage";
import { COLORS, FONTS } from "../../assets/Theme";
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";

const PhotoFlatlis = (props) => {
  const { item, openGallery_, setItem } = props;

  return (
    <>
      {item.image ? (
        <View style={styles.UploadView}>
          <Image
            source={{ uri: item?.image?.path || item?.image }}
            style={styles.UploadView}
          />
          <TouchableOpacity
            style={{
              ...styles.FlatListUploadButton,
              position: "absolute",
              bottom: 10,
              width: WIDTH * 0.14,
              height: 26,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.7)",
              borderRadius: 100,
              borderWidth: 0,
            }}
            onPress={() =>
              setTimeout(() => {
                openGallery_(item?.title);
              }, 100)
            }
          >
            <Text
              allowFontScaling={false}
              style={{ fontSize: 12, marginTop: -4, color: "#3087D7" }}
            >
              Retake
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.UploadView}>
          <Text allowFontScaling={false} style={styles.GETText}>
            {item.title}
          </Text>
          <TouchableOpacity
            style={styles.FlatListUploadButton}
            onPress={() =>
              setTimeout(() => {
                openGallery_(item?.title);
              }, 100)
            }
          >
            <UploadSvgImage />
            <Text allowFontScaling={false} style={styles.uploadTEXT}>
              Upload
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default PhotoFlatlis;

const styles = StyleSheet.create({
  UploadView: {
    height: HEIGHT * 0.13,
    width: WIDTH * 0.25,
    borderWidth: 1,
    borderColor: COLORS.UPLOADBorderCOLOR,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
    margin: 5,
    position: "relative",
  },
  FlatListUploadButton: {
    backgroundColor: COLORS.UPLOADBorderCOLOR,
    width: WIDTH * 0.12,
    paddingVertical: "5%",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.UPLOADBorderCOLOR,
  },
  GETText: {
    color: COLORS.PLACEHOLDERCOLOR2,
    fontSize: 13,
    fontFamily: FONTS.medium,
  },
  uploadTEXT: {
    color: COLORS.BLUE2,
    fontSize: 10,
    fontFamily: FONTS.light,
  },
});
