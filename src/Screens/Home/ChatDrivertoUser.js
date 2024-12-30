import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";

import React, { useRef, useState, useEffect } from "react";
import Header from "../../Components/HeaderComponent";
import { COLORS, IMAGEPATH, VECTOR_ICONS } from "../../assets/Theme";
import { RootState } from "../../ReduxConfig/Store";
import { useSelector } from "react-redux";
import {
  SOCKET_URL,
  getChatbyRideId,
} from "../../Components/ApiConfig/EndPoints";
import { WIDTH } from "../../Helpers/Dimentions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSocket } from "../../Context/SocketContext";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { io } from "socket.io-client";

const { height } = Dimensions.get("screen");

const ChatDrivertoUser = (props) => {
  const isFocus = useIsFocused();
  const scrollViewRef = useRef();

  const DataRide = useSelector(
    (state: RootState) =>
      state.INITIAL_RIDE?.rideDetailsAfterAccept?.riderDetails
  );
  const RIDEAFTERACCEPT = useSelector(
    (state: RootState) => state.INITIAL_RIDE?.rideDetailsAfterAccept
  );

  const [newSocket, setNewSocket] = useState();
  const [messages, setMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      jsonp: false,
      secure: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      randomizationFactor: 0.5,
    });

    setNewSocket(socket);

    socket.on("connect_error", (error) => {
      Alert.alert("Socket connection error", error.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const appendMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };
  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const sendMessage = () => {
    if (newSocket) {
      const message = messageInput.trim();
      if (message !== "") {
        newSocket.emit("sendRideMessage", {
          message,
          from: "driver",
          rideId: RIDEAFTERACCEPT?.rideId,
        });
        setMessageInput("");
      }
    } else {
      console.warn("Socket is not initialized yet.");
    }
  };

  useEffect(() => {
    const allMessageData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: getChatbyRideId,
          headers: {
            token: await AsyncStorage.getItem("TOKEN"),
          },
          params: {
            rideId: RIDEAFTERACCEPT?.rideId,
          },
        });
        setMessages(response.data.result.messages);
        setAllMessages(response.data.result);
      } catch (error) {
        console.log("getAllRideMessages error", error.response);
      }
    };
    allMessageData();
  }, [isFocus]);

  useEffect(() => {
    console.log("user efferct1234====");
    if (newSocket) {
      // console.log("dfgdsfgfsdgdsfgdsfg");
      newSocket.on("receiveRideMessage", (data) => {
        // console.log("HHHHHHHHHH====", data);
        appendMessage(data);
      });
    }
  }, [newSocket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, allMessages]);

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
        />
        <View style={styles.viewStyle}>
          <View style={styles.HeadinVIEW}>
            <Text allowFontScaling={false} style={styles.textStyle}>
              {DataRide?.riderDetailsName}
            </Text>
            <Image
              source={
                DataRide?.riderImage
                  ? { uri: DataRide?.riderImage }
                  : IMAGEPATH.ProfilePic
              }
              style={styles.Profile_Heading}
            />
          </View>
        </View>
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
                  messages.map((msgObject, index) => {
                    console.log("msgObjectmsgObjectmsgObject", msgObject);

                    const messageStyle = {
                      alignSelf:
                        msgObject?.from !== "driver"
                          ? "flex-start"
                          : "flex-end",
                      backgroundColor:
                        msgObject?.from !== "driver"
                          ? "rgba(239, 239, 244, 1)"
                          : "rgba(255, 85, 0, 1)",

                      borderTopLeftRadius:
                        msgObject?.from !== "driver" ? 10 : 10,
                      borderTopRightRadius:
                        msgObject?.from !== "driver" ? 10 : 10,
                      borderBottomLeftRadius:
                        msgObject?.from !== "driver" ? 0 : 10,
                      borderBottomRightRadius:
                        msgObject?.from !== "driver" ? 10 : 0,
                      padding: 10,
                      maxWidth: 250,
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
                                msgObject?.from !== "driver"
                                  ? "rgba(38, 38, 40, 1)"
                                  : "#fff",
                              fontSize: 15,
                              lineHeight: 20,
                              paddingRight: 6,
                            }}
                          >
                            {msgObject?.message}{" "}
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
                  placeholder="Type a message..."
                  placeholderTextColor={"#C8C7CC"}
                  value={messageInput}
                  onChangeText={(e) => setMessageInput(e)}
                  autoCapitalize="none"
                  style={styles.input}
                />
              </View>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 40,
                  marginRight: 10,
                }}
                onPress={sendMessage}
              >
                <VECTOR_ICONS.MaterialIcons
                  name="send"
                  size={30}
                  color={COLORS.ORANGE}
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

export default ChatDrivertoUser;

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
    lineHeight: 20,
    color: "#212121",
  },
  textStyle: {
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
  viewStyle: {
    backgroundColor: COLORS.ORANGE,
    paddingBottom: "5%",
  },
  HeadinVIEW: {
    alignItems: "center",
    width: WIDTH * 0.92,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  Profile_Heading: {
    width: 80,
    height: 80,
    borderRadius: 500,
    resizeMode: "cover",
  },
});
