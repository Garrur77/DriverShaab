import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Platform,
  Image,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS, IMAGEPATH, VECTOR_ICONS } from "../../assets/Theme";
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
import OrangeImage from "../../Components/OrangeImage";
import BankLogoImage from "../../Components/BankLogoImage";
import DeleteImage from "../../Components/SVGComponents/DeleteImage";
import { useSelector } from "react-redux";
import {
  cashWallet,
  getAdminAccountDetails,
  getPaidCommissionHistory,
} from "../../Components/ApiConfig/EndPoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../Components/HeaderComponent";
import moment from "moment";
import SpinningLoader from "../../assets/SpinningLoader";
import { roundOff } from "../../Utils/RoundOff";
// import { ScrollView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";

const BankDetails = (props: any) => {
  const { t } = useTranslation();
  const amountKey = props?.route?.params?.data;
  console.log("amountKey", amountKey);

  const [loader, setLoader] = useState(false);
  const [wallet, setWallet] = useState("");
  const [commision, setComssion] = useState("");
  const [lengthData, setLengthData] = useState("");
  // console.log("lengthDatalengthData", lengthData);

  const [bankDetails, setBankDetails] = useState([]);
  const [commissionHistory, setCommisionHistory] = useState([]);
  const [commisionToPay, setCommissionToPay] = useState("");
  // console.log(
  //   "commissionHistorycommissionHistorycommissionHistory",
  //   commissionHistory
  // );
  const { Token } = useSelector((state: RootState) => state.value);
  const [DATA, setData] = useState([
    {
      id: "1",
      title: "ICICI BANK",
      ACC_TYPE: "Savings A/c No.-",
      LAST_DIGIT: "6499",
      HOLDER_NAME: "",
      Name: "Mr. ABCD",
      NAME_ID: "6365352312",
      Status: "Completed",
      AMOUNT: "$567",
      selected: false,
    },
    {
      id: "2",
      title: "HDFC BANK",
      ACC_TYPE: "Savings A/c No.-",
      LAST_DIGIT: "6499",
      HOLDER_NAME: "A/c Holder Name: ",
      Name: "Mr. ABCD",
      NAME_ID: "6365352312",
      Status: "Completed",
      AMOUNT: "$567",
      selected: false,
    },
    {
      id: "3",
      title: "HDFC BANK",
      ACC_TYPE: "Savings A/c No.-",
      LAST_DIGIT: "6499",
      HOLDER_NAME: "A/c Holder Name: ",
      Name: "Mr. ABCD",
      NAME_ID: "6365352312",
      Status: "Completed",
      AMOUNT: "$567",
      selected: false,
    },
  ]);

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
        Admin Commission History{" "}
      </Text>
    </View>
  );
  const EmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text allowFontScaling={false} style={styles.emptyText}>
        No Commission found
      </Text>
    </View>
  );
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
        setWallet(resp?.data?.result);
      }
    } catch (error) {
      console.log("error", error);
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
        console.log("getBankDetails success", resp?.data);
        setBankDetails(resp?.data?.adminAccountDetails);
      }
    } catch (error) {
      console.log("getBankDetails error", error);
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
        setLengthData(resp?.data?.advanceCommission);
        setComssion(resp?.data?.totalPaidCommission);
        setCommissionToPay(resp?.data?.commissionToPay);
      }
    } catch (error) {
      setLoader(false);
      console.log("error", error);
    }
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    getWalletDetails();
    getBankDetails();
    getCommisionHistoryHandler();
  }, [isFocused]);
  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header
            Heading={"Commission History"}
            navigation={props.navigation}
          />
          <View style={styles.BoxVIEW}>
            <View style={styles.TotalEarningsVIEW}>
              <View style={{ alignSelf: "flex-end" }}>
                <OrangeImage />
              </View>
              <View style={styles.TEXTView}>
                <Text allowFontScaling={false} style={styles.EarningVALUE}>
                  {`$${roundOff(parseFloat(commisionToPay), 2)}`}
                </Text>
                <Text allowFontScaling={false} style={styles.EarningTEXT}>
                  Admin Commission
                </Text>
              </View>
            </View>
            <View style={styles.TotalEarningsVIEW}>
              <View style={{ alignSelf: "flex-end" }}>
                <OrangeImage />
              </View>
              <View style={{ ...styles.TEXTView, marginTop: "11.8%" }}>
                <Text allowFontScaling={false} style={styles.EarningVALUE}>
                  {`$${roundOff(parseFloat(lengthData), 2)}`}
                </Text>
                <Text allowFontScaling={false} style={styles.EarningTEXT}>
                  Commission
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.ButtonVIEW}>
            <View style={{ rowGap: 3 }}>
              <Text
                allowFontScaling={false}
                style={{
                  color: "#000",
                  fontSize: 17,
                  fontWeight: "700",
                  paddingBottom: 6,
                }}
              >
                Admin Bank Details
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text allowFontScaling={false} style={styles.BalanceTEXT}>
                  Holder Name:
                </Text>
                <Text allowFontScaling={false} style={styles.BalanceAMTTEXT22}>
                  {bankDetails?.accountHoderName?.length > 22
                    ? bankDetails?.accountHoderName?.slice(0, 22) + "..."
                    : bankDetails?.accountHoderName}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text allowFontScaling={false} style={styles.BalanceTEXT}>
                  Account No:
                </Text>
                <Text allowFontScaling={false} style={styles.BalanceAMTTEXT22}>
                  {bankDetails?.bankAccountNumber?.length > 16
                    ? bankDetails?.bankAccountNumber?.slice(0, 16) + "..."
                    : bankDetails?.bankAccountNumber}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text allowFontScaling={false} style={styles.BalanceTEXT}>
                  IFSC Code:
                </Text>
                <Text allowFontScaling={false} style={styles.BalanceAMTTEXT22}>
                  {bankDetails?.IFSCCode?.length > 14
                    ? bankDetails?.IFSCCode?.slice(0, 14) + "..."
                    : bankDetails?.IFSCCode}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text allowFontScaling={false} style={styles.BalanceTEXT}>
                  Bank Name:
                </Text>
                <Text allowFontScaling={false} style={styles.BalanceAMTTEXT22}>
                  {bankDetails?.bankName?.length > 30
                    ? bankDetails?.bankName?.slice(0, 30) + "..."
                    : bankDetails?.bankName}
                </Text>
              </View>
            </View>

            <View>
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
                  Send Recipt
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: 0,
              marginTop: 15,
            }}
          >
            <View
              style={{ flex: 1, height: 1, backgroundColor: COLORS.GRAY7 }}
            />
            <View
              style={{ flex: 1, height: 1, backgroundColor: COLORS.GRAY7 }}
            />
          </View>
          <ScrollView
            style={{ height: HEIGHT / 1.8, marginTop: 10 }}
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
        </ScrollView>

        {loader && <SpinningLoader loader={loader} />}
        {/* <SafeAreaView style={{ backgroundColor: "white" }}></SafeAreaView> */}
      </SafeAreaView>
      {/* <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView> */}
    </>
  );
};

export default BankDetails;

const styles = StyleSheet.create({
  TotalEarningsVIEW: {
    backgroundColor: COLORS.SuccessText,
    width: WIDTH * 0.43,
    borderRadius: 8,
    height: HEIGHT * 0.12,
  },
  header: {
    fontSize: 18,
  },
  EarningTEXT: {
    color: COLORS.WHITE,
    fontSize: 16,
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
    alignItems: "center",
  },
  ButtonVIEW: {
    flexDirection: "row",
    width: WIDTH * 0.9,
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "5%",
  },
  CashOutButton: {
    backgroundColor: COLORS.ORANGE,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "4%",
    paddingVertical: "10%",
    borderRadius: 8,
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
  BalanceTEXT: {
    color: COLORS.DARK_BLACK,
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
  BalanceAMTTEXT: {
    color: COLORS.DARK_BLACK,
    fontSize: 16,
    fontFamily: FONTS.bold,
    paddingLeft: "3%",
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
  BalanceAMTTEXT22: {
    color: COLORS.DARK_BLACK,
    fontSize: 16,
    fontFamily: FONTS.medium,
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
  headerText: {
    fontSize: 17,
    color: COLORS.DARK_BLACK,
    fontWeight: "500",
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
    fontSize: 16,
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
});
