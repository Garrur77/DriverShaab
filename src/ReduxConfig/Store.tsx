import { configureStore } from "@reduxjs/toolkit";
import CreatedSlices from "./Slices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserSlice from "./UserDetails/UserSlice";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import PersonalDetailsSlice from "./PersonalDetailsSlice";
import VehicalDetails_Slices from "./VehicleDetailsSlice";
import TokenUserID from "./TokenUserID";
import DriverLocationReducer from "./DriverLocationSlice";
import RideDetailsReducer from "./RideDetailsSlice";
import RIdeSlice from "./RIdeSlice";
import SocketSlice from "./SocketSlice/SocketSlice";
import notificationCountSlice from "./NotificationCountSlice";
import toggleSlice from "./ToggleSlice";
import driverDutySlice from "./DriverDutySlice";
import walletSlice from "./WalletSlice";
export type RootState = ReturnType<typeof store.getState>;
const valuePersistConfig = {
  key: "value",
  storage: AsyncStorage,
};
const userDetailsPersistConfig = {
  key: "userDetails",
  storage: AsyncStorage,
};
const StoreRide_PersistConfig = {
  key: "StartRide_State",
  storage: AsyncStorage,
};

const USERID_PersistConfig = {
  key: "USERID_",
  storage: AsyncStorage,
};

const Token_PersistConfig = {
  key: "TOKEN_",
  storage: AsyncStorage,
};

const PersonalDetails_PersistConfig = {
  key: "PERSONAL_DETAILS_",
  storage: AsyncStorage,
};
const VehicalDetails_PersistConfig = {
  key: "VEHICAL_DETAILS_",
  storage: AsyncStorage,
};

const TokenUserID_PersistConfig = {
  key: "userTokenAndId",
  storage: AsyncStorage,
};

const RIDESLICEPersistConfig = {
  key: "RIDES",
  storage: AsyncStorage,
};
const driverDutyPersistConfig = {
  key: "driverDuty",
  storage: AsyncStorage,
};
const walletPersistConfig = {
  key: "wallet",
  storage: AsyncStorage,
};

const persistedValueReducer = persistReducer(valuePersistConfig, CreatedSlices);
const persistedUserDetailsReducer = persistReducer(
  userDetailsPersistConfig,
  UserSlice
);
//
const persistedStart_RideReducer = persistReducer(
  StoreRide_PersistConfig,
  CreatedSlices
);
const persistedUSERID_Reducer = persistReducer(
  USERID_PersistConfig,
  CreatedSlices
);
const persistedTOKEN_Reducer = persistReducer(
  Token_PersistConfig,
  CreatedSlices
);

const persistedTokenUserID_Reducer = persistReducer(
  TokenUserID_PersistConfig,
  TokenUserID
);

const persistedPERSONALDETAILS_Reducer = persistReducer(
  PersonalDetails_PersistConfig,
  PersonalDetailsSlice
);
const persistedVEHICALDETAILS_Reducer = persistReducer(
  VehicalDetails_PersistConfig,
  VehicalDetails_Slices
);
const persistedRideDetailsReducer = persistReducer(
  RIDESLICEPersistConfig,
  RIdeSlice
);
const persistedDriverDutyReducer = persistReducer(
  driverDutyPersistConfig,
  driverDutySlice
);
const persistedWalletReducer = persistReducer(walletPersistConfig, walletSlice);
const persistedRootReducer = combineReducers({
  value: persistedValueReducer,
  userDetails: persistedUserDetailsReducer,
  StartRide_State: persistedStart_RideReducer,
  USERID_: persistedUSERID_Reducer,
  TOKEN_: persistedTOKEN_Reducer,
  PERSONAL_DETAILS_: persistedPERSONALDETAILS_Reducer,
  VEHICAL_DETAILS_: persistedVEHICALDETAILS_Reducer,
  TokenUserID_DETAILS: persistedTokenUserID_Reducer,
  INITIAL_LOCATION: DriverLocationReducer,
  INITIAL_RIDE_DETAILS: RideDetailsReducer,
  INITIAL_RIDE: RIdeSlice,
  socketReducer: SocketSlice,
  notificationCountSlice: notificationCountSlice,
  toggleSlice: toggleSlice,
  driverDuty: persistedDriverDutyReducer,
  wallet: persistedWalletReducer,
});
export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable the serializableCheck middleware
    }),
});
export const persistor = persistStore(store);
