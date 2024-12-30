import * as React from "react";
import { View, Text, StatusBar, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RouteNavigation from "./src/Navigations/RouteNavigations";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/ReduxConfig/Store";
import { COLORS } from "./src/assets/Theme";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { onDisplayNotification } from "./PushNotification";
import notifee from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import { CheckOutInternetConnection } from "./src/Utils/CheckOutInternetConnection";
import NetInfo from "@react-native-community/netinfo";
import { WIDTH } from "./src/Helpers/Dimentions";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocationProvider } from "./src/Context/LocationContext";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/locales/i18n";
import { LanguageProvider } from "./src/locales/LanguageContext";

const Stack = createNativeStackNavigator();

function App() {
  const [isConnected, setIsConnected] = React.useState(false);
  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        showMessage({
          message: "You are offline",
          type: "danger",
          position: "top",
          backgroundColor: "red", // Customize background color
          color: "#fff", // Customize text color
          duration: 3000,
          // style: {
          //   top: 0,
          //   width: WIDTH * 0.92,
          //   alignItems: "center",
          //   backgroundColor: "blue",
          //   borderRadius: 10,
          //   justifyContent: "center",
          //   alignContent: "center",
          //   marginHorizontal: 16,
          // },
          // Set duration for the message
          // additional properties...
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // React.useEffect(() => {
  //   if (isConnected) {
  //     showMessage({
  //       message: "You are online",
  //       type: "success",
  //       position: "top",
  //       backgroundColor: "green", // Customize background color
  //       color: "#fff", // Customize text color
  //       duration: 3000, // Set duration for the message
  //       // additional properties...
  //       // additional properties...
  //     });
  //   }
  // }, [isConnected]);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
      getFCMToken();
    }
  };

  React.useEffect(() => {
    getFCMToken();
    if (Platform.OS === "ios") {
      requestUserPermission();
      notifee.requestPermission();
    }

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // console.log(
      //   "new FCM message recieved....",
      //   JSON.stringify(remoteMessage)
      // );
      onDisplayNotification(
        remoteMessage?.notification?.title,
        remoteMessage?.notification?.body
      );
    });
    return unsubscribe;
  }, []);

  // const getFCMToken = async () => {
  //   let checkFcm = await AsyncStorage.getItem("fcm");
  //   console.log("the fcm token", checkFcm);
  //   if (!!checkFcm) {
  //     try {
  //       const fcmToken = await messaging().getToken();
  //       if (!!fcmToken) {
  //         await AsyncStorage.setItem("fcm", fcmToken);
  //         console.log("the generated fcm token", fcmToken);
  //       }
  //     } catch (error) {
  //       console.log("error getting fcm token", error);
  //     }
  //   }
  // };

  const getFCMToken = async () => {
    const data = await AsyncStorage.getItem("fcm");
    if (!data) {
      const fcm = await messaging().getToken();
      await AsyncStorage.setItem("fcm", fcm);
      console.log("TEST", await messaging().getToken());
    }
    console.log("fcmTokenfcmTokenfcmTokenfcmTokenfcmTokenfcmToken", data);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <LocationProvider>
              <NavigationContainer>
                <I18nextProvider i18n={i18n}>
                  <LanguageProvider>
                    <RouteNavigation />
                  </LanguageProvider>
                </I18nextProvider>
              </NavigationContainer>
            </LocationProvider>
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
      <FlashMessage position="bottom" animated />
    </>
  );
}

export default App;
