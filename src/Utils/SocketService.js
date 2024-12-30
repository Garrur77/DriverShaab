import io from "socket.io-client";
import { SOCKET_URL } from "../Components/ApiConfig/EndPoints";


class WSService {
  initializeSocket = async (id) => {
    try {
      this.socket = io(SOCKET_URL, {
        transports: ["websocket"],
        auth:{
          _id:id
        }
      });
      console.log("initializing socket", this.socket);

      this.socket.on("connect", (data) => {
        console.log("=== socket connected ====");
      });

      this.socket.on("disconnect", (data) => {
        console.log("=== socket disconnected ====");
      });

      this.socket.on("error", (data) => {
        console.log("socekt error", data);
      });
    } catch (error) {
      console.log("scoket is not inialized", error);
    }
  };

  emit(event, data = {}) {
    console.log("data emit -->",data)
    this?.socket?.emit(event, data);
  }

  on(event, cb) {
    this?.socket?.on(event, cb);
  }

  removeListener(listenerName) {
    this?.socket?.removeListener(listenerName);
  }
  disconnect (){
    this.socket?.disconnect();
  }
}

const socketServcies = new WSService();

export default socketServcies;
