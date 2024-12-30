import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Platform,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS, VECTOR_ICONS } from "../../assets/Theme";
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
import OrangeImage from "../../Components/OrangeImage";
import BankLogoImage from "../../Components/BankLogoImage";
import DeleteImage from "../../Components/SVGComponents/DeleteImage";
import { useDispatch, useSelector } from "react-redux";
import {
  cashWallet,
  getAdminAccountDetails,
  getPaidCommissionHistory,
} from "../../Components/ApiConfig/EndPoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import SpinningLoader from "../../assets/SpinningLoader";
import { Image } from "react-native";
import moment from "moment";
import { roundOff } from "../../Utils/RoundOff";
import { useTranslation } from "react-i18next";
import { RootState } from "../../ReduxConfig/Store";
import {
  setAdminCommission,
  setCommissionBalance,
  setCommissionPaid,
  setCompletedRides,
  setNetProfit,
  setTotalEarnings,
} from "../../ReduxConfig/WalletSlice";

const DashboardComponent = (props: any) => {
  const { t } = useTranslation();
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [bankDetails, setBankDetails] = useState([]);
  const [commissionHistory, setCommisionHistory] = useState([]);
  const dispatch = useDispatch();
  const totalEarnings = useSelector(
    (state: RootState) => state.wallet.totalEarnings
  );
  const commissionBalance = useSelector(
    (state: RootState) => state.wallet.commissionBalance
  );
  const completedRides = useSelector(
    (state: RootState) => state.wallet.completedRides
  );
  const netProfit = useSelector((state: RootState) => state.wallet.netProfit);
  const totalCommission = useSelector(
    (state: RootState) => state.wallet.adminCommission
  );
  const totalCommissionPaid = useSelector(
    (state: RootState) => state.wallet.commissionPaid
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getWalletDetails();
      getBankDetails();
      getCommisionHistoryHandler();
    }, 2000);
  }, []);
  const getWalletDetails = async () => {
    try {
      const resp = await axios({
        method: "get",
        url: cashWallet,
        headers: {
          token: await AsyncStorage.getItem("TOKEN"),
        },
      });
      if (resp?.data?.responseCode === 200) {
        // console.log("getWalletDetails dashboard suucess", resp?.data);
        dispatch(setTotalEarnings(resp?.data?.result?.totalEarning));
        dispatch(setCommissionBalance(resp?.data?.result?.commissionBalance));
        dispatch(setCompletedRides(resp?.data?.result?.completedRides));
        dispatch(setNetProfit(resp?.data?.result?.netProfit));
        dispatch(setCommissionPaid(resp?.data?.result?.totalCommissionPaid));
        dispatch(setAdminCommission(resp?.data?.result?.totalCommission));
      }
    } catch (error) {
      console.log("getWalletDetails dashboard error", error?.response);
    }
  };

  const getBankDetails = async () => {
    try {
      const resp = await axios({
        method: "get",
        url: getAdminAccountDetails,
        headers: {
          token: await AsyncStorage.getItem("TOKEN"),
        },
      });
      if (resp?.data?.responseCode === 200) {
        setBankDetails(resp?.data?.adminAccountDetails);
      }
    } catch (error) {
      if (error?.response?.data?.responseCode === 400) {
        setBankDetails("");
      }
    }
  };

  const getCommisionHistoryHandler = async () => {
    setLoader(true);
    try {
      const resp = await axios({
        method: "get",
        url: getPaidCommissionHistory,
        headers: {
          token: await AsyncStorage.getItem("TOKEN"),
        },
      });
      if (resp?.data?.responseCode === 200) {
        console.log("resp?.dataresp?.data", resp?.data);
        setLoader(false);
        setCommisionHistory(resp?.data?.result);
      }
    } catch (error) {
      setLoader(false);
      console.log("getCommisionHistoryHandler error", error?.response);
    }
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    getWalletDetails();
    getBankDetails();
    getCommisionHistoryHandler();
  }, [isFocused]);

  const renderButton = ({ item, index }) => {
    return (
      <View style={styles.Main_}>
        <>
          <View style={{ flexDirection: "row", columnGap: 15 }}>
            <View style={{ alignSelf: "flex-start" }}>
              <TouchableOpacity>
                <Image
                  source={{ uri: item?.image }}
                  style={{
                    width: 100,
                    height: 100,
                    borderWidth: 0.5,
                    borderColor: "grey",
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                columnGap: 10,
                alignItems: "center",
              }}
            >
              <View style={{}}>
                <View style={styles.DATAview}>
                  <Text allowFontScaling={false} style={styles.HolderNAMETEXT}>
                    {moment(item?.createdAt).format("lll")}
                  </Text>
                </View>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.TitleTEXT,
                    { fontWeight: Platform.OS === "ios" ? "500" : "400" },
                  ]}
                >
                  $ {item?.amount ?? 0}
                </Text>
                <View style={styles.DATAview}>
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.HolderNAMETEXT,
                      {
                        color:
                          item?.status === "PENDING"
                            ? "orange"
                            : item?.status === "REJECT"
                            ? "red"
                            : "green",
                      },
                    ]}
                  >
                    {item?.status}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </>
      </View>
    );
  };
  const HeaderComponent = () => (
    <View style={styles.Main_22}>
      <Text allowFontScaling={false} style={styles.headerText}>
        {t("Commission Paid History")}{" "}
      </Text>
    </View>
  );
  const EmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text allowFontScaling={false} style={styles.emptyText}>
        {t("No Commission Found")}
      </Text>
    </View>
  );
  return (
    <ScrollView
      style={{ marginBottom: "3%" }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={COLORS.ORANGE}
          colors={[COLORS.ORANGE]}
        />
      }
    >
      <View style={styles.BoxVIEW}>
        <View style={styles.TotalEarningsVIEW}>
          <View style={{ alignSelf: "flex-end" }}>
            <OrangeImage />
          </View>
          <View style={styles.TEXTView}>
            <Text allowFontScaling={false} style={styles.EarningVALUE}>
              ${totalEarnings ? roundOff(totalEarnings, 2) : `0.00 `}
            </Text>
            <Text allowFontScaling={false} style={styles.EarningTEXT}>
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
              {totalCommission
                ? `$${roundOff(parseFloat(totalCommission), 2)}`
                : `$ 0`}
            </Text>
            <Text allowFontScaling={false} style={styles.EarningTEXT}>
              {t("Admin Commission")}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView>
        <View style={styles.BoxVIEW}>
          <View style={styles.TotalEarningsVIEW}>
            <View style={{ alignSelf: "flex-end" }}>
              <OrangeImage />
            </View>
            <View style={styles.TEXTView}>
              <Text allowFontScaling={false} style={styles.EarningVALUE}>
                {completedRides ?? 0}
              </Text>
              <Text allowFontScaling={false} style={styles.EarningTEXT}>
                {t("Completed Rides")}
              </Text>
            </View>
          </View>
          <View style={styles.TotalEarningsVIEW}>
            <View style={{ alignSelf: "flex-end" }}>
              <OrangeImage />
            </View>
            <View style={{ ...styles.TEXTView, marginTop: "11.8%" }}>
              <Text allowFontScaling={false} style={styles.EarningVALUE}>
                {netProfit ? `$${roundOff(parseFloat(netProfit), 2)}` : `$0.00`}
              </Text>
              <Text allowFontScaling={false} style={styles.EarningTEXT}>
                {t("Net Profit")}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.BoxVIEW}>
          <View style={styles.TotalEarningsVIEW}>
            <View style={{ alignSelf: "flex-end" }}>
              <OrangeImage />
            </View>
            <View style={styles.TEXTView}>
              <Text allowFontScaling={false} style={styles.EarningVALUE}>
                {totalCommissionPaid
                  ? `$${roundOff(parseFloat(totalCommissionPaid), 2)}`
                  : `$0.00`}
              </Text>
              <Text allowFontScaling={false} style={styles.EarningTEXT}>
                {t("Commission Paid")}
              </Text>
            </View>
          </View>
          <View style={styles.TotalEarningsVIEW}>
            <View style={{ alignSelf: "flex-end" }}>
              <OrangeImage />
            </View>
            <View style={{ ...styles.TEXTView, marginTop: "11.8%" }}>
              <Text allowFontScaling={false} style={styles.EarningVALUE}>
                {commissionBalance
                  ? `$${roundOff(parseFloat(commissionBalance), 2)}`
                  : `$ 0.00`}
              </Text>
              <Text allowFontScaling={false} style={styles.EarningTEXT}>
                {t("Commission Balance")}
              </Text>
            </View>
          </View>
        </View>
        {/*  */}
        <View
          style={{
            flexDirection: "row",
            width: WIDTH * 0.9,
            alignSelf: "center",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "5%",
          }}
        >
          <Text
            allowFontScaling={false}
            style={{
              color: COLORS.DARK_BLACK,
              fontSize: 17,
              fontWeight: "700",
            }}
          >
            {t("Admin Bank Details")}
          </Text>
        </View>

        {bankDetails ? (
          <>
            <View style={styles.ButtonVIEW}>
              <View style={{ rowGap: 3 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text allowFontScaling={false} style={styles.BalanceTEXT}>
                    {t("Holder Name:")}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={styles.BalanceAMTTEXT22}
                  >
                    {bankDetails?.accountHoderName?.length > 22
                      ? bankDetails?.accountHoderName?.slice(0, 22) + "..."
                      : bankDetails?.accountHoderName}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text allowFontScaling={false} style={styles.BalanceTEXT}>
                    {t("Account No:")}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={styles.BalanceAMTTEXT22}
                  >
                    {bankDetails?.bankAccountNumber?.length > 16
                      ? bankDetails?.bankAccountNumber?.slice(0, 16) + "..."
                      : bankDetails?.bankAccountNumber}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text allowFontScaling={false} style={styles.BalanceTEXT}>
                    {t("IFSC Code:")}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={styles.BalanceAMTTEXT22}
                  >
                    {bankDetails?.IFSCCode?.length > 14
                      ? bankDetails?.IFSCCode?.slice(0, 14) + "..."
                      : bankDetails?.IFSCCode}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text allowFontScaling={false} style={styles.BalanceTEXT}>
                    {t("Bank Name:")}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={styles.BalanceAMTTEXT22}
                  >
                    {bankDetails?.bankName?.length > 30
                      ? bankDetails?.bankName?.slice(0, 30) + "..."
                      : bankDetails?.bankName}
                  </Text>
                </View>
              </View>
              <View style={{}}>
                <TouchableOpacity
                  onPress={() => {
                    props?.navigation?.navigate("SendRecipt");
                  }}
                  style={styles.CashOutButton}
                >
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.BalanceTEXT,
                      {
                        color: "#ffff",
                        fontSize: 12,
                        fontFamily: FONTS.bold,
                        fontWeight: Platform.OS === "ios" ? "600" : "400",
                      },
                    ]}
                  >
                    {t("Send Receipt")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 16,
            }}
          >
            <Text
              allowFontScaling={false}
              style={{ fontSize: 14, color: "gray" }}
            >
              {t("No Admin Bank Details Found")}
            </Text>
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 0,
            marginTop: 15,
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: COLORS.GRAY7 }} />
          <View style={{ flex: 1, height: 1, backgroundColor: COLORS.GRAY7 }} />
        </View>
        <ScrollView
          style={{ marginTop: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={commissionHistory}
            renderItem={renderButton}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={HeaderComponent}
            ListEmptyComponent={EmptyComponent}
          />
        </ScrollView>
        {loader && <SpinningLoader loader={loader} />}
      </ScrollView>
    </ScrollView>
  );
};

