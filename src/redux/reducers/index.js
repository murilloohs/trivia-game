import { combineReducers } from 'redux';
import { ADD_DATA_USER } from '../actions';

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

const rootReducer = combineReducers({ loginReducer });

export default rootReducer;
