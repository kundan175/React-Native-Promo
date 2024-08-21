import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {reset} from '../components/NavigationService';
import {act} from 'react-test-renderer';

const initialState = {
  customAlertVisible: false,
  alertTitle: '',
  userProfile: '',
  touchId: false,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    customAlertfuction: (state, action) => {
      state.customAlertVisible = true;
      state.alertTitle = action.payload.title;
    },
    customAlertDisablefuction: (state, action) => {
      state.customAlertVisible = false;
    },
    updateUser: (state, action) => {
      state.userProfile = action.payload;
    },
    touchIdOn: (state, action) => {
      state.touchId = state.touchId ? false : true;
    },
  },
});

export const {
  touchIdOn,
  customAlertfuction,
  customAlertDisablefuction,
  updateUser,
} = counterSlice.actions;
export default counterSlice.reducer;
