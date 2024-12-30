import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NetInfo from "@react-native-community/netinfo";

/* -----------------------Spalsh----------------------------- */
import Splash from "../Screens/SplashFolder/Splash";
import Register from "../Screens/Auth/Register";
import OTPVerificationScreen from "../Screens/Auth/OTPVerificationScreen";

import Introduction from "../Screens/SplashFolder/Introduction";
import SplashWithModal from "../Screens/SplashFolder/SplashWithModal";
import EmailOtpVerify from "../Screens/Auth/EmailOtpVerify";
import Login from "../Screens/Auth/Login";

import CompleteProfile from "../Screens/Profile/CompleteProfile";
// import HomeOnline from "../Screens/Home/HomeOnline";
import AccountDetails from "../Screens/Profile/AccountDetails";
import VehicleDetails from "../Screens/Profile/VehicleDetails";
import EnterCode from "../Screens/Home/EnterCode";
import DepartureRBSheet from "../Components/HomeSvg/DepartureRBSheet";
import Notification from "../Screens/NotificationFolder/Notification";
// import HomeOnlineStartRide from "../Screens/Home/HomeOnlineStartRide";
import MyDrawer from "../MyDrawer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../ReduxConfig/Store";
import AddBank from "../Screens/SideMenu/AddBank";
import ChatScreen from "../Screens/Home/ChatScreen";
import Languages from "../Screens/SideMenu/Languages";
import LoginMoOtpVerify from "../Screens/Auth/LoginMoOtpVerify";
import Messages from "../Screens/SideMenu/Messages";
import Notices from "../Screens/SideMenu/Notices";
import MyDocuments from "../Screens/SideMenu/MyDocuments";
import MyRatings from "../Screens/SideMenu/MyRatings";
import MyPlans from "../Screens/SideMenu/MyPlans";
import Plans from "../Screens/Subscriptions/Plans";
import PaymentOptions from "../Screens/Subscriptions/PaymentOptions";
import AddPromo from "../Screens/SideMenu/AddPromo";
import { setIsOfflineAndOnline } from "../ReduxConfig/UserDetails/UserSlice";
import { showMessage } from "react-native-flash-message";
import ChatDrivertoUser from "../Screens/Home/ChatDrivertoUser";
import DrawerNavigations from "../DrawerNavigation/DrawerNavigations";
import { SOCKET_URL } from "../Components/ApiConfig/EndPoints";
import { io } from "socket.io-client";
import { SocketProvider } from "../Context/SocketContext";
import BankDetails from "../Screens/DrawerFolder/BankDetails";
import SendRecipt from "../Screens/SideMenu/SendRecipt";
import { Alert } from "react-native";
import messaging from "@react-native-firebase/messaging";
import { setRideDetails } from "../ReduxConfig/RideDetailsSlice";

const Stack = createNativeStackNavigator();

