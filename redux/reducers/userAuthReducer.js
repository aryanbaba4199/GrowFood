import { GET_USER, GET_USERS, CREATE_USER } from '../actions/userAuthAction';

const initialState = {
  users: [],
  user: null,
};

const userAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.payload };
    case CREATE_USER:
      return { ...state, users: [...state.users, action.payload] };
    case GET_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

export default userAuthReducer;
