import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocationState {
  latitude: number | null;
  longitude: number | null;
}

const initialLocationState: LocationState = {
  latitude: null,
  longitude: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState: initialLocationState,
  reducers: {
    setLocation: (
      state,
      action: PayloadAction<{ latitude: number; longitude: number }>
    ) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
    clearLocation: (state) => {
      state.latitude = null;
      state.longitude = null;
    },
  },
});

export const { setLocation, clearLocation } = locationSlice.actions;

export default locationSlice.reducer;
