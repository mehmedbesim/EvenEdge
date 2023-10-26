import {
  GET_BORED_API,
  GET_BORED_API_SUCCESS,
  GET_BORED_API_FAILURE,
  GET_OPEN_AI,
  GET_OPEN_AI_SUCCESS,
  GET_OPEN_AI_FAILURE,
} from './constants';

const initialState = {
  data: null,
  error: null,
  loading: false,
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BORED_API:
      return {...state, loading: true};
    case GET_BORED_API_SUCCESS:
      return {...state, data: action.payload, loading: false, error: null};
    case GET_BORED_API_FAILURE:
      return {...state, error: action.payload, loading: false};
    default:
      return state;
  }
};

export default apiReducer;
