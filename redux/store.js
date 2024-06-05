  import { combineReducers } from 'redux';
  import productReducer from './reducers/productReducers';
  import userAuthReducer from './reducers/userAuthReducer';
  import { configureStore } from '@reduxjs/toolkit';

  const rootReducer = combineReducers({
    products: productReducer,
    users : userAuthReducer,
  });

 
  const store = configureStore({
    reducer: rootReducer
  });

  export default store;
