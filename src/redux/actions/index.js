import fetchToken from '../../service/service';
import
{ REQUEST_STARTED,
  REQUEST_SUCESS_API,
  NEXT_QUESTION,
  ADD_DATA_USER,
  ACTION_SCORE,
  ACTION_ASSERTIONS,
}
  from './actionTypes';

// ACTION LOGIN
export const addNameEmail = (email, name) => ({
  type: ADD_DATA_USER,
  email,
  name,
});

// ACTION API TRIVIA
const requestStarded = () => ({
  type: REQUEST_STARTED,
});

const requestSucess = (payload) => ({
  type: REQUEST_SUCESS_API,
  payload,
});

export const dispatchNextQuestion = () => ({
  type: NEXT_QUESTION,
});

export const addNextQuestion = () => ({
  type: 'ADD_NEXT_QUESTION',
});

export const questionsAll = () => ({
  type: 'All_QUESTIONS',
}
);

export const resetScore = () => ({
  type: 'RESET',
});

export const requestTriviaAPI = (history) => async (dispatch) => {
  try {
    dispatch(requestStarded());
    const responseErro = 3;
    const token = await fetchToken();
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const request = await fetch(url);
    const data = await request.json();
    if (data.response_code === responseErro) {
      localStorage.clear('token');
      history.push('/');
    }
    dispatch(requestSucess(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};

// ACTION PONTUAÇÃO
export const actionScore = (payload) => ({
  type: ACTION_SCORE,
  payload,
});

// ACTION ASSERTIONS
export const actionAssertions = (payload) => ({
  type: ACTION_ASSERTIONS,
  payload,
});
