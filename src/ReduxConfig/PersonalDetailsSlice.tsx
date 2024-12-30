import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Counter from "./TokenUserID";

interface interfaceType {
  FIRST_NAME: any;
  LAST_NAME: any;
  PHONE_NUMBER: any;
  CONTRYCODE: any;
  EMAIL: any;
  AGE: any;
  GENDER: any;
  EMERGENCY_NUMBER: any;
  EMERGENCY_CONTRYCODE: any;
  PROFILE_PATH: string;
  PhoneFlag: any;
  EmergencyFlag: any;
  UserAllDeatils: Array;
}

const initialStates: interfaceType = {
  FIRST_NAME: "",
  LAST_NAME: "",
  PHONE_NUMBER: "",
  CONTRYCODE: "",
  EMAIL: "",
  AGE: "",
  GENDER: "",
  EMERGENCY_NUMBER: "",
  EMERGENCY_CONTRYCODE: "",
  PROFILE_PATH: "",
  PhoneFlag: "",
  EmergencyFlag: "",
  UserAllDeatils: [],
};

const PersonalDetails_Slices = createSlice({
  initialState: initialStates,
  name: "counter",

  reducers: {
    saveFIRST_NAME: (FNstate, action: PayloadAction<string>) => {
      FNstate.FIRST_NAME = action.payload;
    },
    saveLAST_NAME: (LNstate, action: PayloadAction<string>) => {
      LNstate.LAST_NAME = action.payload;
    },
    savePHONE_NUMBER: (PNstate, action: PayloadAction<string>) => {
      PNstate.PHONE_NUMBER = action.payload;
    },
    saveCONTRYCODE: (CCstate, action: PayloadAction<string>) => {
      CCstate.CONTRYCODE = action.payload;
    },
    saveEMAIL: (Estate, action: PayloadAction<string>) => {
      Estate.EMAIL = action.payload;
    },
    saveAGE: (AGEstate, action: PayloadAction<string>) => {
      AGEstate.AGE = action.payload;
    },
    saveGENDER: (Gstate, action: PayloadAction<string | null>) => {
      Gstate.GENDER = action.payload;
    },
    saveEMERGENCY_NUMBER: (ENstate, action: PayloadAction<string>) => {
      ENstate.EMERGENCY_NUMBER = action.payload;
    },
    saveEMERGENCY_CONTRYCODE: (ENCstate, action: PayloadAction<string>) => {
      ENCstate.EMERGENCY_CONTRYCODE = action.payload;
    },
    saveIMAGEPATH: (IMAGEstate, action: PayloadAction<string>) => {
      IMAGEstate.PROFILE_PATH = action.payload;
    },
    saveUserDeatils: (state, action: PayloadAction<string>) => {
      state.UserAllDeatils = action.payload;
    },
    setPhFlag: (state, action: PayloadAction<string>) => {
      state.PhoneFlag = action.payload;
    },
    setEmFlag: (state, action: PayloadAction<string>) => {
      state.EmergencyFlag = action.payload;
    },
    setUpdateDetail: (state, action: PayloadAction<Object>) => {
      // console.log("UpdateDataPLayLoad---->", action?.payload);
      const {
        firstName,
        lastName,
        email,
        mobile,
        countryCode,
        phoneFlag,
        age,
        gender,
        emergencyContactFlag,
        emergencyCountryCode,
        emergencyContact,
        profileImage,
      } = action?.payload;
      state.FIRST_NAME = firstName;
      state.LAST_NAME = lastName;
      state.PHONE_NUMBER = mobile;
      state.CONTRYCODE = countryCode;
      state.EMAIL = email;
      state.AGE = age;
      state.GENDER = gender;
      state.EMERGENCY_NUMBER = emergencyContact;
      state.EMERGENCY_CONTRYCODE = emergencyCountryCode;
      state.PROFILE_PATH = profileImage;
      state.PhoneFlag = phoneFlag;
      state.EmergencyFlag = emergencyContactFlag;
    },
    setClearPersonalInfo: (state, action: PayloadAction<Object>) => {
      state.FIRST_NAME = "";
      state.LAST_NAME = "";
      state.PHONE_NUMBER = "";
      state.CONTRYCODE = "";
      state.EMAIL = "";
      state.AGE = "";
      state.GENDER = "";
      state.EMERGENCY_NUMBER = "";
      state.EMERGENCY_CONTRYCODE = "";
      state.PROFILE_PATH = "";
      state.PhoneFlag = "";
      state.EmergencyFlag = "";
    },
  },
});

export const {
  saveFIRST_NAME,
  saveLAST_NAME,
  savePHONE_NUMBER,
  saveCONTRYCODE,
  saveEMAIL,
  saveAGE,
  saveGENDER,
  saveEMERGENCY_NUMBER,
  saveEMERGENCY_CONTRYCODE,
  saveIMAGEPATH,
  saveUserDeatils,
  setPhFlag,
  setEmFlag,
  setUpdateDetail,
  setClearPersonalInfo,
} = PersonalDetails_Slices.actions;

export default PersonalDetails_Slices.reducer;
