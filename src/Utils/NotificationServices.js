// import messaging from "@react-native-firebase/messaging";
// import AsyncStoarge from "@react-native-async-storage/async-storage";
// import { async } from "rxjs";

// export async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log("Authorization status:", authStatus);
//     getfcmToken();
//   }
// }

// const getfcmToken = async () => {
//   let fcmToken = await AsyncStoarge.getItem("fcmToken");
//   console.log("tokenn oldddddddd", fcmToken);
//   if (!fcmToken) {
//     try {
//       const fcmToken = await messaging().getToken();
//       if (fcmToken) {
//         console.log("token newwwwwwwwww", fcmToken);
//         await AsyncStoarge.setItem("fcmToken", fcmToken);
//       }
//     } catch (error) {
//       console.log("errrorrr ", error);
//     }
//   }
// };

// export const notificationListner = async () => {
//   messaging().onNotificationOpenedApp((remoteMessage) => {
//     console.log(
//       "Notification caused app to open from background state:",
//       remoteMessage.notification
//     );
//   });

//   messaging().onMessage(async (remoteMessage) => {
//     console.log("recieved foreground message", remoteMessage);
//   });

//   messaging()
//     .getInitialNotification()
//     .then((remoteMessage) => {
//       if (remoteMessage) {
//         console.log(
//           "Notification caused app to open from quit state:",
//           remoteMessage.notification
//         );
//         // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
//       }
//       // setLoading(false);
//     });
// };
