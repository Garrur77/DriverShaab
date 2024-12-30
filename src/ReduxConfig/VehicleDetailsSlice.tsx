import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface interfaceType {
  VEHICAL_OWNER: any;
  VEHICAL_TYPE: any;
  VEHICAL_NAME: any;
  VEHICAL_NUMBER: any;
  VEHICAL_CLASS: any;
  PCO_VEHICAL_LICENSE: any;
  PCO_VEHICAL_LICENSE_DOC: any;
  DRIVER_LICENSE: any;
  DRIVER_LICENSE_DOC: any;
  INSURANCE: any;
  INSURANCE_DOC: any;
  VEHICAL_LOGBOOK: string;
  VEHICAL_LOGBOOK_DOC: any;
  MOT: any;
  MOT_DOC: any;
  FRONTAL_PATH: any;
  LEFT_PATH: any;
  RIGHT_PATH: any;
  BACK_PATH: any;
  CAR_LICENSE: any;
  CAR_LICENSE_DOC: any;
  BOOKLET: any;
  BOOKLET_DOC: any;
  OTHER: any;
}

const initialStates: interfaceType = {
  VEHICAL_OWNER: "",
  VEHICAL_TYPE: "",
  VEHICAL_NAME: "",
  VEHICAL_NUMBER: "",
  VEHICAL_CLASS: "",
  PCO_VEHICAL_LICENSE: "",
  PCO_VEHICAL_LICENSE_DOC: "",
  DRIVER_LICENSE: "",
  DRIVER_LICENSE_DOC: "",
  INSURANCE: "",
  INSURANCE_DOC: "",
  VEHICAL_LOGBOOK: "",
  VEHICAL_LOGBOOK_DOC: "",
  MOT: "",
  MOT_DOC: "",
  FRONTAL_PATH: "",
  LEFT_PATH: "",
  RIGHT_PATH: "",
  BACK_PATH: "",
  CAR_LICENSE: "",
  CAR_LICENSE_DOC: "",
  BOOKLET: "",
  BOOKLET_DOC: "",
  OTHER: "",
};

