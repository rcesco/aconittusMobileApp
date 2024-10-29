import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';

import {store, persistor} from './store';
import App from './App';

class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="light-content" backgroundColor="#405189" />
          <App />
        </PersistGate>
      </Provider>
    );
  }
}

export default Index;
