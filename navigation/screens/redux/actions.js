import {
  GET_BORED_API,
  GET_BORED_API_SUCCESS,
  GET_BORED_API_FAILURE,
} from './constants';

export const getBoredAPI = () => ({
  type: GET_BORED_API,
});
export const getBoredAPISuccess = data => ({
  type: GET_BORED_API_SUCCESS,
  payload: data,
});

export const getBoredAPIFailure = error => ({
  type: GET_BORED_API_FAILURE,
  payload: error,
});