const VehicalDetails_Slices = createSlice({
  initialState: initialStates,
  name: "counter",

  reducers: {
    saveVEHICAL_OWNER: (state, action: PayloadAction<any>) => {
      state.VEHICAL_OWNER = action.payload;
    },
    saveVEHICAL_TYPE: (state, action: PayloadAction<any>) => {
      state.VEHICAL_TYPE = action.payload;
    },
    saveVEHICAL_NAME: (state, action: PayloadAction<any>) => {
      state.VEHICAL_NAME = action.payload;
    },
    saveVEHICAL_NUMBER: (state, action: PayloadAction<any>) => {
      state.VEHICAL_NUMBER = action.payload;
    },

    saveVEHICAL_CLASS: (state, action: PayloadAction<string | null>) => {
      state.VEHICAL_CLASS = action.payload;
    },
    savePCO_VEHICAL_LICENSE: (state, action: PayloadAction<string>) => {
      state.PCO_VEHICAL_LICENSE = action.payload;
    },
    savePCO_VEHICAL_LICENSE_DOC: (state, action: PayloadAction<string>) => {
      state.PCO_VEHICAL_LICENSE_DOC = action.payload;
    },
    saveDRIVER_LICENSE: (state, action: PayloadAction<string>) => {
      state.DRIVER_LICENSE = action.payload;
    },
    saveDRIVER_LICENSE_DOC: (state, action: PayloadAction<string>) => {
      state.DRIVER_LICENSE_DOC = action.payload;
    },
    saveINSURANCE: (state, action: PayloadAction<any>) => {
      state.INSURANCE = action.payload;
    },

    saveINSURANCE_DOC: (state, action: PayloadAction<string>) => {
      state.INSURANCE_DOC = action.payload;
    },
    saveVEHICAL_LOGBOOK: (state, action: PayloadAction<string>) => {
      state.VEHICAL_LOGBOOK = action.payload;
    },
    saveVEHICAL_LOGBOOK_DOC: (state, action: PayloadAction<string>) => {
      state.VEHICAL_LOGBOOK_DOC = action.payload;
    },
    saveMOT: (state, action: PayloadAction<string>) => {
      state.MOT = action.payload;
    },
    saveMOT_DOC: (state, action: PayloadAction<string>) => {
      state.MOT_DOC = action.payload;
    },

    saveFRONTAL_PATH: (state, action: PayloadAction<any[]>) => {
      state.FRONTAL_PATH = action.payload;
    },

    //$$
    saveRIGHT_PATH: (state, action: PayloadAction<string>) => {
      state.RIGHT_PATH = action.payload;
    },
    saveBACK_PATH: (state, action: PayloadAction<string>) => {
      state.BACK_PATH = action.payload;
    },
    saveLEFT_PATH: (state, action: PayloadAction<string>) => {
      state.LEFT_PATH = action.payload;
    },

    saveCAR_LICENSE_DOC: (state, action: PayloadAction<string>) => {
      state.CAR_LICENSE_DOC = action.payload;
    },
    saveCAR_LICENSE: (state, action: PayloadAction<string>) => {
      state.CAR_LICENSE = action.payload;
    },

    saveBOOKLET: (state, action: PayloadAction<string>) => {
      state.BOOKLET = action.payload;
    },
    saveBOOKLET_DOC: (state, action: PayloadAction<string>) => {
      state.BOOKLET_DOC = action.payload;
    },
    saveOTHER: (state, action: PayloadAction<string>) => {
      state.OTHER = action.payload;
    },
    setClearVehicle: (state, action: PayloadAction<Object>) => {
      state.VEHICAL_OWNER = "";
      state.VEHICAL_TYPE = "";
      state.VEHICAL_NAME = "";
      state.VEHICAL_NUMBER = "";
      state.VEHICAL_CLASS = "";
      state.PCO_VEHICAL_LICENSE = "";
      state.PCO_VEHICAL_LICENSE_DOC = "";
      state.DRIVER_LICENSE = "";
      state.DRIVER_LICENSE_DOC = "";
      state.INSURANCE = "";
      state.INSURANCE_DOC = "";
      state.VEHICAL_LOGBOOK = "";
      state.VEHICAL_LOGBOOK_DOC = "";
      state.MOT = "";
      state.MOT_DOC = "";
      state.FRONTAL_PATH = "";
      state.LEFT_PATH = "";
      state.RIGHT_PATH = "";
      state.BACK_PATH = "";
      state.CAR_LICENSE = "";
      state.CAR_LICENSE_DOC = "";
      state.BOOKLET = "";
      state.BOOKLET_DOC = "";
      state.OTHER = "";
    },
  },
});

export const {
  saveOTHER,
  saveBOOKLET_DOC,
  saveBOOKLET,
  saveCAR_LICENSE,
  saveCAR_LICENSE_DOC,
  saveLEFT_PATH,
  saveBACK_PATH,
  saveRIGHT_PATH,
  saveFRONTAL_PATH,
  saveMOT_DOC,
  saveMOT,
  saveVEHICAL_LOGBOOK_DOC,
  saveVEHICAL_LOGBOOK,
  saveINSURANCE_DOC,
  saveINSURANCE,
  saveDRIVER_LICENSE_DOC,
  saveDRIVER_LICENSE,
  savePCO_VEHICAL_LICENSE_DOC,
  savePCO_VEHICAL_LICENSE,
  saveVEHICAL_CLASS,
  saveVEHICAL_TYPE,
  saveVEHICAL_OWNER,
  saveVEHICAL_NAME,
  saveVEHICAL_NUMBER,
  setClearVehicle,
} = VehicalDetails_Slices.actions;

export default VehicalDetails_Slices.reducer;
