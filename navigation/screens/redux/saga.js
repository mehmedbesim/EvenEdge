import {call, put, takeLatest} from 'redux-saga/effects';
import {getBoredAPISuccess, getBoredAPIFailure} from './actions';

import {GET_BORED_API} from './constants';

import {getBoredAPI} from './service.js';

export function* getBoredApiHandler() {
  try {
    debugger;
    const response = yield call(getBoredAPI);
    yield put(getBoredAPISuccess(response));
  } catch (error) {
    yield put(getBoredAPIFailure(error));
  }
}

export default function* defaultSaga() {
  yield takeLatest(GET_BORED_API, getBoredApiHandler);
}
