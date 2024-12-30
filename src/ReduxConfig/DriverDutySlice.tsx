import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface driverDutyState {
  driverDuty: string | null;
}

const initialState: driverDutyState = {
  driverDuty: null,
};

const driverDutySlice = createSlice({
  name: "duty",
  initialState,
  reducers: {
    setDriverDuty: (state, action: PayloadAction<string | null>) => {
      state.driverDuty = action.payload;
    },
  },
});

export const { setDriverDuty } = driverDutySlice.actions;
export default driverDutySlice.reducer;
