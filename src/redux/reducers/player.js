import { ACTION_SCORE } from '../actions/actionTypes';

const INITIAL_STATE = {
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTION_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  default:
    return state;
  }
};

export default player;
