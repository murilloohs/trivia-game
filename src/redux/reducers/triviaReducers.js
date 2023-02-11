import {
  REQUEST_STARTED,
  REQUEST_SUCESS_API,
  NEXT_QUESTION,
}
  from '../actions/actionTypes';

const INITIAL_STATE_TRIVIA = {
  response: [],
  nextQuestion: 0,
  allQuestions: [],
};
const triviaReducers = (state = INITIAL_STATE_TRIVIA, action) => {
  switch (action.type) {
  case REQUEST_STARTED:
    return {
      ...state,
    };
  case REQUEST_SUCESS_API:
    return {
      ...state,
      response: action.payload.results,
      allQuestions: [action.payload.results[state.nextQuestion].correct_answer,
        ...action.payload.results[state.nextQuestion].incorrect_answers,
      ],
    };
  case 'ADD_NEXT_QUESTION':
    return {
      ...state,
      nextQuestion: state.nextQuestion + 1,
      allQuestions: [state.response[state.nextQuestion + 1].correct_answer,
        ...state.response[state.nextQuestion + 1].incorrect_answers,
      ],
    };
  case NEXT_QUESTION:
    return {
      ...state,
      nextQuestion: state.nextQuestion + 1 >= state.response.length ? 0
        : state.nextQuestion,
    };
  default:
    return state;
  }
};

export default triviaReducers;
