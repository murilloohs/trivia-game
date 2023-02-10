import { combineReducers } from 'redux';
import triviaReducers from './triviaReducers';

const rootReducer = combineReducers({
  trivia: triviaReducers,
});

export default rootReducer;
