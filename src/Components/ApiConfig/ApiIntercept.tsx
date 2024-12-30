import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASEURL } from "./EndPoints";

const instance = axios.create({
  baseURL: BASEURL,
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("TOKEN");
    console.log("token", token);

    config.headers.token = token;

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
