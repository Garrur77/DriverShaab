import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
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
import moment from "moment";
import RBSheet from "react-native-raw-bottom-sheet";
import SpinningLoader from "../../assets/SpinningLoader";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import OrangeImage from "../../Components/OrangeImage";
import { roundOff } from "../../Utils/RoundOff";
import { useTranslation } from "react-i18next";

const HistoryComponent = (props: any) => {
  const { t } = useTranslation();
  const getToken = useSelector((state: RootState) => state.TOKEN_);
  const [openRb, setopenRb] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const isFocused = useIsFocused();
  const [earnings, setEarnings] = useState({});
  // console.log("earningsearningsearnings",earnings);
  const navigation = useNavigation();
  const totalEarnings = useSelector(
    (state: RootState) => state.wallet.totalEarnings
  );
  const commissionBalance = useSelector(
    (state: RootState) => state.wallet.commissionBalance
  );
  const netProfit = useSelector((state: RootState) => state.wallet.netProfit);
  const [allRides, setAllRides] = useState("");
  const [loader, setLoader] = useState(false);
  const bottomSheetRef = useRef(null);
  const [filterData, setFilterData] = useState({
    fromData: null,
    toDate: null,
    status: null,
    transactionType: null,
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.open();
    }
  };

  useEffect(() => {
    console.log("openRb", openRb);
  }, []);

  const getHistoryDetails = async (page = 1) => {
    if (page > 1) {
      setIsLoadingMore(true);
    } else {
      setLoader(true);
    }
    const limit = 20; // Use a smaller limit for paginated requests
    const params = Object.entries(filterData)
      .filter(
        ([key, value]) =>
          value !== null &&
          value !== "" &&
          value !== undefined &&
          value !== "All"
      )
      .reduce((acc, [key, value]) => {
        if (key === "fromDate" || key === "toDate") {
          acc[key] = moment(value).format("YYYY-MM-DD");
        } else {
          acc[key] = value;
        }
        return acc;
      }, {});
    params.limit = limit;
    params.page = page;
    try {
      const res = await axios({
        method: "get",
        url: DriverRideHistory,
        headers: {
          token: getToken.Token,
        },
        params: params,
      });
      if (res?.status === 200) {
        if (page > 1) {
          setHistoryData((prevData) => [
            ...prevData,
            ...res?.data?.result?.docs,
          ]);
        } else {
          setHistoryData(res?.data?.result?.docs);
        }
        console.log("history details response---<<<<>>>>123", res?.data);
        setEarnings(res?.data);
        setAllRides(res?.data?.todayRides);
        setTotalPages(res?.data?.result?.totalPages);
        setCurrentPage(page);

        bottomSheetRef.current.close();
      }
    } catch (error) {
      if (error?.response?.data?.responseCode === 404) {
        showMessage({
          type: "success",
          icon: "success",
          message: error?.response?.data?.responseMessage,
        });
      }
      console.log("history details error--->>", error?.response);
      setHistoryData([]);
      bottomSheetRef.current.close();
    } finally {
      setLoader(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    getHistoryDetails();
  }, [isFocused]);

  const handleLoadMore = () => {
    console.log("I am call load more");
    if (!isLoadingMore && currentPage < totalPages) {
      getHistoryDetails(currentPage + 1);
    }
  };

  const RenderNotification = ({ item }) => {
    return (
      <View>
        <View style={{}}>
          <View
            style={[
              styles.CreatedAtVIEW,
              {
                backgroundColor:
                  item?.status == "cancelled"
                    ? COLORS.SuccessText
                    : COLORS.GREEN2,
              },
            ]}
          >
            <View style={styles.CreatedAtVIEW2}>
              <Text allowFontScaling={false} style={styles.CreatedAtTEXT}>
                {moment(item.createdAt).format("DD-MM-YYYY : hh:mm A")}
              </Text>
              <Text
                allowFontScaling={false}
                style={{ ...styles.CreatedAtTEXT, textTransform: "capitalize" }}
              >
                {item.status}
              </Text>
            </View>
          </View>
          <View style={styles.MainView_}>
            <View
              style={{
                flexDirection: "row",
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
              <View style={{ justifyContent: "space-between" }}>
                <Text allowFontScaling={false} style={styles.LocationTEXT}>
                  {item?.pickupAddress?.length > 37
                    ? item?.pickupAddress?.slice(0, 37) + "..."
                    : item?.pickupAddress}
                </Text>
                <Text allowFontScaling={false} style={styles.LocationTEXT}>
                  {item?.destinationAddress?.length > 37
                    ? item?.destinationAddress?.slice(0, 37) + "..."
                    : item?.destinationAddress}
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                allowFontScaling={false}
                style={{
                  ...styles.AmountTEXT,
                  color:
                    item?.status == "cancelled"
                      ? COLORS.SuccessText
                      : COLORS.GREEN2,
                }}
              >{`$ ${roundOff(parseFloat(item?.fareAmount), 2)}`}</Text>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.row}>
              <Text allowFontScaling={false} style={styles.dataText}>{`$${
                item?.status === "cancelled"
                  ? 0
                  : roundOff(parseFloat(item?.fareAmount), 2)
              }`}</Text>
              <Text allowFontScaling={false} style={styles.dataText}>{`$${
                item?.status === "cancelled"
                  ? 0
                  : roundOff(parseFloat(item?.commissionAmount), 2)
              }`}</Text>
              <Text allowFontScaling={false} style={styles.dataText}>
                $
                {item?.status === "cancelled"
                  ? 0
                  : roundOff(
                      parseFloat(item?.fareAmount) -
                        parseFloat(item?.commissionAmount),
                      2
                    )}
              </Text>
            </View>
            <View style={styles.row}>
              <Text allowFontScaling={false} style={styles.labelText}>
                {t("Ride Total")}
              </Text>
              <Text allowFontScaling={false} style={styles.labelText}>
                {t("Ride Commission")}
              </Text>
              <Text allowFontScaling={false} style={styles.labelText}>
                {t("Ride Earning")}
              </Text>
            </View>
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
  // console.log("historyData.length", historyData?.length);
  return (
    <SafeAreaView style={styles.mainComponent}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.BoxVIEW}>
          <View style={styles.TotalEarningsVIEW}>
            <View style={{ alignSelf: "flex-end" }}>
              <OrangeImage />
            </View>
            <View style={styles.TEXTView}>
              <Text allowFontScaling={false} style={styles.EarningVALUE}>
                $ {totalEarnings ? roundOff(parseFloat(totalEarnings), 2) : 0}
              </Text>
              <Text allowFontScaling={false} style={styles.EarningTEXT11}>
                {t("Total Earning")}
              </Text>
            </View>
          </View>
          <View style={styles.TotalEarningsVIEW}>
            <View style={{ alignSelf: "flex-end" }}>
              <OrangeImage />
            </View>
            <View style={styles.TEXTView}>
              <Text allowFontScaling={false} style={styles.EarningVALUE}>
                ${" "}
                {commissionBalance
                  ? roundOff(parseFloat(commissionBalance), 2)
                  : 0}
              </Text>
              <Text allowFontScaling={false} style={styles.EarningTEXT11}>
                {t("Commission")}
              </Text>
            </View>
          </View>
          <View style={styles.TotalEarningsVIEW}>
            <View style={{ alignSelf: "flex-end" }}>
              <OrangeImage />
            </View>
            <View style={styles.TEXTView}>
              <Text allowFontScaling={false} style={styles.EarningVALUE}>
                $ {netProfit ? roundOff(parseFloat(netProfit), 2) : 0}
              </Text>
              <Text allowFontScaling={false} style={styles.EarningTEXT11}>
                {t("Net Earning")}
              </Text>
            </View>
          </View>
        </View>
        {/* <View style={styles.EarningVIEW}>
          <View
            style={{
              // flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
            }}
          >
            <Text allowFontScaling={false} style={styles.EarningTEXT}>Total Earning</Text>

            <Text allowFontScaling={false} style={[styles.Earning,{color:'grey'}]}>
              {earnings?.totalEarning ?? 0}
            </Text>
          </View>
          <View
            style={{
              // flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
              right: 10,
            }}
          >
            <Text allowFontScaling={false} style={styles.EarningTEXT}>Admin Commission</Text>
            <Text allowFontScaling={false} style={[styles.Earning,{color:'grey'}]}>
            {earnings?.totalCommission ?? 0}
              </Text>
          </View>
        </View> */}
        {/* <View style={styles.EarningVIEW55}>
          <View
            style={{
              // flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
            }}
          >
            <Text allowFontScaling={false} style={styles.EarningTEXT}>Net Earning</Text>

            <Text allowFontScaling={false} style={[styles.Earning,{color:'grey'}]}>
            {earnings?.netEarning ?? 0}
            </Text>
          </View>
          <View
            style={{
              // flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
              right: 10,
            }}
          >
            <Text allowFontScaling={false} style={styles.EarningTEXT}>Today Rides</Text>
            <Text allowFontScaling={false} style={[styles.Earning,{color:'grey'}]}>
            {earnings?.todayRides}
               </Text>
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
        <View style={styles.FilterVIEW}>
          <Text allowFontScaling={false} style={styles.DateTEXT}>
            {moment(new Date()).format("DD-MM-YYYY")}
          </Text>
          <TouchableOpacity onPress={openBottomSheet}>
            <VECTOR_ICONS.FontAwesome
              name={"filter"}
              size={20}
              color={COLORS.GRAY4}
            />
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={historyData}
            contentContainerStyle={{ flex: 1 }}
            renderItem={(item) => RenderNotification(item)}
            keyExtractor={(item: any) => item.id}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() =>
              isLoadingMore ? (
                <ActivityIndicator size="large" color={COLORS.GREEN2} />
              ) : null
            }
            ListEmptyComponent={() => (
              <View
                style={{
                  height: HEIGHT * 0.6,
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
                  {t("No data found")}
                </Text>
              </View>
            )}
          />
        </View>
        <RBSheet
          ref={bottomSheetRef}
          height={400}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            container: styles.firstView1,
            draggableIcon: {
              opacity: 1,
              backgroundColor: "rgba(155, 155, 155, 1)",
              width: WIDTH * 0.15,
            },
          }}
        >
          <HistoryFilterComponent
            setFilterData={setFilterData}
            filterData={filterData}
            historyFilterHandler={() => getHistoryDetails(1)}
          />
        </RBSheet>
        <SpinningLoader loader={loader} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default HistoryComponent;

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
    color: "#000",
    fontFamily: FONTS.light,
    fontSize: 15,
    fontWeight: "700",
  },
  EarningTEXT11: {
    color: "#fff",
    fontFamily: FONTS.light,
    fontSize: 14,
    fontWeight: "700",
  },
  container: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  dataText: {
    flex: 1,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
  labelText: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    color: COLORS.SuccessText,
    fontWeight: "600",
  },
  Earning: {
    color: COLORS.DARK_BLACK,
    fontFamily: FONTS.bold,
    fontSize: 18,
    fontWeight: Platform.OS === "ios" ? "600" : "400",
    textAlign: "center",
  },
  TotalEarningsVIEW: {
    backgroundColor: COLORS.SuccessText,
    width: WIDTH * 0.28,
    borderRadius: 8,
    height: HEIGHT * 0.1,
  },
  EarningVALUE: {
    color: COLORS.WHITE,
    fontSize: 20,
    fontFamily: FONTS.bold,
    lineHeight: 25,
    paddingTop: "5%",
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  // EarningTEXT: {
  //   color: COLORS.WHITE,
  //   fontSize: 16,
  //   fontFamily: FONTS.bold,
  //   fontWeight: Platform.OS === "ios" ? "600" : "400",
  // },
  TEXTView: {
    // width: WIDTH * 0.33,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "13%",
    // backgroundColor:'red'
  },
  BoxVIEW: {
    width: WIDTH * 0.9,
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: "3%",
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
  EarningVIEW55: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: WIDTH * 0.95,
    alignSelf: "center",
    paddingBottom: 12,
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
    fontSize: 15,
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
    paddingLeft: 10,
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
    // paddingTop: "2.9%",
    paddingTop: 15,
    borderBottomColor: COLORS.UPLOADBorderCOLOR,
    borderBottomWidth: 1,
    paddingBottom: 24,
    paddingHorizontal: 20,
    // width: WIDTH * 0.92,
    // alignSelf: "center",
  },
  NameTEXT: {
    color: COLORS.SuccessText,
    fontSize: 16,
    fontFamily: FONTS.light,
    fontWeight: "500",
  },
  AmountTEXT: {
    color: COLORS.GREEN2,
    fontSize: 16,
    fontFamily: FONTS.bold,
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  NameID_View: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    paddingVertical: "2%",
    // columnGap:20,
    // width: WIDTH * 0.9,
    // alignSelf: "center",
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
  firstView1: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // backgroundColor:'red'
  },
});
