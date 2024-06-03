import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App'; // Import the correct App component
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import store from './redux/store';



const ReduxApp = () => (
  <Provider store={store}>
    
      <App />
    
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
