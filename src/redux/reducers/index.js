import { combineReducers } from 'redux';
import triviaReducers from './triviaReducers';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
  trivia: triviaReducers,
  loginReducer,
});

export default rootReducer;
