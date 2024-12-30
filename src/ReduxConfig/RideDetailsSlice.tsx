import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RideDetailsState {
  rideDetails: {} | null;
  accpectRide: boolean;
}

const initialRideState: RideDetailsState = {
  rideDetails: {},
  accpectRide: false,
};

const rideDetailsSlice = createSlice({
  name: "rideDetails",
  initialState: initialRideState,
  reducers: {
    //Ride Details
    setRideDetails: (state, action: PayloadAction<{ rideDetails: any }>) => {
      state.rideDetails = action.payload;
    },
    clearRideDetails: (state) => {
      state.rideDetails = null;
      state.accpectRide = false;
    },

    //Ride Details
    setAccpectRide: (state, action: PayloadAction<{ rideDetails: any }>) => {
      state.accpectRide = action.payload;
    },
    clearAccpectRide: (state) => {
      state.accpectRide = false;
    },
  },
});

export const {
  setRideDetails,
  clearRideDetails,
  clearAccpectRide,
  setAccpectRide,
} = rideDetailsSlice.actions;

export default rideDetailsSlice.reducer;
