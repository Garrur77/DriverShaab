import { showMessage } from "react-native-flash-message";
import instance from "../../Components/ApiConfig/ApiIntercept";
import axios from "axios";
import { updateDriverLocation } from "./EndPoints";

export const callGetApi = async (Endpoints: string, SucessDisplay: boolean) => {
  let loading = true;
  try {
    const response = await instance(Endpoints);
    console.log("Response:", response.data);

    if (response?.data?.responseCode === 200) {
      {
        SucessDisplay &&
          showMessage({
            message: response?.data?.responseMessage,
            type: "success",
            icon: "success",
            duration: 3000,
          });
      }

      console.log("HERE IS RESPONSE:", response.data);
    }
    loading = false;
    return { loading, response: response.data, error: null };
  } catch (error: any) {
    loading = false;
    console.log("HERERRER IS SERVERERROR", error.response.status);

    if (error.response.status === 503) {
      showMessage({
        message: "Server Error",
        type: "danger",
        icon: "danger",
        duration: 3000,
      });
    }
    if (error.response.status === 402) {
      showMessage({
        message: error?.response?.data?.message,
        type: "warning",
        icon: "warning",
        duration: 3000,
      });
    }
    if (error.response.status === 404) {
      showMessage({
        message: error?.response?.data?.message,
        type: "warning",
        icon: "warning",
        duration: 3000,
      });
    }
    if (error.response.status === 403) {
      showMessage({
        message: error?.response?.data?.message,
        type: "warning",
        icon: "warning",
        duration: 3000,
      });
    }
    // showMessage({
    //   message: error?.response?.data?.message,
    //   type: "danger",
    //   icon: "danger",
    //   duration: 3000,
    // });
    console.error(Endpoints, "Error:", error, error.response);
    return { loading, response: null, error: error?.response };
  }
};

export const callPostApi = async (
  endpoint: string,
  data: object,
  SucessDisplay: boolean
) => {
  let loading = true;

  try {
    const response = await instance.post(endpoint, data);
    if (response?.data?.responseCode === 200) {
      {
        SucessDisplay &&
          showMessage({
            message: response?.data?.responseMessage,
            type: "success",
            icon: "success",
          });
      }
    } else if (response.data.responseCode === 400) {
      showMessage({
        message: response?.data?.responseMessage,
        type: "danger",
        icon: "danger",
        duration: 1000,
      });
    }
    // console.log("callPostApiResponse:", response);
    loading = false;
    return { loading, response: response.data, error: null };
  } catch (error: any) {
    loading = false;

    if (error.response && error.response.status === 503) {
      showMessage({
        message: "Server Error",
        type: "danger",
        icon: "danger",
        duration: 3000,
      });
    } else if (error.response && error.response.status === 400) {
      showMessage({
        message: error?.response?.data?.responseMessage,
        type: "danger",
        icon: "danger",
        duration: 3000,
      });
      console.log("ERROR-Response:sdsdsd", error?.response);
      // Alert.alert(error?.response?.data?.responseMessage);
    } else if (error.response && error.response.status === 404) {
      showMessage({
        message: error?.response?.data?.responseMessage,
        type: "danger",
        icon: "danger",
        duration: 3000,
      });
    } else if (error.response && error.response.status === 500) {
      showMessage({
        message: "Server Error please try after a short time",
        type: "danger",
        icon: "danger",
        duration: 5000,
      });

      // Alert.alert(error?.response?.data?.responseMessage);
    } else {
      // showMessage({
      //   message: error?.response?.data?.message,
      //   type: "danger",
      //   icon: "danger",
      //   duration: 3000,
      // });
      console.error(endpoint, "Error:", error, error.response);
    }
    console.log("ERROR-Response:", error?.response);
    loading = false;
    return { loading, response: null, error };
  }
};

export const UpdateLoactionDriver = async (data) => {
  try {
    console.log("datadatadatadatadata", data);
    const datats = {
      lon: "77.391029",
      lat: "28.535517",
    };
    const response = await instance.post(updateDriverLocation, data);
    // console.log("UpdateLoactionDriver response",response?.data)
  } catch (error) {
    console.log("UpdateLoactionDriver error", error);
    return false;
  }
};