export default DashboardComponent;

const styles = StyleSheet.create({
  TotalEarningsVIEW: {
    backgroundColor: COLORS.SuccessText,
    width: WIDTH * 0.43,
    borderRadius: 8,
    height: HEIGHT * 0.14,
  },
  EarningTEXT: {
    color: COLORS.WHITE,
    fontSize: 14,
    fontFamily: FONTS.bold,
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  EarningVALUE: {
    color: COLORS.WHITE,
    fontSize: 20,
    fontFamily: FONTS.bold,
    lineHeight: 25,
    paddingTop: "5%",
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
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
  ButtonVIEW: {
    flexDirection: "row",
    width: WIDTH * 0.9,
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "2%",
  },
  CashOutButton: {
    backgroundColor: COLORS.ORANGE,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    width: WIDTH * 0.22,
    height: HEIGHT * 0.045,
  },
  BalanceTEXT: {
    color: COLORS.DARK_BLACK,
    fontSize: 15,
    fontFamily: FONTS.light,
  },
  BalanceAMTTEXT: {
    color: COLORS.DARK_BLACK,
    fontSize: 14,
    fontFamily: FONTS.bold,
    paddingLeft: "3%",
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  Main_: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY7,
    width: WIDTH * 0.9,
    alignSelf: "center",
    justifyContent: "space-between",
    paddingVertical: "5%",
    // backgroundColor:'red',
  },
  DATAview: {
    flexDirection: "row",
    // backgroundColor: 'red'
  },
  TitleTEXT: {
    color: COLORS.BLACK3,
    fontSize: 15,
    fontFamily: FONTS.bold,
  },
  AddBankTEXT: {
    color: COLORS.BLUE1,
    fontSize: 14,
    fontFamily: FONTS.medium,
    textDecorationLine: "underline",
    width: WIDTH * 0.7,
  },
  AddBankButton: { marginLeft: "5%", marginTop: "3%" },
  HolderNAMETEXT: {
    color: COLORS.BLACK3,
    fontSize: 14,
    fontFamily: FONTS.medium,
    lineHeight: 22,
  },
  Main_22: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY7,
    width: WIDTH * 0.9,
    alignSelf: "center",
    justifyContent: "space-between",
    paddingBottom: 12,
    //   paddingVertical: "5%",
    // backgroundColor:'red',
  },
  BalanceTEXT: {
    color: COLORS.DARK_BLACK,
    fontSize: 14,
    fontFamily: FONTS.bold,
  },
  BalanceAMTTEXT: {
    color: COLORS.DARK_BLACK,
    fontSize: 15,
    fontFamily: FONTS.bold,
    paddingLeft: "3%",
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  BalanceAMTTEXT22: {
    color: COLORS.DARK_BLACK,
    fontSize: 15,
    fontFamily: FONTS.medium,
    paddingLeft: "3%",
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  headerText: {
    fontSize: 17,
    color: COLORS.DARK_BLACK,
    fontWeight: "700",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
    paddingTop: 50,
  },
});