const NavigationScreens = () => {
  const RIDEAFTERACCEPT = useSelector(
    (state: RootState) => state.INITIAL_RIDE.rideDetailsAfterAccept
  );

  const Data = useSelector(
    (state: RootState) => state.TokenUserID_DETAILS?.userTokenAndId
  );

  const RideData = useSelector(
    (state: RootState) => state.INITIAL_RIDE_DETAILS?.rideDetails
  );

  const dispatch = useDispatch();

  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
      initialRouteName="Splash"
    >
      <Stack.Screen name="MyDrawer" component={DrawerNavigations} />
      <Stack.Screen name="BankDetails" component={BankDetails} />
      <Stack.Screen name="SendRecipt" component={SendRecipt} />
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="OTPVerificationScreen"
        component={OTPVerificationScreen}
      />
      <Stack.Screen
        name="Introduction"
        component={Introduction}
        options={{
          gestureEnabled: false, // Disable swipe gesture for this screen
        }}
      />
      <Stack.Screen
        name="SplashWithModal"
        component={SplashWithModal}
        options={{
          gestureEnabled: false, // Disable swipe gesture for this screen
        }}
      />
      <Stack.Screen
        name="EmailOtpVerify"
        component={EmailOtpVerify}
        options={{
          gestureEnabled: false, // Disable swipe gesture for this screen
        }}
      />
      <Stack.Screen
        name="LoginMoOtpVerify"
        component={LoginMoOtpVerify}
        options={{
          gestureEnabled: false, // Disable swipe gesture for this screen
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          gestureEnabled: false, // Disable swipe gesture for this screen
        }}
      />

      <Stack.Screen
        name="EnterCode"
        component={EnterCode}
        options={{
          gestureEnabled: false, // Disable swipe gesture for this screen
        }}
      />
      <Stack.Screen
        name="DepartureRBSheet"
        component={DepartureRBSheet}
        options={{
          gestureEnabled: false, // Disable swipe gesture for this screen
        }}
      />

      {/* -----------------------Profile-----------------------------  */}
      <Stack.Screen
        name="CompleteProfile"
        component={CompleteProfile}
        options={{
          gestureEnabled: false, // Disable swipe gesture for this screen
        }}
      />
      <Stack.Screen
        name="VehicleDetails"
        component={VehicleDetails}
        options={{
          gestureEnabled: false, // Disable swipe gesture for this screen
        }}
      />
      <Stack.Screen
        name="AccountDetails"
        component={AccountDetails}
        options={{
          gestureEnabled: false, // Disable swipe gesture for this screen
        }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          gestureEnabled: false, // Disable swipe gesture for this screen
        }}
      />
      <Stack.Screen
        name="AddBank"
        component={AddBank}
        options={{
          gestureEnabled: false, // Disable swipe gesture for this screen
        }}
      />
      <Stack.Screen
        name="AddPromo"
        component={AddPromo}
        options={{
          gestureEnabled: false, // Disable swipe gesture for this screen
        }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          gestureEnabled: false, // Disable swipe gesture for this screen
        }}
      />
      <Stack.Screen
        name="Languages"
        component={Languages}
        options={{
          gestureEnabled: false, // Disable swipe gesture for this screen
        }}
      />
      <Stack.Screen
        name="Messages"
        component={Messages}
        options={{
          gestureEnabled: false, // Disable swipe gesture for this screen
        }}
      />
      <Stack.Screen
        name="Notices"
        component={Notices}
        options={{
          gestureEnabled: false, // Disable swipe gesture for this screen
        }}
      />
      <Stack.Screen
        name="MyDocuments"
        component={MyDocuments}
        options={{
          gestureEnabled: false, // Disable swipe gesture for this screen
        }}
      />
      <Stack.Screen
        name="MyRatings"
        component={MyRatings}
        options={{
          gestureEnabled: false, // Disable swipe gesture for this screen
        }}
      />
      <Stack.Screen
        name="MyPlans"
        component={MyPlans}
        options={{
          gestureEnabled: false, // Disable swipe gesture for this screen
        }}
      />
      <Stack.Screen
        name="Plans"
        component={Plans}
        options={{
          gestureEnabled: false, // Disable swipe gesture for this screen
        }}
      />
      <Stack.Screen
        name="PaymentOptions"
        component={PaymentOptions}
        options={{
          gestureEnabled: false, // Disable swipe gesture for this screen
        }}
      />
      <Stack.Screen
        name="ChatDrivertoUser"
        component={ChatDrivertoUser}
        options={{
          gestureEnabled: false, // Disable swipe gesture for this screen
        }}
      />
    </Stack.Navigator>
  );
};

const GetCurrentFlow = () => {
  const visitType = useSelector(
    (state: RootState) => state.userDetails.visitType
  );

  // console.log(visitType, "___USER_TYPE");

  // if (visitType != "VISITED") {
  return <NavigationScreens />;
  // } else {
  //   return <MyDrawer />;
  // }
};

const RouteNavigationComponent = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      dispatch(setIsOfflineAndOnline(state?.isConnected)); // Dispatch action to update Redux store
      // if (!state.isConnected) {
      //   showMessage({
      //     message: "You are offline",
      //   });
      // }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return <GetCurrentFlow />;
};

const RouteNavigation = () => {
  const Data = useSelector((state: RootState) => state.TokenUserID_DETAILS);

  return (
    <SocketProvider>
      <RouteNavigationComponent />
    </SocketProvider>
  );
};

export default RouteNavigation;
