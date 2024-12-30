import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RideDetailsState {
  rideDetailsAfterAccept: {} | null;
  accpectRide: boolean;
}

const initialRideState: RideDetailsState = {
  rideDetailsAfterAccept: null,
  accpectRide: false,
};

const rideSlice = createSlice({
  name: "rideDetails",
  initialState: initialRideState,
  reducers: {
    //Ride Details
    setAccpectRide: (state, action: PayloadAction<{ rideDetails: any }>) => {
      state.accpectRide = action.payload;

      console.log(
        "action.payloadaction.payloadaction.payloadaction",
        action.payload
      );
    },
    clearAccpectRide: (state) => {
      state.accpectRide = false;
    },

    //RideDetailsAfterAccept Details
    setRideDetailsAfterAccept: (
      state,
      action: PayloadAction<{ rideDetails: any }>
    ) => {
      state.rideDetailsAfterAccept = action.payload;
    },
    clearRideDetailsAfterAccept: (state) => {
      state.rideDetailsAfterAccept = null;
    },
  },
});

export const {
  clearAccpectRide,
  setAccpectRide,
  setRideDetailsAfterAccept,
  clearRideDetailsAfterAccept,
} = rideSlice.actions;

export default rideSlice.reducer;
