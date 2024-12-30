import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface interfaceType {
  value: number;
  userTokenAndId: {
    token: String;
    userId: String;
    isVerifiedByAdmin: any;
    isVerified: Boolean;
    isProfileUpdated: Boolean;
  };
  userData: Object;
}

const initialStates: interfaceType = {
  value: 0,
  userTokenAndId: {
    token: "",
    userId: "",
    isVerifiedByAdmin: false,
    isVerified: false,
    isProfileUpdated: false,
  },
  userData: {},
};

const TokenUserID = createSlice({
  initialState: initialStates,
  name: "Token",

  reducers: {
    saveValues: (state, action: PayloadAction<number>) => {
      console.log("States saved", state);
      state.value = action.payload;
    },
    setToken: (state, action: PayloadAction<String>) => {
      console.log("States setToken", state);
      state.userTokenAndId.token = action.payload;
    },
    setUserId: (state, action: PayloadAction<String>) => {
      console.log("States userId", state);
      state.userTokenAndId.userId = action.payload;
    },
    setIsProfile: (state, action: PayloadAction<Boolean>) => {
      console.log("States userId", state);
      state.userTokenAndId.isProfileUpdated = action.payload;
    },
    setTokenAndUserId: (
      state,
      action: PayloadAction<{
        token: string;
        userId: string;
        isVerified: Boolean;
        isVerifiedByAdmin: Boolean;
        isProfileUpdated: Boolean;
      }>
    ) => {
      const { token, userId, isVerified, isVerifiedByAdmin, isProfileUpdated } =
        action.payload;
      state.userTokenAndId.token = token;
      state.userTokenAndId.userId = userId;
      state.userTokenAndId.isProfileUpdated = isProfileUpdated;
      state.userTokenAndId.isVerified = isVerified;
      state.userTokenAndId.isVerifiedByAdmin = isVerifiedByAdmin;
    },
    setIsisVerifiedByAdmin: (state, action: PayloadAction<Boolean>) => {
      state.userTokenAndId.isVerifiedByAdmin = action.payload;
    },
    setUserData: (state, action: PayloadAction<Object>) => {
      state.userData = action.payload;
    },
    setClearState: (state, action: PayloadAction<any>) => {
      state.userTokenAndId.token = "";
      state.userTokenAndId.userId = "";
      state.userTokenAndId.isProfileUpdated = false;
      state.userTokenAndId.isVerified = false;
      state.userTokenAndId.isVerifiedByAdmin = null;
      state.userData = {};
    },
  },
});

export const {
  saveValues,
  setTokenAndUserId,
  setUserId,
  setToken,
  setIsProfile,
  setUserData,
  setIsisVerifiedByAdmin,
  setClearState,
} = TokenUserID.actions;

export default TokenUserID.reducer;
