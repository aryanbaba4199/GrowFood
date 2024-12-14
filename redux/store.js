import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from '../redux/Reducers/userAuthReducer';
import productReducer from '../redux/Reducers/productReducers';
import orderReducer from '../redux/Reducers/orderReducers';
import globalVariableReducers from './Reducers/globalVariableReducers';

const rootReducer = combineReducers({
  products: productReducer,
  auth: userAuthReducer,
  orders: orderReducer,
  globalVariable: globalVariableReducers,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false, // Disable in development for better performance
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development
});

export default store;
