// redux/Reducers/globalVariableReducer.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  globalVar: "", // Your global variable
};

const globalVariableSlice = createSlice({
  name: 'globalVariable',
  initialState,
  reducers: {
    setGlobalVar(state, action) {
      state.globalVar = action.payload;
    },
    clearGlobalVar(state) {
      state.globalVar = ""; 
    },
  },
});

export const { setGlobalVar, clearGlobalVar } = globalVariableSlice.actions;
export default globalVariableSlice.reducer;
