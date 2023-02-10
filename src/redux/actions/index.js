import fetchToken from '../../service/service';
import
{ REQUEST_STARTED,
  REQUEST_SUCESS_API,
  NEXT_QUESTION,
  ADD_DATA_USER,
  ACTION_SCORE,
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

export const nextQuestion = () => ({
  type: NEXT_QUESTION,
});

export const requestTriviaAPI = () => async (dispatch) => {
  try {
    dispatch(requestStarded());
    const token = await fetchToken();
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const request = await fetch(url);
    const data = await request.json();
    dispatch(requestSucess(data));
  } catch (error) {
    console.log(error);
  }
};

// ACTION PONTUAÇÃO
export const actionScore = (payload) => ({
  type: ACTION_SCORE,
  payload,
});
