import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface interfaceType {
  value: number;
  StartRide_State : any,
  UserID:any,
  Token:any,
  
 


  
}

const initialStates : interfaceType = {
  value: 0,
  StartRide_State:'',
  UserID:'',
  Token:'',
  
  
};

const CreatedSlices = createSlice({
  initialState: initialStates,
  name: 'counter',

  reducers: {
    saveValues: (state, action: PayloadAction<number>) => {
      console.log('States saved', state);
      state.value = action.payload;
    },
    saveStartRide_State: (state, action: PayloadAction<any>) => {
      console.log('saved_Ride', state);
      state.StartRide_State = action.payload;
    },
    saveUSERID: (UIDstate, action: PayloadAction<any>) => {
      UIDstate.UserID = action.payload;
    },
    SaveTOKEN: (tokenstate, action: PayloadAction<any>) => {
      tokenstate.Token = action.payload;
    },
   


     
  },
});

export const {
  saveValues,
  saveStartRide_State,
  saveUSERID,
  SaveTOKEN,
 
} = CreatedSlices.actions;

export default CreatedSlices.reducer;
