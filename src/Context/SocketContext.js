// SocketContext.js
import React, { createContext, useContext, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { RootState } from "../ReduxConfig/Store";
import { SOCKET_URL } from "../Components/ApiConfig/EndPoints";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const Data = useSelector((state: RootState) => state.TokenUserID_DETAILS);
  const rideSocket = useRef(null);

  useEffect(() => {
    if (!rideSocket.current) {
      rideSocket.current = io(SOCKET_URL, {
        transports: ["websocket"],
        auth: { _id: Data?.userTokenAndId?.userId },
      });
    }
    const socket = rideSocket.current;

    // Add a listener for the "disconnect" event
    socket.on("connect", () => {
      const socketId = socket.id;
      console.log("Socket rideSocket connect", socketId);
    });

    // Add a listener for the "disconnect" event
    socket.on("disconnect", () => {
      const socketId = socket.id;
      console.log("Socket rideSocket disconnect", socketId);
    });

    // Clean up event listeners but do not disconnect the socket
    return () => {
      // if (socket) {
      //   socket.off("disconnect");
      // }
    };
  }, [Data?.userTokenAndId?.userId]);

  return (
    <SocketContext.Provider value={rideSocket.current}>
      {children}
    </SocketContext.Provider>
  );
};
