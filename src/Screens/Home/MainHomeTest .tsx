import {
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  BackHandler,
  Alert,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
  Linking,
} from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import HeaderComponent from "../../Components/HeaderComponent";
import { COLORS, FONTS } from "../../assets/Theme";
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
import { useEffect, useState } from "react";
import CommonModal from "../../Components/CommonModal";
import DepartureRBSheet from "../../Components/HomeSvg/DepartureRBSheet";
import { CommonActions, useIsFocused } from "@react-navigation/native";
import PendingModal from "../SplashFolder/PendingModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../ReduxConfig/Store";
import {
  SOCKET_URL,
  VIEW_PROFILEDATA,
  cashWallet,
  freeDriver,
} from "../../Components/ApiConfig/EndPoints";
import { callPostApi } from "../../Components/ApiConfig/ApiCall";
import {
  setIsisVerifiedByAdmin,
  setUserData,
} from "../../ReduxConfig/TokenUserID";
import { setUpdateDetail } from "../../ReduxConfig/PersonalDetailsSlice";
import { UserVisited, userData } from "../../ReduxConfig/UserDetails/UserSlice";
import { setClearPersonalInfo } from "../../ReduxConfig/PersonalDetailsSlice";
import { setClearVehicle } from "../../ReduxConfig/VehicleDetailsSlice";
import { setClearState } from "../../ReduxConfig/TokenUserID";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { AnimatedRegion, Marker } from "react-native-maps";
import { io } from "socket.io-client";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import {
  clearRideDetails,
  setRideDetails,
} from "../../ReduxConfig/RideDetailsSlice";
import RideDetailsComponent from "../../Components/RideDetailsComponent";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CancelRiderRequestComponent from "../../Components/CancelRiderRequestComponent";
import {
  clearRideDetailsAfterAccept,
  setRideDetailsAfterAccept,
} from "../../ReduxConfig/RIdeSlice";

import Geolocation from "@react-native-community/geolocation";
import { setLocation } from "../../ReduxConfig/DriverLocationSlice";
import { PERMISSIONS, request } from "react-native-permissions";
import { PermissionsAndroid } from "react-native";
import SpinningLoader from "../../assets/SpinningLoader";
import MapViewDirections from "react-native-maps-directions";
import { useSocket } from "../../Context/SocketContext";
import messaging from "@react-native-firebase/messaging";
import { onDisplayNotification } from "../../../PushNotification";
import { setToggle } from "../../ReduxConfig/ToggleSlice";
import { useLocation } from "../../Context/LocationContext";
import {
  setAdminCommission,
  setCommissionBalance,
  setCommissionPaid,
  setCompletedRides,
  setNetProfit,
  setTotalEarnings,
} from "../../ReduxConfig/WalletSlice";

