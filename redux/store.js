  import { combineReducers } from 'redux';
  import productReducer from './reducers/productReducers';
  import { configureStore } from '@reduxjs/toolkit';

  const rootReducer = combineReducers({
    products: productReducer,
  });

  // Make sure applyMiddleware is used correctly
  const store = configureStore({
    reducer: rootReducer
  });

  export default store;
