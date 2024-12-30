/*

import notifee, { AndroidImportance } from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";

// Function to display notification
export const onDisplayNotification = async (title, body) => {
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: "UberLikeTesting1",
    name: "Default Testing1",
    sound: "customenoti",
    importance: AndroidImportance.HIGH,
    ios: {
      sound: "default",
    },
  });

  // Display the notification
  await notifee.displayNotification({
    title: title,
    body: body,
    android: {
      channelId,
      pressAction: {
        id: "default",
      },
    },
  });
};

// Function for initial notification setup
export const initialNotification = async () => {
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: "UberLikeTest",
    name: "Default Test",
    sound: "customenoti",
    importance: AndroidImportance.HIGH,
  });

  // Display the initial notification
  await notifee.displayNotification({
    title: "Welcome to the app",
    body: "This is the first notification",
    android: {
      channelId,
      pressAction: {
        id: "default",
      },
    },
  });
};

// Set up the background message handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
  await onDisplayNotification(
    remoteMessage.notification.title,
    remoteMessage.notification.body
  );
});

// Handle foreground messages
messaging().onMessage(async (remoteMessage) => {
  console.log("A new FCM message arrived!", remoteMessage);
  await onDisplayNotification(
    remoteMessage.notification.title,
    remoteMessage.notification.body
  );
});
*/
import { DeviceEventEmitter } from "react-native";
import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";

// Function to display notification
export const onDisplayNotification = async (title, body) => {
  await notifee.requestPermission();

  // Create or get the channel ID (required for Android)
  const channelId = await notifee.createChannel({
    id: "default_channel_id",
    name: "UberDriver",
    sound: "default", // Example sound setting
    importance: AndroidImportance.HIGH,
    visibility: AndroidVisibility.PUBLIC,
    bypassDnd: true, // Optional: Allow notification to bypass Do Not Disturb mode,
  });

  // Display the notification
  await notifee.displayNotification({
    title: title,
    body: body,
    android: {
      channelId: channelId,
      pressAction: {
        id: "default",
      },
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
    },
  });
};

// Set up the background message handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);

  if (remoteMessage.notification) {
    await onDisplayNotification(
      remoteMessage.notification.title,
      remoteMessage.notification.body
    );
  }
});

// Handle foreground messages
messaging().onMessage(async (remoteMessage) => {
  console.log("A new FCM message arrived! for user", remoteMessage);

  if (remoteMessage?.data?.type == "rider_message") {
    DeviceEventEmitter.emit("recived_new_message", remoteMessage?.data);
  }

  // Optionally handle foreground notification behavior
  // Here, you can choose to show or suppress the notification banner
});

// Ensure your app state changes are also handled appropriately
