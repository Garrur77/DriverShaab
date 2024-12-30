import { AppState } from "react-native";
import { NetInfoSubscribe } from "./Index";
import { useCallback } from "react";
import { showMessage } from "react-native-flash-message";

export const CheckOutInternetConnection = () => {
  const checkAppStatus = () =>
    AppState.addEventListener("change", (state) => {
      if (state == "active") {
        checkInternet();
      }
    });

  const checkInternet = useCallback(() => {
    NetInfoSubscribe.subscribe((value) => {
      if (value === false) {
        // HANDLE NETWORK MODAL STATE
        showMessage({
          message: "No internet connection.",
          icon: "danger",
          type: "danger",
          duration: 2000,
        });
      }
      if (value) {
        showMessage({
          message: "You are online.",
          icon: "success",
          backgroundColor: "#4891ff",
          type: "success",
          duration: 2000,
        });
      }
    });
  }, []);

  return { checkAppStatus };
};
