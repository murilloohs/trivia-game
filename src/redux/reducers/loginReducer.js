import { ADD_DATA_USER } from '../actions/actionTypes';

const INITIAL_STATE = {
  loggedEmail: '',
  loggedName: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_DATA_USER:
    return {
      ...state,
      loggedEmail: action.email,
      loggedName: action.name,
    };
  default:
    return state;
  }
};

export default loginReducer;
