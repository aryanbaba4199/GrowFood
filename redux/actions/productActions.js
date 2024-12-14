import axios from 'axios';
import { productsAPi } from '../../components/API';
import { getProductsApi } from '../../appApi';

// Action Types
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const GET_PRODUCT = 'GET_PRODUCT';
export const GET_BRANDS = 'GET_BRANDS';
export const GET_CATEGORY = 'GET_CATEGORY';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const GET_BRANDS_PRODUCTS = 'GET_BRANDS_PRODUCTS';


// API Endpoints
const API_URL = productsAPi;
const BRANDS_ENDPOINT = `${API_URL}/brands`;
const CATEGORY_ENDPOINT = `${API_URL}/category`;

// Helper function to handle errors
const handleError = (error, from) => {
  console.error(`API Error in ${from}:`, error.response ? error.response.data : error.message);
};

// Action Creators
let i = 1;
export const getProducts = (page) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${getProductsApi}/${page??1}`);
    console.log(i);
    i++;
    dispatch({ type: GET_PRODUCTS, payload: data.data });
  } catch (error) {
    handleError(error, 'getting products');
  }
};

export const getBrandsProducts = ()=>async(dispatch)=>{
  try{
    const {data} = await axios.get(API_URL);
    dispatch({type:GET_BRANDS_PRODUCTS, payload:data});
  }catch(error){
    handleError(error, 'getting brands product');
  }
}

export const getProduct = (id) => async (dispatch) => {
  console.log('the id is ', id);
  try {
    const { data } = await axios.get(`${API_URL}/product/${id}`);
    dispatch({ type: GET_PRODUCT, payload: data });
  } catch (error) {
    handleError(error, 'getting product');
  }
};

export const getBrands = () => async (dispatch) => {
  try {
    const { data } = await axios.get(BRANDS_ENDPOINT);
    dispatch({ type: GET_BRANDS, payload: data });
  } catch (error) {
    handleError(error, 'getting brands');
  }
};

export const getCategories = () => async (dispatch) => {
  try {
    const { data } = await axios.get(CATEGORY_ENDPOINT);
    dispatch({ type: GET_CATEGORY, payload: data });
  } catch (error) {
    handleError(error, 'getting category endpoint');
  }
};

export const addProduct = (productData) => async (dispatch) => {
  try {
    const { data } = await axios.post(API_URL, productData, {
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch({ type: ADD_PRODUCT, payload: data });
  } catch (error) {
    handleError(error, 'adding product');
  }
};

export const updateProduct = (id, product) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${API_URL}/${id}`, product);
    dispatch({ type: UPDATE_PRODUCT, payload: data });
  } catch (error) {
    handleError(error, 'update product');
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    dispatch({ type: DELETE_PRODUCT, payload: id });
  } catch (error) {
    handleError(error, 'delete product');
  }
};
