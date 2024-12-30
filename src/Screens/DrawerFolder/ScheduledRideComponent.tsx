import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS, VECTOR_ICONS } from "../../assets/Theme";
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
import HistoryFilterComponent from "../../Components/HistoryFilterComponent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Line, Svg } from "react-native-svg";
import { useSelector } from "react-redux";
import { RootState } from "../../ReduxConfig/Store";
import axios from "axios";
import { DriverRideHistory } from "../../Components/ApiConfig/EndPoints";
import { showMessage } from "react-native-flash-message";

const ScheduledRideComponent = (props: any) => {
  const getToken = useSelector((state: RootState) => state.TOKEN_);
  const [openRb, setopenRb] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    console.log("openRb", openRb);
  }, []);

  const getHistoryDetails = async () => {
    setLoader(true);
    try {
      const res = await axios({
        method: "get",
        url: DriverRideHistory,
        headers: {
          token: getToken.Token,
        },
      });
      if (res?.data?.responseCode === 200) {
        // showMessage({
        //   type: "success",
        //   icon: "success",
        //   message: res?.data?.message,
        // });
        setHistoryData(res?.data);
        console.log(
          "history details response---<<<<>>>>",
          res?.data?.getAllRides
        );
        setLoader(false);
      }
    } catch (error) {
      // if (error?.responseCode === 404){
      //   showMessage({
      //     type:'success',
      //     icon:'success',
      //     message:error?.data?.responseMessage
      //   })
      //   console.log('announcements response---<<<<>>>>',res)

      // }
      console.log("history details error--->>", error);
      setLoader(false);
    }
  };

  useEffect(() => {
    getHistoryDetails();
  }, [props.navigation]);

  const DATA = [
    {
      id: "1",
      title: "First Item",
      CREATED_AT: "21-09-2023 : 10:23 AM",
      FROM_LOCATION: "Govindpuri Gali no 9...",
      TO_LOCATION: "Okhla Phase D Block...",
      Name: "Pallavi Singh",
      NAME_ID: "6365352312",
      Status: "Completed",
      AMOUNT: "$567",
    },
    {
      id: "2",
      title: "Second Item",
      CREATED_AT: "21-09-2023 : 10:23 AM",
      FROM_LOCATION: "Govindpuri Gali no 9...",
      TO_LOCATION: "Okhla Phase D Block...",
      Name: "Pallavi Singh",
      NAME_ID: "6365352312",
      Status: "Completed",
      AMOUNT: "$567",
    },
    {
      id: "3",
      title: "Third Item",
      CREATED_AT: "21-09-2023 : 10:23 AM",
      FROM_LOCATION: "Govindpuri Gali no 9...",
      TO_LOCATION: "Okhla Phase D Block...",
      Name: "Pallavi Singh",
      NAME_ID: "6365352312",
      Status: "Cancel",
      AMOUNT: "$567",
    },
    {
      id: "4",
      title: "Third Item",
      CREATED_AT: "21-09-2023 : 10:23 AM",
      FROM_LOCATION: "Govindpuri Gali no 9...",
      TO_LOCATION: "Okhla Phase D Block...",
      Name: "Pallavi Singh",
      NAME_ID: "6365352312",
      Status: "Completed",
      AMOUNT: "$567",
    },
    {
      id: "5",
      title: "Third Item",
      CREATED_AT: "21-09-2023 : 10:23 AM",
      FROM_LOCATION: "Govindpuri Gali no 9...",
      TO_LOCATION: "Okhla Phase D Block...",
      Name: "Pallavi Singh",
      NAME_ID: "6365352312",
      Status: "Completed",
      AMOUNT: "$567",
    },
  ];

  const RenderNotification = ({ item }) => {
    return (
      <View>
        <View style={{}}>
          <View
            style={[
              styles.CreatedAtVIEW,
              {
                backgroundColor:
                  item.id == 3 ? COLORS.SuccessText : COLORS.GREEN2,
              },
            ]}
          >
            <View style={styles.CreatedAtVIEW2}>
              <Text allowFontScaling={false} style={styles.CreatedAtTEXT}>
                {item.CREATED_AT}
              </Text>
              <Text allowFontScaling={false} style={styles.CreatedAtTEXT}>
                {item.Status}
              </Text>
            </View>
          </View>
          <View style={styles.MainView_}>
            <View
              style={{
                flexDirection: "row",
                width: WIDTH * 0.5,
                justifyContent: "space-around",
              }}
            >
              <View>
                <VECTOR_ICONS.FontAwesome6
                  name="location-dot"
                  size={15}
                  color={COLORS.ORANGE}
                />
                <View style={{ height: 20 }}>
                  <Svg width={2} height="100%" style={styles.dashedLine}>
                    <Line
                      x1="1"
                      y1="0"
                      x2="1"
                      y2="100%"
                      stroke="gray"
                      strokeWidth={1}
                      strokeDasharray="5 4"
                    />
                  </Svg>
                </View>
                <VECTOR_ICONS.FontAwesome6
                  name="location-dot"
                  size={15}
                  color={COLORS.ORANGE}
                />
              </View>
              {/* <View style={{ justifyContent: "space-between" }}>
                <Text allowFontScaling={false} style={styles.LocationTEXT}>
                  {item.FROM_LOCATION}
                </Text>
                <Text allowFontScaling={false} style={styles.LocationTEXT}>
                  {item.TO_LOCATION}
                </Text>
              </View> */}
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "column" }}>
                  <Text
                    allowFontScaling={false}
                    style={styles.LocationTEXT}
                    numberOfLines={3}
                  >
                    {item.FROM_LOCATION}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={styles.LocationTEXT}
                    numberOfLines={3}
                  >
                    {item.TO_LOCATION}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text allowFontScaling={false} style={styles.AmountTEXT}>
                {item.AMOUNT}
              </Text>
            </View>
          </View>

          <View style={styles.NameID_View}>
            <Text allowFontScaling={false} style={styles.NameTEXT}>
              {item.Name}
            </Text>
            <Text allowFontScaling={false} style={styles.NameTEXT}>
              {item.NAME_ID}
            </Text>
          </View>

          <View
            style={{
              borderBottomColor: "rgba(236, 236, 236, 1)",
              borderBottomWidth: 3,
            }}
          ></View>
        </View>
      </View>
    );
  };
  console.log("historyData.length", historyData.length);
  return (
    <SafeAreaView style={styles.mainComponent}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        {/* <View style={styles.EarningVIEW}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
            }}
          >
            <Text allowFontScaling={false} style={styles.EarningTEXT}>Today Earnings :</Text>

            <Text allowFontScaling={false} style={styles.Earning}>$00</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
              right: 10,
            }}
          >
            <Text allowFontScaling={false} style={styles.EarningTEXT}>Today Rides :</Text>
            <Text allowFontScaling={false} style={styles.Earning}>0</Text>
          </View>
        </View> */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 0,
            marginTop: 10,
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: COLORS.GRAY7 }} />
          <View style={{ flex: 1, height: 1, backgroundColor: COLORS.GRAY7 }} />
        </View>
        {historyData.length > 0 && (
          <View style={styles.FilterVIEW}>
            <Text allowFontScaling={false} style={styles.DateTEXT}>
              21-09-2023
            </Text>
            <TouchableOpacity onPress={() => setopenRb(true)}>
              <VECTOR_ICONS.FontAwesome
                name={"filter"}
                size={20}
                color={COLORS.GRAY4}
              />
            </TouchableOpacity>
          </View>
        )}

        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={historyData}
            contentContainerStyle={{ flex: 1 }}
            renderItem={(item) => RenderNotification(item)}
            keyExtractor={(item: any) => item.id}
            ListEmptyComponent={() => (
              <View
                style={{
                  height: HEIGHT * 0.7,
                  backgroundColor: "#ffff",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  allowFontScaling={false}
                  style={{
                    color: "#000",
                    fontSize: 14,
                    fontFamily: FONTS.medium,
                  }}
                >
                  No data found
                </Text>
              </View>
            )}
          />
        </View>
        {/* <HistoryFilterComponent open={openRb} /> */}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ScheduledRideComponent;

const styles = StyleSheet.create({
  dashedLine: {
    marginTop: 5,
    alignSelf: "center",
  },
  mainComponent: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingBottom: "3%",
  },
  EarningTEXT: {
    color: COLORS.GRAY6,
    fontFamily: FONTS.light,
    fontSize: 12,
  },
  Earning: {
    color: COLORS.DARK_BLACK,
    fontFamily: FONTS.bold,
    fontSize: 16,
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },

  EarningVIEW: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: WIDTH * 0.95,
    alignSelf: "center",
    paddingVertical: "5.5%",
    paddingHorizontal: "2%",
  },
  DateTEXT: {
    color: COLORS.DARK_BLACK,
    fontFamily: FONTS.bold,
    fontSize: 14,
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  FilterVIEW: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: WIDTH * 0.9,
    alignSelf: "center",
    paddingVertical: "4.5%",
  },

  CreatedAtTEXT: {
    color: COLORS.WHITE,
    fontSize: 12,
    fontFamily: FONTS.light,
    paddingVertical: "2.5%",
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  CreatedAtVIEW: {
    backgroundColor: COLORS.GREEN2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  CreatedAtVIEW2: {
    width: WIDTH * 0.9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    paddingVertical: 3,
    paddingHorizontal: 5,
  },

  LocationTEXT: {
    color: COLORS.SuccessText,
    fontSize: 14,
    fontFamily: FONTS.medium,
    marginBottom: 8,
    backgroundColor: "red",
  },
  ConfirmButton: {
    backgroundColor: COLORS.GREEN1,
    paddingVertical: "2.5%",
    width: WIDTH * 0.22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  ButtonTEXT: {
    color: COLORS.WHITE,
    fontSize: 13,
    fontFamily: FONTS.medium,
  },

  RegectButton: {
    backgroundColor: COLORS.SuccessText,
    paddingVertical: "2.5%",
    width: WIDTH * 0.22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  MainView_: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopColor: COLORS.UPLOADBorderCOLOR,
    borderTopWidth: 1,
    paddingTop: "2.9%",
    borderBottomColor: COLORS.UPLOADBorderCOLOR,
    borderBottomWidth: 1,
    paddingBottom: "4%",
    width: WIDTH * 0.92,
    alignSelf: "center",
  },
  NameTEXT: {
    color: COLORS.SuccessText,
    fontSize: 14,
    fontFamily: FONTS.light,
  },
  AmountTEXT: {
    color: COLORS.GREEN2,
    fontSize: 16,
    fontFamily: FONTS.bold,
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  NameID_View: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: "2%",
    width: WIDTH * 0.9,
    alignSelf: "center",
  },
  UnfortunatelyTEXT: {
    color: COLORS.SuccessText,
    fontSize: 14,
    fontFamily: FONTS.medium,
    lineHeight: 17,
    width: WIDTH * 0.9,
    alignSelf: "center",
    paddingVertical: "4%",
  },
});
