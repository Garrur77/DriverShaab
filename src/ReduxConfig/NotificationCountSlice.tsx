import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationCountState {
  notificationCount: number;
}

const initialState: NotificationCountState = {
  notificationCount: 0,
};

const notificationCountSlice = createSlice({
  name: "notificationCount",
  initialState,
  reducers: {
    incrementNotificationCount: (state, action: PayloadAction<number>) => {
      state.notificationCount += action.payload;
    },
    resetNotificationCount: (state) => {
      state.notificationCount = 0;
    },
  },
});

export const { incrementNotificationCount, resetNotificationCount } =
  notificationCountSlice.actions;
export default notificationCountSlice.reducer;
