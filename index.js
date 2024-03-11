/* eslint-disable react/react-in-jsx-scope */
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {PaperProvider} from 'react-native-paper';
import {store, persistor} from './redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

function Main() {
  return (
    <Provider store={store} persistor={persistor}>
      <PersistGate persistor={persistor}>
        <PaperProvider>
          <App />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
