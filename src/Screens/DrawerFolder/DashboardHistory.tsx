import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Header from "../../Components/HeaderComponent";
import { COLORS, FONTS } from "../../assets/Theme";
import HistoryComponent from "./HistoryComponent";
import DashboardComponent from "./DashboardComponent";
import ScheduledRideComponent from "./ScheduledRideComponent";
import { useTranslation } from "react-i18next";

const DashboardHistory = (props: any) => {
  const { t } = useTranslation();
  const [select, setselect] = useState(0);
  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
      <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} />
      <SafeAreaView style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
        <Header
          Heading={t("Dashboard History")}
          navigation={props.navigation}
        />
        <View style={styles.ButtonView}>
          <TouchableOpacity
            onPress={() => {
              setselect(0);
            }}
            style={[
              styles.DashBordButton,
              {
                backgroundColor:
                  select == 0 ? COLORS.SuccessText : COLORS.GRAY5,
              },
            ]}
          >
            <Text
              allowFontScaling={false}
              style={[
                styles.DashBordTEXT,
                { color: select == 0 ? COLORS.WHITE : COLORS.BLACK3 },
                { fontSize: select == 0 ? 15 : 14 },
                { fontWeight: Platform.OS === "ios" ? "600" : "400" },
              ]}
            >
              {t("Dashboard")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setselect(1);
            }}
            style={[
              styles.DashBordButton,
              {
                backgroundColor:
                  select == 1 ? COLORS.SuccessText : COLORS.GRAY5,
              },
            ]}
          >
            <Text
              allowFontScaling={false}
              style={[
                styles.DashBordTEXT,
                { color: select == 1 ? COLORS.WHITE : COLORS.BLACK3 },
                { fontSize: select == 1 ? 15 : 14 },
                { fontWeight: Platform.OS === "ios" ? "600" : "400" },
              ]}
            >
              {t("History")}
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => {
              setselect(2);
            }}
            style={[
              styles.DashBordButton,
              {
                backgroundColor:
                  select == 2 ? COLORS.SuccessText : COLORS.GRAY5,
              },
            ]}
          >
            <Text allowFontScaling={false}
              style={[
                styles.DashBordTEXT,
                { color: select == 2 ? COLORS.WHITE : COLORS.BLACK3 },
                { fontSize: select == 2 ? 15 : 14 },
                { fontWeight: Platform.OS === "ios" ? "600" : "400" },
              ]}
            >
              Scheduled Ride
            </Text>
          </TouchableOpacity> */}
        </View>

        {select == 0 && <DashboardComponent navigation={props.navigation} />}
        {select == 1 && <HistoryComponent />}
        {select == 2 && <ScheduledRideComponent />}
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default DashboardHistory;

const styles = StyleSheet.create({
  DashBordButton: {
    paddingVertical: "3%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    zIndex: 1,
  },
  DashBordTEXT: { fontFamily: FONTS.medium, textAlign: "center" },
});
