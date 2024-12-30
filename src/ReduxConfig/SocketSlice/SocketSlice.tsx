// socketSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { Action } from "rxjs/internal/scheduler/Action";

const SocketSlice = createSlice({
  name: "socket",
  initialState: {
    connected: false,
    receivedData: null, // Add a property to store received data
    socket: null,
  },
  reducers: {
    connectSocket: (state) => {
      state.socket.connect();
      state.connected = true;
    },
    disconnectSocket: (state) => {
      state.socket.disconnect();
      state.connected = false;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    receiveSocketData: (state, action) => {
      state.receivedData = action.payload;
    },
  },
});

export const { connectSocket, disconnectSocket, receiveSocketData, setSocket } =
  SocketSlice.actions;
export const selectSocketConnected = (state) => state.socket.connected;
export const selectReceivedData = (state) => state.socket.receivedData;
export default SocketSlice.reducer;
