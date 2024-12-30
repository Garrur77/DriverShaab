// src/redux/toggleSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToggleState {
  value: boolean;
}

const initialState: ToggleState = {
  value: false,
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    setToggle: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setToggle } = toggleSlice.actions;

export default toggleSlice.reducer;
