import { ACTION_SCORE, ACTION_ASSERTIONS } from '../actions/actionTypes';

const INITIAL_STATE = {
  score: 0,
  assertions: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTION_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case ACTION_ASSERTIONS:
    return {
      ...state,
      assertions: action.payload,
    };
  case 'RESET':
    return {
      ...state,
      score: 0,
    };
  default:
    return state;
  }
};

export default player;
