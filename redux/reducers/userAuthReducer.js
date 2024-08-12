import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
} from "../../redux/actions/userAuthAction";

import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  token: null,
  isAuthenticated: false,
  user: null,
};

function getInitialStateFromAsyncStorage() {
  // This needs to be an async function in actual use
  // For initial state setup, you'll need to handle it properly
  return initialState;
}

const initialAuthState = getInitialStateFromAsyncStorage();

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      AsyncStorage.setItem('token', action.payload);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGOUT:
      AsyncStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
      };
    case FETCH_USER_SUCCESS:
      AsyncStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    case FETCH_USER_FAIL:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