const screen_ = Dimensions.get("window");
const ASPECT_RATIO = screen_.width / screen_.height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MainHomeTest = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const { latitude, longitude } = useLocation();
  console.log("longitude111111: ", longitude);
  console.log("latitude2222222: ", latitude);
  const isFocused = useIsFocused();
  const [modalVisible1, setModalVisible1] = useState(false);
  const [openRideModal, setOpenRideModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);

  const [cancel, setCancel] = useState({
    selectReson: null,
    other: null,
  });
  const rideSocket = useSocket();
  const [token, setToken] = useState(false);

  // const { rideSocket } = route.params;
  // console.log("rideSocketrideSocketrideSocket", rideSocket);

  const dispatch = useDispatch();
  const driverStatus = useSelector(
    (state: RootState) => state.driverDuty.driverDuty
  );
  //+++++++++++++++++++++++++ Selector for Get Ride Data, Get Lcoation ++++++++++++++++++++//
  const Location = useSelector((state: RootState) => state.INITIAL_LOCATION);
  const RideData = useSelector(
    (state: RootState) => state.INITIAL_RIDE_DETAILS?.rideDetails
  );
  // console.log("itemmmmmmmmmmmmmmmmmmm:::::::::::::", RideData);
  const Socket = useSelector((state: RootState) => state.socketReducer);

  // console.log("RideDataRideDataRideDataRideData", RideData);
  const RIDEAFTERACCEPT = useSelector(
    (state: RootState) => state.INITIAL_RIDE.rideDetailsAfterAccept
  );
  // console.log("RIDEAFTERACCEPTRIDEAFTERACCEPTRIDEAFTERACCEPT", RIDEAFTERACCEPT);
  const Data = useSelector(
    (state: RootState) => state.TokenUserID_DETAILS?.userTokenAndId
  );
  const [valuess, setValuess] = useState(
    Data?.isVerifiedByAdmin == null ? true : Data?.isVerifiedByAdmin //value to check weather Driver is verify or not
  );

  const getToken = useSelector((state: RootState) => state.TOKEN_);
  //++++++++++++++++++++++++++++++++++++++++ END Selector ++++++++++++++++++++++++++++++++//

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const VIEW_PROFILEAPI = async () => {
    // setLoader(true);
    const toKen = await AsyncStorage.getItem("TOKEN");
    setToken(toKen);
    try {
      var postData = {
        token: toKen,
      };
      const { response, error, loading } = await callPostApi(
        VIEW_PROFILEDATA,
        postData,
        false
      );
      // setLoader(loading);
      // console.log("VIEW_PROFILEAPI response:", response);
      if (!error && response?.responseCode === 200) {
        // setLoader(false);
        setValuess(response?.data?.isVerifiedByAdmin);
        if (response?.data?.status === "blocked") {
          setValuess(false);
        }
        dispatch(setUserData(response?.data));
        dispatch(setUpdateDetail(response?.data));
        dispatch(setIsisVerifiedByAdmin(response?.data?.isVerifiedByAdmin));
        if (response?.data?.isVerifiedByAdmin) {
          // OpenOnlineRb();
        }
        const responseData = response?.data;
      } else {
        // console.log("API Error:", error);
      }
    } catch (error) {
      console.log("Error during MO_verify:", error, error.response);
    }
  };

  const isLoginScreenFocused = navigation.isFocused();
  const [riderequest, setRideRequest] = useState(false);

  //Go Back Modal Logic
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    if (isLoginScreenFocused) {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    }
  }, [isLoginScreenFocused]);
  //Intialize socket

  const [rideId, setRideId] = useState("");

  //Logout Function
  const logout = async () => {
    await AsyncStorage?.removeItem("TOKEN");
    setToken(false);
    setValuess(true);
    setTimeout(() => {
      dispatch(setClearState(false));
      dispatch(setClearPersonalInfo(false));
      dispatch(setClearVehicle(false));
      dispatch(UserVisited(""));
      navigation?.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    }, 500);
  };

  //Socket Connect New Ride, RideAccepted , availableDriver,  rideNoLonger,rideCancelled
  useEffect(() => {
    // console.log("HomeOnile Call when isFocused change", isFocused);
    const driverId = Data?.userId;

    // navigation?.navigate("HomeOnlineStartRide", driverId);
    showType("");
    if (isFocused) {
      VIEW_PROFILEAPI();
      // rideSocket?.emit("availableDriver", driverId);

      // console.log("item?.driverIditem?.userId", Data.userId);

      // Ride Request Modal Event Data
      rideSocket?.on("newRide", (response) => {
        console.log("Socket rideSocket newRide connected", response);
        setRideId(response?.rideId);
        if (
          response?.destinationAddress &&
          response?.pickupAddress &&
          (!RIDEAFTERACCEPT || Object?.entries(RIDEAFTERACCEPT)?.length === 0)
        ) {
          response?.nearbyDrivers?.map((item) => {
            if (
              item?.driverId === Data?.userId &&
              Data?.isVerifiedByAdmin &&
              (!RideData || Object?.entries(RideData)?.length === 0)
            ) {
              dispatch(setRideDetails(response));
              rideRequestRef?.current?.present();
              // setTimeout(() => {
              //   rideRequestRef?.current?.dismiss();
              //   dispatch(clearRideDetailsAfterAccept());
              // }, 20000);
            }
          });
        }
      });

      rideSocket?.on("autoDismissRequest", (response) => {
       // console.log("=================AUTO ", response);

       // console.log("======USER ID===========AUTO ", Data?.userId);
      //  console.log("=========DRIBER ID========AUTO ", response?.driverId);

        if (Data?.userId === response?.driverId) {
          rideRequestRef?.current?.dismiss();
          dispatch(clearRideDetailsAfterAccept());
        }
      });

      //Ride Accepted Event Data
      rideSocket?.on("rideAccepted", (response) => {
        console.log("Socket rideSocket rideAccepted connected", response);
        console.log("Socket check asadasd", response);
        setRideRequest(false);
        rideRequestRef?.current?.dismiss();
        dispatch(setRideDetailsAfterAccept(response));
        rideDetailsRef?.current?.present();
      });

      //Ride No Longer Available Event
      rideSocket?.on("rideNoLonger", (response) => {
        console.log("rideNoLonger response", response);
        dispatch(clearRideDetails());
        rideRequestRef?.current?.dismiss();
        showMessage({
          message: "Ride is not longer Available",
          type: "danger",
        });
      });
      rideSocket?.on("createdRideCancelled", (response) => {
        if (RideData?.rideId === response?.rideId) {
          console.log("createdRideCancelled inside", response);
          // showMessage({
          //   message: response?.responseMessage,
          //   type: "danger",
          //   icon: "danger",
          // });
          dispatch(clearRideDetailsAfterAccept());
          dispatch(clearRideDetails());
          rideDetailsRef?.current?.dismiss();
          rideRequestRef?.current?.dismiss();
        }
      });

      //check wheather user has cancled the ride
      rideSocket?.on("rideCancelled", (response) => {
        if (Data?.userId === response?.driverId) {
          showMessage({
            message: "This ride has been cancelled by user.",
            type: "danger",
            icon: "danger",
          });
          dispatch(clearRideDetailsAfterAccept());
          dispatch(clearRideDetails());
          // rideSocket?.emit("availableDriver", {
          //   driverId: Data?.userId,
          // });
          rideDetailsRef?.current?.dismiss();
          rideRequestRef?.current?.dismiss();
          // rideSocket?.emit("availableDriver", driverId);
        }
      });

      rideSocket?.on("rideConfirm", (response) => {
        if (
          response?.driverId != Data.userId &&
          (response?.rideId == rideId || response?.rideId == RideData?.rideId)
        ) {
          dispatch(clearRideDetails());
          setRideId("");
          rideRequestRef?.current?.dismiss();
          // rideSocket?.emit("availableDriver", driverId);

          // showMessage({
          //   message: "Ride Already accepted.",
          //   type: "danger",
          // });
        }
      });

      // const data = {
      //   driverId: Data?.userId,
      //   newLocation: {
      //     latitude: Location?.latitude,
      //     longitude: Location?.longitude,
      //   },
      // };

      // if (Location?.latitude && Location?.longitude) {
      //   rideSocket?.emit("updateLocation", data);
      // }
    }
    OngoingRideCheck();
  }, [isFocused, RideData?.rideId]);

  const OngoingRideCheck = () => {
    const userId = Data?.userId;
    rideSocket?.emit("checkOngoingRide", userId);
    rideSocket?.on("ongoingRideStatus", (response) => {
      if (
        response?.driverDetails?.driverId === Data.userId &&
        Data?.isVerifiedByAdmin
      ) {
        // dispatch(setRideDetailsAfterAccept(response));
        rideDetailsRef?.current?.present();
      }
    });
  };
  const toggleValue = useSelector(
    (state: RootState) => state.toggleSlice.value
  );
  useEffect(() => {
    AcceptedRideCheck();
  }, []);
  const AcceptedRideCheck = () => {
    console.log("sdsdsd");
    const userId = Data?.userId;
    rideSocket?.emit("checkAcceptedRide", userId);
    rideSocket?.on("acceptedRideStatus", (response) => {
      // console.log("acceptedRideStatus response", response);
      if (
        response?.driverDetails?.driverId === Data.userId &&
        response?.status === "accepted"
      ) {
        // dispatch(setRideDetailsAfterAccept(response));
        rideDetailsRef?.current?.present();
      }
    });
  };

  useEffect(() => {
    if (toggleValue) {
      AcceptedRideCheck();
    }
  }, [isFocused]);

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

  useEffect(() => {
    getWalletDetails();
  }, [isFocused]);
  // old code before 18 july

  // useEffect(() => {
  //   const time = setInterval(() => {
  //     console.log("Call the timer on each 7 sec");
  //     const locations = {
  //       driverId: Data?.userId,
  //       newLocation: {
  //         latitude: Location?.latitude,
  //         longitude: Location?.longitude,
  //       },
  //     };
  //     rideSocket?.emit("updateLocation", locations);

  //     // For live tracking we need to animate the location pointer every time when location changes
  //     if (Location?.latitude && Location?.longitude) {
  //       animate(Location?.latitude, Location?.longitude);
  //       rideSocket?.emit("updateLocation", locations);
  //     }

  //     if (RIDEAFTERACCEPT?.rideId) {
  //       // console.log("RIDEAFTERACCEPT?.rideId", RIDEAFTERACCEPT?.rideId);
  //       const data = {
  //         rideId: RIDEAFTERACCEPT?.rideId,
  //         lat: Location?.latitude,
  //         lng: Location?.longitude,
  //       };
  //       // console.log("RIDEAFTERACCEPT?.data", data);
  //       rideSocket?.emit("updateDriverLocation", data);
  //     }
  //   }, 5000);

  //   return () => {
  //     console.log("Timer Console clean up, time");
  //     clearInterval(time);
  //   };
  // }, [isFocused]);

  //new code 18 july

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      jsonp: false,
      secure: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      randomizationFactor: 0.5,
    });

    // setNewSocket(socket);

    socket.on("connect_error", (error) => {
      // Alert.alert("Socket connection error", error.message);
    });

    const locations = {
      driverId: Data?.userId,
      newLocation: {
        latitude: latitude,
        longitude: longitude,
      },
    };

    // Emit updateLocation if necessary
    if (latitude && longitude) {
      animate(latitude, longitude);
      socket.emit("updateLocation", locations);
    }

    // Emit updateDriverLocation if rideId exists
    if (RIDEAFTERACCEPT?.rideId && latitude && longitude) {
      const data = {
        rideId: RIDEAFTERACCEPT?.rideId,
        lat: latitude,
        lng: longitude,
      };
      socket.emit("updateDriverLocation", data);
    }

    // Clean up socket and interval
    return () => {
      console.log("Cleaning up socket and timer");
      socket.disconnect();
    };
  }, [isFocused, latitude, longitude, RIDEAFTERACCEPT]);

  //SOCKET to check ongoing ride
  const acceptingRideRequest = async () => {
    try {
      setLoader(true);
      const acceptDriveData = {
        rideId: RideData?.rideId,
        driverId: Data?.userId,
        vehicleIcon: RideData?.vehicleIcon,
      };

      setLoader(false);
      setRideRequest(true);
      rideSocket?.emit("driverAccepted", acceptDriveData);
    } catch (error) {
      setLoader(false);
      setRideRequest(false);
      console.log("catch acceptingRideRequest");
    }
  };
  const freeDriverHandler = async () => {
    try {
      const response = await axios({
        method: "get",
        url: freeDriver,
        headers: {
          token: getToken?.Token,
        },
      });
      console.log("freeDriverHandler response?.data", response?.data);

      if (response?.data?.responseCode === 200) {
        console.log("called freeDriverHandler");
        setOpenRideModal(false);
        rideRequestRef?.current?.dismiss();
        dispatch(clearRideDetails());
      }
    } catch (error) {
      console.log("freeDriverHandler error", error?.response);
      if (error?.response?.data?.responseCode == 400) {
        showMessage({
          message: error?.response?.data?.responseMessage,
          type: "danger",
          icon: "danger",
        });
      }
    }
  };

  const closedHandler = () => {
    setOpenRideModal(false);
    rideRequestRef?.current?.dismiss();
    dispatch(clearRideDetails());
  };
  const closedHandlerForRide = () => {
    freeDriverHandler();
  };

  /// ============================ All Modal Ref ============================ \\\
  const rideRequestRef = useRef<BottomSheetModal>(null);
  const rideDetailsRef = useRef<BottomSheetModal>(null);
  const meetUserConfirmRef = useRef<BottomSheetModal>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["54%"], []);

  const [type, showType] = useState("");

  const handleSheetChanges = useCallback((index: number) => {
    // console.log("handleSheetChanges", index);
  }, []);

  const cancelRideOfUser = async () => {
    setLoader(true);
    rideSocket?.emit("cancelRide", {
      rideId: RideData?.rideId ?? RIDEAFTERACCEPT?.rideId,
      userType: "driver",
      userId: Data?.userId,
      reason: cancel?.other === "other" ? cancel?.other : cancel.selectReson,
    });
    rideSocket?.on("cancelRideResponse", (response) => {
      // console.log("rideCancelled response", response);
      if (response?.responseCode === 200) {
        setLoader(false);
        setModalVisible1(false);
        setOpenCancelModal(false);
        dispatch(clearRideDetailsAfterAccept());
        rideDetailsRef?.current?.dismiss();
        rideRequestRef?.current?.dismiss();
        showMessage({
          message: response?.responseMessage,
          type: "success",
          icon: "success",
          duration: 1000,
        });
      }
      // modal down and ride details clean from redux
      setLoader(false);
      setModalVisible1(false);
      setOpenCancelModal(false);
      dispatch(clearRideDetailsAfterAccept());
      rideDetailsRef?.current?.dismiss();
      rideRequestRef?.current?.dismiss();
    });
  };

  const bottomSheetRef1 = useRef();

  const cancelBackHandler = () => {
    setModalVisible1(false);
    setTimeout(() => {
      setOpenCancelModal(true);
    }, 1000);
  };

  const [isConnected, setIsConnected] = React.useState(false);

  // React.useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener((state) => {
  //     setIsConnected(state.isConnected);
  //     if (!state.isConnected) {
  //       bottomSheetRef1.current.open();
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  const bottomSheetRef2 = useRef();

  // React.useEffect(() => {
  //   if (isConnected) {
  //     bottomSheetRef2.current.open();
  //   }
  // }, [isConnected]);

  useEffect(() => {
    const openCloseRideDetailsModal = () => {
      if (RideData?.destinationAddress && RideData?.pickupAddress) {
        setTimeout(() => {
          rideRequestRef.current?.dismiss();
        }, 1500);
      }
    };

    openCloseRideDetailsModal();
  }, []);

  async function requestPermissionLocation() {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Allow Ponttual to use your location?",
            message:
              "Pontual App needs access to your device's location to provide accurate information.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          return false;
        }
      } else if (Platform.OS === "ios") {
        const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        // console.log("result----location hhh MainHomeTest", result);
        if (result === "granted") {
          return true;
        } else if (result === "blocked") {
          return false;
        } else {
          return false;
        }
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  const mapRef = useRef();

  const markerRef = useRef();

  const getLocation = async () => {
    const result = requestPermissionLocation();
    result.then((res) => {
      if (res) {
        Geolocation.getCurrentPosition(
          (position) => {
            // console.log("position------11111-", position);
            dispatch(setLocation(position?.coords));
            getLiveLocation(
              position?.coords?.latitude,
              position?.coords?.longitude
            );
          },
          (error) => {
            // console.log("sdgdsfhdsh----198", error);
          },
          { enableHighAccuracy: false, timeout: 15000 }
        );
      } else {
        console.log("location permission decline");
      }
    });
  };

  const focusOnCurrentLocation = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    }
  };

  // Satring Animated Marker for Driver locations.
  const getLiveLocation = async (latitude, longitude) => {
    const locPermissionDenied = await requestPermissionLocation();
    if (locPermissionDenied) {
      animate(latitude, longitude);
      dispatch(setLocation({ latitude, longitude }));
    }
  };

  const animatedCoordinate = new AnimatedRegion({
    latitude: latitude,
    longitude: longitude,
  });

  const animate = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude };
    if (Platform.OS == "android") {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      animatedCoordinate
        .timing({
          latitude: latitude,
          longitude: longitude,
          duration: 1000,
          useNativeDriver: false,
        })
        .start();
    }
  };

  const rideCondtion = (id) => {
    return id === Data.userId &&
      Data?.isVerifiedByAdmin &&
      (!RideData || Object?.entries(RideData)?.length === 0)
      ? true
      : false;
  };

  const acceptedRequestHandler = (response) => {
    setTimeout(() => {
      rideRequestRef?.current?.present();
    }, 300);

    dispatch(setRideDetails(response));
  };

  const requestHanlder = (response) => {
    // console.log(
    //   "(!RIDEAFTERACCEPT || Object?.entries(RIDEAFTERACCEPT)?.length === 0)",
    //   !RIDEAFTERACCEPT || Object?.entries(RIDEAFTERACCEPT)?.length === 0
    // );
    if (
      response?.destinationAddress &&
      response?.pickupAddress &&
      (!RIDEAFTERACCEPT || Object?.entries(RIDEAFTERACCEPT)?.length === 0)
    ) {
      let nearbyDrivers = [];
      try {
        nearbyDrivers = JSON.parse(response?.nearbyDrivers);
        // console.log(
        //   "JSON.parse(response?.nearbyDrivers);",
        //   JSON.parse(response?.nearbyDrivers)
        // );
      } catch (e) {
        console.error("Error parsing nearbyDrivers", e);
      }
      // console.log("RIDEAFTERACCEPT requestHanlder");
      nearbyDrivers?.map((item) => {
        console.log(
          "rideCondtion(item?.driverId)",
          rideCondtion(item?.driverId)
        );
        if (rideCondtion(item?.driverId)) {
          console.log("item?.driverIditem?.driverId requestHanlder", item);
          acceptedRequestHandler(response);
        }
      });
    }
  };
  // console.log("rideDetailsRef?.current", rideDetailsRef?.current);
  React.useEffect(() => {
    // Foreground message handler

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // console.log("new FCM message receivedasdfasdfsdafasfd", remoteMessage);
      const response = remoteMessage?.data;
      // console.log("new FCM message sasasdadads", remoteMessage.notification);

      const Data = JSON.stringify(remoteMessage);
      const { title, body } = remoteMessage?.notification ?? {};
      // console.log("zsaasfasfasdfasdfasdfasdfasdf", title, body);
      // const data = remoteMessage?.data ?? {};

      // Display the notification
      onDisplayNotification(title, body);
      // requestHanlder(response);

      if (
        response?.destinationAddress &&
        response?.pickupAddress &&
        (!RIDEAFTERACCEPT || Object?.entries(RIDEAFTERACCEPT)?.length === 0)
      ) {
        let nearbyDrivers = [];
        try {
          nearbyDrivers = JSON.parse(response?.nearbyDrivers);
          // console.log(
          //   "JSON.parse(response?.nearbyDrivers);",
          //   JSON.parse(response?.nearbyDrivers)
          // );
        } catch (e) {
          console.error("Error parsing nearbyDrivers", e);
        }
        // console.log("RIDEAFTERACCEPT requestHanlder");
        nearbyDrivers?.map((item) => {
          if (rideCondtion(item?.driverId)) {
            // console.log("item?.driverIditem?.driverId requestHanlder", item);
            acceptedRequestHandler(response);
          }
        });
      }
    });

    // Background message handler
    const unsubscribeBackgroundMessageHandler =
      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        // console.log(
        //   "Message handled in the background!asdasdasdasdasd",
        //   remoteMessage
        // );

        // console.log(
        //   "sdasdadsasdasdfasdfasdgsdgaasdgsdag",
        //   remoteMessage.notification
        // );
        const { title, body } = remoteMessage?.notification ?? {};
        onDisplayNotification(title, body);
        const response = remoteMessage?.data;
        requestHanlder(response);
      });

    // App opened from background state
    const unsubscribeOnNotificationOpenedApp =
      messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log(
          "Notification caused app to open from background state:",
          remoteMessage.data
        );
        const response = remoteMessage?.data;
        requestHanlder(response);
      });

    // App opened from quit state
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          const response = remoteMessage?.data;
          requestHanlder(response);
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
        }
      });

    // Cleanup functions to unsubscribe from events
    return () => {
      unsubscribe();
      // unsubscribeOnMessage();
      // unsubscribeOnNotificationOpenedApp();
      // Note: messaging().setBackgroundMessageHandler does not return an unsubscribe function,
      // so there is no need to clean it up explicitly.
    };
  }, []);

  // useEffect(() => {
  //   console.log(
  //     "I am call in MainHome Test After Push notifications",
  //     RideData
  //   );
  //   console.log("I am call in MainHome Test !RideData condition", !RideData);
  //   console.log(
  //     "I am call in MainHome Test Object?.entries(RideData)?.length === 0",
  //     Object?.entries(RideData)?.length === 0
  //   );
  //   if (!RideData || Object?.entries(RideData)?.length === 0) {
  //     rideRequestRef?.current?.dismiss();
  //   } else {
  //   }
  // }, [RideData, isFocused]);
  //Ending Animated Marker for Driver locations.
  const OpenDirection = () => {
    const iniatialRoute = `https://maps.apple.com/?saddr=${latitude},${longitude}&daddr=${RIDEAFTERACCEPT?.pickupLocation?.latitude},${RIDEAFTERACCEPT?.pickupLocation?.longitude}`;

    Linking.openURL(iniatialRoute).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  console.log("latitude", latitude, "longitude", longitude);
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
        <StatusBar backgroundColor={COLORS.ORANGE} barStyle={"dark-content"} />

        <SafeAreaView>
          <HeaderComponent
            backgroundColor={
              driverStatus === "available" ? COLORS.ORANGE : COLORS.GRAY6
            }
            backgroundColorMain={
              driverStatus === "available" ? COLORS.ORANGE : COLORS.GRAY6
            }
            backgroundColorDrawer={
              driverStatus === "available" ? COLORS.ORANGE : COLORS.GRAY6
            }
            Drawer
            hideleft
            HomeHeader
            Bell
            onDrawerPress={openDrawer}
          />
          <View style={[Style.backImageStyle]}>
            <MapView
              ref={mapRef}
              style={{
                flex: 1,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              // provider={PROVIDER_GOOGLE}
              region={{
                latitude: latitude || 28.5222201,
                longitude: longitude || 77.2794433,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
              zoomTapEnabled={true}
              zoomEnabled={true}
              scrollEnabled={true}
              showsScale={true}
              onRegionChange={(res) => {
                console.log(res);
              }}
            >
              <Marker
                ref={markerRef}
                coordinate={{
                  latitude: latitude || 28.5222201,
                  longitude: longitude || 77.2794433,
                }}
              >
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require("../../assets/Images/Home/homeMarker.png")}
                />
              </Marker>

              {RIDEAFTERACCEPT && (
                <Marker
                  coordinate={{
                    latitude: RIDEAFTERACCEPT?.pickupLocation?.latitude,
                    longitude: RIDEAFTERACCEPT?.pickupLocation?.longitude,
                  }}
                  image={require("../../assets/Images/Home/destination1.png")}
                />
              )}

              {latitude && longitude && RIDEAFTERACCEPT && (
                <MapViewDirections
                  origin={{
                    latitude: latitude,
                    longitude: longitude,
                  }}
                  destination={{
                    latitude: RIDEAFTERACCEPT?.pickupLocation?.latitude,
                    longitude: RIDEAFTERACCEPT?.pickupLocation?.longitude,
                  }}
                  optimizeWaypoints={true}
                  apikey="AIzaSyCzU4XQ6D43-mEnHWZ5l3vobePxE6p2GRw"
                  strokeWidth={5}
                  strokeColor="rgba(255, 85, 0, 1)"
                />
              )}
            </MapView>
            <TouchableOpacity
              style={{
                position: "absolute",
                height: 10,
                width: 10,
              }}
              onPress={focusOnCurrentLocation}
            >
              <Image
                style={{
                  height: 40,
                  width: 40,
                  marginLeft: WIDTH * 0.85,
                  marginTop: WIDTH * 0.05,
                  tintColor: COLORS.ORANGE,
                }}
                resizeMode="contain"
                source={require("../../assets/Images/Home/pointer.png")}
              />
            </TouchableOpacity>

            <CommonModal
              head="Cancel Your Booking"
              Message="Are you sure, you want to cancel this"
              btn1="Back"
              btn2="Confirm"
              modalVisible={modalVisible1}
              Button12
              CancelModal
              OpenOnline={() => cancelBackHandler()}
              Action={() => {
                // console.log("I am calling Action button");
                cancelRideOfUser();
              }}
              title="Marker"
            />
            {/* </ImageBackground> */}
          </View>
          {/*  CancelYourRiderRequestRBSheet */}
          <CancelRiderRequestComponent
            openModal={openCancelModal}
            setOpenModal={setOpenCancelModal}
            type={type}
            openRideRef={() => rideDetailsRef?.current?.present()}
            cancel={cancel}
            setCancel={setCancel}
            setModalVisible1={setModalVisible1}
          />
          {!valuess && token && (
            <PendingModal
              modalVisible={valuess ? false : true}
              logout={logout}
            />
          )}
        </SafeAreaView>

        <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
        {/* OfflineModal */}
        {/* <RBSheet
          ref={bottomSheetRef1}
          height={ANDROID ? 160 : 180}
          closeOnDragDown={true}
          onClose={() => setOnline(true)}
          closeOnPressMask={true}
          customStyles={{
            container: Style.firstView1,
            draggableIcon: {
              opacity: 1,
              backgroundColor: "rrgba(155, 155, 155, 1)",
              width: WIDTH * 0.15,
              height: HEIGHT * 0.01,
            },
          }}
        >
          <View style={Style.firstView1}>
            <Text allowFontScaling={false} style={Style.textStyle}>
              Click on the button to get started
            </Text>
            <View style={{ paddingBottom: "6%" }}>
              <WholeButton
                Label="Go Online"
                styles={{ alignSelf: "center", marginTop: "5.5%" }}
                // Action={() => {
                //   handlePresentModalPress();
                // }}
              />
            </View>
          </View>
        </RBSheet> */}

        {/* OnlineModal */}
        {/* <RBSheet
          ref={bottomSheetRef2}
          height={ANDROID ? 160 : 180}
          closeOnDragDown={true}
          onClose={() => setModalVisible(true)}
          closeOnPressMask={true}
          customStyles={{
            container: Style.firstView1,
            draggableIcon: {
              opacity: 1,
              backgroundColor: "rrgba(155, 155, 155, 1)",
              width: WIDTH * 0.15,
              height: HEIGHT * 0.01,
            },
          }}
        >
          <View style={Style.firstView1}>
            <Text allowFontScaling={false} style={Style.textStyle}>
              Thanks ! You are online Now.
            </Text>
            <View style={{ paddingBottom: "6%" }}>
              <WholeButton
                Label="Online"
                styles={{
                  alignSelf: "center",
                  marginTop: "5.5%",
                  backgroundColor: COLORS.GREEN,
                }}
                Action={() => {
                  bottomSheetRef2.current.close();
                }}
              />
            </View>
          </View>
        </RBSheet> */}
        <BottomSheetModalProvider>
          <View style={Style.container}>
            {/* Modal for Ride Request PopUp*/}
            <BottomSheetModal
              ref={rideRequestRef}
              index={0}
              backgroundStyle={{
                backgroundColor: "transparent",
              }}
              onChange={handleSheetChanges}
              snapPoints={["100%"]}
              onDismiss={closedHandler}
              handleIndicatorStyle={{
                backgroundColor: "transparent",
              }}
            >
              <RideDetailsComponent
                openModal={openRideModal}
                // closedHandler={()=>closedHandler()}
                confimHadndler={acceptingRideRequest}
                setOpenModal={setOpenRideModal}
                cancelHandler={() => closedHandlerForRide()}
              />
            </BottomSheetModal>

            {/* Modal After the Ride Request Accepted  */}
            <BottomSheetModal
              ref={rideDetailsRef}
              index={1}
              // snapPoints={["13.1%", "55%"]}
              snapPoints={[
                HEIGHT * 0.12,
                HEIGHT > 800 ? HEIGHT * 0.49 : HEIGHT * 0.54,
              ]}
              onChange={handleSheetChanges}
              handleStyle={{
                backgroundColor: "#fff",
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}
              enablePanDownToClose={false}
            >
              <DepartureRBSheet
                onPress={() => {
                  rideDetailsRef?.current?.dismiss();
                  navigation.navigate("EnterCode", {
                    rideSocket: rideSocket,
                  });
                  dispatch(setToggle(false));
                  // meetUserConfirmRef?.current?.present();
                }}
                rideSocket={rideSocket}
                onCancle={() => {
                  rideDetailsRef?.current?.dismiss();
                  showType("RideRef");
                  setOpenCancelModal(true);
                }}
                openDirection={OpenDirection}
                type={"Ride"}
              />
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
        {loader && <SpinningLoader loader={loader} />}
        {riderequest && <SpinningLoader loader={riderequest} />}
      </GestureHandlerRootView>
    </>
  );
};

export default MainHomeTest;
const Style = StyleSheet.create({
  backImageStyle: {
    width: WIDTH,
    height: HEIGHT,
    resizeMode: "contain",
  },
  firstView1: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: COLORS.WHITE,
  },
  textStyle: {
    color: COLORS.BuleText,
    fontSize: 17,
    fontFamily: FONTS.light,
    textAlign: "center",
    paddingTop: "3.7%",
  },
  textStyle1: {
    color: COLORS.BuleText,
    fontSize: 16,
    fontFamily: FONTS.light,
  },
  Line: {
    backgroundColor: "#9B9B9B",
    width: WIDTH * 0.15,
    height: HEIGHT * 0.009,
    alignSelf: "center",
    marginTop: "3%",
    borderRadius: 8,
  },
  CancelrideView: {
    flexDirection: "row",
    width: WIDTH * 0.82,
    alignSelf: "flex-end",
    justifyContent: "space-around",
    marginTop: -20,
    // backgroundColor:'red'
  },
  CancelrideLineView: {
    backgroundColor: "#B1B1B1",
    width: WIDTH,
    height: 0.6,
    marginVertical: "3%",
  },
  CheckView: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    paddingVertical: "2.5%",
  },
  CrossImage: {
    width: WIDTH * 0.04,
    height: HEIGHT * 0.04,
    resizeMode: "contain",
  },

  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  modalView: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    alignItems: "center",
    width: WIDTH * 0.85,

    paddingBottom: "6%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: COLORS.BuleText,
    fontFamily: FONTS.bold,
    width: WIDTH * 0.6,
    fontSize: 18,
    marginTop: "10%",
    fontWeight: Platform.OS === "ios" ? "600" : "400",
  },
});
