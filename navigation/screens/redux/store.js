import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import apiReducer from './reducer';
import defaultSaga from './saga';
const INITIAL_STATE = {
  data: {},
};
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  apiReducer,
  INITIAL_STATE,
  applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(defaultSaga);
export default store;
