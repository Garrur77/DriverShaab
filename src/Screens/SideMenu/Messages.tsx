// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   SafeAreaView,
//   ImageBackground,
//   TouchableOpacity,
//   TextInput,
//   Dimensions,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StatusBar,
//   ActivityIndicator,
// } from "react-native";
// import React, { useRef, useState, useEffect } from "react";
// import Header from "../../Components/HeaderComponent";
// import { WIDTH } from "../../Helpers/Dimentions";
// import { COLORS } from "../../assets/Theme";
// import { RootState } from "../../ReduxConfig/Store";
// import { useDispatch, useSelector } from "react-redux";
// import { useIsFocused } from "@react-navigation/native";
// import {
//   connectSocket,
//   disconnectSocket,
//   selectSocketConnected,
// } from "../../ReduxConfig/SocketSlice/SocketSlice";

// const { width, height } = Dimensions.get("screen");

// const Messages = (props) => {
//   const Data = useSelector(
//     (state: RootState) => state.TokenUserID_DETAILS?.userTokenAndId
//   );
//   const Socket = useSelector((state: RootState) => state.socketReducer);
//   const [userId, setUserId] = useState(Data.userId);

//   useEffect(() => {
//     setUserId(Data?.userId);
//   }, [Data]);
//   const [chatRoomId, setChatRoomId] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState("");
//   const [adminChatRoomId, setAdminChatRoomId] = useState("");
//   // const [socket, setSocket] = useState(null);
//   const [socketId, setSocketId] = useState('');
//   const [types, setType] = useState("");
//   const isfocus = useIsFocused();
//   const scrollViewRef = useRef();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Scroll to the bottom whenever messages change
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     if (scrollViewRef.current) {
//       scrollViewRef.current.scrollToEnd({ animated: true });
//     }
//   };

//   useEffect(() => {
//     dispatch(connectSocket());

//     Socket.socket?.on("connect", () => {
//       console.log("Chat Socket Connect Succ");
//       setSocketId(Socket.socket)
//     });
//     Socket.socket.on("receiveMessage", (data) => {
//       appendMessage(data);
//     });

//     Socket.socket.emit("initiateChat", userId);
//     // const newSocket = io(SOCKET_URL, {
//     //   transports: ["polling"],
//     // });
//     // newSocket?.connect();
//     // newSocket.on("connect", () => {
//     //   console.log("Socket connected");
//     // });

//     Socket?.socket.on("receiveMessage", (reason) => {
//       console.log("Socket chat  receiveMessage:", reason);
//       appendMessage(data);
//     });
//     // newSocket.on("receiveMessage", (data) => {
//     //   appendMessage(data);
//     //   setType(data?.from);
//     // });

//     // newSocket.on("disconnect", (reason) => {
//     //   console.log("Socket disconnected:", reason);
//     // });

//     // setSocket(newSocket);

//     // Socket.socket.on("disconnect", (reason) => {
//     //   console.log("Socket chat  disconnected:", reason);
//     // });

//     Socket.socket.on("chatInitiated", (data) => {
//       console.log("chatInitiatedchatInitiated", data?.chatRoomId);
//       setAdminChatRoomId(data?.chatRoomId);
//       setMessages(data?.messages);
//     });

//     return () => {
//       dispatch(disconnectSocket());
//       // newSocket.disconnect();
//     };
//   }, [isfocus]);

//   const sendMessage = () => {
//     const message = messageInput.trim();

//     if (message !== "") {
//       Socket.socket.emit("sendMessage", {
//         message,
//         chatRoomId: adminChatRoomId,
//         from: "User",
//       });
//       console.log("llllllllldlddl", message);
//       console.log("adminChatRoomIdadminChatRoomId", adminChatRoomId);
//       // appendMessage(`You: ${message}`);
//       appendMessage({
//         message,
//         chatRoomId: adminChatRoomId,
//         from: "User",
//       });

//       setMessageInput("");
//     }
//   };

//   const appendMessage = (message) => {
//     setMessages((prevMessages) => [...prevMessages, message]);
//   };

//   console.log("Socket.socketSocket.socketSocket.socket",Socket.socket)
//   const typingHandler = (status) => {
//     if (Socket.socket) {
//       Socket.socket.emit("typing", {
//             typer: Socket.socket?.id,
//             status: status,
//             userId: userId,
//             roomId: adminChatRoomId
//         })
//     }
// }
//   return (
//     <>
//       <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
//       <StatusBar
//         backgroundColor={COLORS.BACKGROUNDBTNCOLOR}
//         barStyle={"dark-content"}
//       />
//       <SafeAreaView
//         style={{ backgroundColor: COLORS.WHITE, flex: 1, position: "relative" }}
//       >
//         <Header
//           navigation={props?.navigation}
//           Action={() => {
//             props.navigation.goBack();
//           }}
//           Heading={"Help Desk"}
//         />
//         {!adminChatRoomId ? (
//           <View
//             style={{
//               backgroundColor: "rgba(0,0,0,0.4)",
//               flex: 1,
//               zIndex: 1,

//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <ActivityIndicator size={"large"} color={"#fff"} />
//           </View>
//         ) : (
//           <KeyboardAvoidingView
//             behavior={Platform.OS === "ios" ? "padding" : "height"}
//             style={{ flexGrow: 1, flex: 1 }}
//             contentContainerStyle={{ flex: 1 }}
//             keyboardVerticalOffset={60}
//           >
//             <View style={{ flex: 1, justifyContent: "space-between" }}>
//               <View
//                 style={{
//                   backgroundColor: "#fff",
//                   flex: 1,
//                   paddingVertical: 10,
//                   paddingHorizontal: 10,
//                 }}
//               >
//                 <ScrollView
//                   ref={scrollViewRef}
//                   onContentSizeChange={scrollToBottom}
//                   style={styles.messagesContainer}
//                   showsVerticalScrollIndicator={false}
//                 >
//                   {messages &&
//                     messages?.map((msg, index) => {
//                       const isUserMessage =
//                         typeof msg === "string" && msg?.includes(":");
//                       const sender = isUserMessage
//                         ? msg.split(":")[0]
//                         : msg?.from;
//                       const messageStyle = {
//                         alignSelf:
//                           sender === "Admin" ? "flex-start" : "flex-end",
//                         backgroundColor:
//                           sender === "Admin"
//                             ? "rgba(239, 239, 244, 1)"
//                             : "rgba(255, 85, 0, 1)",
//                         borderTopLeftRadius: sender === "Admin" ? 0 : 10,
//                         borderTopRightRadius: sender === "Admin" ? 10 : 10,
//                         borderBottomLeftRadius: 10,
//                         padding: 10,
//                         maxWidth: WIDTH * 0.8,
//                       };

//                       return (
//                         <View
//                           key={index}
//                           style={{ marginBottom: 15, marginHorizontal: 5 }}
//                         >
//                           <View style={messageStyle}>
//                             <Text
//                               style={{
//                                 color:
//                                   sender === "Admin"
//                                     ? "rgba(38, 38, 40, 1)"
//                                     : "#fff",
//                                 fontSize: 14,
//                                 lineHeight: 20,
//                                 paddingRight: 6,
//                               }}
//                             >
//                               {isUserMessage
//                                 ? msg.split(":")[1].trim()
//                                 : msg?.message.trim()}
//                             </Text>
//                           </View>
//                         </View>
//                       );
//                     })}
//                 </ScrollView>
//               </View>
//               <View style={styles.lastview}>
//                 <View style={styles.search}>
//                   <TextInput
//                     placeholder="Type a message..."
//                     placeholderTextColor={"#C8C7CC"}
//                     value={messageInput}
//                     onChangeText={setMessageInput}
//                     autoCapitalize="none"
//                     style={styles.input}
//                     onFocus={() => {
//                       typingHandler(true)
//                   }}
//                   onBlur={() => {
//                       typingHandler(false)
//                   }}
//                   />
//                 </View>
//                 <TouchableOpacity
//                   onPress={sendMessage}
//                   style={{
//                     paddingHorizontal: 10,
//                     paddingVertical: 10,
//                     borderRadius: 40,
//                     marginRight: 10,
//                   }}
//                 >
//                   <Image
//                     source={require("../../assets/Images/Home/send.png")}
//                     style={{ width: 30, height: 30 }}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </KeyboardAvoidingView>
//         )}
//       </SafeAreaView>
//       <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
//     </>
//   );
// };

// export default Messages;

// const styles = StyleSheet.create({
//   search: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 15,
//     columnGap: 12,
//     flex: 1,
//   },
//   viewStyle: {
//     backgroundColor: "#FF5500",
//     flexDirection: "row",
//   },
//   input: {
//     width: WIDTH * 0.8,
//     alignSelf: "center",
//     borderRadius: 10,
//     borderColor: "#EFEFF4",
//     borderWidth: 1,
//     paddingLeft: "5%",
//     height: 40,
//     color: "#000",
//     backgroundColor: "#FFFFFF",
//   },
//   chatbutton: {
//     backgroundColor: "red",
//     padding: 18,
//     borderRadius: 100,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   lastview: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "flex-end",
//     marginLeft: 5,
//     // marginHorizontal: 16,
//     columnGap: 10,
//     paddingBottom: Platform.OS === "android" ? 22 : 0,
//     backgroundColor: "rgba(239, 239, 244, 0.4)",
//     width: WIDTH * 1,
//   },
//   text: {
//     fontSize: 16,
//     // color: COLORS.heading,
//     lineHeight: 20,
//     color: "#212121",
//   },
//   textStyle: {
//     // fontFamily: FONTS.bold,
//     fontSize: 30,
//     color: "#fff",
//     fontWeight: "600",
//   },
//   modalContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 18,
//     borderTopWidth: 1,
//     borderColor: "#EDEDED",
//   },
//   blocktext: {
//     fontSize: 16,
//     color: "#212121",
//     lineHeight: 22,
//     textAlign: "center",
//     // paddingHorizontal: height * 0.1,
//     paddingVertical: height * 0.02,
//   },
// });

import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  FlatList,
  StatusBar,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import Header from "../../Components/HeaderComponent";
import { HEIGHT, WIDTH } from "../../Helpers/Dimentions";
import { COLORS, IMAGEPATH } from "../../assets/Theme";
import { RootState } from "../../ReduxConfig/Store";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { SOCKET_URL } from "../../Components/ApiConfig/EndPoints";
import { useTranslation } from "react-i18next";

const { width, height } = Dimensions.get("screen");

const Messages = (props) => {
  const { t } = useTranslation();
  const Data = useSelector(
    (state: RootState) => state.TokenUserID_DETAILS?.userTokenAndId
  );
  const [userId, setUserId] = useState(Data?.userId);

  useEffect(() => {
    setUserId(Data?.userId);
  }, [Data]);
  const [chatRoomId, setChatRoomId] = useState("");
  const [messages, setMessages] = useState([]);

  console.log("messagessss", messages);
  const [messageInput, setMessageInput] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminChatRoomId, setAdminChatRoomId] = useState("");
  const [socket, setSocket] = useState(null);
  const [types, setType] = useState("");
  console.log("typestypes", types);
  const isfocus = useIsFocused();

  const scrollViewRef = useRef();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    initiateChat();
  }, [isfocus, socket]);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ["polling"],
    });

    newSocket.on("connect", () => {
      console.log("Socket connected");
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [isfocus]);

  const initiateChat = () => {
    if (socket) {
      socket.emit("initiateChat", userId);
      socket.on("userNotFound", () => {
        console.error("User not found. Please check your User ID.");
      });

      socket.on("adminNotFound", () => {
        console.error("Admin not found. Please try again later.");
      });

      socket.on("chatInitiated", (data) => {
        console.log("chatInitiatedchatInitiated", data?.chatRoomId);
        setIsAdmin(false);
        setAdminChatRoomId(data?.chatRoomId);
        setMessages(data?.messages);
      });
    }
  };

  const sendMessage = () => {
    if (socket) {
      const message = messageInput.trim();

      if (message !== "") {
        socket.emit("sendMessage", {
          message,
          chatRoomId: adminChatRoomId,
          from: "User",
        });
        appendMessage(`User: ${message}`);
        setMessageInput("");
      }
    }
  };

  const appendMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (data) => {
        appendMessage(`${data?.from}: ${data?.message}`);
        setType(data?.from);
      });
    }

    return () => {
      if (socket) {
        socket.off("receiveMessage"); // Remove the listener when the component unmounts
      }
    };
  }, [socket, messages, types]);

  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.ORANGE }}></SafeAreaView>
      <StatusBar
        backgroundColor={COLORS.BACKGROUNDBTNCOLOR}
        barStyle={"dark-content"}
      />
      <SafeAreaView style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
        <Header
          navigation={props?.navigation}
          Action={() => {
            props.navigation.goBack();
          }}
          Heading={t("Help Desk")}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flexGrow: 1 }}
          keyboardVerticalOffset={60}
        >
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View
              style={{
                backgroundColor: "#fff",
                flex: 1,
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}
            >
              <ScrollView
                ref={scrollViewRef}
                onContentSizeChange={scrollToBottom}
                style={styles.messagesContainer}
                showsVerticalScrollIndicator={false}
              >
                {messages &&
                  messages?.map((msg, index) => {
                    const isUserMessage =
                      typeof msg === "string" && msg?.includes(":");
                    const sender = isUserMessage
                      ? msg.split(":")[0]
                      : msg?.from;
                    const messageStyle = {
                      alignSelf: sender === "Admin" ? "flex-start" : "flex-end",
                      backgroundColor:
                        sender === "Admin"
                          ? "rgba(239, 239, 244, 1)"
                          : "rgba(255, 85, 0, 1)",
                      borderTopLeftRadius: sender === "Admin" ? 0 : 10,
                      borderTopRightRadius: sender === "Admin" ? 10 : 10,
                      borderBottomLeftRadius: 10,
                      padding: 10,
                      maxWidth: 250,
                      // width: 200,
                    };

                    return (
                      <View
                        key={index}
                        style={{ marginBottom: 15, marginHorizontal: 5 }}
                      >
                        <View style={messageStyle}>
                          <Text
                            allowFontScaling={false}
                            style={{
                              color:
                                sender === "Admin"
                                  ? "rgba(38, 38, 40, 1)"
                                  : "#fff",
                              fontSize: 14,
                              lineHeight: 20,
                              paddingRight: 6,
                            }}
                          >
                            {isUserMessage
                              ? msg.split(":")[1].trim()
                              : msg?.message.trim()}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
              </ScrollView>
            </View>
            <View style={styles.lastview}>
              <View style={styles.search}>
                <TextInput
                  allowFontScaling={false}
                  placeholder={t("Type a message...")}
                  placeholderTextColor={"#C8C7CC"}
                  value={messageInput}
                  onChangeText={setMessageInput}
                  autoCapitalize="none"
                  style={styles.input}
                />
              </View>
              <TouchableOpacity
                onPress={sendMessage}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 40,
                  marginRight: 10,
                }}
              >
                <Image
                  source={require("../../assets/Images/Home/send.png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: "#fff" }}></SafeAreaView>
    </>
  );
};

export default Messages;

const styles = StyleSheet.create({
  search: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    columnGap: 12,
    flex: 1,
  },
  viewStyle: {
    backgroundColor: "#FF5500",
    flexDirection: "row",
  },
  input: {
    width: WIDTH * 0.8,
    alignSelf: "center",
    borderRadius: 10,
    borderColor: "#EFEFF4",
    borderWidth: 1,
    paddingLeft: "5%",
    height: 40,
    color: "#000",
    backgroundColor: "#FFFFFF",
  },
  chatbutton: {
    backgroundColor: "red",
    padding: 18,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  lastview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginLeft: 5,
    columnGap: 10,
    paddingBottom: Platform.OS === "android" ? 22 : 0,
    backgroundColor: "rgba(239, 239, 244, 0.4)",
    width: WIDTH * 1,
  },
  text: {
    fontSize: 16,
    // color: COLORS.heading,
    lineHeight: 20,
    color: "#212121",
  },
  textStyle: {
    // fontFamily: FONTS.bold,
    fontSize: 30,
    color: "#fff",
    fontWeight: "600",
  },
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderTopWidth: 1,
    borderColor: "#EDEDED",
  },
  blocktext: {
    fontSize: 16,
    color: "#212121",
    lineHeight: 22,
    textAlign: "center",
    paddingVertical: height * 0.02,
  },
});
