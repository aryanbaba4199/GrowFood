import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from '../redux/Reducers/userAuthReducer';
import productReducer from '../redux/Reducers/productReducers';
import orderReducer from '../redux/Reducers/orderReducers';

const rootReducer = combineReducers({
  products: productReducer,
  auth: userAuthReducer,
  orders: orderReducer,
});

const store = configureStore({
  reducer: rootReducer,
  // Enable Redux DevTools if you want
  // devTools: process.env.NODE_ENV !== 'production',
});

export default store;
