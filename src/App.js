import React, { Component } from 'react';
import { Provider } from 'react-redux';
// Redux-persist stores the redux store to local storage so it is retained on refresh.
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './ducks/store';
import Form from './components/Form';
const { persistor, store } = configureStore()

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Form/>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;