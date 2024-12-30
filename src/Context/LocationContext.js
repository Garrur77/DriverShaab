import React, { createContext, useState, useContext, useEffect } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [latitude, setLatitude] = useState(28.5222334);
  const [longitude, setLongitude] = useState(77.2794627);

  return (
    <LocationContext.Provider
      value={{ latitude, setLatitude, longitude, setLongitude }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
