import fetchToken from '../../service/service';
import
{ REQUEST_STARTED,
  REQUEST_SUCESS_API,
  // REQUEST_ERROR_API,
  NEXT_QUESTION,
}
  from './actionTypes';

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
