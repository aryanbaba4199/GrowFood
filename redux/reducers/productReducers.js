// src/redux/reducers/productReducer.js

import { GET_PRODUCTS, ADD_PRODUCT, GET_BRANDS, GET_CATEGORY, UPDATE_PRODUCT, DELETE_PRODUCT } from '../actions/productActions';

const initialState = {
  products: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.payload };
    case GET_BRANDS:
        return { ...state, brands: action.payload };  
    case GET_CATEGORY:
      return { ...state, categories: action.payload };    
    case ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    // case UPDATE_PRODUCT:
    //   return {
    //     ...state,
    //     products: state.products.map(product =>
    //       product._id === action.payload._id ? action.payload : product
    //     ),
    //   };
    // case DELETE_PRODUCT:
    //   return {
    //     ...state,
    //     products: state.products.filter(product => product._id !== action.payload),
    //   };
    default:
      return state;
  }
};

export default productReducer;
