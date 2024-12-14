import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App'; // Import the correct App component
import { name as appName } from './app.json';

import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import store from './redux/store';
// import Sample from './components/sample';



const ReduxApp = () => (
  // <Sample/>
  <Provider store={store}>
    
      <App />
    
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
