import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface interfaceType {
  name: string;
  visitType: string;
  profileData: object;
  isConnected: boolean;
}

const initialStates: interfaceType = {
  name: "Hello",
  visitType: "",
  isConnected: false,
  profileData: {},
};

const UserDetailsSlice = createSlice({
  initialState: initialStates,
  name: "userDetails",
  reducers: {
    SavedUserDetails: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    UserVisited: (state, action: PayloadAction<string>) => {
      state.visitType = action.payload;
    },
    userData: (state, action: PayloadAction<object>) => {
      state.profileData = action.payload;
    },
    setIsOfflineAndOnline: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
  },
});

export const {
  SavedUserDetails,
  UserVisited,
  userData,
  setIsOfflineAndOnline,
} = UserDetailsSlice.actions;
export default UserDetailsSlice.reducer;
