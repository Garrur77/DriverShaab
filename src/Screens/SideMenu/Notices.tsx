import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  FlatList,
  RefreshControl,
  TouchableOpacity as RNTouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import HeaderComponent from "../../Components/HeaderComponent";
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
import { COLORS, FONTS } from "../../assets/Theme";
import { RootState } from "../../ReduxConfig/Store";
import { useSelector } from "react-redux";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import DeleteImage from "../../Components/SVGComponents/DeleteImage";
import {
  announcementForDriver,
  deleteNotification,
} from "../../Components/ApiConfig/EndPoints";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import SpinningLoader from "../../assets/SpinningLoader";
import moment from "moment";
import { useTranslation } from "react-i18next";

const Notices = (props: any) => {
  const getToken = useSelector((state: RootState) => state.TOKEN_);
  const UserData = useSelector((state: RootState) => state.userDetails);

  const [announceData, setAnnounceData] = useState([]);
  const [id, setId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const flatListRef = useRef(null);

  const rightSwipe = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.iconStyle}
        onPress={() => {
          setId(item.id);
          setOpenModal(true);
        }}
      >
        <DeleteImage />
      </TouchableOpacity>
    );
  };

  const getAnnouncementData = async (pageNum = 1) => {
    setLoader(true);
    setRefreshing(pageNum === 1);
    try {
      const res = await axios({
        method: "get",
        url: `${announcementForDriver}?page=${pageNum}`,
        headers: {
          token: getToken.Token,
        },
      });
      if (res?.data?.responseCode === 200) {
        setLoader(false);
        setAnnounceData((prevData) => [
          ...prevData,
          ...res?.data?.announcementData?.reverse(),
        ]);
        setPage(pageNum);
        setHasMore(res?.data?.announcementData?.length > 0);
      }
    } catch (error) {
      if (error?.data?.responseCode === 404) {
        showMessage({
          type: "success",
          icon: "success",
          message: error?.data?.responseMessage,
        });
      }
      setLoader(false);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const announcements = props.navigation.addListener("focus", () => {
      getAnnouncementData();
    });
    return announcements;
  }, [props.navigation]);

  const deleteSingleNotification = async () => {
    try {
      const res = await axios({
        method: "delete",
        url: deleteNotification,
        headers: {
          token: getToken.Token,
        },
        params: {
          notificationId: id,
        },
      });
    } catch (error) {
      console.log("delete notification error", error);
    }
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const handleLoadMore = () => {
    if (hasMore) {
      getAnnouncementData(page + 1);
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
      <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} />
      <SafeAreaView style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
        <HeaderComponent Heading={t("Notices")} navigation={props.navigation} />
        <View style={styles.container}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <FlatList
              ref={flatListRef}
              contentContainerStyle={{ flexGrow: 1 }}
              data={announceData}
              renderItem={({ item }) => (
                <Swipeable renderRightActions={() => rightSwipe({ item })}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {}}
                    style={styles.swipeTouchInnerContainer}
                  >
                    <View style={styles.iconStyle}>
                      <Image
                        source={require("../../assets/Images/Home/notification.png")}
                        style={{ width: 45, height: 45 }}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.titleText}>{item?.title}</Text>
                      <Text style={styles.descriptionText}>
                        {item?.description}
                      </Text>
                      <View style={styles.dateContainer}>
                        <Text style={styles.dateText}>
                          {moment(item.createdAt).format(
                            "DD-MM-YYYY : hh:mm A"
                          )}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Swipeable>
              )}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => getAnnouncementData(1)}
                />
              }
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                <View style={styles.emptyContainer}>
                  <Image
                    style={{ height: 170, width: 200 }}
                    resizeMode="contain"
                    source={require("../../assets/Images/Home/nontifee.png")}
                  />
                  <Text style={styles.emptyText}>
                    {t("No Notices Received Yet!")}
                  </Text>
                </View>
              )}
            />
          </GestureHandlerRootView>
        </View>
      </SafeAreaView>
      <SpinningLoader loader={loader} />
      <RNTouchableOpacity
        style={styles.scrollToTopButton}
        onPress={scrollToTop}
      >
        <Text style={styles.scrollToTopButtonText}>{t("Scroll to Top")}</Text>
      </RNTouchableOpacity>
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    alignSelf: "center",
    width: WIDTH,
    flex: 1,
  },
  swipeTouchInnerContainer: {
    marginHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  iconStyle: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    width: "84%",
    rowGap: 4,
  },
  titleText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: "#000",
    lineHeight: 18,
  },
  descriptionText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: "#000",
    lineHeight: 18,
  },
  dateContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  dateText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: "#000",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 20,
  },
  emptyText: {
    color: "#BEBEBE",
    fontSize: 14,
    fontFamily: FONTS.medium,
    marginTop: 20,
  },
  scrollToTopButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.ORANGE,
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
  scrollToTopButtonText: {
    color: "#fff",
    fontFamily: FONTS.medium,
    fontSize: 12,
  },
});

export default Notices;
