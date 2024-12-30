import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface interfaceType {

    value: number;
}

const initialStates: interfaceType = {

    value: 0

}



const Counter = createSlice({

    initialState: initialStates,
    name: 'counter',

    reducers: {
        saveValues: (state, action: PayloadAction<number>) => {
            console.log("States saved", state);
            state.value = action.payload;

        }
    }

})


export const { saveValues } = Counter.actions

export default Counter.reducer


