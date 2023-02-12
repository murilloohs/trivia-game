import { combineReducers } from 'redux';
import triviaReducers from './triviaReducers';
import loginReducer from './loginReducer';
import player from './player';

const rootReducer = combineReducers({
  trivia: triviaReducers,
  loginReducer,
  player,
});

export default rootReducer;
