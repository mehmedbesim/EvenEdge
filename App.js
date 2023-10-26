import React from 'react';
import {Provider} from 'react-redux';
import store from './navigation/screens/redux/store';
import MainContainer from './navigation/MainContainer';

const App = () => {
  return (
    <Provider store={store}>
      <MainContainer />
    </Provider>
  );
};

export default App;
