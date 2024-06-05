import axios from 'axios';

export const GET_USERS = 'GET_USERS';
export const GET_USER = 'GET_USER';
export const CREATE_USER = 'CREATE_USER';

const API_URL = 'http://10.0.2.2:5000/api/users';

export const getUser = (email) => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/${email}`);
    dispatch({ type: GET_USER, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/AdminAccess`);
    dispatch({ type: GET_USERS, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const createUser = (userData) => async (dispatch) => {
  try {
    const res = await axios.post(API_URL, userData);
    dispatch({ type: CREATE_USER, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};
